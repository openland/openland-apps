import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { Modals } from './modals/Modals';
import { getWelcomeMessageSenders } from 'openland-y-utils/getWelcomeMessageSenders';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { View, Text } from 'react-native';
import Alert from 'openland-mobile/components/AlertBlanket';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZSocialPickerRender } from 'openland-mobile/components/ZSocialPickerRender';

const EditGroupAdvancedComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const roomId = props.router.params.id;
    const client = getClient();
    const rawGroup = client.useRoom({ id: roomId }, { fetchPolicy: 'network-only' }).room;
    const group = (rawGroup && rawGroup.__typename === 'SharedRoom') ? rawGroup : undefined;

    if (!group) {
        return null;
    }

    const form = useForm();
    const socialImageField = useField('socialImageRef', group.socialImage ? { uuid: group.socialImage } : null, form);

    const welcomeMessageText = group.welcomeMessage && group.welcomeMessage.message ? group.welcomeMessage.message : '';
    const welcomeMessageField = useField('welcomeMessageText', welcomeMessageText, form);

    const roomAdmins = client.useRoomOrganizationAdminMembers({ id: roomId });

    const [welcomeMessageEnabled, setWelcomeMessageEnabled] = React.useState((group && group.welcomeMessage) ? group.welcomeMessage.isOn : false);
    const [matchmakingEnabled, setMatchmakingEnabled] = React.useState(group.matchmaking ? group.matchmaking.enabled : false);
    const [welcomeMessageSender, setWelcomeMessageSender] = React.useState((group && group.welcomeMessage) ? group.welcomeMessage.sender : undefined);

    const handleSave = () => {
        if (welcomeMessageEnabled) {
            if (!welcomeMessageSender) {
                Alert.builder().title('Please choose who will send the Welcome message').button('GOT IT!').show();
                return;
            }

            if (welcomeMessageField.value === '') {
                Alert.builder().title('Please enter the Welcome message text').button('GOT IT!').show();
                return;
            }
        }

        form.doAction(async () => {
            await client.mutateUpdateWelcomeMessage({
                roomId,
                welcomeMessageIsOn: welcomeMessageEnabled,
                welcomeMessageSender: welcomeMessageSender ? welcomeMessageSender.id : undefined,
                welcomeMessageText: welcomeMessageField.value
            });

            await client.mutateRoomUpdate({
                roomId,
                input: {
                    ...(
                        socialImageField.value &&
                        socialImageField.value.uuid !== group.socialImage &&
                        { socialImageRef: socialImageField.value }
                    )
                }
            });
            await client.mutateMatchmakingRoomSave({
                peerId: roomId,
                input: {
                    enabled: matchmakingEnabled,
                },
            });

            await client.refetchRoom({ id: roomId });

            props.router.back();
        });
    };

    return (
        <>
            <SHeader title="Advanced settings" />
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <View style={{ marginTop: 16 }}>
                    <ZListItem text="Welcome message" textStyle={{ ...TextStyles.Title2 }} toggle={welcomeMessageEnabled} onToggle={(value) => setWelcomeMessageEnabled(value)} />
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <Text style={{ ...TextStyles.Body, color: theme.foregroundPrimary }}>Send automatic tet-a-tet message {'\n'}to every new member of the group</Text>
                </View>

                {welcomeMessageEnabled && (
                    <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
                        <ZPickField
                            noWrapper={true}
                            label="Sender"
                            value={welcomeMessageSender ? welcomeMessageSender.name : undefined}
                            onPress={() => {
                                Modals.showUserPicker(
                                    props.router,
                                    async (user) => {
                                        setWelcomeMessageSender(user);

                                        props.router.back();
                                    },
                                    getWelcomeMessageSenders({
                                        chat: group,
                                        admins: (roomAdmins && roomAdmins.room && roomAdmins.room.__typename === 'SharedRoom' && roomAdmins.room.organization && roomAdmins.room.organization.adminMembers || []).map(a => a.user)
                                    }),
                                    'Choose sender',
                                    welcomeMessageSender ? welcomeMessageSender.id : undefined,
                                );
                            }}
                        />
                        <View style={{ marginTop: 16 }}>
                            <ZInput noWrapper={true} multiline={true} placeholder="Message" field={welcomeMessageField} />
                        </View>
                    </View>
                )}
                <View style={{ marginTop: 16 }}>
                    <ZListItem text="Member profiles" textStyle={{ ...TextStyles.Title2 }} toggle={matchmakingEnabled} onToggle={(value) => setMatchmakingEnabled(value)} />
                </View>
                <View style={{ paddingHorizontal: 16, marginTop: 27 }}>
                    <Text style={{ ...TextStyles.Title2, marginBottom: 11, color: theme.foregroundPrimary }}>Social sharing image</Text>
                    <Text style={{ ...TextStyles.Body, marginBottom: 24, color: theme.foregroundPrimary }}>Choose an image to display when sharing invite to the group on social networks</Text>
                    <ZAvatarPicker field={socialImageField} render={ZSocialPickerRender} pickSize={{ width: 1200, height: 630 }} />
                </View>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroupAdvanced = withApp(EditGroupAdvancedComponent, { navigationAppearance: 'small' });
