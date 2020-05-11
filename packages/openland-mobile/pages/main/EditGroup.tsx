import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
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
import { SharedRoomKind } from 'openland-api/spacex.types';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { formatMoneyInterval } from 'openland-y-utils/wallet/Money';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SUPER_ADMIN } from '../Init';

const SecretLabel = React.memo(() => {
    const theme = React.useContext(ThemeContext);
    return (
        <View flexDirection="row" alignItems="center" marginLeft={16} marginBottom={16}>
            <View flexDirection="row" alignItems="center" marginRight={8}>
                <Image
                    source={require('assets/ic-lock-16.png')}
                    style={{ tintColor: theme.foregroundTertiary }}
                />
            </View>
            <Text
                allowFontScaling={false}
                style={{ ...TextStyles.Label2, color: theme.foregroundTertiary }}
            >
                It’s a secret group
            </Text>
        </View>
    );
});

const EditGroupComponent = React.memo((props: PageProps) => {
    const router = React.useContext(SRouterContext)!;
    const client = getClient();
    const group = client.useRoomChat(
        { id: props.router.params.id },
        { fetchPolicy: 'network-only' },
    ).room;

    if (!group || group.__typename !== 'SharedRoom') {
        return null;
    }

    const typeString = group.isChannel ? 'channel' : 'group';
    const isShared = group.kind === SharedRoomKind.PUBLIC;
    const form = useForm();

    const titleField = useField('title', group.title, form);
    const descriptionField = useField('description', group.description || '', form);

    const currentPhoto = group.photo.startsWith('ph://') ? undefined : group.photo;
    const defaultPhotoValue = group.photo.startsWith('ph://') ? null : { uuid: group.photo };
    const photoField = useField('photoRef', defaultPhotoValue, form);

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
            <SHeader title={`Manage ${typeString}`} />
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field={photoField} />
                </ZListGroup>
                <ZListGroup header="Info" headerMarginTop={0}>
                    <ZInput placeholder="Name" field={titleField} />
                    <ZInput field={descriptionField} placeholder="Description" multiline={true} />
                    {!isShared && <SecretLabel />}
                </ZListGroup>
                <ZListGroup header="Advanced" headerMarginTop={0}>
                    {isShared && (
                        <ZListItem
                            leftIcon={require('assets/ic-at-24.png')}
                            text="Shortname"
                            small={true}
                            description={group.shortname ? group.shortname : 'None'}
                            onPress={() =>
                                router.push('SetShortname', { id: group.id, isGroup: true })
                            }
                        />
                    )}
                    {SUPER_ADMIN && (
                        <ZListItem
                            leftIcon={require('assets/ic-wallet-24.png')}
                            text="Payments"
                            small={true}
                            onPress={() => router.push('EditGroupPrice', { id: group.id })}
                            description={
                                group.premiumSettings
                                    ? formatMoneyInterval(
                                          group.premiumSettings.price,
                                          group.premiumSettings.interval,
                                      )
                                    : 'Free'
                            }
                        />
                    )}
                    <ZListItem
                        leftIcon={require('assets/ic-gallery-24.png')}
                        text="Social sharing image"
                        small={true}
                        description={!!group.socialImage ? 'On' : 'None'}
                        onPress={() => router.push('EditGroupSocialImage', { id: group.id })}
                    />
                    {group.welcomeMessage && (
                        <ZListItem
                            leftIcon={require('assets/ic-message-24.png')}
                            text="Welcome message"
                            small={true}
                            description={group.welcomeMessage.isOn ? 'On' : 'Off'}
                            onPress={() => router.push('EditGroupWelcomeMessage', { id: group.id })}
                        />
                    )}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroup = withApp(EditGroupComponent, { navigationAppearance: 'small' });
