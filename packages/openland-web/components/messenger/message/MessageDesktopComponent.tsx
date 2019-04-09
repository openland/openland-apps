import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { MessageTextComponent, MessageTextComponentSpanned } from './content/MessageTextComponent';
import { MessageAnimationComponent } from './content/MessageAnimationComponent';
import { MessageImageComponent } from './content/MessageImageComponent';
import { MessageFileComponent } from './content/MessageFileComponent';
import { MessageVideoComponent } from './content/MessageVideoComponent';
import { MessageUploadComponent } from './content/MessageUploadComponent';
import { MessageReplyComponent } from './content/MessageReplyComponent';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessageUrlAugmentationComponent } from './content/attachments/MessageUrlAugmentationComponent';
import {
    UserShort,
    SharedRoomKind,
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
} from 'openland-api/Types';
import { ReactionComponent } from './MessageReaction';
import { Reactions } from './MessageReaction';
import { MessagesStateContextProps } from '../MessagesStateContext';
import { EditMessageInlineWrapper } from './edit/MessageEditComponent';
import { EditPostProps } from '../../../fragments/MessengerRootComponent';
import ReplyIcon from 'openland-icons/ic-reply1.svg';
import EditIcon from 'openland-icons/ic-edit.svg';
import { DesktopMessageContainer } from './MessageContainer';
import { ServiceMessageComponent } from './content/ServiceMessageComponent';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';

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
        top: 0,
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

export interface MessageComponentProps {
    message: DataSourceWebMessageItem;
    conversation: ConversationEngine;
    me?: UserShort | null;
    conversationType?: SharedRoomKind | 'PRIVATE';
    editPostHandler?: (data: EditPostProps) => void;
}

interface MessageComponentInnerProps extends MessageComponentProps {
    messagesContext: MessagesStateContextProps;
}

export class DesktopMessageComponentInner extends React.PureComponent<
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

    private setReplyMessages = (e: any) => {
        let { message, messagesContext } = this.props;

        if (!message.isSending) {
            e.stopPropagation();
            messagesContext.resetAll();
            let singleReplyMessageMessage = new Set().add(message.text);
            let singleReplyMessageId = new Set().add(message.id);
            let singleReplyMessageSender = new Set().add(message.sender.name);

            let fileAttach = (message.attachments || []).filter(
                a => a.__typename === 'MessageAttachmentFile',
            )[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
            let richAttach = (message.attachments || []).filter(
                a => a.__typename === 'MessageRichAttachment',
            )[0];

            if (fileAttach && !richAttach) {
                singleReplyMessageMessage = new Set().add('File');
                if (fileAttach.fileMetadata.isImage) {
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
                        <ReactionComponent messageId={message.id!} />
                        <IconButton onClick={this.setReplyMessages}>
                            <ReplyIcon />
                        </IconButton>
                        {out && message.text && (
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

        if (!message.isSending) {
            return (
                <Reactions
                    messageId={message.id!}
                    reactions={message.reactions || []}
                    meId={(this.props.me && this.props.me.id) || ''}
                />
            );
        }

        return null;
    };

    render() {
        let { message } = this.props;
        let content: any[] = [];
        let date: any = null;
        let edited = message.isEdited;

        let fileAttach = (message.attachments || []).filter(
            a => a.__typename === 'MessageAttachmentFile',
        )[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
        let richAttach = (message.attachments || []).filter(
            a => a.__typename === 'MessageRichAttachment',
        )[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;

        let isSelect = false;
        let hideMenu = false;
        let { forwardMessagesId } = this.props.messagesContext;
        if (forwardMessagesId) {
            isSelect = forwardMessagesId.has(message.id || 'none');
            if (forwardMessagesId.size > 0) {
                hideMenu = true;
            }
        }

        if (!message.isSending) {
            if (this.state.isEditView && message.text) {
                content.push(
                    <EditMessageInlineWrapper
                        message={message}
                        key={'editForm'}
                        onClose={this.hideEditView}
                        variables={{
                            roomId: this.props.conversation.conversationId,
                        }}
                    />,
                );
            } else {
                if (message.reply && message.reply!.length > 0) {
                    content.push(
                        <ReplyMessageWrapper key={'reply_message' + message.id}>
                            {message.reply!.map((item, index, array) => {
                                let isCompact =
                                    index > 0
                                        ? array[index - 1].sender.id === item.sender.id
                                        : false;

                                let qfileAttach = (item.__typename === 'GeneralMessage'
                                    ? (item.attachments || []).filter(
                                          a => a.__typename === 'MessageAttachmentFile',
                                      )[0]
                                    : undefined) as
                                    | FullMessage_GeneralMessage_attachments_MessageAttachmentFile
                                    | undefined;

                                return (
                                    <MessageReplyComponent
                                        attach={qfileAttach}
                                        spans={item.spans}
                                        sender={item.sender}
                                        date={item.date}
                                        message={item.message}
                                        id={item.id}
                                        key={'reply_message' + item.id + index}
                                        edited={item.__typename === 'GeneralMessage' && item.edited}
                                        startSelected={hideMenu}
                                        compact={isCompact || undefined}
                                    />
                                );
                            })}
                        </ReplyMessageWrapper>,
                    );
                }
                if (message.text && message.text.length > 0) {
                    if (message.isService) {
                        content.push(
                            <ServiceMessageComponent
                                senderUser={{ id: message.senderId, name: message.senderName }}
                                myUserId={this.props.me ? this.props.me.id : ''}
                                serviceMetadata={message.serviceMetaData!}
                                message={message.text || ''}
                                spans={message.spans || []}
                                key={'service_message'}
                            />,
                        );
                    } else {
                        content.push(
                            <MessageTextComponentSpanned
                                spannedString={message.textSpannedString!}
                                key={'text'}
                                isEdited={!!message.isEdited}
                            />,
                        );
                    }
                }

                if (fileAttach && !richAttach) {
                    if (fileAttach.fileMetadata.isImage) {
                        if (fileAttach.fileMetadata.imageFormat === 'gif') {
                            content.push(
                                <MessageAnimationComponent
                                    key={'file'}
                                    file={fileAttach.fileId!}
                                    fileName={fileAttach.fileMetadata.name}
                                    width={fileAttach.fileMetadata.imageWidth || 0}
                                    height={fileAttach.fileMetadata.imageHeight || 0}
                                />,
                            );
                        } else {
                            content.push(
                                <MessageImageComponent
                                    key={'file'}
                                    file={fileAttach.fileId!}
                                    fileName={fileAttach.fileMetadata.name}
                                    width={fileAttach.fileMetadata.imageWidth || 0}
                                    height={fileAttach.fileMetadata.imageHeight || 0}
                                    startSelected={hideMenu}
                                />,
                            );
                        }
                    } else if (
                        fileAttach.fileMetadata.name.endsWith('.mp4') ||
                        fileAttach.fileMetadata.name.endsWith('.mov')
                    ) {
                        content.push(
                            <MessageVideoComponent
                                key={'file'}
                                file={fileAttach.fileId}
                                fileName={fileAttach.fileMetadata.name}
                            />,
                        );
                    } else {
                        content.push(
                            <MessageFileComponent
                                key={'file'}
                                file={fileAttach.fileId}
                                fileName={fileAttach.fileMetadata.name}
                                fileSize={fileAttach.fileMetadata.size}
                            />,
                        );
                    }
                }
                if (richAttach && richAttach.titleLink && !message.isService) {
                    if (
                        richAttach.titleLink.startsWith('https://app.openland.com/o') &&
                        richAttach.titleLink.includes('listings#')
                    ) {
                        content = [];
                    }
                    content.push(
                        <MessageUrlAugmentationComponent
                            key="urlAugmentation"
                            messageId={message.id!}
                            isMe={message.senderId === (this.props.me && this.props.me.id)}
                            {...richAttach}
                        />,
                    );
                }
            }
        } else {
            if (message.text && message.text.length > 0) {
                content.push(
                    <MessageTextComponent
                        message={message.text}
                        spans={message.spans}
                        key={'text'}
                        isService={false}
                        isEdited={!!message.isEdited}
                    />,
                );
            }
            // TODO: subscribe to dowload/upload
            if (message.progress !== undefined) {
                let progress = Math.round(message.progress * 100);
                let title = 'Uploading (' + progress + '%)';
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
                    spans={[]}
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
                    {this.reactionsRender()}
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
