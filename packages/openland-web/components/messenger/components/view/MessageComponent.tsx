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
import {
    MessageFull,
    UserShort,
    SharedRoomKind,
    MessageFull_urlAugmentation_user_User,
} from 'openland-api/Types';
import { ReactionComponent } from './MessageReaction';
import { Reactions } from './MessageReaction';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { UserPopper } from './content/UserPopper';
import { EditMessageInlineWrapper } from './MessageEditComponent';
import { XDate } from 'openland-x/XDate';
import { File, EditPostProps } from '../../../../fragments/MessengerRootComponent';
import ReplyIcon from 'openland-icons/ic-reply1.svg';
import EditIcon from 'openland-icons/ic-edit.svg';
import { MessageContainer } from '../../message/MessageContainer';

const Check = Glamorous.div<{ select: boolean }>(props => ({
    flexShrink: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: props.select ? '#1790ff' : '#fff',
    backgroundImage: props.select ? "url('/static/img/icons/check-form.svg')" : undefined,
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
        marginTop: props.compact ? 0 : 6,
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
            pointerEvents: props.startSelected ? 'none' : props.isEditView ? 'none' : 'auto',
        },
    },
}));

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
    paddingTop: 6,
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
    editPostHandler?: (data: EditPostProps) => void;
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

    userPopperRef = React.createRef<UserPopper>();

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
        if (isServerMessage(message)) {
            message = message as MessageFull;

            e.stopPropagation();
            messagesContext.resetAll();
            messagesContext.setEditMessage(message.id, message.message);
        }
    };

    private setEditPostMessage = (e: any) => {
        let { message, editPostHandler } = this.props;
        if (isServerMessage(message) && editPostHandler && message.alphaTitle && message.message) {
            message = message as MessageFull;

            let postFiles: Set<File> = new Set();
            let file: File | null = null;

            message.alphaAttachments.map(i => {
                if (i.fileMetadata) {
                    file = {
                        uuid: i.fileId,
                        name: i.fileMetadata.name,
                        size: String(i.fileMetadata.size),
                        isImage: i.fileMetadata.isImage,
                    };

                    postFiles.add(file);
                }
            });
            let postData: EditPostProps = {
                title: message.alphaTitle!,
                text: message.message!,
                postTipe: (message as any).alphaPostType,
                files: postFiles,
                messageId: message.id,
            };

            editPostHandler(postData);
        }
    };

    private setReplyMessages = (e: any) => {
        let { message, messagesContext } = this.props;

        if (isServerMessage(message)) {
            e.stopPropagation();
            messagesContext.resetAll();
            let singleReplyMessageMessage = new Set().add(message.message);
            let singleReplyMessageId = new Set().add(message.id);
            let singleReplyMessageSender = new Set().add(message.sender.name);

            if (message.file && !message.urlAugmentation) {
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

            const isPost = message.message && message.alphaTitle && message.alphaType === 'POST';

            const isNotIntro =
                !message.urlAugmentation || message.urlAugmentation!.type !== 'intro';

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
                        {isNotIntro && <ReactionComponent messageId={message.id} />}
                        {!isPost && (
                            <IconButton onClick={this.setReplyMessages}>
                                <ReplyIcon />
                            </IconButton>
                        )}
                        {out && message.message && (
                            <IconButton
                                onClick={isPost ? this.setEditPostMessage : this.setEditMessage}
                            >
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
                (message.urlAugmentation && message.urlAugmentation!.type !== 'intro')
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

    showUserPopper = () => {
        if (this.userPopperRef.current) {
            this.userPopperRef.current.showPopper();
        }
    };

    hideUserPopper = () => {
        if (this.userPopperRef.current) {
            this.userPopperRef.current.hidePopper();
        }
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
            if (message.message && message.alphaTitle && message.alphaType === 'POST') {
                isPost = true;
                let meId = this.props.me ? this.props.me.id : '';

                content.push(
                    <MessagePostComponent
                        key={'post_message' + message.id}
                        messageId={message.id}
                        senderName={message.sender.firstName}
                        userId={message.sender.id}
                        message={message.message}
                        alphaTitle={message.alphaTitle}
                        alphaButtons={message.alphaButtons}
                        alphaAttachments={message.alphaAttachments}
                        reactions={message.reactions}
                        edited={edited}
                        meId={meId}
                        privateConversation={this.props.conversationType === 'PRIVATE'}
                    />,
                );
            }

            if (this.state.isEditView && message.message && !isPost) {
                content.push(
                    <EditMessageInlineWrapper
                        message={message}
                        key={'editForm'}
                        onClose={this.hideEditView}
                    />,
                );
            } else {
                if (message.message && message.message.length > 0 && !isIntro && !isPost) {
                    content.push(
                        <MessageTextComponent
                            message={message.message}
                            mentions={message.mentions}
                            alphaMentions={(message as any).alphaMentions}
                            key={'text'}
                            isService={message.isService}
                            isEdited={edited}
                        />,
                    );
                }

                const { file, fileMetadata } = message;
                if (file && !message.urlAugmentation) {
                    let w = fileMetadata!!.imageWidth ? fileMetadata!!.imageWidth!! : undefined;
                    let h = fileMetadata!!.imageHeight ? fileMetadata!!.imageHeight!! : undefined;
                    let name = fileMetadata!!.name ? fileMetadata!!.name!! : undefined;
                    let size = fileMetadata!!.size ? fileMetadata!!.size!! : undefined;

                    if (message.fileMetadata!!.isImage && !!w && !!h) {
                        if (message.fileMetadata!!.imageFormat === 'GIF') {
                            content.push(
                                <MessageAnimationComponent
                                    key={'file'}
                                    file={file}
                                    fileName={name}
                                    width={w}
                                    height={h}
                                />,
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
                                />,
                            );
                        }
                    } else {
                        content.push(
                            <MessageFileComponent
                                key={'file'}
                                file={file}
                                fileName={name}
                                fileSize={size}
                            />,
                        );
                    }
                }
                if (message.urlAugmentation && !isPost) {
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
                            />,
                        );
                    } else {
                        if (
                            message.urlAugmentation.url.startsWith('https://app.openland.com/o') &&
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
                                        ? this.props.sender.id === this.props.me.id
                                        : false
                                }
                            />,
                        );
                    }
                }
                if (message.reply && message.reply!.length > 0) {
                    content.push(
                        <ReplyMessageWrapper key={'reply_message' + message.id}>
                            {message
                                .reply!.sort((a, b) => a.date - b.date)
                                .map((item, index, array) => {
                                    let isCompact =
                                        index > 0
                                            ? array[index - 1].sender.id === item.sender.id
                                                ? true
                                                : false
                                            : false;

                                    return (
                                        <MessageReplyComponent
                                            mentions={message.mentions}
                                            sender={item.sender}
                                            date={item.date}
                                            message={item.message}
                                            id={item.id}
                                            key={'reply_message' + item.id + index}
                                            edited={item.edited}
                                            file={item.file}
                                            fileMetadata={item.fileMetadata}
                                            startSelected={hideMenu}
                                            compact={isCompact || undefined}
                                        />
                                    );
                                })}
                        </ReplyMessageWrapper>,
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
                    />,
                );
            }
            if (message.file) {
                let progress = Math.round(message.progress * 100);
                let title = 'Uploading ' + message.file + ' (' + progress + '%)';
                content.push(
                    <MessageUploadComponent key={'file'} progress={progress} title={title} />,
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
                    </XHorizontal>,
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
                />,
            );
        }

        if (!message.isService) {
            return (
                <MessageContainer
                    compact={compact}
                    selecting={hideMenu}
                    sender={this.props.sender!}
                    date={this.props.message.date}
                    renderMenu={this.menuRender}
                    onSelected={this.selectMessage}
                    selected={isSelect}
                >
                    {content}
                    {!isPost && this.reactionsRender()}
                </MessageContainer>
            );
        }

        return (
            <MessageWrapper
                compact={false}
                isEditView={this.state.isEditView}
                separator={6}
                alignItems="center"
                startSelected={hideMenu}
            >
                <Check onClick={this.selectMessage} select={isSelect} className="check-icon" />
                <XVertical
                    separator={0}
                    className="message-container"
                    flexGrow={1}
                    maxWidth={!message.isService ? 'calc(100% - 125px)' : '100%'}
                >
                    <XHorizontal alignSelf="stretch">
                        <XVertical
                            separator={2}
                            flexGrow={1}
                            maxWidth={
                                !message.isService ? 'calc(100% - 52px)' : 'calc(100% - 25px)'
                            }
                        >
                            {content}
                        </XVertical>
                    </XHorizontal>
                </XVertical>
            </MessageWrapper>
        );
    }
}

export class MessageComponent extends React.Component<MessageComponentProps> {
    render() {
        return (
            <MessagesStateContext.Consumer>
                {(state: MessagesStateContextProps) => (
                    <MessageComponentInner {...this.props} messagesContext={state} />
                )}
            </MessagesStateContext.Consumer>
        );
    }
}
