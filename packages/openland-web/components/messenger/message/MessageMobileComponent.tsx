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
import { UserShort, SharedRoomKind, MessageType } from 'openland-api/Types';
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

export const MobileMessageComponentInner = (props: MessageComponentProps) => {
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
        if (message.reply && message.reply!.length > 0) {
            content.push(
                <ReplyMessageWrapper key={'reply_message' + message.id}>
                    {message.reply!.sort((a, b) => a.date - b.date).map((item, index, array) => {
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

        const { file } = message;
        if (file && !message.urlAugmentation) {
            if (file.isImage && file.imageSize) {
                if (file.isGif) {
                    content.push(
                        <MessageAnimationComponent
                            key={'file'}
                            file={file.fileId!}
                            fileName={file.fileName}
                            {...file.imageSize}
                        />,
                    );
                } else {
                    content.push(
                        <MessageImageComponent
                            key={'file'}
                            file={file.fileId!}
                            fileName={file.fileName}
                            startSelected={hideMenu}
                            {...file.imageSize}
                        />,
                    );
                }
            } else if (file.fileName.endsWith('.mp4') || file.fileName.endsWith('.mov')) {
                content.push(
                    <MessageVideoComponent
                        key={'file'}
                        file={file.fileId}
                        fileName={file.fileName}
                    />,
                );
            } else {
                content.push(
                    <MessageFileComponent
                        key={'file'}
                        file={file.fileId}
                        fileName={file.fileName}
                        fileSize={file.fileSize}
                    />,
                );
            }
        }
        if (message.urlAugmentation && !isPost) {
            if (
                (message.urlAugmentation.url.startsWith('https://app.openland.com/o') ||
                    message.urlAugmentation.url.startsWith('https://openland.com/o')) &&
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
