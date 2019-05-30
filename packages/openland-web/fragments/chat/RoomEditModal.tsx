import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XInput } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';
import { useClient } from 'openland-web/utils/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';

type RoomEditModalT = {
    title: string;
    photo: string;
    socialImage: string | null;
    description: string | null;
    roomId: string;
    isChannel: boolean;
};

export const RoomEditModal = (props: RoomEditModalT) => {
    const client = useClient();
    const form = useForm();
    const editPhotoRef = props.photo;
    const editSocialImageRef = props.socialImage;
    const title = props.isChannel ? 'Channel settings' : 'Group settings';
    const inputTitle = props.isChannel ? 'Channel name' : 'Group name';
    const avatarField = useField('input.photoRef', { uuid: props.photo }, form);
    const titleField = useField('input.title', props.title || '', form);
    const longDescriptionField = useField('input.longDescription', '', form);
    const descriptionField = useField('input.description', props.description || '', form);
    const socialImageField = useField(
        'input.socialImageRef',
        props.socialImage ? { uuid: props.socialImage || '', isImage: true, crop: null, width: null,
            height: null, name: null, size: null } : undefined,
        form,
    );

    return (
        <XRouterContext.Consumer>
            {router => {
                const isOpen = !!router!!.query.editChat;
                if (isOpen) {
                    showModalBox({ title }, ctx => (
                        <XVertical separator={12}>
                            <XHorizontal separator={12}>
                                <XAvatarUpload
                                    size="default"
                                    {...avatarField.input}
                                    placeholder={{
                                        add: 'Add photo',
                                        change: 'Change Photo',
                                    }}
                                />
                                <XVertical flexGrow={1} separator={10} alignSelf="flex-start">
                                    <XInput title={inputTitle} {...titleField.input} size="large" />
                                    <XWithRole role="feature-chat-embedded-attach">
                                        <XInput
                                            {...longDescriptionField.input}
                                            flexGrow={1}
                                            title="Attach link"
                                            size="large"
                                        />
                                    </XWithRole>
                                </XVertical>
                            </XHorizontal>
                            <XTextArea
                                {...descriptionField.input}
                                placeholder="Description"
                                resize={false}
                            />
                            <XAvatarUpload
                                cropParams="1:1, free"
                                {...socialImageField.input}
                                placeholder={{
                                    add: 'Add social image',
                                    change: 'Change social image',
                                }}
                            />
                        </XVertical>
                    ));
                    return null;
                }
            }}
        </XRouterContext.Consumer>
    );

    // return (
    //     <XModalForm
    //         scrollableContent={true}
    //         targetQuery="editChat"
    //         useTopCloser={true}
    //         title={title}
    //         defaultAction={async data => {
    //             let newTitle = data.input.title;
    //             let newDescription = data.input.description;
    //             let newPhoto = data.input.photoRef;
    //             let newSocialImage = data.input.socialImageRef;
    //             await client.mutateRoomUpdate({
    //                 roomId: props.roomId,
    //                 input: {
    //                     ...{ title: newTitle },
    //                     ...{ description: newDescription },
    //                     ...(newPhoto && newPhoto.uuid !== editPhotoRef
    //                         ? { photoRef: sanitizeImageRef(newPhoto) }
    //                         : {}),
    //                     ...(newSocialImage && newSocialImage.uuid !== editSocialImageRef
    //                         ? {
    //                               socialImageRef: sanitizeImageRef(newSocialImage),
    //                           }
    //                         : {}),
    //                 },
    //             });
    //         }}
    //         defaultData={{
    //             input: {
    //                 title: props.title || '',
    //                 description: props.description || '',
    //                 photoRef: { uuid: props.photo },
    //                 socialImageRef: props.socialImage ? { uuid: props.socialImage } : undefined,
    //             },
    //         }}
    //     >
    //         <XVertical separator={12}>
    //             <XHorizontal separator={12}>
    //                 <XAvatarUpload
    //                     size="default"
    //                     field="input.photoRef"
    //                     placeholder={{
    //                         add: 'Add photo',
    //                         change: 'Change Photo',
    //                     }}
    //                 />
    //                 <XVertical flexGrow={1} separator={10} alignSelf="flex-start">
    //                     <XInput title={inputTitle} field="input.title" size="large" />
    //                     <XWithRole role="feature-chat-embedded-attach">
    //                         <XInput
    //                             field="input.longDescription"
    //                             flexGrow={1}
    //                             title="Attach link"
    //                             size="large"
    //                         />
    //                     </XWithRole>
    //                 </XVertical>
    //             </XHorizontal>
    //             <XTextArea
    //                 valueStoreKey="fields.input.description"
    //                 placeholder="Description"
    //                 resize={false}
    //             />
    //             <XAvatarUpload
    //                 cropParams="1:1, free"
    //                 field="input.socialImageRef"
    //                 placeholder={{
    //                     add: 'Add social image',
    //                     change: 'Change social image',
    //                 }}
    //             />
    //         </XVertical>
    //     </XModalForm>
    // );
};
