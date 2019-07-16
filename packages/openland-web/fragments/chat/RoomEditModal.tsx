import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { StoredFileT, XAvatarFormFieldComponent } from 'openland-x/XAvatarUpload';
import { XInput } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';
import { useClient } from 'openland-web/utils/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';

type RoomEditModalT = {
    title: string;
    photo: string;
    socialImage: string | null;
    description: string | null;
    roomId: string;
    isChannel: boolean;
};

export const RoomEditModalBody = (props: RoomEditModalT & { onClose: Function }) => {
    const client = useClient();
    const form = useForm();

    const editPhotoRef = props.photo;

    const inputTitle = props.isChannel ? 'Channel name' : 'Group name';
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.photoRef',
        { uuid: props.photo } as any,
        form,
    );
    const titleField = useField('input.title', props.title || '', form, [
        {
            checkIsValid: value => !!value.trim(),
            text: 'Please enter chat name',
        },
    ]);
    const longDescriptionField = useField('input.longDescription', '', form);
    const descriptionField = useField('input.description', props.description || '', form);
    const onSubmit = async () => {
        await form.doAction(async () => {
            let newPhoto = avatarField.value;
            const dataToSend = {
                roomId: props.roomId,
                input: {
                    ...{ title: titleField.value.trim() },
                    ...{ description: descriptionField.value },
                    ...(newPhoto && newPhoto.uuid !== editPhotoRef
                        ? { photoRef: sanitizeImageRef(newPhoto) }
                        : {}),
                },
            };

            await client.mutateRoomUpdate(dataToSend);
            props.onClose();
        });
    };
    return (
        <>
            <XView paddingLeft={40} paddingRight={40} paddingTop={6} paddingBottom={24}>
                <XVertical separator={12}>
                    <XHorizontal separator={12}>
                        <XAvatarFormFieldComponent
                            {...avatarField.input}
                            size="default"
                            placeholder={{
                                add: 'Add photo',
                                change: 'Change Photo',
                            }}
                        />
                        <XVertical flexGrow={1} separator={10} alignSelf="flex-start">
                            <XInput
                                title={inputTitle}
                                {...titleField.input}
                                size="large"
                                invalid={!!titleField.input.invalid}
                            />
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
                </XVertical>
            </XView>
            <XModalFooter>
                <XButton
                    text="Save"
                    style="primary"
                    size="large"
                    onClick={onSubmit}
                    loading={form.loading}
                />
            </XModalFooter>
        </>
    );
};
