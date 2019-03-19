import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { withAlterChat } from 'openland-web/api/withAlterChat';
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

export const AdvancedSettingsModal = withAlterChat(props => {
    const typedProps = props as typeof props & AdvancedSettingsModalT;

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
            defaultAction={data => {
                let newSocialImage = data.input.socialImageRef;

                props.alter({
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
            }}
            defaultData={{
                input: {
                    isWelcomeMessageOn: typedProps.welcomeMessage.isOn ? 'true' : 'false',
                    welcomeMessageText: typedProps.welcomeMessage.message,
                    welcomeMessageSenderId: typedProps.welcomeMessage.sender
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
                <XCheckbox label="On" field="input.isWelcomeMessageOn" switcher={true} />
                <XView>
                    Choose an image to display when sharing invite to this group on social networks
                </XView>
                <XSelect options={selectOptions} field="input.welcomeMessageSenderId" />
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
}) as React.ComponentType<AdvancedSettingsModalT>;
