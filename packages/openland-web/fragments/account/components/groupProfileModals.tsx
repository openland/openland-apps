import * as React from 'react';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { showModalBox } from 'openland-x/showModalBox';
import { XTextArea } from 'openland-x/XTextArea';
import { LeaveChatComponent } from 'openland-web/fragments/chat/components/MessengerRootComponent';
import { Room_room_SharedRoom } from 'openland-api/Types';
import {
    RoomSetFeatured,
    RoomSetHidden,
} from 'openland-web/fragments/account/components/RoomControls';
import { RoomEditModalBody } from 'openland-web/fragments/chat/RoomEditModal';
import { useClient } from 'openland-web/utils/useClient';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';

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

export const showRoomEditModal = (chatId: string, isChannel: boolean) => {
    showModalBox(
        {
            title: isChannel ? 'Channel settings' : 'Group settings',
        },
        ctx => <RoomEditModal chatId={chatId} hide={ctx.hide} />,
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