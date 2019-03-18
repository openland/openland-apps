import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { withAlterChat } from 'openland-web/api/withAlterChat';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';

type AdvancedSettingsModalT = {
    socialImage: string | null;
    roomId: string;
};

export const AdvancedSettingsModal = withAlterChat(props => {
    const typedProps = props as typeof props & AdvancedSettingsModalT;
    let editSocialImageRef = typedProps.socialImage;
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
