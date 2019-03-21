import * as React from 'react';
import { withAlterChat } from 'openland-web/api/withAlterChat';
import { withUpdateWelcomeMessage } from 'openland-web/api/withUpdateWelcomeMessage';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XView } from 'react-mental';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XSelect } from 'openland-x/XSelect';
import { XTextArea } from 'openland-x/XTextArea';
import {
    RoomUpdate,
    RoomUpdateVariables,
    Room_room_SharedRoom_members_user,
    Room_room_SharedRoom_welcomeMessage,
    UpdateWelcomeMessage,
    UpdateWelcomeMessageVariables,
    Room_room_SharedRoom_welcomeMessage_sender,
} from 'openland-api/Types';
import { MutationFn } from 'react-apollo';

interface AdvancedSettingsInnerProps {
    socialImage: string | null;
    roomId: string;
    canChangeAdvancedSettingsMembersUsers: Room_room_SharedRoom_members_user[];
    welcomeMessageIsOn: boolean;
    welcomeMessageText: string | null;
    welcomeMessageSender: Room_room_SharedRoom_welcomeMessage_sender | null;
    alter: MutationFn<RoomUpdate, Partial<RoomUpdateVariables>>;
    updateWelcomeMessage: MutationFn<UpdateWelcomeMessage, Partial<UpdateWelcomeMessageVariables>>;
}

const AdvancedSettingsInner = (props: AdvancedSettingsInnerProps) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [welcomeMessageIsOn, setWelcomeMessageIsOn] = React.useState(props.welcomeMessageIsOn);
    const [welcomeMessageText, setWelcomeMessageText] = React.useState(props.welcomeMessageText);
    const [welcomeMessageSender, setWelcomeMessageSender] = React.useState(
        props.welcomeMessageSender,
    );
    const [triedToSend, setTriedToSend] = React.useState(false);
    const [welcomeMessageSenderError, setWelcomeMessageSenderError] = React.useState(true);
    const [welcomeMessageTextError, setWelcomeMessageTextError] = React.useState(true);

    const finalWelcomeMessageSenderError = triedToSend && welcomeMessageSenderError;
    const finalWelcomeMessageTextError = triedToSend && welcomeMessageTextError;

    const welcomeMsgSenderOnChange = (data: any) => {
        let sender: Room_room_SharedRoom_welcomeMessage_sender | null = null;
        if (data) {
            sender = {
                id: data.id,
                name: data.label,
                __typename: 'User',
            };
        }

        setWelcomeMessageSenderError(!data);
        setWelcomeMessageSender(sender);
    };

    const welcomeMsgOnChange = (data: string) => {
        setWelcomeMessageText(data === '' ? null : data);
        setWelcomeMessageTextError(!data);
    };

    let msgSender: any = welcomeMessageSender;

    if (welcomeMessageSender) {
        msgSender = {
            value: welcomeMessageSender.id,
            label: welcomeMessageSender.name,
        };
    }

    const selectOptions = props.canChangeAdvancedSettingsMembersUsers.map(
        (user: Room_room_SharedRoom_members_user) => {
            return { value: user.id, label: user.name };
        },
    );

    return (
        <XModalForm
            isOpen={isOpen}
            scrollableContent={true}
            alsoUseBottomCloser={true}
            targetQuery="advancedSettings"
            useTopCloser={true}
            autoClose={false}
            title="Advanced settings"
            defaultAction={async data => {
                if (welcomeMessageSenderError || welcomeMessageTextError) {
                    setTriedToSend(true);
                    return;
                }
                const newSocialImage = data.input.socialImageRef;

                await props.alter({
                    variables: {
                        roomId: props.roomId,
                        input: {
                            ...(newSocialImage && newSocialImage.uuid !== props.socialImage
                                ? {
                                      socialImageRef: sanitizeImageRef(newSocialImage),
                                  }
                                : {}),
                        },
                    },
                });

                await props.updateWelcomeMessage({
                    variables: {
                        roomId: props.roomId,
                        welcomeMessageIsOn: welcomeMessageIsOn,
                        welcomeMessageSender: welcomeMessageSender
                            ? welcomeMessageSender!!.id
                            : null,
                        welcomeMessageText: welcomeMessageText,
                    },
                });

                setIsOpen(false);
            }}
            defaultData={{
                input: {
                    welcomeMessageIsOn: welcomeMessageIsOn ? 'true' : 'false',
                    welcomeMessageText: welcomeMessageText,
                    welcomeMessageSender: welcomeMessageSender,
                    socialImageRef: props.socialImage ? { uuid: props.socialImage } : undefined,
                },
            }}
        >
            <XView>
                <XView fontSize={16} fontWeight="600">
                    Welcome message
                </XView>
                <XView marginTop={4}>
                    Send an automatic message in 1:1 chat to every new member who joins this group
                </XView>
                <XView marginTop={17}>
                    <XCheckbox
                        label={welcomeMessageIsOn ? 'On' : 'Off'}
                        checked={welcomeMessageIsOn}
                        onChange={() => setWelcomeMessageIsOn(!welcomeMessageIsOn)}
                        switcher={true}
                    />
                </XView>
                {welcomeMessageIsOn && (
                    <>
                        <XView marginTop={25}>
                            <XSelect
                                options={selectOptions}
                                value={msgSender}
                                onChange={welcomeMsgSenderOnChange}
                                invalid={finalWelcomeMessageSenderError}
                            />
                            {finalWelcomeMessageSenderError && (
                                <XView color="#d75454" paddingLeft={17} marginTop={8}>
                                    Please choose who will send the Welcome message
                                </XView>
                            )}
                        </XView>
                        <XView marginTop={16}>
                            <XTextArea
                                invalid={finalWelcomeMessageTextError}
                                placeholder="Text message"
                                onChange={welcomeMsgOnChange}
                                value={welcomeMessageText || ''}
                            />
                            {finalWelcomeMessageTextError && (
                                <XView color="#d75454" paddingLeft={17} marginTop={8}>
                                    Please enter the Welcome message text
                                </XView>
                            )}
                        </XView>
                    </>
                )}
                <XView marginTop={24} fontSize={16} fontWeight="600">
                    Social sharing image
                </XView>
                <XView marginTop={4} fontSize={14}>
                    Choose an image to display when sharing invite to this group on social networks
                </XView>
                <XView marginTop={16}>
                    <XAvatarUpload
                        cropParams="1:1, free"
                        field="input.socialImageRef"
                        placeholder={{
                            add: 'Add social image',
                            change: 'Change social image',
                        }}
                    />
                </XView>
            </XView>
        </XModalForm>
    );
};

type AdvancedSettingsModalT = {
    socialImage: string | null;
    roomId: string;
    canChangeAdvancedSettingsMembersUsers: Room_room_SharedRoom_members_user[];
    welcomeMessage: Room_room_SharedRoom_welcomeMessage;
};

export const AdvancedSettingsModal = withUpdateWelcomeMessage(withAlterChat(props => {
    const typedProps = props as typeof props & AdvancedSettingsModalT;

    return (
        <AdvancedSettingsInner
            alter={typedProps.alter}
            roomId={typedProps.roomId}
            canChangeAdvancedSettingsMembersUsers={typedProps.canChangeAdvancedSettingsMembersUsers}
            welcomeMessageText={typedProps.welcomeMessage.message}
            welcomeMessageIsOn={typedProps.welcomeMessage.isOn}
            welcomeMessageSender={typedProps.welcomeMessage.sender}
            socialImage={typedProps.socialImage}
            updateWelcomeMessage={(typedProps as any).updateWelcomeMessage}
        />
    );
}) as any) as React.ComponentType<AdvancedSettingsModalT>;
