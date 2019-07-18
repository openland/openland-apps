import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZInput } from 'openland-mobile/components/ZInput';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { ZSelect } from 'openland-mobile/components/ZSelect';

const EditCommunityComponent = XMemo<PageProps>((props) => {
    const ref = React.useRef<ZForm | null>(null);
    const client = getClient();
    const organization = getClient().useOrganizationWithoutMembers({ organizationId: props.router.params.id }, { fetchPolicy: 'network-only' }).organization;
    const profile = getClient().useOrganizationProfile({ organizationId: props.router.params.id }, { fetchPolicy: 'network-only' }).organizationProfile;

    const changeType = React.useCallback(async (isPrivate: boolean) => {
        startLoader();

        try {
            await client.mutateUpdateOrganization({ organizationId: organization.id, input: { alphaIsPrivate: isPrivate }});
            await client.refetchOrganizationProfile({ organizationId: props.router.params.id });
            await client.refetchOrganization({ organizationId: props.router.params.id });
        } catch (e) {
            console.warn(e);
        } finally {
            stopLoader();
        }
    }, [organization, profile]);

    return (
        <>
            <SHeader title="Edit community" />
            <SHeaderButton title="Save" onPress={() => { ref.current!.submitForm(); }} />
            <ZForm
                ref={ref}
                action={async src => {
                    await client.mutateUpdateOrganization(src);
                    await client.refetchOrganizationProfile({ organizationId: props.router.params.id });
                    await client.refetchOrganization({ organizationId: props.router.params.id });
                }}
                defaultData={{
                    input: {
                        name: profile.name,
                        photoRef: sanitizeImageRef(
                            profile.photoRef,
                        ),
                        about: profile.about,
                    },
                }}
                staticData={{
                    organizationId: props.router.params.id,
                }}
                onSuccess={() => {
                    props.router.back();
                }}
            >
                <ZListItemGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field="input.photoRef" />
                </ZListItemGroup>

                <ZListItemGroup header="Info" headerMarginTop={0}>
                    <ZInput
                        placeholder="Community name"
                        field="input.name"
                    />
                    <ZInput
                        field="input.about"
                        placeholder="About"
                        multiline={true}
                        description="Publicly describe this community for all to see see"
                    />
                    <ZSelect 
                        label="Community type"
                        defaultValue={organization.isPrivate}
                        onChange={async (option: { label: string; value: boolean }) => {
                            if (organization.isOwner) {
                                await changeType(option.value);
                            }
                        }}
                        options={[
                            { label: 'Private', value: true, icon: require('assets/ic-create-private-24.png') },
                            { label: 'Public', value: false, icon: require('assets/ic-create-public-24.png') }
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
            </ZForm>
        </>
    );
});

export const EditCommunity = withApp(EditCommunityComponent, { navigationAppearance: 'small' });
