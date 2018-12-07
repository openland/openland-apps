import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { MessageTextComponent } from './content/MessageTextComponent';
import { MessageAnimationComponent } from './content/MessageAnimationComponent';
import { XButton } from 'openland-x/XButton';
import { MessageImageComponent } from './content/MessageImageComponent';
import { MessageFileComponent } from './content/MessageFileComponent';
import { MessageUploadComponent } from './content/MessageUploadComponent';
import { MessageIntroComponent } from './content/MessageIntroComponent';
import { MessagePostComponent } from './content/MessagePostComponent';
import { MessageReplyComponent } from './content/MessageReplyComponent';
import { isServerMessage, PendingMessage } from 'openland-engines/messenger/types';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageUrlAugmentationComponent } from './content/MessageUrlAugmentationComponent';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { MessageFull, UserShort, SharedRoomKind, MessageFull_urlAugmentation_user_User } from 'openland-api/Types';
import { ReactionComponent } from './MessageReaction';
import { Reactions } from './MessageReaction';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { UserPopper, UserAvatar } from './content/UserPopper';
import { EditMessageInlineWrapper } from './MessageEditComponent';
import { XDate } from 'openland-x/XDate';
import ReplyIcon from '../icons/ic-reply1.svg';
import EditIcon from '../icons/ic-edit.svg';

const Name = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.8)',
});

const Organization = makeNavigable(
    Glamorous.div<NavigableChildProps>(() => ({
        fontSize: 12,
        fontWeight: 600,
        color: 'rgba(0, 0, 0, 0.4)',
        letterSpacing: 0,
        alignSelf: 'flex-end',
        marginBottom: -1,
        cursor: 'pointer',
    })),
);

const DateComponent = Glamorous.div<{ small?: boolean }>(props => ({
    flexShrink: 0,
    width: props.small ? 55 : 62,
    marginBottom: props.small ? undefined : -1,
    fontSize: props.small ? 11 : 12,
    paddingTop: props.small ? 1 : 1,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    color: 'rgba(0, 0, 0, 0.4)',
}));

const Check = Glamorous.div<{ select: boolean }>(props => ({
    flexShrink: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: props.select ? '#1790ff' : '#fff',
    backgroundImage: props.select
        ? "url('/static/img/icons/check-form.svg')"
        : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: props.select ? undefined : '1px solid #D9D9D9',
}));

const MessageWrapper = Glamorous(XHorizontal)<{
    compact: boolean;
    isEditView: boolean;
    startSelected: boolean;
}>(props => ({
    marginTop: props.compact ? 0 : 12,
    paddingLeft: 20,
    paddingRight: 20,
    '& .message-container': {
        backgroundColor: '#fff',
        flexGrow: 1,
        borderRadius: 6,
        paddingRight: 10,
        paddingBottom: 3,
        paddingLeft: props.compact ? 7 : 10,
        paddingTop: props.compact ? 3 : 7,
    },
    '& .time': {
        opacity: props.compact ? 0 : 1,
    },
    '& .menu-wrapper': {
        marginTop: props.compact ? 6 : 12,
    },
    '& .menu-wrapper, & .reactions-wrapper .reaction-button': {
        opacity: 0,
        pointerEvents: 'none',
    },
    '& .check-icon': {
        opacity: props.startSelected ? 1 : 0,
        cursor: 'pointer',
    },
    '&:hover': {
        '& .message-container': {
            backgroundColor: '#fff',
        },
        '& .check-icon': {
            opacity: props.isEditView ? 0 : 1,
        },
        '& .time': {
            opacity: props.isEditView ? 0 : 1,
        },
        '& .menu-wrapper, & .reactions-wrapper .reaction-button': {
            opacity: props.startSelected ? 0 : props.isEditView ? 0 : 1,
            pointerEvents: props.startSelected
                ? 'none'
                : props.isEditView
                    ? 'none'
                    : 'auto',
        },
    },
}));

const MessageCompactContent = Glamorous(XVertical)<{ isIntro?: boolean }>(
    props => ({
        '& .url-augmentation':
            props.isIntro === true
                ? {}
                : {
                    width: 'calc(100% + 20px)',
                },
    }),
);

const ReplyMessageWrapper = Glamorous.div({
    position: 'relative',
    '&::before': {
        display: 'block',
        content: ' ',
        position: 'absolute',
        left: 0,
        top: 12,
        bottom: 4,
        width: 3,
        borderRadius: 3,
        backgroundColor: '#1790ff',
    },
});

const IconButton = Glamorous.div({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover svg path:last-child': {
        fill: '#1790ff',
        opacity: 1,
    },
});

interface MessageComponentProps {
    compact: boolean;
    sender?: UserShort;
    message: MessageFull | PendingMessage;
    conversation: ConversationEngine;
    out: boolean;
    me?: UserShort | null;
    conversationType?: SharedRoomKind | 'PRIVATE';
    conversationId: string;
}

interface MessageComponentInnerProps extends MessageComponentProps {
    messagesContext: MessagesStateContextProps;
}

class MessageComponentInner extends React.PureComponent<
    MessageComponentInnerProps,
    { isEditView: boolean }
    > {
    static getDerivedStateFromProps = (
        props: MessageComponentInnerProps,
        state: { isEditView: boolean },
    ) => {
        if (isServerMessage(props.message)) {
            if (props.messagesContext.editMessageId === props.message.id) {
                return {
                    isEditView: true,
                };
            } else {
                return {
                    isEditView: false,
                };
            }
        }

        return null;
    };

    componentDidUpdate() {
        if (this.state.isEditView) {
            let el = ReactDOM.findDOMNode(this);
            (el as Element).scrollIntoView();
        }
    }

    constructor(props: MessageComponentInnerProps) {
        super(props);

        this.state = {
            isEditView: false,
        };
    }

    private setEditMessage = (e: any) => {
        let { message, messagesContext } = this.props;
        if (isServerMessage(this.props.message)) {
            message = message as MessageFull;

            e.stopPropagation();
            messagesContext.resetAll();
            messagesContext.setEditMessage(
                message.id,
                message.message,
            );
        }
    };

    private setReplyMessages = (e: any) => {
        let { message, messagesContext } = this.props;

        if (isServerMessage(message)) {
            e.stopPropagation();
            messagesContext.resetAll();
            let singleReplyMessageMessage = new Set().add(message.message);
            let singleReplyMessageId = new Set().add(
                message.id,
            );
            let singleReplyMessageSender = new Set().add(
                message.sender.name,
            );

            if (
                message.file &&
                !message.urlAugmentation
            ) {
                singleReplyMessageMessage = new Set().add('File');
                if (message.fileMetadata!!.isImage) {
                    singleReplyMessageMessage = new Set().add('Photo');
                }
            }
            messagesContext.setReplyMessages(
                singleReplyMessageId,
                singleReplyMessageMessage,
                singleReplyMessageSender,
            );
        }
    };

    private selectMessage = () => {
        let { message, messagesContext } = this.props;

        if (
            !isServerMessage(message) ||
            this.state.isEditView ||
            document.body.classList[0] === 'ReactModal__Body--open' ||
            messagesContext.editMessageId
        ) {
            return;
        }

        if (window.getSelection().toString()) {
            return;
        }

        let { forwardMessagesId } = messagesContext;
        let selectedMessageId = forwardMessagesId;

        if (forwardMessagesId && selectedMessageId) {
            if (forwardMessagesId.has(message.id)) {
                selectedMessageId.delete(message.id);
                messagesContext.setForwardMessages(selectedMessageId);
            } else {
                selectedMessageId.add(message.id);
                messagesContext.setForwardMessages(selectedMessageId);
            }
        } else if (!forwardMessagesId && !selectedMessageId) {
            selectedMessageId = new Set<string>();
            selectedMessageId.add(message.id);
            messagesContext.setForwardMessages(selectedMessageId);
        }
        if (isServerMessage(message)) {
            messagesContext.switchMessageSelect(message);
        }
    };

    private hideEditView = () => {
        this.props.messagesContext.resetAll();
    };

    private menuRender = () => {
        let { message, out } = this.props;

        if (isServerMessage(message)) {
            message = message as MessageFull;

            const isNotIntro = (!message.urlAugmentation || message.urlAugmentation!.type !== 'intro')

            return (
                <XHorizontal
                    alignItems="center"
                    alignSelf="flex-start"
                    justifyContent="flex-start"
                    width={83}
                    flexShrink={0}
                    separator={5}
                    className="menu-wrapper"
                >
                    <XHorizontal alignItems="center" separator={8}>
                        {isNotIntro && (
                            <ReactionComponent
                                messageId={message.id}
                            />
                        )}
                        <IconButton onClick={this.setReplyMessages}>
                            <ReplyIcon />
                        </IconButton>
                        {out && message.message && (
                            <IconButton onClick={this.setEditMessage}>
                                <EditIcon />
                            </IconButton>
                        )}
                    </XHorizontal>
                </XHorizontal>
            );
        } else {
            return null;
        }
    };

    private reactionsRender = () => {
        let { message } = this.props;

        if (isServerMessage(message)) {
            message = message as MessageFull;

            if (
                !message.urlAugmentation ||
                (message.urlAugmentation &&
                    message.urlAugmentation!.type !== 'intro')
            ) {
                return (
                    <Reactions
                        messageId={message.id}
                        reactions={message.reactions}
                        meId={(this.props.me as UserShort).id}
                    />
                );
            }
        }

        return null;
    };

    render() {
        let { message } = this.props;
        const { compact } = this.props;

        let content: any[] = [];
        let date: any = null;
        let edited = isServerMessage(message) && message.edited;

        let isSelect = false;
        let hideMenu = false;
        let isIntro = false;
        let isPost = false;
        let { forwardMessagesId } = this.props.messagesContext;
        if (forwardMessagesId) {
            isSelect = forwardMessagesId.has((message as MessageFull).id);
            if (forwardMessagesId.size > 0) {
                hideMenu = true;
            }
        }

        if (isServerMessage(message)) {
            message = message as MessageFull;

            if (message.urlAugmentation && message.urlAugmentation!.type === 'intro') {
                isIntro = true;
            }
            if (message.message && message.alphaTitle && message.alphaType === "POST") {
                isPost = true;
                content.push(
                    <MessagePostComponent
                        key={'post_message' + message.id}
                        message={message.message}
                        alphaTitle={message.alphaTitle}
                        alphaButtons={message.alphaButtons}
                        alphaAttachments={message.alphaAttachments}
                        edited={edited}
                    />
                );
            }

            if (this.state.isEditView && message.message && !isPost) {
                content.push(
                    <EditMessageInlineWrapper
                        message={message}
                        key={'editForm'}
                        onClose={this.hideEditView}
                    />
                );
            } else {
                if (message.message && message.message.length > 0 && !isIntro && !isPost) {
                    content.push(
                        <MessageTextComponent
                            message={message.message}
                            mentions={message.mentions}
                            key={'text'}
                            isService={message.isService}
                            isEdited={edited}
                        />
                    );
                }

                const { file, fileMetadata } = message;
                if (file && !message.urlAugmentation) {
                    let w = fileMetadata!!.imageWidth
                        ? fileMetadata!!.imageWidth!!
                        : undefined;
                    let h = fileMetadata!!.imageHeight
                        ? fileMetadata!!.imageHeight!!
                        : undefined;
                    let name = fileMetadata!!.name
                        ? fileMetadata!!.name!!
                        : undefined;
                    let size = fileMetadata!!.size
                        ? fileMetadata!!.size!!
                        : undefined;

                    if (message.fileMetadata!!.isImage && !!w && !!h) {
                        if (message.fileMetadata!!.imageFormat === 'GIF') {
                            content.push(
                                <MessageAnimationComponent
                                    key={'file'}
                                    file={file}
                                    fileName={name}
                                    width={w}
                                    height={h}
                                />
                            );
                        } else {
                            content.push(
                                <MessageImageComponent
                                    key={'file'}
                                    file={file}
                                    fileName={name}
                                    width={w}
                                    height={h}
                                    startSelected={hideMenu}
                                />
                            );
                        }
                    } else {
                        content.push(
                            <MessageFileComponent
                                key={'file'}
                                file={file}
                                fileName={name}
                                fileSize={size}
                            />
                        );
                    }
                }
                if (message.urlAugmentation) {
                    if (isIntro) {
                        content.push(
                            <MessageIntroComponent
                                key="intro"
                                urlAugmentation={message.urlAugmentation}
                                file={message.file}
                                fileMetadata={message.fileMetadata}
                                user={
                                    message.urlAugmentation
                                        .user as MessageFull_urlAugmentation_user_User
                                }
                                messageId={message.id}
                                reactions={message.reactions}
                                meId={(this.props.me as UserShort).id}
                                senderId={message.sender.id}
                                conversationType={this.props.conversationType}
                            />
                        );
                    } else {
                        if (
                            message.urlAugmentation.url.startsWith(
                                'https://app.openland.com/o',
                            ) &&
                            message.urlAugmentation.url.includes('listings#')
                        ) {
                            content = [];
                        }
                        content.push(
                            <MessageUrlAugmentationComponent
                                key="urlAugmentation"
                                {...message.urlAugmentation}
                                messageId={message.id}
                                isMe={
                                    this.props.sender && this.props.me
                                        ? this.props.sender.id ===
                                        this.props.me.id
                                        : false
                                }
                            />
                        );
                    }
                }
                if (message.reply && message.reply!.length > 0) {
                    content.push(
                        <ReplyMessageWrapper key={'reply_message' + message.id}>
                            {message.reply!.sort((a, b) => (a.date - b.date)).map((i, j) => (
                                <MessageReplyComponent
                                    mentions={message.mentions}
                                    sender={i.sender}
                                    date={i.date}
                                    message={i.message}
                                    id={i.id}
                                    key={'reply_message' + i.id + j}
                                    edited={i.edited}
                                    file={i.file}
                                    fileMetadata={i.fileMetadata}
                                    startSelected={hideMenu}
                                />
                            ))}
                        </ReplyMessageWrapper>
                    );
                }
                date = <XDate value={message.date} format="time" />;
            }
        } else {
            if (message.message && message.message.length > 0) {
                content.push(
                    <MessageTextComponent
                        message={message.message}
                        mentions={message.mentions}
                        key={'text'}
                        isService={false}
                        isEdited={edited}
                    />
                );
            }
            if (message.file) {
                let progress = Math.round(message.progress * 100);
                let title = 'Uploading ' + message.file + ' (' + progress + '%)';
                content.push(
                    <MessageUploadComponent
                        key={'file'}
                        progress={progress}
                        title={title}
                    />
                );
            }
            date = 'Sending...';
            if (message.failed) {
                date = 'Failed';
                let key = message.key;
                content.push(
                    <XHorizontal>
                        <XButton
                            onClick={() => this.props.conversation.cancelMessage(key)}
                            text="Cancel"
                        />
                        <XButton
                            onClick={() => this.props.conversation.retryMessage(key)}
                            text="Try Again"
                        />
                    </XHorizontal>
                );
            }
        }

        // Handle unknown messages: display empty message
        if (content.length === 0) {
            content.push(
                <MessageTextComponent
                    message={''}
                    mentions={null}
                    key={'text'}
                    isService={false}
                    isEdited={edited}
                />
            );
        }

        if (compact) {
            return (
                <MessageWrapper
                    compact={true}
                    isEditView={this.state.isEditView}
                    separator={6}
                    alignItems="center"
                    startSelected={hideMenu}
                >
                    <Check
                        select={isSelect}
                        className="check-icon"
                        onClick={this.selectMessage}
                    />
                    <XHorizontal
                        separator={0}
                        className="message-container"
                        flexGrow={1}
                        maxWidth="calc(100% - 125px)"
                    >
                        <DateComponent small={true} className="time">
                            {date}
                        </DateComponent>
                        <XHorizontal
                            justifyContent="space-between"
                            flexGrow={1}
                            maxWidth="calc(100% - 55px)"
                        >
                            <MessageCompactContent
                                separator={0}
                                flexGrow={1}
                                isIntro={isIntro}
                                maxWidth="100%"
                            >
                                {content}
                                {this.reactionsRender()}
                            </MessageCompactContent>
                        </XHorizontal>
                    </XHorizontal>
                    {this.menuRender()}
                </MessageWrapper>
            );
        }

        let { sender, conversationType, me } = this.props;
        let isMe: boolean = false;
        let orgPath: string | undefined = undefined;

        if (isServerMessage(message)) {
            sender = sender as UserShort;
            if (sender.primaryOrganization && !hideMenu) {
                orgPath = '/mail/o/' + this.props.sender!!.primaryOrganization!!.id;
            }
            isMe = me ? sender.id === me.id : false;
        }

        return (
            <MessageWrapper
                compact={false}
                isEditView={this.state.isEditView}
                separator={6}
                alignItems="center"
                startSelected={hideMenu}
            >
                <Check
                    onClick={this.selectMessage}
                    select={isSelect}
                    className="check-icon"
                />
                <XVertical
                    separator={0}
                    className="message-container"
                    flexGrow={1}
                    maxWidth="calc(100% - 125px)"
                >
                    <XHorizontal alignSelf="stretch">
                        {sender && (
                            <>
                                {conversationType === 'PRIVATE' ? (
                                    <UserAvatar
                                        user={sender}
                                        startSelected={hideMenu}
                                    />
                                ) : (
                                        <UserPopper
                                            user={sender}
                                            startSelected={hideMenu}
                                            isMe={isMe}
                                        />
                                    )}
                            </>
                        )}
                        <XVertical
                            separator={2}
                            flexGrow={1}
                            maxWidth="calc(100% - 52px)"
                        >
                            <XHorizontal justifyContent="space-between">
                                <XHorizontal separator={4}>
                                    <XHorizontal
                                        separator={4}
                                        alignItems="center"
                                    >
                                        {sender && (
                                            <>
                                                {conversationType !== 'PRIVATE' ? (
                                                    <UserPopper
                                                        user={sender}
                                                        startSelected={hideMenu}
                                                        isMe={isMe}
                                                    >
                                                        <Name>{sender.name}</Name>
                                                    </UserPopper>
                                                ) : (
                                                        <Name>{sender.name}</Name>
                                                    )}
                                                {sender.primaryOrganization && (
                                                    <Organization path={orgPath}>
                                                        {sender.primaryOrganization.name}
                                                    </Organization>
                                                )}
                                            </>
                                        )}
                                    </XHorizontal>
                                    <DateComponent className="time">
                                        {date}
                                    </DateComponent>
                                </XHorizontal>
                            </XHorizontal>
                            {content}
                            {this.reactionsRender()}
                        </XVertical>
                    </XHorizontal>
                </XVertical>
                {this.menuRender()}
            </MessageWrapper>
        );
    }
}

export class MessageComponent extends React.Component<MessageComponentProps> {
    render() {
        return (
            <MessagesStateContext.Consumer>
                {(state: MessagesStateContextProps) => (
                    <MessageComponentInner
                        {...this.props}
                        messagesContext={state}
                    />
                )}
            </MessagesStateContext.Consumer>
        );
    }
}
