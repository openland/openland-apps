import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
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
    const [isOpen] = React.useState(true);
    const [welcomeMessageIsOn, setWelcomeMessageIsOn] = React.useState(props.welcomeMessageIsOn);
    const [welcomeMessageText, setWelcomeMessageText] = React.useState(props.welcomeMessageText);
    const [welcomeMessageSender, setWelcomeMessageSender] = React.useState(
        props.welcomeMessageSender,
    );
    const [welcomeMessageError, setWelcomeMessageError] = React.useState(false);

    const handleSwitchWelcomeMsg = () => {
        setWelcomeMessageIsOn(!welcomeMessageIsOn);
    };

    const welcomeMsgOnChange = (data: string) => {
        setWelcomeMessageText(data === '' ? null : data);
        setWelcomeMessageError(false);
    };

    const welcomMsgSenderOnChange = (data: any) => {
        let sender: Room_room_SharedRoom_welcomeMessage_sender | null = null;
        if (data) {
            sender = {
                id: data.id,
                name: data.label,
                __typename: 'User',
            };
        }

        setWelcomeMessageSender(sender);
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
            <XVertical separator={12}>
                <XView>Welcome message</XView>
                <XView>
                    Send an automatic message in 1:1 chat to every new member who joins this group
                </XView>
                <XCheckbox
                    label={welcomeMessageIsOn ? 'On' : 'Off'}
                    checked={welcomeMessageIsOn}
                    onChange={handleSwitchWelcomeMsg}
                    switcher={true}
                />
                {welcomeMessageIsOn && (
                    <>
                        <XSelect
                            options={selectOptions}
                            value={msgSender}
                            onChange={welcomMsgSenderOnChange}
                        />
                        <XTextArea
                            placeholder="Text message"
                            onChange={welcomeMsgOnChange}
                            value={welcomeMessageText || ''}
                        />
                    </>
                )}
                <XView>Social sharing image</XView>
                <XView>
                    Choose an image to display when sharing invite to this group on social networks
                </XView>
                <XAvatarUpload
                    cropParams="1:1, free"
                    field="input.socialImageRef"
                    placeholder={{
                        add: 'Add social image',
                        change: 'Change social image',
                    }}
                />
            </XVertical>
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
