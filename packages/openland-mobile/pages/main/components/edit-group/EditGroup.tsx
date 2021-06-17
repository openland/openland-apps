import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { PageProps } from '../../../../components/PageProps';
import { withApp } from '../../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { SharedRoomKind, RoomCallsMode } from 'openland-api/spacex.types';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SUPER_ADMIN } from '../../../Init';
import { useText } from 'openland-mobile/text/useText';

const SecretLabel = React.memo((props: { isChannel: boolean }) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
                <Image
                    source={require('assets/ic-lock-16.png')}
                    style={{ tintColor: theme.foregroundTertiary }}
                />
            </View>
            <Text
                allowFontScaling={false}
                style={{ ...TextStyles.Label2, color: theme.foregroundTertiary }}
            >
                {t('secretLabel', { entity: props.isChannel ? '$t(channel)' : '$t(channel)', defaultValue: 'It’s a secret {{entity}}' })}
            </Text>
        </View>
    );
});

const EditGroupComponent = React.memo((props: PageProps) => {
    const router = React.useContext(SRouterContext)!;
    const client = getClient();
    const { t } = useText();
    const group = client.useRoomChat(
        { id: props.router.params.id },
        { fetchPolicy: 'network-only' },
    ).room;

    if (!group || group.__typename !== 'SharedRoom') {
        return null;
    }

    const isShared = group.kind === SharedRoomKind.PUBLIC;
    const form = useForm();

    const titleField = useField('title', group.title, form);
    const descriptionField = useField('description', group.description || '', form);

    const currentPhoto = group.photo.startsWith('ph://') ? undefined : group.photo;
    const defaultPhotoValue = group.photo.startsWith('ph://') ? null : { uuid: group.photo };
    const photoField = useField('photoRef', defaultPhotoValue, form);
    const serviceMessageLabel =
        group.serviceMessageSettings.joinsMessageEnabled &&
            group.serviceMessageSettings.leavesMessageEnabled
            ? t('on', 'On')
            : group.serviceMessageSettings.joinsMessageEnabled ||
                group.serviceMessageSettings.leavesMessageEnabled
                ? t('custom', 'Custom')
                : t('off', 'Off');
    const callSettingsLabels: { [mode in RoomCallsMode]: string } = {
        [RoomCallsMode.STANDARD]: t('standard', 'Standard'),
        [RoomCallsMode.LINK]: t('custom', 'Custom'),
        [RoomCallsMode.DISABLED]: t('off', 'Off'),
    };
    const callSettingsLabel = callSettingsLabels[group.callSettings.mode];

    const handleSave = () =>
        form.doAction(async () => {
            try {
                const variables = {
                    roomId: props.router.params.id,
                    input: {
                        title: titleField.value,
                        description: descriptionField.value,
                        ...(photoField.value &&
                            photoField.value.uuid !== currentPhoto && {
                            photoRef: photoField.value,
                        }),
                    },
                };

                await client.mutateRoomUpdate(variables);
                await client.refetchRoomChat({ id: props.router.params.id });

                props.router.back();
            } catch (e) {
                console.warn('error', e);
                props.router.back();
            }
        });

    return (
        <>
            <SHeader title={group.isChannel ? t('editChannel', `Edit channel`) : t('editGroup', `Edit group`)} />
            <SHeaderButton title={t('save', 'Save')} onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <View style={{ paddingBottom: 32 }}>
                    <ZListGroup header={null} alignItems="center">
                        <ZAvatarPicker id={props.router.params.id} size="xx-large" field={photoField} />
                    </ZListGroup>
                    <ZListGroup header={t('info', 'Info')} headerMarginTop={0}>
                        <ZInput placeholder={t('name', 'Name')} field={titleField} />
                        <ZInput field={descriptionField} placeholder={t('description', 'Description')} multiline={true} />
                        {!isShared && <SecretLabel isChannel={group.isChannel} />}
                    </ZListGroup>
                    <ZListGroup header={t('settings', 'Settings')} headerMarginTop={0}>
                        {isShared && (
                            <ZListItem
                                leftIcon={require('assets/ic-at-24.png')}
                                text={t('shortname', 'Shortname')}
                                small={true}
                                description={group.shortname ? group.shortname : t('none', 'None')}
                                onPress={() =>
                                    router.push('SetShortname', { id: group.id, isGroup: true })
                                }
                            />
                        )}
                        {SUPER_ADMIN && (
                            <ZListItem
                                leftIcon={require('assets/ic-wallet-24.png')}
                                text={t('payments', 'Payments')}
                                small={true}
                                onPress={() => router.push('EditGroupPrice', { id: group.id })}
                                description={
                                    group.premiumSettings
                                        ? formatMoneyInterval(
                                            group.premiumSettings.price,
                                            group.premiumSettings.interval,
                                        )
                                        : t('free', 'Free')
                                }
                            />
                        )}
                        <ZListItem
                            leftIcon={require('assets/ic-gallery-24.png')}
                            text={t('socialSharingImage', 'Social sharing image')}
                            small={true}
                            description={!!group.socialImage ? t('on', 'On') : t('none', 'None')}
                            onPress={() => router.push('EditGroupSocialImage', { id: group.id })}
                        />
                        {group.welcomeMessage && (
                            <ZListItem
                                leftIcon={require('assets/ic-message-24.png')}
                                text={t('welcomeMessage', 'Welcome message')}
                                small={true}
                                description={group.welcomeMessage.isOn ? t('on', 'On') : t('off', 'Off')}
                                onPress={() => router.push('EditGroupWelcomeMessage', { id: group.id })}
                            />
                        )}
                        {!group.isChannel && (
                            <>
                                <ZListItem
                                    leftIcon={require('assets/ic-megaphone-24.png')}
                                    text={t('serviceMessages', 'Service messages')}
                                    small={true}
                                    description={serviceMessageLabel}
                                    onPress={() =>
                                        router.push('EditGroupServiceMessages', { id: group.id })
                                    }
                                />
                                <ZListItem
                                    leftIcon={require('assets/ic-call-24.png')}
                                    text={t('groupCalls', 'Group calls')}
                                    small={true}
                                    description={callSettingsLabel}
                                    onPress={() => router.push('EditGroupCalls', { id: group.id })}
                                />
                            </>
                        )}
                        {SUPER_ADMIN && (
                            <ZListItem
                                leftIcon={require('assets/ic-lock-24.png')}
                                text={t('superadminSettings', 'Superadmin settings')}
                                small={true}
                                description={t('custom', 'Custom')}
                                onPress={() =>
                                    props.router.push('EditGroupSuperadmin', { id: group.id })
                                }
                            />
                        )}
                    </ZListGroup>
                </View>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroup = withApp(EditGroupComponent, { navigationAppearance: 'small' });
