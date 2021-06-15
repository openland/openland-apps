import * as React from 'react';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZSelect } from 'openland-mobile/components/ZSelect';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import Toast from 'openland-mobile/components/Toast';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { withApp } from 'openland-mobile/components/withApp';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useText } from 'openland-mobile/text/useText';

const Loader = Toast.loader();

const EditCommunityComponent = React.memo((props: PageProps) => {
    const organizationId = props.router.params.id;
    const client = getClient();
    const { t } = useText();
    const organization = getClient().useOrganization({ organizationId }, { fetchPolicy: 'network-only' }).organization;
    const profile = getClient().useOrganizationProfile({ organizationId }, { fetchPolicy: 'network-only' }).organizationProfile;

    const form = useForm();
    const nameField = useField('name', profile.name || '', form);
    const photoField = useField('photoRef', profile.photoRef, form);
    const aboutField = useField('about', profile.about || '', form);
    const canInviteField = useField('betaMembersCanInvite', profile.membersCanInvite, form);

    const changeType = React.useCallback(async (isPrivate: boolean) => {
        Loader.show();

        try {
            await client.mutateUpdateOrganization({ organizationId: organization.id, input: { alphaIsPrivate: isPrivate } });
            await client.refetchOrganizationProfile({ organizationId: props.router.params.id });
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
                        betaMembersCanInvite: canInviteField.value,
                    }
                });
                await client.refetchOrganization({ organizationId });
                await client.refetchOrganizationProfile({ organizationId });
            } catch (e) {
                console.warn(e);
            }

            props.router.back();
        });

    return (
        <>
            <SHeader title={t('editCommunity', 'Edit community')} />
            <SHeaderButton title={t('save', 'Save')} onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker id={organizationId} size="xx-large" field={photoField} />
                </ZListGroup>

                <ZListGroup header={t('info', 'Info')} headerMarginTop={0}>
                    <ZInput
                        placeholder={t('name', 'Name')}
                        field={nameField}
                    />
                    <ZInput
                        field={aboutField}
                        placeholder={t('description', 'Description')}
                        multiline={true}
                        description={t('communityDescription', 'Publicly describe this community for all to see')}
                    />
                    <ZSelect
                        label={t('type', 'Type')}
                        defaultValue={profile.private}
                        disabled={!organization.isOwner}
                        onChange={async (option: { label: string; value: boolean }) => {
                            await changeType(option.value);
                        }}
                        options={[
                            { label: t('private', 'Private'), value: true, icon: require('assets/ic-lock-24.png') },
                            { label: t('public', 'Public'), value: false, icon: require('assets/ic-invite-24.png') }
                        ]}
                        description={t('communityTypeDescription', 'Set by creator')}
                    />
                </ZListGroup>

                <ZListGroup header={t('settings', 'Settings')} headerMarginTop={0}>
                    <ZListItem
                        leftIcon={require('assets/ic-at-24.png')}
                        text={t('shortname', 'Shortname')}
                        small={true}
                        description={profile.shortname ? profile.shortname : t('none', 'None')}
                        path="SetShortname"
                        pathParams={{ id: organization.id, isGroup: false }}
                    />
                    {organization.private && (
                        <ZListItem
                            leftIcon={require('assets/ic-user-add-24.png')}
                            text={t('communityPrivateDescription', 'Members can invite people')}
                            toggle={canInviteField.value}
                            onToggle={canInviteField.input.onChange}
                            small={true}
                        />
                    )}
                    <ZListItem
                        leftIcon={require('assets/ic-group-24.png')}
                        text={t('defaultGroups', 'Default groups')}
                        small={true}
                        description={profile.autosubscribeRooms.length
                            ? `${profile.autosubscribeRooms.length} ${t('group', { count: profile.autosubscribeRooms.length, defaultValue: 'group' })}`
                            : t('none', 'None')}
                        path="EditCommunityDefaultGroups"
                        pathParams={{ id: organization.id }}
                    />
                    {organization.private && (
                        <ZListItem
                            leftIcon={require('assets/ic-link-24.png')}
                            text={t('applyLink', 'Apply link')}
                            small={true}
                            description={profile.applyLinkEnabled ? t('on', 'On') : t('off', 'Off')}
                            path="EditCommunityApplyLink"
                            pathParams={{ id: organization.id }}
                        />
                    )}
                    {/* <ZListItem
                        leftIcon={require('assets/ic-gallery-24.png')}
                        text="Social sharing image"
                        small={true}
                        description={!!profile.socialImage ? 'On' : 'None'}
                        path="EditCommunitySocialImage"
                        pathParams={{ id: organization.id }}
                    /> */}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditCommunity = withApp(EditCommunityComponent, { navigationAppearance: 'small' });