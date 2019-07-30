import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { ZSelect } from 'openland-mobile/components/ZSelect';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SScrollView } from 'react-native-s/SScrollView';
import Toast from 'openland-mobile/components/Toast';

const Loader = Toast.loader();

const EditCommunityComponent = XMemo<PageProps>((props) => {
    const organizationId = props.router.params.id;
    const client = getClient();
    const organization = getClient().useOrganizationWithoutMembers({ organizationId }, { fetchPolicy: 'network-only' }).organization;
    const profile = getClient().useOrganizationProfile({ organizationId }, { fetchPolicy: 'network-only' }).organizationProfile;

    const form = useForm();
    const nameField = useField('name', profile.name || '', form);
    const photoField = useField('photoRef', profile.photoRef, form);
    const aboutField = useField('about', profile.about || '', form);

    const changeType = React.useCallback(async (isPrivate: boolean) => {
        Loader.show();

        try {
            await client.mutateUpdateOrganization({ organizationId: organization.id, input: { alphaIsPrivate: isPrivate }});
            await client.refetchOrganizationProfile({ organizationId });
            await client.refetchOrganization({ organizationId });
        } catch (e) {
            console.warn(e);
        } finally {
            Loader.hide();
        }
    }, [organization, profile]);

    const handleSave = () => 
        form.doAction(async () => {
            try {
                await client.mutateUpdateOrganization({
                    organizationId,
                    input: {
                        name: nameField.value,
                        photoRef: sanitizeImageRef(photoField.value),
                        about: aboutField.value,
                    }
                });
                await client.refetchOrganizationProfile({ organizationId });
                await client.refetchOrganization({ organizationId });
            } catch (e) {
                console.warn(e);
            } 

            props.router.back();
        });

    return (
        <>
            <SHeader title="Edit community" />
            <SHeaderButton title="Save" onPress={handleSave} />
            <SScrollView>
                <ZListItemGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field={photoField} />
                </ZListItemGroup>

                <ZListItemGroup header="Info" headerMarginTop={0}>
                    <ZInput
                        placeholder="Community name"
                        field={nameField}
                    />
                    <ZInput
                        field={aboutField}
                        placeholder="About"
                        multiline={true}
                        description="Publicly describe this community for all to see see"
                    />
                    <ZSelect 
                        label="Community type"
                        defaultValue={organization.isPrivate}
                        disabled={!organization.isOwner}
                        onChange={async (option: { label: string; value: boolean }) => {
                            await changeType(option.value);
                        }}
                        options={[
                            { label: 'Private', value: true, icon: require('assets/ic-lock-24.png') },
                            { label: 'Public', value: false, icon: require('assets/ic-invite-24.png') }
                        ]}
                        description="Set by creator"
                    />  
                </ZListItemGroup>

                <ZListItemGroup header="Shortname" headerMarginTop={0}>
                    <ZPickField
                        label="Shortname"
                        value={organization.shortname ? '@' + organization.shortname : 'Create'}
                        path="SetOrgShortname"
                        pathParams={{ id: organization.id }}
                        description="People will be able to find your community by this shortname"
                    />
                </ZListItemGroup>
            </SScrollView>
        </>
    );
});

export const EditCommunity = withApp(EditCommunityComponent, { navigationAppearance: 'small' });
