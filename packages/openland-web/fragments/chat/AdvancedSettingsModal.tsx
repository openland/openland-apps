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
import { XInput } from 'openland-x/XInput';
import {
    Room_room_SharedRoom_members_user,
    Room_room_SharedRoom_welcomeMessage,
} from 'openland-api/Types';

type AdvancedSettingsModalT = {
    socialImage: string | null;
    roomId: string;
    canChangeAdvancedSettingsMembersUsers: Room_room_SharedRoom_members_user[];
    welcomeMessage: Room_room_SharedRoom_welcomeMessage;
};

export const AdvancedSettingsModal = withUpdateWelcomeMessage(withAlterChat(props => {
    const typedProps = props as typeof props & AdvancedSettingsModalT;
    const alter = typedProps.alter;
    const updateWelcomeMessage = (typedProps as any).updateWelcomeMessage;

    let editSocialImageRef = typedProps.socialImage;

    const selectOptions = typedProps.canChangeAdvancedSettingsMembersUsers.map(
        (user: Room_room_SharedRoom_members_user) => {
            return { value: user.id, label: user.name };
        },
    );

    return (
        <XModalForm
            scrollableContent={true}
            targetQuery="advancedSettings"
            useTopCloser={true}
            title="Advanced settings"
            defaultAction={async data => {
                let newSocialImage = data.input.socialImageRef;

                await alter({
                    variables: {
                        roomId: typedProps.roomId,
                        input: {
                            ...(newSocialImage && newSocialImage.uuid !== editSocialImageRef
                                ? {
                                      socialImageRef: sanitizeImageRef(newSocialImage),
                                  }
                                : {}),
                        },
                    },
                });

                await updateWelcomeMessage({
                    variables: {
                        roomId: typedProps.roomId,
                        welcomeMessageIsOn: data.input.welcomeMessageIsOn === 'true',
                        welcomeMessageSender: data.input.welcomeMessageSender,
                        welcomeMessageText: data.input.welcomeMessageText,
                    },
                });
            }}
            defaultData={{
                input: {
                    welcomeMessageIsOn: typedProps.welcomeMessage.isOn ? 'true' : 'false',
                    welcomeMessageText: typedProps.welcomeMessage.message,
                    welcomeMessageSender: typedProps.welcomeMessage.sender
                        ? typedProps.welcomeMessage.sender.user.id
                        : null,
                    socialImageRef: typedProps.socialImage
                        ? { uuid: typedProps.socialImage }
                        : undefined,
                },
            }}
        >
            <XVertical separator={12}>
                <XView>Welcome message</XView>
                <XView>
                    Send an automatic message in 1:1 chat to every new member who joins this group
                </XView>
                <XCheckbox label="On" field="input.welcomeMessageIsOn" switcher={true} />
                <XView>
                    Choose an image to display when sharing invite to this group on social networks
                </XView>
                <XSelect options={selectOptions} field="input.welcomeMessageSender" />
                <XInput size="large" field="input.welcomeMessageText" />
                <XView>Social sharing image</XView>
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
}) as any) as React.ComponentType<AdvancedSettingsModalT>;
