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
} from 'openland-api/Types';
import { Reactions } from './reactions/MessageReaction';
import { MessagesStateContextProps } from '../MessagesStateContext';
import { EditMessageInlineWrapper } from './edit/MessageEditComponent';
import { DesktopMessageContainer } from './MessageContainer';
import { ServiceMessageComponent } from './content/ServiceMessageComponent';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { XView } from 'react-mental';
import { XDate } from 'openland-x/XDate';
import CommentChannelIcon from 'openland-icons/ic-comment-channel.svg';
import CommentEmptyChannelIcon from 'openland-icons/ic-comment-empty-channel.svg';
import { showModalBox } from 'openland-x/showModalBox';
import { CommentsInner } from 'openland-web/components/messenger/message/content/CommentsModal';

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
        top: 0,
        bottom: 4,
        width: 3,
        borderRadius: 3,
        backgroundColor: '#1790ff',
    },
});

export interface MessageComponentProps {
    isPinned?: boolean;
    isModal?: boolean;
    commentDepth?: number;
    message: DataSourceWebMessageItem;
    isChannel: boolean;
    hasComments?: boolean;
    noSelector?: boolean;
    isComment?: boolean;
    onCommentReplyClick?: (event: React.MouseEvent<any>) => void;
    conversationId?: string;
    conversationType?: SharedRoomKind | 'PRIVATE';
    me?: UserShort | null;
    onlyLikes?: boolean;
    haveReactions?: boolean;
    isSelect?: boolean;
}

interface MessageComponentInnerProps extends MessageComponentProps {
    messagesContext: MessagesStateContextProps;
}

const DiscussButton = ({
    commentsCount,
    messageId,
    conversationId,
}: {
    commentsCount: number | null;
    messageId: string;
    conversationId: string;
}) => {
    return (
        <XView
            cursor="pointer"
            borderRadius={14}
            backgroundColor="rgba(23, 144, 255, 0.1)"
            height={28}
            fontSize={13}
            justifyContent="center"
            alignItems="center"
            color="#1790ff"
            paddingLeft={12}
            paddingRight={12}
            onClick={() =>
                showModalBox({ width: 800 }, () => (
                    <CommentsInner messageId={messageId} roomId={conversationId} />
                ))
            }
        >
            {commentsCount ? (
                <XView flexDirection="row">
                    <CommentChannelIcon /> <XView marginLeft={4}>{commentsCount} comments</XView>
                </XView>
            ) : (
                <XView flexDirection="row">
                    <CommentEmptyChannelIcon /> <XView marginLeft={4}>Discuss</XView>
                </XView>
            )}
        </XView>
    );
};

export class DesktopMessageComponentInner extends React.PureComponent<
    MessageComponentInnerProps,
    { isEditView: boolean }
> {
    constructor(props: MessageComponentInnerProps) {
        super(props);

        this.state = {
            isEditView: false,
        };
    }

    componentDidUpdate() {
        const isEditView = this.props.messagesContext.editMessageId === this.props.message.id;

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
        let { message, onCommentReplyClick, isSelect, haveReactions } = this.props;
        let content: any[] = [];
        let edited = message.isEdited;

        let fileAttach = (message.attachments || []).filter(
            a => a.__typename === 'MessageAttachmentFile',
        )[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
        let richAttach = (message.attachments || []).filter(
            a => a.__typename === 'MessageRichAttachment',
        )[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;

        let selected = false;
        let hideMenu = this.props.messagesContext.useForwardHeader;
        let { forwardMessagesId } = this.props.messagesContext;
        if (forwardMessagesId) {
            selected = forwardMessagesId.has(message.id || 'none');
        }

        if (!message.isSending) {
            if (this.state.isEditView && message.text && this.props.conversationId) {
                content.push(
                    <EditMessageInlineWrapper
                        message={message}
                        key={'editForm'}
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
            const postMessageButtons = (
                <>
                    {this.props.isComment && (
                        <>
                            <XView flexDirection="row" marginTop={4}>
                                <XView
                                    paddingRight={12}
                                    fontSize={12}
                                    opacity={0.4}
                                    color="#000"
                                    fontWeight="600"
                                >
                                    <XDate
                                        value={this.props.message.date.toString()}
                                        format="time"
                                    />
                                </XView>
                                <XView
                                    color="#1790ff"
                                    fontWeight="600"
                                    fontSize={12}
                                    cursor="pointer"
                                    onClick={onCommentReplyClick}
                                >
                                    Reply
                                </XView>
                            </XView>
                        </>
                    )}
                    {!this.props.isComment && (
                        <XView flexDirection="row">
                            <XHorizontal alignItems="center" separator={5}>
                                {this.props.hasComments && (
                                    <XView paddingTop={6}>
                                        <DiscussButton
                                            commentsCount={this.props.message.commentsCount}
                                            messageId={this.props.message.id!!}
                                            conversationId={this.props.conversationId!!}
                                        />
                                    </XView>
                                )}

                                {!message.isSending &&
                                ((message.reactions && message.reactions.length) ||
                                    this.props.isChannel) ? (
                                    <XView paddingTop={4}>
                                        <Reactions
                                            onlyLikes={this.props.onlyLikes}
                                            messageId={message.id!}
                                            reactions={message.reactions || []}
                                            meId={(this.props.me && this.props.me.id) || ''}
                                        />
                                    </XView>
                                ) : null}
                            </XHorizontal>
                        </XView>
                    )}
                </>
            );

            return (
                <DesktopMessageContainer
                    haveReactions={!!haveReactions}
                    isPinned={this.props.isPinned}
                    commentDepth={this.props.commentDepth}
                    isModal={this.props.isModal}
                    hasComments={this.props.hasComments}
                    isChannel={this.props.isChannel}
                    isComment={this.props.isComment}
                    noSelector={this.props.noSelector}
                    message={this.props.message}
                    compact={message.attachTop}
                    selecting={hideMenu}
                    sender={message.sender}
                    senderNameEmojify={message.senderNameEmojify}
                    date={this.props.message.date}
                    onSelected={this.selectMessage}
                    selected={!!isSelect}
                >
                    {content}
                    {this.props.isModal && <XView paddingTop={12}>{postMessageButtons}</XView>}
                    {!this.props.isModal && postMessageButtons}
                </DesktopMessageContainer>
            );
        }

        return (
            <MessageWrapper
                isModal={this.props.isModal}
                compact={false}
                isEditView={this.state.isEditView}
                separator={6}
                alignItems="center"
                startSelected={hideMenu}
            >
                <Check onClick={this.selectMessage} select={!!isSelect} className="check-icon" />

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
