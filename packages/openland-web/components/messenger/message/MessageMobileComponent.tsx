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
import { MessageUrlAugmentationComponent } from './content/attachments/MessageUrlAugmentationComponent';
import {
    UserShort,
    SharedRoomKind,
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    FullMessage_GeneralMessage_attachments_MessageRichAttachment,
} from 'openland-api/Types';
import { XView } from 'react-mental';
import { MobileMessageContainer } from './MessageContainer';
import { ServiceMessageComponent } from './content/ServiceMessageComponent';
import { Reactions } from './reactions/MessageReaction';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';

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

interface MessageComponentProps {
    message: DataSourceWebMessageItem;
    me?: UserShort | null;
    conversationType?: SharedRoomKind | 'PRIVATE';
}

export const MobileMessageComponentInner = React.memo((props: MessageComponentProps) => {
    let { message } = props;

    let content: any[] = [];
    let hideMenu = false;

    let fileAttach = (message.attachments || []).filter(
        a => a.__typename === 'MessageAttachmentFile',
    )[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;
    let richAttach = (message.attachments || []).filter(
        a => a.__typename === 'MessageRichAttachment',
    )[0] as FullMessage_GeneralMessage_attachments_MessageRichAttachment | undefined;

    if (!message.isSending) {
        if (message.reply && message.reply!.length > 0) {
            content.push(
                <ReplyMessageWrapper key={'reply_message' + message.id}>
                    {message.reply!.map((item, index, array) => {
                        let isCompact =
                            index > 0 ? array[index - 1].sender.id === item.sender.id : false;

                        let qfileAttach = (item.__typename === 'GeneralMessage'
                            ? (item.attachments || []).filter(
                                  a => a.__typename === 'MessageAttachmentFile',
                              )[0]
                            : undefined) as
                            | FullMessage_GeneralMessage_attachments_MessageAttachmentFile
                            | undefined;

                        return (
                            <MessageReplyComponent
                                spans={message.spans}
                                sender={item.sender}
                                date={item.date}
                                message={item.message}
                                id={item.id}
                                key={'reply_message' + item.id + index}
                                edited={
                                    !!(item.__typename === 'GeneralMessage' && message.isEdited)
                                }
                                attach={qfileAttach}
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

        if (fileAttach && !richAttach) {
            if (
                fileAttach.fileMetadata.isImage &&
                fileAttach.fileMetadata.imageWidth &&
                fileAttach.fileMetadata.imageHeight
            ) {
                if (fileAttach.fileMetadata.imageFormat === 'GIF') {
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
        if (richAttach && !message.isService) {
            if (
                richAttach.titleLink &&
                (richAttach.titleLink.startsWith('https://app.openland.com/o') ||
                    richAttach.titleLink.startsWith('https://openland.com/o')) &&
                richAttach.titleLink.includes('listings#')
            ) {
                content = [];
            }
            content.push(
                <MessageUrlAugmentationComponent
                    key="urlAugmentation"
                    {...richAttach}
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
    // if (content.length === 0) {
    //     content.push(
    //         <MessageTextComponent
    //             message={
    //                 'Message is not supported on your version of Openland. Please refresh the page to view it.'
    //             }
    //             spans={[]}
    //             key={'text'}
    //             isService={false}
    //             isEdited={!!message.isEdited}
    //         />,
    //     );
    // }

    if (!message.isService) {
        return (
            <MobileMessageContainer sender={message.sender} date={props.message.date}>
                {content}
                <XView alignItems="flex-start">
                    <Reactions
                        messageId={message.id ? message.id : ''}
                        reactions={message.reactions || []}
                        meId={(props.me && props.me.id) || ''}
                    />
                </XView>
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
