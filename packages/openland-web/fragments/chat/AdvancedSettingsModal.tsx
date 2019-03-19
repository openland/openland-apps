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
import { Room_room_SharedRoom_members } from 'openland-api/Types';

type AdvancedSettingsModalT = {
    socialImage: string | null;
    roomId: string;
    canChangeAdvancedSettingsMembers: Room_room_SharedRoom_members[];
};

export const AdvancedSettingsModal = withAlterChat(props => {
    const typedProps = props as typeof props & AdvancedSettingsModalT;
    let editSocialImageRef = typedProps.socialImage;

    // console.log(typedProps.canChangeAdvancedSettingsMembers);

    const selectOptions = typedProps.canChangeAdvancedSettingsMembers.map(
        (member: Room_room_SharedRoom_members) => {
            return { value: member.user.id, label: member.user.name };
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
                <XCheckbox label="On" switcher={true} checked={true} />

                <XView>
                    Choose an image to display when sharing invite to this group on social networks
                </XView>
                <XSelect field="select3" options={selectOptions} />
                <XInput size="large" title={'title'} />
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
