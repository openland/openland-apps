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
import { ZAvatarPickerInputsGroup } from 'openland-mobile/components/ZAvatarPickerInputsGroup';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { Alert } from 'openland-mobile/components/AlertBlanket';

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
        }, false, Platform.OS === 'android' ? require('assets/ic-secret-24.png') : undefined);

        builder.action('Public', async () => {
            await changeType(false);
        }, false, Platform.OS === 'android' ? require('assets/ic-community-24.png') : undefined);

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
                <ZAvatarPickerInputsGroup avatarField="input.photoRef">
                    <ZTextInput
                        placeholder="Community name"
                        field="input.name"
                    />
                </ZAvatarPickerInputsGroup>
                <View height={20} />
                <ZListItemGroup divider={false} footer="Publicly describe this community for all to see">
                    <ZTextInput
                        field="input.about"
                        placeholder="Add a short description"
                        multiline={true}
                    />
                </ZListItemGroup>
                <View height={15} />
                <ZListItemGroup footer="Set by creator">
                    <ZListItem
                        text="Community type"
                        description={organization.isPrivate ? 'Private' : 'Public'}
                        onPress={organization.isOwner ? handleChangeTypePress : undefined}
                        navigationIcon={organization.isOwner ? true : undefined}
                    />
                </ZListItemGroup>
                <View height={15} />
                <ZListItemGroup footer="People will be able to find your community by this shortname">
                    <ZListItem
                        text="Shortname"
                        description={organization.shortname ? '@' + organization.shortname : 'Create'}
                        path="SetOrgShortname"
                        pathParams={{ id: organization.id }}
                    />
                </ZListItemGroup>
            </ZForm>
        </>
    )
});

export const EditCommunity = withApp(EditCommunityComponent, { navigationAppearance: 'small' });
