import * as React from 'react';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XView } from 'react-mental';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XSelect } from 'openland-x/XSelect';
import { XTextArea } from 'openland-x/XTextArea';
import {
    Room_room_SharedRoom_members_user,
    Room_room_SharedRoom_welcomeMessage_sender,
} from 'openland-api/Types';
import { useClient } from 'openland-web/utils/useClient';

interface AdvancedSettingsInnerProps {
    socialImage: string | null;
    roomId: string;
    canChangeAdvancedSettingsMembersUsers: Room_room_SharedRoom_members_user[];
    welcomeMessageIsOn: boolean;
    welcomeMessageText: string | null;
    welcomeMessageSender: Room_room_SharedRoom_welcomeMessage_sender | null;
}

export const AdvancedSettingsModal = (props: AdvancedSettingsInnerProps) => {
    const api = useClient();
    const [isOpen, setIsOpen] = React.useState(true);
    const [welcomeMessageIsOn, setWelcomeMessageIsOn] = React.useState(props.welcomeMessageIsOn);
    const [welcomeMessageText, setWelcomeMessageText] = React.useState(props.welcomeMessageText);
    const [welcomeMessageSender, setWelcomeMessageSender] = React.useState(
        props.welcomeMessageSender,
    );
    const [triedToSend, setTriedToSend] = React.useState(false);
    const [welcomeMessageSenderError, setWelcomeMessageSenderError] = React.useState(
        !welcomeMessageSender,
    );
    const [welcomeMessageTextError, setWelcomeMessageTextError] = React.useState(
        !welcomeMessageText,
    );

    const finalWelcomeMessageSenderError = triedToSend && welcomeMessageSenderError;
    const finalWelcomeMessageTextError = triedToSend && welcomeMessageTextError;

    const welcomeMsgSenderOnChange = (data: { value: string; label: string }) => {
        let sender: Room_room_SharedRoom_welcomeMessage_sender | null = {
            id: data.value,
            name: data.label,
            __typename: 'User',
        };

        setWelcomeMessageSenderError(false);
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
            autoClose={true}
            title="Advanced settings"
            defaultAction={async data => {
                if (welcomeMessageIsOn && (welcomeMessageSenderError || welcomeMessageTextError)) {
                    setTriedToSend(true);
                    return;
                }
                const newSocialImage = data.input.socialImageRef;

                await api.mutateRoomUpdate({
                    roomId: props.roomId,
                    input: {
                        ...(newSocialImage && newSocialImage.uuid !== props.socialImage
                            ? {
                                socialImageRef: sanitizeImageRef(newSocialImage),
                            }
                            : {}),
                    },
                })

                await api.mutateUpdateWelcomeMessage({
                    roomId: props.roomId,
                    welcomeMessageIsOn: welcomeMessageIsOn,
                    welcomeMessageSender: welcomeMessageSender
                        ? welcomeMessageSender!!.id
                        : null,
                    welcomeMessageText: welcomeMessageText,
                });

                setTriedToSend(true);
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
