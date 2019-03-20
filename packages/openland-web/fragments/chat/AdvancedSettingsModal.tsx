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
    RoomUpdate,
    RoomUpdateVariables,
    Room_room_SharedRoom_members_user,
    Room_room_SharedRoom_welcomeMessage,
    UpdateWelcomeMessage,
    UpdateWelcomeMessageVariables,
} from 'openland-api/Types';
import { MutationFn } from 'react-apollo';

interface AdvancedSettingsInnerProps {
    socialImage: string | null;
    roomId: string;
    canChangeAdvancedSettingsMembersUsers: Room_room_SharedRoom_members_user[];
    welcomeMessage: Room_room_SharedRoom_welcomeMessage;
    alter: MutationFn<RoomUpdate, Partial<RoomUpdateVariables>>;
    updateWelcomeMessage: MutationFn<UpdateWelcomeMessage, Partial<UpdateWelcomeMessageVariables>>;
}

interface AdvancedSettingsInnerState {
    showWelcomMessage: boolean;
    welcomMessage: string;
}

class AdvancedSettingsInner extends React.Component<AdvancedSettingsInnerProps> {
    render() {
        const { props } = this;
        const selectOptions = props.canChangeAdvancedSettingsMembersUsers.map(
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
                            welcomeMessageIsOn: data.input.welcomeMessageIsOn === 'true',
                            welcomeMessageSender: data.input.welcomeMessageSender,
                            welcomeMessageText: data.input.welcomeMessageText,
                        },
                    });
                }}
                defaultData={{
                    input: {
                        welcomeMessageIsOn: props.welcomeMessage.isOn ? 'true' : 'false',
                        welcomeMessageText: props.welcomeMessage.message,
                        welcomeMessageSender: props.welcomeMessage.sender
                            ? props.welcomeMessage.sender.user.id
                            : null,
                        socialImageRef: props.socialImage ? { uuid: props.socialImage } : undefined,
                    },
                }}
            >
                <XVertical separator={12}>
                    <XView>Welcome message</XView>
                    <XView>
                        Send an automatic message in 1:1 chat to every new member who joins this
                        group
                    </XView>
                    <XCheckbox label="On" field="input.welcomeMessageIsOn" switcher={true} />
                    <XView>
                        Choose an image to display when sharing invite to this group on social
                        networks
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
    }
}

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
            welcomeMessage={typedProps.welcomeMessage}
            socialImage={typedProps.socialImage}
            updateWelcomeMessage={(typedProps as any).updateWelcomeMessage}
        />
    );
}) as any) as React.ComponentType<AdvancedSettingsModalT>;
