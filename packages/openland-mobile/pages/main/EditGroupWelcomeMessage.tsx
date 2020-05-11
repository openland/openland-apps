import * as React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { Modals } from './modals/Modals';

const EditGroupWelcomeMessageComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const roomId = props.router.params.id;
    const client = getClient();
    const group = client.useRoomChat({ id: roomId }, { fetchPolicy: 'network-only' }).room;

    const roomAdmins = client.useRoomAdminMembers({ roomId: roomId }).roomAdmins;

    if (!group || group.__typename !== 'SharedRoom') {
        return null;
    }

    const [welcomeMessageEnabled, setWelcomeMessageEnabled] = React.useState(
        group && group.welcomeMessage ? group.welcomeMessage.isOn : false,
    );
    const [welcomeMessageSender, setWelcomeMessageSender] = React.useState(
        group && group.welcomeMessage ? group.welcomeMessage.sender : undefined,
    );

    const form = useForm();

    const welcomeMessageText =
        group.welcomeMessage && group.welcomeMessage.message ? group.welcomeMessage.message : '';

    const welcomeMessageField = useField('welcomeMessageText', welcomeMessageText, form);

    const handleSave = () =>
        form.doAction(async () => {
            try {
                await client.mutateUpdateWelcomeMessage({
                    roomId,
                    welcomeMessageIsOn: welcomeMessageEnabled,
                    welcomeMessageSender: welcomeMessageSender
                        ? welcomeMessageSender.id
                        : undefined,
                    welcomeMessageText: welcomeMessageField.value,
                });
                await client.refetchRoomChat({ id: props.router.params.id });

                props.router.back();
            } catch (e) {
                console.warn('error', e);
                props.router.back();
            }
        });

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]}>
                    <View
                        alignItems="center"
                        justifyContent="center"
                        paddingTop={16}
                        paddingBottom={32}
                    >
                        <View
                            width={80}
                            height={80}
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={80}
                            backgroundColor={theme.tintCyan}
                        >
                            <Image
                                source={require('assets/ic-message-glyph-48.png')}
                                style={{
                                    width: 48,
                                    height: 48,
                                    tintColor: theme.foregroundContrast,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                ...TextStyles.Title2,
                                color: theme.foregroundPrimary,
                                textAlign: 'center',
                                marginTop: 16,
                            }}
                            allowFontScaling={false}
                        >
                            Welcome message
                        </Text>
                        <Text
                            style={{
                                ...TextStyles.Body,
                                color: theme.foregroundTertiary,
                                textAlign: 'center',
                                maxWidth: 300,
                                marginTop: 4,
                            }}
                            allowFontScaling={false}
                        >
                            Send automatic tet-a-tet message to every new member of the group
                        </Text>
                    </View>
                </LinearGradient>
                <ZListGroup header={null}>
                    <ZListItem
                        text="Allow welcome message"
                        textStyle={{ ...TextStyles.Title2 }}
                        toggle={welcomeMessageEnabled}
                        onToggle={(value) => setWelcomeMessageEnabled(value)}
                    />
                    {welcomeMessageEnabled && (
                        <View style={{ paddingHorizontal: 16, marginTop: 24, flexGrow: 1 }}>
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
                                        roomAdmins.map((u) => u.user),
                                        'Choose sender',
                                        welcomeMessageSender ? welcomeMessageSender.id : undefined,
                                    );
                                }}
                            />
                            <View style={{ marginTop: 16 }}>
                                <ZInput
                                    noWrapper={true}
                                    multiline={true}
                                    placeholder="Message"
                                    field={welcomeMessageField}
                                />
                            </View>
                        </View>
                    )}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroupWelcomeMessage = withApp(EditGroupWelcomeMessageComponent, {
    navigationAppearance: 'small',
});
