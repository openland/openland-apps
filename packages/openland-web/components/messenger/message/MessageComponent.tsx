
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
import { MessageReplyComponent } from './content/MessageReplyComponent';
import { isServerMessage, PendingMessage } from 'openland-engines/messenger/types';
import { ConversationEngine, DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { MessageUrlAugmentationComponent } from './content/attachments/MessageUrlAugmentationComponent';
import {
    MessageFull,
    UserShort,
    SharedRoomKind,
    MessageFull_urlAugmentation_user_User,
    MessageType,
} from 'openland-api/Types';
import { ReactionComponent } from './MessageReaction';
import { Reactions } from './MessageReaction';
import { MessagesStateContext, MessagesStateContextProps } from '../MessagesStateContext';
import { EditMessageInlineWrapper } from './edit/MessageEditComponent';
import { File, EditPostProps } from '../../../fragments/MessengerRootComponent';
import ReplyIcon from 'openland-icons/ic-reply1.svg';
import EditIcon from 'openland-icons/ic-edit.svg';
import { DesktopMessageContainer, MobileMessageContainer } from './MessageContainer';
import { MessagePostComponent } from './content/attachments/postMessage/MessagePostComponent';
import { ServiceMessageComponent } from './content/ServiceMessageComponent';
import { MessageIntroComponent } from './content/attachments/introMessage/MessageIntroComponent';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { string } from 'prop-types';

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
    message: DataSourceMessageItem;
    conversation: ConversationEngine;
    me?: UserShort | null;
    conversationType?: SharedRoomKind | 'PRIVATE';
    editPostHandler?: (data: EditPostProps) => void;
}

interface MessageComponentInnerProps extends MessageComponentProps {
    messagesContext: MessagesStateContextProps;
}

class DesktopMessageComponentInner extends React.PureComponent<
    MessageComponentInnerProps,
    { isEditView: boolean }
    > {

    static getDerivedStateFromProps = (props: MessageComponentInnerProps) => {
        if (!props.message.isSending) {
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
        if (!message.isSending) {

            e.stopPropagation();
            messagesContext.resetAll();
            messagesContext.setEditMessage(message.id!, message.text!);
        }
    };

    private setEditPostMessage = (e: any) => {
        let { message, editPostHandler } = this.props;
        if (!message.isSending && editPostHandler && message.title && message.text) {

            let postFiles: Set<File> = new Set();
            let file: File | null = null;

            (message.attachments || []).map(i => {
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
                title: message.title!,
                text: message.text!,
                postTipe: (message as any).alphaPostType,
                files: postFiles,
                messageId: message.id!,
            };

            editPostHandler(postData);
        }
    };

    private setReplyMessages = (e: any) => {
        let { message, messagesContext } = this.props;

        if (!message.isSending) {
            e.stopPropagation();
            messagesContext.resetAll();
            let singleReplyMessageMessage = new Set().add(message.text);
            let singleReplyMessageId = new Set().add(message.id);
            let singleReplyMessageSender = new Set().add(message.sender.name);

            if (message.file && !message.urlAugmentation) {
                singleReplyMessageMessage = new Set().add('File');
                if (message.file!!.isImage) {
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
            message.isSending ||
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
            if (forwardMessagesId.has(message.id!)) {
                selectedMessageId.delete(message.id!);
                messagesContext.setForwardMessages(selectedMessageId);
            } else {
                selectedMessageId.add(message.id!);
                messagesContext.setForwardMessages(selectedMessageId);
            }
        } else if (!forwardMessagesId && !selectedMessageId) {
            selectedMessageId = new Set<string>();
            selectedMessageId.add(message.id!);
            messagesContext.setForwardMessages(selectedMessageId);
        }
        if (!message.isSending) {
            messagesContext.switchMessageSelect(message);
        }
    };

    private hideEditView = () => {
        this.props.messagesContext.resetAll();
    };

    private menuRender = () => {
        let { message } = this.props;
        let out = message.isOut;
        if (!message.isSending) {

            const isPost = message.text && message.title && message.messageType === 'POST';

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
                        {isNotIntro && <ReactionComponent messageId={message.id!} />}
                        {!isPost && (
                            <IconButton onClick={this.setReplyMessages}>
                                <ReplyIcon />
                            </IconButton>
                        )}
                        {out && message.text && (
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

        if (!message.isSending) {

            if (
                !message.urlAugmentation ||
                (message.urlAugmentation && message.urlAugmentation!.type !== 'intro')
            ) {
                return (
                    <Reactions
                        messageId={message.id!}
                        reactions={message.reactions || []}
                        meId={this.props.me && this.props.me.id || ''}
                    />
                );
            }
        }

        return null;
    };

    render() {
        console.warn('MEssage render');
        let { message } = this.props;
        let content: any[] = [];
        let date: any = null;
        let edited = message.isEdited;

        let isSelect = false;
        let hideMenu = false;
        let isPost = false;
        let { forwardMessagesId } = this.props.messagesContext;
        if (forwardMessagesId) {
            isSelect = forwardMessagesId.has(message.id || 'none');
            if (forwardMessagesId.size > 0) {
                hideMenu = true;
            }
        }

        if (!message.isSending) {

            if (message.text && message.title && message.messageType === MessageType.POST) {
                isPost = true;
                let meId = this.props.me ? this.props.me.id : '';

                content.push(
                    <MessagePostComponent
                        key={'post_message' + message.id}
                        messageId={message.id!}
                        senderName={message.senderName}
                        userId={message.senderId}
                        message={message.text}
                        alphaTitle={message.title}
                        alphaButtons={message.buttons || []}
                        alphaAttachments={message.attachments || []}
                        reactions={message.reactions}
                        edited={!!message.isEdited}
                        meId={meId}
                        privateConversation={this.props.conversationType === 'PRIVATE'}
                    />,
                );
            }

            if (this.state.isEditView && message.text && !isPost) {
                content.push(
                    <EditMessageInlineWrapper
                        message={message}
                        key={'editForm'}
                        onClose={this.hideEditView}
                    />,
                );
            } else {
                if (message.text && message.text.length > 0 && !isPost) {
                    if (message.isService) {
                        content.push(
                            <ServiceMessageComponent
                                senderUser={{ id: message.senderId, name: message.senderName }}
                                myUserId={this.props.me ? this.props.me.id : ''}
                                serviceMetadata={message.serviceMetaData!}
                                message={message.text || ''}
                                alphaMentions={message.mentions || []}
                                key={'service_message'}
                            />,
                        );
                    } else {
                        content.push(
                            <MessageTextComponent
                                message={message.text || ''}
                                mentions={message.mentions || []}
                                key={'text'}
                                isEdited={!!message.isEdited}
                            />,
                        );
                    }
                }

                const { file } = message;
                if (file && !message.urlAugmentation) {

                    if (message.file!!.isImage && file.imageSize) {
                        if (message.file!.isGif) {
                            content.push(
                                <MessageAnimationComponent
                                    key={'file'}
                                    file={file.fileId!}
                                    fileName={name}
                                    {...file.imageSize}
                                />,
                            );
                        } else {
                            content.push(
                                <MessageImageComponent
                                    key={'file'}
                                    file={file.fileId!}
                                    fileName={name}
                                    startSelected={hideMenu}
                                    {...file.imageSize}
                                />,
                            );
                        }
                    } else {
                        content.push(
                            <MessageFileComponent
                                key={'file'}
                                file={file.fileId}
                                fileName={name}
                                fileSize={file.fileSize}
                            />,
                        );
                    }
                }
                if (message.urlAugmentation && !isPost) {
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
                            messageId={message.id!}
                            isMe={message.senderId === (this.props.me && this.props.me.id)}
                        />,
                    );
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
                                            : false;

                                    return (
                                        <MessageReplyComponent
                                            mentions={message.mentions || []}
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
            }
        } else {
            if (message.text && message.text.length > 0) {
                content.push(
                    <MessageTextComponent
                        message={message.text}
                        mentions={message.mentions}
                        key={'text'}
                        isService={false}
                        isEdited={!!message.isEdited}
                    />,
                );
            }
            // TODO: subscribe to dowload/upload
            if (message.progress !== undefined) {
                let progress = Math.round(message.progress * 100);
                let title = 'Uploading ' + message.file + ' (' + progress + '%)';
                content.push(
                    <MessageUploadComponent key={'file'} progress={progress} title={title} />,
                );
            }
            // TODO: recover retry button
            // if (message.failed) {
            //     let key = message.key;
            //     content.push(
            //         <XHorizontal>
            //             <XButton
            //                 onClick={() => this.props.conversation.cancelMessage(key)}
            //                 text="Cancel"
            //             />
            //             <XButton
            //                 onClick={() => this.props.conversation.retryMessage(key)}
            //                 text="Try Again"
            //             />
            //         </XHorizontal>,
            //     );
            // }
        }

        // Handle unknown messages: display empty message
        if (content.length === 0) {
            content.push(
                <MessageTextComponent
                    message={''}
                    mentions={null}
                    key={'text'}
                    isService={false}
                    isEdited={!!edited}
                />,
            );
        }

        if (!message.isService) {
            return (
                <DesktopMessageContainer
                    compact={message.attachTop}
                    selecting={hideMenu}
                    sender={message.sender}
                    date={this.props.message.date}
                    renderMenu={this.menuRender}
                    onSelected={this.selectMessage}
                    selected={isSelect}
                >
                    {content}
                    {!isPost && this.reactionsRender()}
                </DesktopMessageContainer>
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

const MobileMessageComponentInner = (props: MessageComponentProps) => {
    let { message } = props;

    let content: any[] = [];
    let hideMenu = false;
    let isPost = false;

    if (!message.isSending) {

        if (message.text && message.title && message.messageType === MessageType.POST) {
            isPost = true;
            let meId = props.me ? props.me.id : '';

            content.push(
                <MessagePostComponent
                    key={'post_message' + message.id}
                    messageId={message.id!}
                    senderName={message.sender.firstName}
                    userId={message.sender.id}
                    message={message.text}
                    alphaTitle={message.title}
                    alphaButtons={message.buttons || []}
                    alphaAttachments={message.attachments || []}
                    reactions={message.reactions}
                    edited={!!message.isEdited}
                    meId={meId}
                    privateConversation={props.conversationType === 'PRIVATE'}
                />,
            );
        }
        if (message.text && message.text.length > 0 && !isPost) {
            if (message.isService) {
                content.push(
                    <ServiceMessageComponent
                        senderUser={message.sender}
                        myUserId={props.me ? props.me.id : ''}
                        serviceMetadata={message.serviceMetaData!}
                        message={message.text || ''}
                        alphaMentions={message.mentions || []}
                        key={'service_message'}
                    />,
                );
            } else {
                content.push(
                    <MessageTextComponent
                        message={message.text || ''}
                        mentions={message.mentions}
                        key={'text'}
                        isEdited={!!message.isEdited}
                    />,
                );
            }
        }

        if (message.file) {

            if (message.file!!.isImage && message.file.imageSize) {
                if (message.file!!.isGif) {
                    content.push(
                        <MessageAnimationComponent
                            key={'file'}
                            file={message.file.fileId!}
                            fileName={name}
                            {...message.file.imageSize}
                        />,
                    );
                } else {
                    content.push(
                        <MessageImageComponent
                            key={'file'}
                            file={message.file.fileId!}
                            fileName={name}
                            startSelected={hideMenu}
                            {...message.file.imageSize}

                        />,
                    );
                }
            } else {
                content.push(
                    <MessageFileComponent
                        key={'file'}
                        file={message.file.fileId}
                        fileName={name}
                        fileSize={message.file.fileSize}
                    />,
                );
            }
        }
        if (message.urlAugmentation && !isPost) {
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
                    messageId={message.id!}
                    isMe={message.senderId === (props.me && props.me.id)}
                />,
            );
        }
        if (message.reply && message.reply!.length > 0) {
            content.push(
                <ReplyMessageWrapper key={'reply_message' + message.id}>
                    {message
                        .reply!.sort((a, b) => a.date - b.date)
                        .map((item, index, array) => {
                            let isCompact =
                                index > 0 ? array[index - 1].sender.id === item.sender.id : false;

                            return (
                                <MessageReplyComponent
                                    mentions={message.mentions || []}
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
    } else {
        if (message.text && message.text.length > 0) {
            content.push(
                <MessageTextComponent
                    message={message.text}
                    mentions={message.mentions}
                    key={'text'}
                    isService={false}
                    isEdited={!!message.isEdited}
                />,
            );
        }
        if (message.progress !== undefined) {
            let progress = Math.round(message.progress * 100);
            let title = 'Uploading ' + message.file + ' (' + progress + '%)';
            content.push(
                <MessageUploadComponent key={'file'} progress={progress} title={title} />,
            );
        }
        // if (message.failed) {
        //     let key = message.key;
        //     content.push(
        //         <XHorizontal>
        //             <XButton onClick={() => props.conversation.cancelMessage(key)} text="Cancel" />
        //             <XButton
        //                 onClick={() => props.conversation.retryMessage(key)}
        //                 text="Try Again"
        //             />
        //         </XHorizontal>,
        //     );
        // }
    }

    // Handle unknown messages: display empty message
    if (content.length === 0) {
        content.push(
            <MessageTextComponent
                message={''}
                mentions={null}
                key={'text'}
                isService={false}
                isEdited={!!message.isEdited}
            />,
        );
    }

    if (!message.isService) {
        return (
            <MobileMessageContainer sender={message.sender} date={props.message.date}>
                {content}
            </MobileMessageContainer>
        );
    }

    return (
        <MessageWrapper
            compact={false}
            isEditView={false}
            separator={6}
            alignItems="center"
            startSelected={hideMenu}
        >
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
                        maxWidth={!message.isService ? 'calc(100% - 52px)' : 'calc(100% - 25px)'}
                    >
                        {content}
                    </XVertical>
                </XHorizontal>
            </XVertical>
        </MessageWrapper>
    );
};

export const MessageComponent = React.memo<MessageComponentProps>(props => {
    const messagesContextProps = React.useContext(MessagesStateContext);
    const { isMobile } = React.useContext(MobileSidebarContext);

    return isMobile ? (
        <MobileMessageComponentInner {...props} />
    ) : (
            <DesktopMessageComponentInner {...props} messagesContext={messagesContextProps} />
        );
});
