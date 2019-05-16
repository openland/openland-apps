import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { MessageSelector } from './MessageSelector';
import { RoomChat_room, UserShort } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { UserPopper } from 'openland-web/components/UserPopper';
import { Menu } from './Menu';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import CommentIcon from 'openland-icons/ic-comment-channel.svg';

export interface DesktopMessageContainerProps {
    deleted?: boolean;
    message: DataSourceWebMessageItem;
    conversationId: string;
    compact: boolean;
    isModal?: boolean;
    isPinned?: boolean;
    commentDepth?: number;
    isComment?: boolean;
    noSelector?: boolean;
    sender: UserShort;
    senderNameEmojify?: any;
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

interface PreambulaContainerProps {
    children: any;
    onClick?: () => void;
    haveReactions?: boolean;
}

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
            marginTop={20}
            paddingRight={isEditView ? 0 : 20}
        >
            {children}
        </XView>
    );
};

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

const DeletedCommentHeader = () => {
    return (
        <XView fontSize={14} fontWeight="600" color="rgba(0, 0, 0, 0.5)">
            Deleted
        </XView>
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

export const DesktopMessageContainer = (props: DesktopMessageContainerProps) => {
    let [hover, onHover] = React.useState(false);
    let userPopperRef = React.useRef<UserPopper>(null);

    let onClick = React.useCallback(
        e => {
            if (props.selecting) {
                e.preventDefault();
                e.stopPropagation();
                props.onSelected();
            }
        },
        [props.selecting],
    );

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
    let onMouseEnter = React.useCallback(() => {
        onHover(true);
    }, []);
    let onMouseLeave = React.useCallback(() => {
        onHover(false);
    }, []);

    // Selector Icon
    let selector = (
        <XView marginRight={20} width={19} height={22} alignSelf="center" padding={2}>
            {(hover || props.selecting) && (
                <MessageSelector
                    selected={props.selected}
                    onClick={() => {
                        if (!props.selecting) {
                            props.onSelected();
                        }
                    }}
                />
            )}
        </XView>
    );

    // Left side of message
    const { compact, sender, date, deleted, isComment } = props;

    let PreambulaContainer = compact ? CompactPreambulaContainer : NotCompactPreambulaContainer;

    if (isComment) {
        PreambulaContainer = NotCompactNotDeepPreambulaContainer;
        if (props.commentDepth && props.commentDepth > 0) {
            PreambulaContainer = NotCompactDeepPreambulaContainer;
        }
    }

    const preambula = React.useMemo(
        () => (
            <PreambulaContainer>
                {!compact ? (
                    deleted ? (
                        <DeletedCommentAvatar />
                    ) : (
                            <UserPopper
                                isMe={props.sender.isYou}
                                startSelected={false}
                                user={props.sender}
                                ref={userPopperRef}
                            >
                                <XAvatar2
                                    id={sender.id}
                                    title={sender.name}
                                    src={sender.photo}
                                    size={props.commentDepth && props.commentDepth > 0 ? 26 : 36}
                                />
                            </UserPopper>
                        )
                ) : (
                        <XView lineHeight="23px">
                            {hover && <XDate value={date.toString()} format="time" />}
                        </XView>
                    )}
            </PreambulaContainer>
        ),
        [props.sender.isYou, props.sender, sender.id, sender.name, sender.photo, date, hover],
    );

    const notCompactHeader =
        !props.compact &&
        React.useMemo(
            () => (
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
                                    {props.senderNameEmojify}
                                </XView>
                            )}
                        {props.sender.primaryOrganization && (
                            <XView
                                as="a"
                                fontSize={12}
                                fontWeight="600"
                                color="rgba(0, 0, 0, 0.4)"
                                paddingLeft={8}
                                alignSelf="flex-end"
                                marginBottom={-1}
                                path={
                                    props.selecting
                                        ? undefined
                                        : `/mail/o/${props.sender.primaryOrganization.id}`
                                }
                                hoverTextDecoration="none"
                            >
                                {props.sender.primaryOrganization.name}
                            </XView>
                        )}
                        {props.isComment && (props.isEditView || props.isEdited) && (
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
                                    {props.isEditView
                                        ? 'Editing message'
                                        : props.isEdited && 'Edited'}
                                </XView>
                            </>
                        )}
                    </XView>
                    {!props.isComment && !props.isModal && (
                        <XView
                            paddingLeft={8}
                            fontSize={12}
                            color="rgba(0, 0, 0, 0.4)"
                            fontWeight="600"
                            alignSelf="flex-end"
                            marginBottom={-1}
                        >
                            <XDate value={props.date.toString()} format="time" />
                        </XView>
                    )}
                </XView>
            ),
            [
                props.date,
                props.sender,
                props.sender.primaryOrganization,
                props.selecting,
                props.isEditView,
            ],
        );
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
            {props.compact ? (
                props.children
            ) : (
                    <>
                        {notCompactHeader}
                        {props.isModal && (
                            <XView
                                marginBottom={8}
                                flexDirection="row"
                                alignItems="center"
                                color="rgba(0, 0, 0, 0.4)"
                                fontWeight="600"
                                fontSize={12}
                            >
                                <XDate value={props.date.toString()} format="datetime_short" />
                                {props.isPinned && (
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
                                {props.isPinned && <XView>Pinned</XView>}
                            </XView>
                        )}
                        {props.isModal && (
                            <XView flexDirection="column" marginLeft={-55}>
                                {props.children}
                            </XView>
                        )}
                        {!props.isModal && <XView flexDirection="column">{props.children}</XView>}
                    </>
                )}
        </XView>
    );

    // Actions
    let actions = (
        <XView
            width={85}
            marginLeft={12}
            marginTop={!compact ? (isComment ? undefined : 24) : undefined}
            alignSelf="flex-start"
        >
            <Menu
                conversationId={props.conversationId}
                hover={hover}
                deleted={deleted}
                message={props.message}
                isComment={!!props.isComment}
                isModal={!!props.isModal}
                selectMessage={props.selectMessage}
                room={props.room}
            />
        </XView>
    );

    // Result

    let MessageContainerWrapper = CompactMessageContainerWrapper;

    if (props.isComment) {
        MessageContainerWrapper = NotCompactShortMessageContainerWrapper;
    } else if (props.isModal) {
        MessageContainerWrapper = NotCompactModalMessageContainerWrapper;
    } else if (!props.compact) {
        MessageContainerWrapper = NotCompactMessageContainerWrapper;
    }

    console.warn('render!!');
    return (
        <MessageContainerWrapper
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            isEditView={props.isEditView}
            onClick={onClick}
        >
            {!props.noSelector && selector}
            {preambula}
            {content}
            {props.isEditView ? null : actions}
        </MessageContainerWrapper>
    );
};

const MobileMessageContainerWrapper = ({ children }: { children: any }) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            marginTop={12}
            paddingTop={7}
            paddingLeft={18}
            paddingRight={20}
            paddingBottom={3}
        >
            {children}
        </XView>
    );
};

export interface MobileMessageContainerProps {
    children: any;
    sender: UserShort;
    senderNameEmojify: any;
    date: number;
}

export const MobileMessageContainer = (props: MobileMessageContainerProps) => {
    const { sender, date } = props;

    const preambula = (
        <NotCompactPreambulaContainer>
            <XAvatar2 id={sender.id} title={sender.name} src={sender.photo} size={36} />
        </NotCompactPreambulaContainer>
    );

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
            <XView flexDirection="row" marginBottom={4}>
                <XView flexDirection="row">
                    <XView
                        flexDirection="row"
                        fontSize={14}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.8)"
                    >
                        {props.senderNameEmojify}
                    </XView>
                    {props.sender.primaryOrganization && (
                        <XView
                            as="a"
                            fontSize={12}
                            fontWeight="600"
                            color="rgba(0, 0, 0, 0.4)"
                            paddingLeft={8}
                            alignSelf="flex-end"
                            marginBottom={-1}
                            path={`/mail/o/${props.sender.primaryOrganization.id}`}
                            hoverTextDecoration="none"
                        >
                            {props.sender.primaryOrganization.name}
                        </XView>
                    )}
                </XView>
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
            </XView>
            <XView flexDirection="column">{props.children}</XView>
        </XView>
    );

    return (
        <MobileMessageContainerWrapper>
            {preambula}
            {content}
        </MobileMessageContainerWrapper>
    );
};
