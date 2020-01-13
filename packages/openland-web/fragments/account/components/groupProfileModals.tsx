import * as React from 'react';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { showModalBox } from 'openland-x/showModalBox';
import { Room_room_SharedRoom } from 'openland-api/Types';
import { useClient } from 'openland-web/utils/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { trackEvent } from 'openland-x-analytics';

type RoomEditModalT = {
    title: string;
    photo: string;
    socialImage: string | null;
    description: string | null;
    roomId: string;
    isChannel: boolean;
};

const RoomEditModalBody = (props: RoomEditModalT & { onClose: Function }) => {
    const client = useClient();
    const form = useForm();

    const editPhotoRef = props.photo;

    const inputLable = props.isChannel ? 'Channel name' : 'Group name';
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
            <XView paddingHorizontal={24} paddingTop={12} paddingBottom={24}>
                <XView alignSelf="center">
                    <UAvatarUploadField field={avatarField} />
                </XView>
                <UInputField
                    label={inputLable}
                    field={titleField}
                    marginTop={24}
                    marginBottom={16}
                />
                <UInputField field={descriptionField} label="Description" />
            </XView>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="secondary"
                    size="large"
                    onClick={() => props.onClose()}
                />
                <UButton
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

const RoomEditModal = ({ chatId, hide }: { chatId: string; hide: () => void }) => {
    const client = useClient();
    const data = client.useRoomWithoutMembers({ id: chatId });

    let chat = data.room as Room_room_SharedRoom;

    const sharedRoom = chat.__typename === 'SharedRoom' ? (chat as Room_room_SharedRoom) : null;
    const isChannel = !!(sharedRoom && sharedRoom.isChannel);

    if (!chat) {
        return <XLoader loading={true} />;
    }

    return (
        <RoomEditModalBody
            roomId={chat.id}
            title={chat.title}
            photo={chat.photo}
            description={chat.description}
            socialImage={chat.socialImage}
            isChannel={isChannel}
            onClose={hide}
        />
    );
};

export const showRoomEditModal = (chatId: string) => {
    trackEvent(`navigate_group_profile_edit`);
    showModalBox(
        {
            title: 'Edit group',
        },
        ctx => <RoomEditModal chatId={chatId} hide={ctx.hide} />,
    );
};

export const showLeaveChatConfirmation = (client: OpenlandClient, chatId: string) => {
    const builder = new AlertBlanketBuilder();

    builder.title('Leave chat');
    builder.message(
        'Are you sure you want to leave? You will need to request access to join it again in the future.',
    );
    builder.action(
        'Leave',
        async () => {
            await client.mutateRoomLeave({ roomId: chatId });
        },
        'danger',
    );

    builder.show();
};
