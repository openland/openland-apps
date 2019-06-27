import * as React from 'react';
import { XView } from 'react-mental';
import { MessageSelector } from './MessageSelector';
import { RoomChat_room, UserShort } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { UserPopper } from 'openland-web/components/UserPopper';
import { Menu } from './Menu/Menu';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { Preambula } from './Preambula';
import { NotCompactHeader } from './NotCompactHeader';

export interface DesktopMessageContainerProps {
    replyQuoteText?: string | null;
    deleted?: boolean;
    message: DataSourceWebMessageItem;
    conversationId: string;
    compact: boolean;
    isCommentNotification?: boolean;
    senderNameEmojify?: any;
    isModal?: boolean;
    isPinned?: boolean;
    commentDepth?: number;
    isComment?: boolean;
    noSelector?: boolean;
    sender: UserShort;
    date: number;

    // Selection
    onSelected: () => void;
    selecting: boolean;
    selected: boolean;
    haveReactions: boolean;

    children?: any;
    selectMessage: () => void;
    room?: RoomChat_room;
    isEdited: boolean;
    isEditView: boolean;
}

interface MessageContainerWrapperProps {
    children: any;
    onMouseEnter: (event: React.MouseEvent<any>) => void;
    onMouseLeave: (event: React.MouseEvent<any>) => void;
    onClick?: (e: any) => void;
    isEditView: boolean;
}

const CompactMessageContainerWrapper = ({
    children,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: MessageContainerWrapperProps) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            marginTop={-3}
            marginBottom={-3}
            paddingTop={7}
            paddingBottom={5}
            paddingLeft={20}
            paddingRight={20}
            borderRadius={4}
            onClick={onClick}
        >
            {children}
        </XView>
    );
};

const NotCompactMessageContainerWrapper = ({
    children,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: MessageContainerWrapperProps) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            marginTop={9}
            marginBottom={-3}
            paddingTop={10}
            paddingBottom={5}
            paddingLeft={20}
            paddingRight={20}
            borderRadius={4}
            onClick={onClick}
        >
            {children}
        </XView>
    );
};

const CommentsNotificationMessageContainerWrapper = ({
    children,
    onMouseEnter,
    onMouseLeave,
    onClick,
}: MessageContainerWrapperProps) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            marginTop={9}
            marginBottom={-3}
            paddingTop={13}
            paddingBottom={5}
            borderRadius={4}
            onClick={onClick}
        >
            {children}
        </XView>
    );
};

const NotCompactModalMessageContainerWrapper = ({
    children,
    onMouseEnter,
    onMouseLeave,
}: MessageContainerWrapperProps) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            paddingRight={20}
        >
            {children}
        </XView>
    );
};

const NotCompactShortMessageContainerWrapper = ({
    children,
    isEditView,
    onMouseEnter,
    onMouseLeave,
}: MessageContainerWrapperProps) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            paddingRight={isEditView ? 0 : 20}
        >
            {children}
        </XView>
    );
};

const ReplyQuote = ({ text }: { text?: string | null }) => {
    if (!text) {
        return null;
    }
    return (
        <XView flexDirection="row" marginTop={4} marginBottom={6}>
            <XView width={2} backgroundColor={'#1790ff'} borderRadius={1} />
            <XView
                marginLeft={12}
                opacity={0.6}
                fontSize={14}
                color={'#000'}
                flexShrink={1}
                overflow="hidden"
                flexWrap="nowrap"
            >
                {text}
            </XView>
        </XView>
    );
};

export const DesktopMessageContainer = ({
    compact,
    deleted,
    selecting,
    onSelected,
    selected,
    commentDepth,
    sender,
    date,
    noSelector,
    children,
    conversationId,
    message,
    senderNameEmojify,
    selectMessage,
    room,
    isComment,
    isCommentNotification,
    isPinned,
    isModal,
    isEditView,
    isEdited,
    replyQuoteText,
}: DesktopMessageContainerProps) => {
    let [hover, onHover] = React.useState(false);
    let userPopperRef = React.useRef<UserPopper>(null);

    let onClick = React.useCallback(
        e => {
            if (selecting) {
                e.preventDefault();
                e.stopPropagation();
                onSelected();
            }
        },
        [selecting],
    );

    let onMouseEnter = React.useCallback(() => {
        onHover(true);
    }, []);
    let onMouseLeave = React.useCallback(() => {
        onHover(false);
    }, []);

    // Content
    const content = (
        <XView
            flexDirection="column"
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            minWidth={0}
            alignItems="stretch"
        >
            {compact ? (
                children
            ) : (
                <>
                    {!compact && (
                        <>
                            <NotCompactHeader
                                room={room as any}
                                sender={sender}
                                date={date}
                                deleted={deleted}
                                isComment={!!isComment}
                                isCommentNotification={!!isCommentNotification}
                                userPopperRef={userPopperRef}
                                senderNameEmojify={senderNameEmojify}
                                selecting={selecting}
                                isEditView={isEditView}
                                isEdited={isEdited}
                                isModal={isModal}
                            />
                            <ReplyQuote text={replyQuoteText} />
                        </>
                    )}

                    {isModal && (
                        <XView
                            marginBottom={8}
                            flexDirection="row"
                            alignItems="center"
                            color="rgba(0, 0, 0, 0.4)"
                            fontSize={12}
                        >
                            <XDate value={date.toString()} format="datetime_short" />
                            {isPinned && (
                                <XView
                                    width={3}
                                    height={3}
                                    opacity={0.3}
                                    backgroundColor="#000"
                                    borderRadius="100%"
                                    flexShrink={0}
                                    marginHorizontal={5}
                                />
                            )}
                            {isPinned && <XView>Pinned</XView>}
                        </XView>
                    )}
                    {isModal && (
                        <XView flexDirection="column" marginLeft={-55}>
                            {children}
                        </XView>
                    )}
                    {!isModal && <XView flexDirection="column">{children}</XView>}
                </>
            )}
        </XView>
    );

    // Actions
    let actions = (
        <XView
            width={isCommentNotification ? 7 : 85}
            marginLeft={12}
            marginTop={
                isCommentNotification
                    ? undefined
                    : !compact
                    ? isComment
                        ? undefined
                        : 24
                    : undefined
            }
            alignSelf="flex-start"
        >
            <Menu
                conversationId={conversationId}
                hover={hover}
                deleted={deleted}
                message={message}
                isCommentNotification={!!isCommentNotification}
                isComment={!!isComment}
                isModal={!!isModal}
                selectMessage={selectMessage}
                room={room}
            />
        </XView>
    );

    // Result

    let MessageContainerWrapper = CompactMessageContainerWrapper;

    if (isCommentNotification) {
        MessageContainerWrapper = CommentsNotificationMessageContainerWrapper;
    } else if (isComment) {
        MessageContainerWrapper = NotCompactShortMessageContainerWrapper;
    } else if (isModal) {
        MessageContainerWrapper = NotCompactModalMessageContainerWrapper;
    } else if (!compact) {
        MessageContainerWrapper = NotCompactMessageContainerWrapper;
    }

    return (
        <MessageContainerWrapper
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            isEditView={isEditView}
            onClick={onClick}
        >
            {!noSelector && (
                <XView marginRight={20} width={19} height={22} alignSelf="center" padding={2}>
                    {(hover || selecting) && (
                        <MessageSelector
                            selected={selected}
                            onClick={() => {
                                if (!selecting) {
                                    onSelected();
                                }
                            }}
                        />
                    )}
                </XView>
            )}
            <Preambula
                isCommentNotification={!!isCommentNotification}
                isComment={!!isComment}
                userPopperRef={userPopperRef}
                commentDepth={commentDepth}
                compact={compact}
                sender={sender}
                date={date}
                deleted={deleted}
                hover={hover}
            />
            {content}
            {isEditView ? null : actions}
        </MessageContainerWrapper>
    );
};
