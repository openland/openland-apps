import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { View, Platform } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { ZPickField } from 'openland-mobile/components/ZPickField';

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

    const handleChangeTypePress = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        builder.action('Private', async () => {
            await changeType(true);
        }, false, require('assets/ic-create-public-24.png'));

        builder.action('Public', async () => {
            await changeType(false);
        }, false, require('assets/ic-create-private-24.png'));

        builder.show();
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
                <View alignItems="center" marginTop={10}>
                    <ZAvatarPicker size="xx-large" field="input.photoRef" />
                </View>

                <ZListItemGroup header="Info" marginTop={0}>
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
                    <ZPickField
                        label="Community type"
                        value={organization.isPrivate ? 'Private' : 'Public'}
                        onPress={organization.isOwner ? handleChangeTypePress : undefined}
                        description="Set by creator"
                    />
                </ZListItemGroup>

                <ZListItemGroup header="Shortname" marginTop={0}>
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
