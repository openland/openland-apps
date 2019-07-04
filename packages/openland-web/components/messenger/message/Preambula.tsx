import * as React from 'react';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { UserShort, UserBadge } from 'openland-api/Types';
import { UserPopper } from 'openland-web/components/UserPopper';
import { XView } from 'react-mental';
import { XDate } from 'openland-x/XDate';
import { css } from 'linaria';
import CommentIcon from 'openland-icons/ic-comment-channel2.svg';
import { XButton } from 'openland-x/XButton';
import { showModalBox } from 'openland-x/showModalBox';
import { MakeFeaturedModal } from 'openland-web/pages/main/profile/components/modals';
import { XWithRole } from 'openland-x-permissions/XWithRole';

interface PreambulaContainerProps {
    children: any;
    onClick?: () => void;
    haveReactions?: boolean;
}

const commentsIconWrapperClass = css`
    width: 17px;
    height: 15.2px;

    & svg {
        width: 17px;
        height: 15.2px;
    }

    & svg g path {
        fill: #000;
        opacity: 0.2;
    }
`;

const dateClassName = css`
    letter-spacing: 0.5px;
`;

const CommentsIconWrapper = () => {
    return (
        <div className={commentsIconWrapperClass}>
            <CommentIcon />
        </div>
    );
};

const DeletedCommentAvatar = () => {
    return (
        <XView width={44} minHeight={23}>
            <XView
                width={26}
                height={26}
                backgroundColor={'rgba(0, 0, 0, 0.05)'}
                borderRadius={18}
                alignItems="center"
                justifyContent="center"
            >
                <CommentsIconWrapper />
            </XView>
        </XView>
    );
};

const CompactPreambulaContainer = ({ children }: PreambulaContainerProps) => {
    return (
        <XView
            alignSelf="flex-start"
            minHeight={23}
            width={55}
            fontSize={11}
            whiteSpace={'nowrap'}
            overflow={'hidden'}
            lineHeight={'22px'}
            color="#7A7A7A"
        >
            {children}
        </XView>
    );
};

const NotCompactNotDeepPreambulaContainer = ({ children }: PreambulaContainerProps) => {
    return (
        <XView alignSelf="flex-start" minHeight={23} width={52} fontSize={12} whiteSpace={'nowrap'}>
            {children}
        </XView>
    );
};

const NotCompactDeepPreambulaContainer = ({ children }: PreambulaContainerProps) => {
    return (
        <XView
            alignSelf="flex-start"
            minHeight={23}
            width={42}
            fontSize={12}
            whiteSpace={'nowrap'}
            paddingTop={3}
        >
            {children}
        </XView>
    );
};

const NotCompactPreambulaContainer = ({ children }: PreambulaContainerProps) => {
    return (
        <XView
            alignSelf="flex-start"
            minHeight={23}
            width={55}
            fontSize={12}
            whiteSpace={'nowrap'}
            paddingTop={3}
            paddingLeft={3}
        >
            {children}
        </XView>
    );
};

const NotCompactCommentsNotificationPreambulaContainer = ({
    children,
}: PreambulaContainerProps) => {
    return (
        <XView alignSelf="flex-start" minHeight={23} width={55} fontSize={12} whiteSpace={'nowrap'}>
            {children}
        </XView>
    );
};

export const Preambula = ({
    compact,
    sender,
    senderBadge,
    chatId,
    date,
    deleted,
    isComment,
    isCommentNotification,
    commentDepth,
    userPopperRef,
    hover,
}: {
    compact: boolean;
    sender: UserShort;
    senderBadge?: UserBadge;
    chatId: string;
    date: number;
    deleted?: boolean;
    isComment: boolean;
    isCommentNotification?: boolean;
    commentDepth?: number;
    hover: boolean;
    userPopperRef: React.RefObject<UserPopper>;
}) => {
    let PreambulaContainer = compact ? CompactPreambulaContainer : NotCompactPreambulaContainer;

    if (isCommentNotification) {
        PreambulaContainer = NotCompactCommentsNotificationPreambulaContainer;
    }

    if (isComment) {
        PreambulaContainer = NotCompactNotDeepPreambulaContainer;
        if (commentDepth && commentDepth > 0) {
            PreambulaContainer = NotCompactDeepPreambulaContainer;
        }
    }

    let customButton = !isCommentNotification ? ((hidePopper: Function) => (
        <XWithRole role="super-admin">
            <XButton
                style="electric"
                text={senderBadge ? 'Edit featured' : 'Make featured'}
                size="small"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    hidePopper();
                    showModalBox(
                        { title: 'Member featuring' },
                        ctx => <MakeFeaturedModal ctx={ctx} userId={sender.id} roomId={chatId} />
                    );
                }}
            />
        </XWithRole>
    )) : undefined;

    return (
        <PreambulaContainer>
            {!compact ? (
                deleted ? (
                    <DeletedCommentAvatar />
                ) : (
                    <UserPopper
                        isMe={sender.isYou}
                        startSelected={false}
                        user={sender}
                        ref={userPopperRef}
                        customButton={customButton}
                    >
                        <XAvatar2
                            id={sender.id}
                            title={sender.name}
                            src={sender.photo}
                            size={commentDepth && commentDepth > 0 ? 26 : 36}
                        />
                    </UserPopper>
                )
            ) : (
                <XView lineHeight="23px">
                    {hover && (
                        <span className={dateClassName}>
                            <XDate value={date.toString()} format="time" />
                        </span>
                    )}
                </XView>
            )}
        </PreambulaContainer>
    );
};
