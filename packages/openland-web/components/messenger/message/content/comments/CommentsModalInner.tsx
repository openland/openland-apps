import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import { CommentWatch_event_CommentUpdateSingle_update } from 'openland-api/Types';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XModalCloser } from 'openland-x-modal/XModal';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { convertDsMessage } from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { UploadContextProvider } from 'openland-web/fragments/MessageComposeComponent/FileUploading/UploadContext';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalContext } from 'openland-x-modal/XModalContext';
import { CommentView } from './CommentView';
import { CommentsInput } from './CommentsInput';
import { FullMessage } from 'openland-api/Types';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { useAddComment } from './useAddComment';

export function convertMessage(src: FullMessage & { repeatKey?: string }): DataSourceMessageItem {
    let generalMessage = src.__typename === 'GeneralMessage' ? src : undefined;
    let serviceMessage = src.__typename === 'ServiceMessage' ? src : undefined;

    return {
        chatId: '',
        type: 'message',
        id: src.id,
        key: src.repeatKey || src.id,
        date: parseInt(src.date, 10),
        isOut: true,
        senderId: src.sender.id,
        senderName: src.sender.name,
        senderPhoto: src.sender.photo || undefined,
        sender: src.sender,
        text: src.message || undefined,
        isSending: false,
        attachTop: false,
        attachBottom: false,
        reactions: generalMessage && generalMessage.reactions,
        serviceMetaData: (serviceMessage && serviceMessage.serviceMetadata) || undefined,
        isService: !!serviceMessage,
        attachments: generalMessage && generalMessage.attachments,
        reply:
            generalMessage && generalMessage.quotedMessages
                ? generalMessage.quotedMessages.sort((a, b) => a.date - b.date)
                : undefined,
        isEdited: generalMessage && generalMessage.edited,
        spans: src.spans || [],
        commentsCount: generalMessage ? generalMessage.commentsCount : null,
    };
}

export const CommentsModalInner = () => {
    const client = useClient();
    const modal = React.useContext(XModalContext);
    const currentCommentsInputRef = React.useRef<XRichTextInput2RefMethods | null>(null);
    const scrollRef = React.useRef<XScrollView3 | null>(null);
    let router = React.useContext(XRouterContext)!;
    const addComment = useAddComment();

    const [messageId, roomId] = router.routeQuery.comments.split('&');

    const isMobile = React.useContext(IsMobileContext);
    let messenger = React.useContext(MessengerContext);

    const [showInputId, setShowInputId] = React.useState<string | null>(null);

    const commentedMessage = client.useMessage({
        messageId,
    });

    const members = client.useRoomMembers({
        roomId,
    });

    const maybeGeneralMessage = commentedMessage.message;

    if (!maybeGeneralMessage || maybeGeneralMessage.__typename === 'ServiceMessage') {
        return null;
    }

    const messageComments = client.useMessageComments(
        {
            messageId,
        },
        { fetchPolicy: 'network-only' },
    );

    const updateHandler = async (event: CommentWatch_event_CommentUpdateSingle_update) => {
        if (event.__typename === 'CommentReceived') {
            await client.refetchMessageComments({
                messageId,
            });
        }
    };

    React.useEffect(() => {
        const watcher = new SequenceModernWatcher(
            'comment messageId:' + messageId,
            client.subscribeCommentWatch({ peerId: messageId }),
            client.client,
            updateHandler,
            undefined,
            { peerId: messageId },
            null,
        );
        return () => {
            watcher.destroy();
        };
    });

    const commentsMap = {};

    messageComments.messageComments.comments.forEach(comment => {
        commentsMap[comment.id] = comment;
    });

    const result = sortComments(messageComments.messageComments.comments, commentsMap);

    const dsMessages = result.map(item => {
        const res = convertDsMessage(convertMessage(item.comment));
        return { ...res, depth: getDepthOfComment(item, commentsMap) };
    });

    React.useEffect(() => {
        if (currentCommentsInputRef.current && scrollRef.current) {
            const targetElem = currentCommentsInputRef.current.getElement()!!
                .parentNode as HTMLElement;
            if (targetElem) {
                scrollRef.current.scrollToBottomOfElement({
                    targetElem,
                    offset: 10,
                });
            }
        }
    }, [showInputId]);

    const commentsElements = [];

    for (let message of dsMessages) {
        const onCommentReplyClick = () => {
            setShowInputId(showInputId === message.key ? null : message.key);
        };

        const offset = (message.depth > 0 ? 44 : 55) * message.depth;

        commentsElements.push(
            <CommentView
                messageId={messageId}
                message={message}
                offset={offset}
                onCommentReplyClick={onCommentReplyClick}
                me={messenger.user}
                showInputId={showInputId}
                setShowInputId={setShowInputId}
                currentCommentsInputRef={currentCommentsInputRef}
                members={members.members}
            />,
        );
    }

    const finalMessages = convertDsMessage(convertMessage(maybeGeneralMessage));

    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} maxHeight={700} ref={scrollRef}>
                <XView position="absolute" zIndex={100} right={32} top={28}>
                    <XModalCloser
                        onClick={() => {
                            if (modal) {
                                modal.close();
                            }
                        }}
                    />
                </XView>
                <XView paddingHorizontal={32} paddingTop={28}>
                    <MessageComponent
                        noSelector
                        message={finalMessages}
                        onlyLikes={true}
                        isChannel={true}
                        me={messenger.user}
                        isModal={true}
                    />
                </XView>
                <XView
                    marginTop={28}
                    height={1}
                    backgroundColor={'rgba(216, 218, 229, 0.45)'}
                    width="100%"
                />

                {commentsElements.length ? (
                    <>
                        <XView
                            paddingHorizontal={32}
                            paddingTop={isMobile ? 0 : 30}
                            paddingBottom={28}
                            flexDirection="column"
                        >
                            <XView flexDirection="row" alignItems="center">
                                <XView fontSize={16} fontWeight="600">
                                    Comments
                                </XView>
                                <XView fontSize={15} fontWeight="600" opacity={0.3} marginLeft={7}>
                                    {messageComments.messageComments.count}
                                </XView>
                            </XView>

                            <XView flexDirection="row" marginBottom={16}>
                                <XView flexGrow={1}>
                                    <XView>{commentsElements}</XView>
                                </XView>
                            </XView>
                        </XView>
                    </>
                ) : (
                    undefined
                )}
            </XScrollView3>
            <XView>
                <UploadContextProvider>
                    <CommentsInput
                        members={members.members}
                        onSend={async (msgToSend, mentions) => {
                            await addComment({
                                messageId,
                                mentions,
                                message: msgToSend,
                                replyComment: null,
                                fileAttachments: [],
                            });
                            setShowInputId(null);

                            if (scrollRef && scrollRef.current) {
                                scrollRef.current.scrollToBottom();
                            }
                        }}
                    />
                </UploadContextProvider>
            </XView>
        </>
    );
};
