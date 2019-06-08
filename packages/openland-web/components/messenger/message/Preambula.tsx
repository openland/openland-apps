import * as React from 'react';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { UserShort } from 'openland-api/Types';
import { UserPopper } from 'openland-web/components/UserPopper';
import { XView } from 'react-mental';
import { XDate } from 'openland-x/XDate';
import { css } from 'linaria';
import CommentIcon from 'openland-icons/ic-comment-channel.svg';

interface PreambulaContainerProps {
    children: any;
    onClick?: () => void;
    haveReactions?: boolean;
}

let commentsIconWrapperClass = css`
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
            fontWeight={'600'}
            lineHeight={'22px'}
            color="rgba(0, 0, 0, 0.4)"
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

export const Preambula = ({
    compact,
    sender,
    date,
    deleted,
    isComment,
    commentDepth,
    userPopperRef,
    hover,
}: {
    compact: boolean;
    sender: UserShort;
    date: number;
    deleted?: boolean;
    isComment: boolean;
    commentDepth?: number;
    hover: boolean;
    userPopperRef: React.RefObject<UserPopper>;
}) => {
    let PreambulaContainer = compact ? CompactPreambulaContainer : NotCompactPreambulaContainer;

    if (isComment) {
        PreambulaContainer = NotCompactNotDeepPreambulaContainer;
        if (commentDepth && commentDepth > 0) {
            PreambulaContainer = NotCompactDeepPreambulaContainer;
        }
    }

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
                    {hover && <XDate value={date.toString()} format="time" />}
                </XView>
            )}
        </PreambulaContainer>
    );
};
