import * as React from 'react';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { showModalBox } from 'openland-x/showModalBox';
import { XTextArea } from 'openland-x/XTextArea';
import { Room_room_SharedRoom } from 'openland-api/Types';
import {
    RoomSetFeatured,
    RoomSetHidden,
} from 'openland-web/fragments/account/components/RoomControls';
import { useClient } from 'openland-web/utils/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XText } from 'openland-x/XText';
import { XModalController } from 'openland-x/showModal';
import { css } from 'linaria';
import { StoredFileT, XAvatarFormFieldComponent } from 'openland-x/XAvatarUpload';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { XInput } from 'openland-x/XInput';
import { XWithRole } from 'openland-x-permissions/XWithRole';

export const AdminTools = (props: { id: string; variables: { id: string } }) => {
    let client = useClient();
    const data = client.useRoomSuper(props.variables);

    return (
        <>
            {data &&
                data.roomSuper && (
                    <RoomSetFeatured val={data.roomSuper!.featured} roomId={data.roomSuper.id} />
                )}
            {data &&
                data.roomSuper && (
                    <RoomSetHidden val={data.roomSuper!.listed} roomId={data.roomSuper.id} />
                )}
        </>
    );
};

export type tabsT = 'featured' | 'requests' | 'members';

export const tabs: { [K in tabsT]: tabsT } = {
    featured: 'featured',
    requests: 'requests',
    members: 'members',
};

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
    showModalBox(
        {
            title: 'Settings',
        },
        ctx => <RoomEditModal chatId={chatId} hide={ctx.hide} />,
    );
};

const cancelButtonClassName = css`
    border: 1px solid #e7e7e7 !important;
    background-color: rgb(242, 243, 244) !important;
`;

const LeaveChatComponent = (props: { id: string; ctx: XModalController }) => {
    const client = useClient();
    const form = useForm();
    const createAction = () => {
        form.doAction(async () => {
            await client.mutateRoomLeave({ roomId: props.id });
            props.ctx.hide();
        });
    };
    return (
        <XView borderRadius={8}>
            {form.loading && <XLoader loading={form.loading} />}
            {form.error && <XErrorMessage message={form.error} />}
            <XModalContent>
                <XText>
                    Are you sure you want to leave? You will need to request access to join it again
                    in the future.
                </XText>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton
                        text="Cancel"
                        size="large"
                        className={cancelButtonClassName}
                        onClick={props.ctx.hide}
                    />
                </XView>
                <XButton text="Leave" style="danger" size="large" onClick={createAction} />
            </XModalFooter>
        </XView>
    );
};

export const leaveChatModal = (chatId: string) =>
    showModalBox({ title: 'Leave chat' }, ctx => <LeaveChatComponent id={chatId} ctx={ctx} />);

const DescriptionModalContent = (props: { chatId: string; hide: () => void }) => {
    const { chatId } = props;
    const client = useClient();
    const data = client.useRoomWithoutMembers({ id: chatId });

    let chat = data.room as Room_room_SharedRoom;

    if (!chat) {
        return <XLoader loading={true} />;
    }

    const form = useForm();
    const editDescription = chat.description || '';
    const descriptionField = useField('input.description', editDescription, form);

    const createAction = () => {
        form.doAction(async () => {
            await client.mutateRoomUpdate({
                roomId: chatId,
                input: {
                    ...(descriptionField.value !== editDescription
                        ? { description: descriptionField.value }
                        : {}),
                },
            });
            props.hide();
        });
    };

    return (
        <XView borderRadius={8}>
            {form.loading && <XLoader loading={form.loading} />}
            {form.error && <XErrorMessage message={form.error} />}
            <XModalContent>
                <XTextArea placeholder="Description" resize={false} {...descriptionField.input} />
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={props.hide} />
                </XView>
                <XButton text="Save" style="primary" size="large" onClick={createAction} />
            </XModalFooter>
        </XView>
    );
};

export const showAddDescriptionModal = (chatId: string) =>
    showModalBox({ title: 'Add short description' }, ctx => (
        <DescriptionModalContent chatId={chatId} hide={ctx.hide} />
    ));