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
import { MessageUrlAugmentationComponent } from './content/attachments/MessageUrlAugmentationComponent';
import {
    UserShort,
    SharedRoomKind,
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
    RoomChat_room,
} from 'openland-api/Types';
import { MessagesStateContextProps } from '../MessagesStateContext';
import { EditMessageInline } from './edit/MessageEditComponent';
import { DesktopMessageContainer } from './MessageContainer';
import { ServiceMessageComponent } from './content/ServiceMessageComponent';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { PostMessageButtons, CommentPropsT } from './PostMessageButtons';
import { XView } from 'react-mental';
import { ContextStateInterface } from 'openland-x/createPoliteContext';

const Check = Glamorous.div<{ selected: boolean }>(({ selected }) => ({
    flexShrink: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: selected ? '#1790ff' : '#fff',
    backgroundImage: selected ? "url('/static/img/icons/check-form.svg')" : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    border: selected ? undefined : '1px solid #D9D9D9',
}));

const MessageWrapper = Glamorous(XHorizontal)<{
    isModal?: boolean;
    compact: boolean;
    isEditView: boolean;
    startSelected: boolean;
}>(props => ({
    marginTop: props.compact || props.isModal ? 0 : 12,
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

export interface MessageComponentProps {
    isPinned?: boolean;
    isModal?: boolean;
    isChannel?: boolean;
    isCommentNotification?: boolean;
    isComment?: boolean;
    deleted?: boolean;
    showNumberOfComments?: boolean;
    commentDepth?: number;
    message: DataSourceWebMessageItem & { depth?: number };
    noSelector?: boolean;
    commentProps?: CommentPropsT;
    conversationId?: string | null;
    conversationType?: SharedRoomKind | 'PRIVATE';
    me?: UserShort | null;
    onlyLikes?: boolean;
    haveReactions?: boolean;
    usernameOfRepliedUser?: string;
    room?: RoomChat_room;
    replyQuoteText?: string | null;
    onCommentBackToUserMessageClick?: (event: React.MouseEvent<any>) => void;
    onCommentNotificationsReplyClick?: (event: React.MouseEvent<any>) => void;
}

interface MessageComponentInnerProps extends MessageComponentProps {
    messagesContext: MessagesStateContextProps;
    isActive: ContextStateInterface<boolean>;
}

interface DesktopMessageComponentInnerState {
    isEditView: boolean;
    selected: boolean;
    hideMenu: boolean;
}

const MessageImageComponentWrapper = React.memo(
    ({
        isComment,
        message,
        hideMenu,
        fileAttach,
    }: {
        fileAttach: any;
        isComment: boolean;
        message: any;
        hideMenu: any;
    }) => {
        const originalWidth = fileAttach.fileMetadata.imageWidth || 0;
        const originalHeight = fileAttach.fileMetadata.imageHeight || 0;

        const dimentions = {
            originalWidth,
            originalHeight,
            width: isComment ? 180 : originalWidth,
            height: isComment ? 120 : originalHeight,
        };

        return (
            <MessageImageComponent
                key={'file' + message.id}
                file={fileAttach.fileId!}
                fileName={fileAttach.fileMetadata.name}
                dimentions={dimentions}
                startSelected={hideMenu}
            />
        );
    },
);

export class DesktopMessageComponentInner extends React.PureComponent<
    MessageComponentInnerProps,
    DesktopMessageComponentInnerState
> {
    constructor(props: MessageComponentInnerProps) {
        super(props);

        this.state = {
            isEditView: false,
            selected: false,
            hideMenu: false,
        };
    }

    componentDidUpdate() {
        const { message, messagesContext } = this.props;

        const isEditView = messagesContext.editMessageId === message.id;

        let selected = false;
        let hideMenu = messagesContext.useForwardHeader;
        let { forwardMessagesId } = messagesContext;
        if (forwardMessagesId) {
            selected = forwardMessagesId.has(message.id || 'none');
        }

        if (this.props.isActive.getValue()) {
            this.setState({
                selected: selected,
                hideMenu: hideMenu,
            });

            if (isEditView) {
                let el = ReactDOM.findDOMNode(this);
                (el as Element).scrollIntoView();
                this.setState({
                    isEditView: true,
                });
            } else {
                this.setState({
                    isEditView: false,
                });
            }
        } else {
            this.setState({
                isEditView: false,
                selected: false,
                hideMenu: false,
            });
        }
    }

    componentWillUnmount() {
        this.props.messagesContext.resetAll();
        this.setState({
            isEditView: false,
        });
    }

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

    render() {
        let {
            message,
            commentProps,
            haveReactions,
            usernameOfRepliedUser,
            onCommentBackToUserMessageClick,
        } = this.props;

        const { isEditView, selected, hideMenu } = this.state;

        let content: any[] = [];
        let edited = message.isEdited;

        let fileAttach = (message.attachments || []).filter(
            a => a.__typename === 'MessageAttachmentFile',
        )[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
        let richAttach = (message.attachments || []).filter(
            a => a.__typename === 'MessageRichAttachment',
        )[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;

        if (!message.isSending) {
            if (isEditView && message.text && this.props.conversationId) {
                content.push(
                    <EditMessageInline
                        conversationType={this.props.conversationType}
                        commentProps={this.props.commentProps}
                        isComment={!!this.props.isComment}
                        minimal={!!this.props.isComment}
                        message={message}
                        key={'editForm' + message.id}
                        onClose={this.hideEditView}
                        variables={{
                            roomId: this.props.conversationId,
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
                                        isChannel={!!this.props.isChannel}
                                        senderNameEmojify={message.replySenderNameEmojify[index]}
                                        attach={qfileAttach}
                                        spans={message.replyTextSpans[index]}
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
                                spans={message.textSpans}
                                key={'service_message' + message.id}
                            />,
                        );
                    } else {
                        if (this.props.deleted) {
                            content.push(
                                <XView key={'text' + message.id} color={'rgba(0, 0, 0, 0.5)'}>
                                    {message.text}
                                </XView>,
                            );
                        } else {
                            content.push(
                                <MessageTextComponentSpanned
                                    isChannel={!!this.props.isChannel}
                                    isComment={this.props.isComment}
                                    spans={message.textSpans}
                                    key={'text' + message.id}
                                    isEdited={!!message.isEdited}
                                />,
                            );
                        }
                    }
                }

                if (fileAttach && !richAttach) {
                    if (fileAttach.fileMetadata.isImage) {
                        if (fileAttach.fileMetadata.imageFormat === 'GIF') {
                            content.push(
                                <MessageAnimationComponent
                                    key={'file' + message.id}
                                    file={fileAttach.fileId!}
                                    fileName={fileAttach.fileMetadata.name}
                                    width={fileAttach.fileMetadata.imageWidth || 0}
                                    height={fileAttach.fileMetadata.imageHeight || 0}
                                />,
                            );
                        } else {
                            content.push(
                                <MessageImageComponentWrapper
                                    key={'image' + message.id}
                                    fileAttach={fileAttach}
                                    isComment={!!this.props.isComment}
                                    message={message}
                                    hideMenu={hideMenu}
                                />,
                            );
                        }
                    } else if (
                        fileAttach.fileMetadata.name.endsWith('.mp4') ||
                        fileAttach.fileMetadata.name.endsWith('.mov')
                    ) {
                        content.push(
                            <MessageVideoComponent
                                key={'file' + message.id}
                                file={fileAttach.fileId}
                                fileName={fileAttach.fileMetadata.name}
                            />,
                        );
                    } else {
                        content.push(
                            <MessageFileComponent
                                key={'file' + message.id}
                                file={fileAttach.fileId}
                                fileName={fileAttach.fileMetadata.name}
                                fileSize={fileAttach.fileMetadata.size}
                                marginBottom={3}
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
                            key={'urlAugmentation' + message.id}
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
                        isChannel={!!this.props.isChannel}
                        isComment={this.props.isComment}
                        spans={message.textSpans}
                        key={'text' + message.id}
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
                    <MessageUploadComponent
                        key={'file' + message.id}
                        progress={progress}
                        title={title}
                    />,
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
                    spans={[]}
                    key={'text' + message.id}
                    isService={false}
                    isChannel={!!this.props.isChannel}
                    isEdited={!!edited}
                />,
            );
        }

        if (!message.isService) {
            const postMessageButtons =
                isEditView && !!this.props.isComment ? null : (
                    <PostMessageButtons
                        showNumberOfComments={this.props.showNumberOfComments}
                        isModal={!!this.props.isModal}
                        isComment={!!this.props.isComment}
                        isCommentNotification={!!this.props.isCommentNotification}
                        onlyLikes={!!this.props.onlyLikes}
                        isChannel={this.props.isChannel}
                        message={this.props.message}
                        conversationId={this.props.conversationId}
                        me={this.props.me}
                        onCommentBackToUserMessageClick={onCommentBackToUserMessageClick}
                        onCommentNotificationsReplyClick={
                            this.props.onCommentNotificationsReplyClick
                        }
                        usernameOfRepliedUser={usernameOfRepliedUser}
                        commentProps={commentProps}
                        room={this.props.room}
                    />
                );

            return (
                <DesktopMessageContainer
                    replyQuoteText={this.props.replyQuoteText}
                    isCommentNotification={this.props.isCommentNotification}
                    isModal={this.props.isModal}
                    isPinned={this.props.isPinned}
                    isEditView={isEditView}
                    isEdited={!!this.props.message.isEdited}
                    isComment={this.props.isComment}
                    deleted={this.props.deleted}
                    conversationId={this.props.conversationId!!}
                    haveReactions={!!haveReactions}
                    commentDepth={this.props.commentDepth}
                    noSelector={this.props.noSelector}
                    message={this.props.message}
                    date={this.props.message.date}
                    onSelected={this.selectMessage}
                    compact={message.attachTop}
                    selecting={hideMenu}
                    sender={message.sender}
                    senderNameEmojify={message.senderNameEmojify}
                    selected={!!selected}
                    selectMessage={this.selectMessage}
                    room={this.props.room}
                >
                    {content}
                    {postMessageButtons}
                </DesktopMessageContainer>
            );
        }

        return (
            <MessageWrapper
                isModal={this.props.isModal}
                compact={false}
                isEditView={isEditView}
                separator={6}
                alignItems="center"
                startSelected={hideMenu}
            >
                <Check onClick={this.selectMessage} selected={!!selected} className="check-icon" />

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
