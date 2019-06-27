import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UserShort, RoomHeader_room_SharedRoom, RoomHeader_room } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { UserPopper } from 'openland-web/components/UserPopper';
import ReplyCommentsIcon from 'openland-icons/ic-reply-comments.svg';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XLink2 } from 'openland-x/XLink2';

const DeletedCommentHeader = () => {
    return (
        <XView fontSize={14} fontWeight="600" color="rgba(0, 0, 0, 0.5)">
            Deleted
        </XView>
    );
};

const RoomReplyAvatar = ({ room }: { room?: RoomHeader_room }) => {
    const sharedRoom =
        room && room.__typename === 'SharedRoom' ? (room as RoomHeader_room_SharedRoom) : null;

    if (!sharedRoom) {
        return null;
    }

    return (
        <XView flexDirection="row" alignItems="center" marginLeft={10}>
            <XView marginRight={10} justifyContent="center">
                <ReplyCommentsIcon />
            </XView>
            <XAvatar2
                size={18}
                src={sharedRoom.photo}
                title={sharedRoom.title}
                id={sharedRoom.id}
            />
            <XLink2 marginLeft={8} fontSize={14} path={'/mail/' + sharedRoom.id} color="#000">
                {sharedRoom.title}
            </XLink2>
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

const sendDataClassName = css`
    letter-spacing: 0.5px;
`;

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
                        color="#292929"
                        onMouseEnter={onAvatarOrUserNameMouseEnter}
                        onMouseLeave={onAvatarOrUserNameMouseLeave}
                    >
                        <span className={sendDataClassName}>{senderNameEmojify}</span>
                    </XView>
                )}
                {!isCommentNotification && sender.primaryOrganization && (
                    <XView
                        as="a"
                        fontSize={12}
                        color="#7A7A7A"
                        paddingLeft={8}
                        alignSelf="flex-end"
                        marginBottom={-1}
                        path={selecting ? undefined : `/mail/o/${sender.primaryOrganization.id}`}
                        hoverTextDecoration="none"
                    >
                        <span className={sendDataClassName}>{sender.primaryOrganization.name}</span>
                    </XView>
                )}

                {!!isCommentNotification && <RoomReplyAvatar room={room} />}

                {isComment && (isEditView || isEdited) && (
                    <>
                        <XView
                            marginLeft={7}
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
                    color="#7A7A7A"
                    alignSelf="flex-end"
                    marginBottom={-1}
                >
                    <span className={sendDataClassName}>
                        <XDate value={date.toString()} format="time" />
                    </span>
                </XView>
            )}
        </XView>
    );
};
