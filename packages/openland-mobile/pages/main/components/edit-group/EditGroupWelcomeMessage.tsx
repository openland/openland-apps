import * as React from 'react';
import { View } from 'react-native';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { Modals } from '../../modals/Modals';
import { EditPageHeader } from '../EditPageHeader';

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
                <EditPageHeader
                    icon={require('assets/ic-message-glyph-48.png')}
                    tint={theme.tintCyan}
                    title="Welcome message"
                    description="Send automatic tet-a-tet message to every new member of the group"
                />
                <ZListGroup header={null}>
                    <ZListItem
                        text="Allow welcome message"
                        toggle={welcomeMessageEnabled}
                        onToggle={(value) => setWelcomeMessageEnabled(value)}
                    />
                    {welcomeMessageEnabled && (
                        <View style={{ paddingHorizontal: 16, marginTop: 16, flexGrow: 1 }}>
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
