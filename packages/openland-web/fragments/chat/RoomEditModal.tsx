import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withAlterChat } from 'openland-web/api/withAlterChat';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XInput } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';

export const RoomEditModal = withAlterChat(props => {
    let editPhotoRef = (props as any).photo;
    let editSocialImageRef = (props as any).socialImage;
    return (
        <XModalForm
            scrollableContent={true}
            targetQuery="editChat"
            useTopCloser={true}
            title="Room settings"
            defaultAction={data => {
                let newTitle = data.input.title;
                let newDescription = data.input.description;
                let newPhoto = data.input.photoRef;
                let newSocialImage = data.input.socialImageRef;
                console.warn(newPhoto, newSocialImage);
                props.alter({
                    variables: {
                        roomId: (props as any).roomId,
                        input: {
                            ...{ title: newTitle },
                            ...{ description: newDescription },
                            ...(newPhoto && newPhoto.uuid !== editPhotoRef
                                ? { photoRef: sanitizeImageRef(newPhoto) }
                                : {}),
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
                    title: (props as any).title || '',
                    description: (props as any).description || '',
                    photoRef: { uuid: (props as any).photo },
                    socialImageRef: (props as any).socialImage
                        ? { uuid: (props as any).socialImage }
                        : undefined,
                },
            }}
        >
            <XVertical separator={12}>
                <XHorizontal separator={12}>
                    <XAvatarUpload
                        size="default"
                        field="input.photoRef"
                        placeholder={{
                            add: 'Add photo',
                            change: 'Change Photo',
                        }}
                    />
                    <XVertical flexGrow={1} separator={10} alignSelf="flex-start">
                        <XInput title="Room name" field="input.title" size="large" />
                        <XWithRole role="feature-chat-embedded-attach">
                            <XInput
                                field="input.longDescription"
                                flexGrow={1}
                                title="Attach link"
                                size="large"
                            />
                        </XWithRole>
                    </XVertical>
                </XHorizontal>
                <XTextArea
                    valueStoreKey="fields.input.description"
                    placeholder="Description"
                    resize={false}
                />
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
}) as React.ComponentType<{
    title: string;
    photo: string;
    socialImage: string | null;
    description: string | null;
    roomId: string;
}>;
