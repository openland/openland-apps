import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { MessageTextComponent } from './content/MessageTextComponent';
import { MessageAnimationComponent } from './content/MessageAnimationComponent';
import { MessageImageComponent } from './content/MessageImageComponent';
import { MessageFileComponent } from './content/MessageFileComponent';
import { MessageVideoComponent } from './content/MessageVideoComponent';
import { MessageUploadComponent } from './content/MessageUploadComponent';
import { MessageReplyComponent } from './content/MessageReplyComponent';
import {
    ConversationEngine,
    DataSourceMessageItem,
} from 'openland-engines/messenger/ConversationEngine';
import { MessageUrlAugmentationComponent } from './content/attachments/MessageUrlAugmentationComponent';
import { UserShort, SharedRoomKind, MessageType, FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { EditPostProps } from '../../../fragments/MessengerRootComponent';
import { MobileMessageContainer } from './MessageContainer';
import { MessagePostComponent } from './content/attachments/postMessage/MessagePostComponent';
import { ServiceMessageComponent } from './content/ServiceMessageComponent';

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

interface MessageComponentProps {
    message: DataSourceMessageItem;
    conversation: ConversationEngine;
    me?: UserShort | null;
    conversationType?: SharedRoomKind | 'PRIVATE';
    editPostHandler?: (data: EditPostProps) => void;
}

export const MobileMessageComponentInner = React.memo((props: MessageComponentProps) => {
    let { message } = props;

    let content: any[] = [];
    let hideMenu = false;

    let fileAttach = (message.attachments || []).filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
    let reachAttach = (message.attachments || []).filter(a => a.__typename === 'MessageRichAttachment')[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;

    if (!message.isSending) {

        if (message.reply && message.reply!.length > 0) {
            content.push(
                <ReplyMessageWrapper key={'reply_message' + message.id}>
                    {message.reply!.sort((a, b) => a.date - b.date).map((item, index, array) => {
                        let isCompact =
                            index > 0 ? array[index - 1].sender.id === item.sender.id : false;

                        return (
                            <MessageReplyComponent
                                spans={message.spans}
                                sender={item.sender}
                                date={item.date}
                                message={item.message}
                                id={item.id}
                                key={'reply_message' + item.id + index}
                                edited={!!(item.__typename === 'GeneralMessage' && message.isEdited)}
                                attach={fileAttach}
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
                        senderUser={message.sender}
                        myUserId={props.me ? props.me.id : ''}
                        serviceMetadata={message.serviceMetaData!}
                        message={message.text || ''}
                        spans={message.spans}
                        key={'service_message'}
                    />,
                );
            } else {
                content.push(
                    <MessageTextComponent
                        message={message.text || ''}
                        spans={message.spans}
                        key={'text'}
                        isEdited={!!message.isEdited}
                    />,
                );
            }
        }

        if (fileAttach && !reachAttach) {
            if (fileAttach.fileMetadata.isImage && fileAttach.fileMetadata.imageWidth && fileAttach.fileMetadata.imageHeight) {
                if (fileAttach.fileMetadata.imageFormat === 'gif') {
                    content.push(
                        <MessageAnimationComponent
                            key={'file'}
                            file={fileAttach.fileId!}
                            fileName={fileAttach.fileMetadata.name}
                            width={fileAttach.fileMetadata.imageWidth}
                            height={fileAttach.fileMetadata.imageHeight}
                        />,
                    );
                } else {
                    content.push(
                        <MessageImageComponent
                            key={'file'}
                            file={fileAttach.fileId!}
                            fileName={fileAttach.fileMetadata.name}
                            startSelected={hideMenu}
                            width={fileAttach.fileMetadata.imageWidth}
                            height={fileAttach.fileMetadata.imageHeight}
                        />,
                    );
                }
            } else if (fileAttach.fileMetadata.name.endsWith('.mp4') || fileAttach.fileMetadata.name.endsWith('.mov')) {
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
        if (reachAttach && !message.isService) {
            if (reachAttach.titleLink &&
                (reachAttach.titleLink.startsWith('https://app.openland.com/o') ||
                    reachAttach.titleLink.startsWith('https://openland.com/o')) &&
                reachAttach.titleLink.includes('listings#')
            ) {
                content = [];
            }
            content.push(
                <MessageUrlAugmentationComponent
                    key="urlAugmentation"
                    {...reachAttach}
                    messageId={message.id!}
                    isMe={message.senderId === (props.me && props.me.id)}
                />,
            );
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
        if (message.progress !== undefined) {
            let progress = Math.round(message.progress * 100);
            let title = 'Uploading (' + progress + '%)';
            content.push(<MessageUploadComponent key={'file'} progress={progress} title={title} />);
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
                message={
                    'Message is not supported on your version of Openland. Please refresh the page to view it.'
                }
                spans={[]}
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
});
