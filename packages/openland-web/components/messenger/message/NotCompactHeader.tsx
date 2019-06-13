import * as React from 'react';
import { XView } from 'react-mental';
import {
    UserShort,
    RoomHeader_room_PrivateRoom,
    RoomHeader_room_SharedRoom,
    RoomHeader_room,
} from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { UserPopper } from 'openland-web/components/UserPopper';
import ReplyCommentsIcon from 'openland-icons/ic-reply-comments.svg';
import { XAvatar2 } from 'openland-x/XAvatar2';

const DeletedCommentHeader = () => {
    return (
        <XView fontSize={14} fontWeight="600" color="rgba(0, 0, 0, 0.5)">
            Deleted
        </XView>
    );
};

const RoomReplyAvatar = ({ room }: { room?: RoomHeader_room }) => {
    if (!room) {
        return null;
    }
    const sharedRoom =
        room!!.__typename === 'SharedRoom' ? (room as RoomHeader_room_SharedRoom) : null;

    const privateRoom =
        room!!.__typename === 'PrivateRoom' ? (room as RoomHeader_room_PrivateRoom) : null;

    const photo = sharedRoom ? sharedRoom.photo : privateRoom!!.user.photo;
    const avatarTitle = sharedRoom ? sharedRoom.title : privateRoom!!.user.name;
    const id = sharedRoom ? sharedRoom.id : privateRoom ? privateRoom.user.id : '';

    const nameOfRoom = 'Friends of Openland';
    return (
        <XView>
            <XView marginLeft={10} justifyContent="center">
                <ReplyCommentsIcon />
            </XView>
            <XAvatar2 size={18} src={photo} title={avatarTitle} id={id} />
            <XView marginLeft={8} fontSize={14}>
                {nameOfRoom}
            </XView>
        </XView>
    );
};

type NotCompactHeaderT = {
    sender: UserShort;
    date: number;
    deleted?: boolean;
    isComment: boolean;
    userPopperRef: React.RefObject<UserPopper>;
    senderNameEmojify?: any;
    selecting: boolean;
    isEditView: boolean;
    isEdited: boolean;
    isModal?: boolean;
    isCommentNotification?: boolean;
    room?: RoomHeader_room;
};

export const NotCompactHeader = ({
    sender,
    date,
    deleted,
    isComment,
    userPopperRef,
    room,
    senderNameEmojify,
    selecting,
    isEditView,
    isEdited,
    isModal,
    isCommentNotification,
}: NotCompactHeaderT) => {
    let onAvatarOrUserNameMouseEnter = () => {
        if (userPopperRef.current) {
            userPopperRef.current.showPopper();
        }
    };

    let onAvatarOrUserNameMouseLeave = () => {
        if (userPopperRef.current) {
            userPopperRef.current.hidePopper();
        }
    };

    return (
        <XView flexDirection="row" marginBottom={4}>
            <XView flexDirection="row">
                {deleted ? (
                    <DeletedCommentHeader />
                ) : (
                    <XView
                        flexDirection="row"
                        fontSize={14}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.8)"
                        onMouseEnter={onAvatarOrUserNameMouseEnter}
                        onMouseLeave={onAvatarOrUserNameMouseLeave}
                    >
                        {senderNameEmojify}
                    </XView>
                )}
                {!isCommentNotification && sender.primaryOrganization && (
                    <XView
                        as="a"
                        fontSize={12}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.4)"
                        paddingLeft={8}
                        alignSelf="flex-end"
                        marginBottom={-1}
                        path={selecting ? undefined : `/mail/o/${sender.primaryOrganization.id}`}
                        hoverTextDecoration="none"
                    >
                        {sender.primaryOrganization.name}
                    </XView>
                )}

                {!!isCommentNotification && <RoomReplyAvatar room={room} />}

                {isComment && (isEditView || isEdited) && (
                    <>
                        <XView
                            marginLeft={8}
                            alignSelf="center"
                            width={3}
                            height={3}
                            borderRadius={'50%'}
                            marginBottom={-1}
                            backgroundColor="rgba(0, 0, 0, 0.3)"
                        />
                        <XView
                            marginLeft={7}
                            color="rgba(0, 0, 0, 0.4)"
                            fontSize={12}
                            alignSelf="flex-end"
                            fontWeight={'600'}
                            marginBottom={-1}
                        >
                            {isEditView ? 'Editing message' : isEdited && 'Edited'}
                        </XView>
                    </>
                )}
            </XView>
            {!isComment && !isCommentNotification && !isModal && (
                <XView
                    paddingLeft={8}
                    fontSize={12}
                    color="rgba(0, 0, 0, 0.4)"
                    fontWeight="600"
                    alignSelf="flex-end"
                    marginBottom={-1}
                >
                    <XDate value={date.toString()} format="time" />
                </XView>
            )}
        </XView>
    );
};
