import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import { CommentWatch_event_CommentUpdateSingle_update } from 'openland-api/Types';
import { XRouter } from 'openland-x-routing/XRouter';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XModalCloser } from 'openland-x-modal/XModal';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { convertDsMessage } from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XModalContext } from 'openland-x-modal/XModalContext';
import { XModalBoxContext } from 'openland-x/XModalBoxContext';
import { CommentView } from './CommentView';
import { CommentsInput } from './CommentsInput';
import { FullMessage } from 'openland-api/Types';
import { useAddComment } from './useAddComment';
import { uploadFile } from './uploadFile';
import { UploadContextProvider } from 'openland-web/modules/FileUploading/UploadContext';
import { IsActiveContext } from 'openland-web/pages/main/mail/components/Components';

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

export const CommentsModalInnerNoRouter = ({
    messageId,
    roomId,
}: {
    messageId: string;
    roomId: string;
}) => {
    const client = useClient();
    const modal = React.useContext(XModalContext);
    const modalBox = React.useContext(XModalBoxContext);
    const currentCommentsInputRef = React.useRef<XRichTextInput2RefMethods | null>(null);
    const scrollRef = React.useRef<XScrollView3 | null>(null);
    const addComment = useAddComment();

    const isMobile = React.useContext(IsMobileContext);
    let messenger = React.useContext(MessengerContext);
    const [commentToScroll, setCommentToScroll] = React.useState<number>(0);

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
        { fetchPolicy: 'cache-and-network' },
    );

    const updateHandler = async (event: CommentWatch_event_CommentUpdateSingle_update) => {
        if (event.__typename === 'CommentReceived') {
            await client.refetchMessageComments({
                messageId,
            });
        }
    };

    const getCommentElem = (commentId: string) => {
        const items = document.querySelectorAll(`[data-comment-id='${commentId}']`);
        if (items.length === 1) {
            return items[0] as HTMLElement;
        }
        return null;
    };

    const scrollToComment = ({
        commentId,
        mode = 'bottom',
    }: {
        commentId: string;
        mode?: 'top' | 'bottom';
    }) => {
        let targetElem = getCommentElem(commentId);
        if (targetElem) {
            if (mode === 'bottom') {
                scrollRef!!.current!!.scrollToBottomOfElement({
                    targetElem,
                    offset: 10,
                });
            } else {
                scrollRef!!.current!!.scrollToTopOfElement({
                    targetElem,
                    offset: 10,
                });
            }
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

    const testScrollToCommentBottom = () => {
        scrollToComment({
            commentId: messageComments.messageComments.comments[commentToScroll].id,
            mode: 'bottom',
        });
        setCommentToScroll((commentToScroll + 1) % messageComments.messageComments.comments.length);
    };

    const testScrollToCommentTop = () => {
        scrollToComment({
            commentId: messageComments.messageComments.comments[commentToScroll].id,
            mode: 'top',
        });
        setCommentToScroll((commentToScroll + 1) % messageComments.messageComments.comments.length);
    };

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

        let offset;

        let DEPTH_LIMIT = 4;

        if (message.depth === 0) {
            offset = 0;
        } else if (message.depth === 1) {
            offset = 52;
        } else if (message.depth < DEPTH_LIMIT) {
            offset = 52 + 42 * (message.depth - 1);
        } else {
            offset = 52 + 42 * DEPTH_LIMIT;
        }

        const parentCommentId =
            message.id && commentsMap[message.id] && commentsMap[message.id].parentComment
                ? commentsMap[message.id].parentComment.id
                : null;
        const parentComment = commentsMap[parentCommentId];

        commentsElements.push(
            <CommentView
                onCommentBackToUserMessageClick={
                    parentComment
                        ? () => {
                              scrollToComment({
                                  commentId: parentCommentId,
                              });
                          }
                        : undefined
                }
                usernameOfRepliedUser={
                    parentComment && message.depth >= DEPTH_LIMIT
                        ? parentComment.comment.sender.name
                        : undefined
                }
                deleted={message.id ? commentsMap[message.id].deleted : false}
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
            <IsActiveContext.Provider value={true}>
                <XScrollView3
                    useDefaultScroll
                    flexGrow={1}
                    flexShrink={1}
                    maxHeight={700}
                    ref={scrollRef}
                >
                    <XView position="absolute" zIndex={100} right={32} top={28}>
                        <XModalCloser
                            onClick={() => {
                                if (modal) {
                                    modal.close();
                                }
                                if (modalBox) {
                                    modalBox.close();
                                }
                            }}
                        />
                    </XView>
                    <XView paddingHorizontal={32} paddingTop={28}>
                        <MessageComponent
                            noSelector
                            message={finalMessages}
                            showNumberOfComments={false}
                            onlyLikes={true}
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
                                    <XView
                                        fontSize={15}
                                        fontWeight="600"
                                        opacity={0.3}
                                        marginLeft={7}
                                    >
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
                    {/* <XView onClick={testScrollToCommentBottom}>
                    Scroll to comment bottom {commentToScroll}
                </XView>
                <XView onClick={testScrollToCommentTop}>
                    Scroll to comment top {commentToScroll}
                </XView> */}
                    <CommentsInput
                        members={members.members}
                        onSendFile={async (file: UploadCare.File) => {
                            return await uploadFile({
                                file,
                                onProgress: (progress: number) => {
                                    console.log('onProgress', progress);
                                },
                            });
                        }}
                        onSend={async (msgToSend, mentions, uploadedFileKey) => {
                            await addComment({
                                messageId,
                                mentions,
                                message: msgToSend,
                                replyComment: null,
                                fileAttachments: uploadedFileKey
                                    ? [{ fileId: uploadedFileKey }]
                                    : [],
                            });
                            setShowInputId(null);

                            if (scrollRef && scrollRef.current) {
                                scrollRef.current.scrollToBottom();
                            }
                        }}
                    />
                </XView>
            </IsActiveContext.Provider>
        </>
    );
};

export const CommentsModalInner = () => {
    let router = React.useContext(XRouterContext)!;

    const [messageId, roomId] = router.routeQuery.comments.split('&');

    return (
        <UploadContextProvider>
            <CommentsModalInnerNoRouter messageId={messageId} roomId={roomId} />
        </UploadContextProvider>
    );
};

export const openCommentsModal = ({
    router,
    messageId,
    conversationId,
}: {
    router: XRouter;
    messageId: string;
    conversationId: string;
}) => {
    router.pushQuery('comments', `${messageId}&${conversationId}`);
    // showModalBox(
    //     {
    //         width: 800,
    //     },
    //     () => (
    //         <UploadContextProvider>
    //             <CommentsModalInnerNoRouter messageId={messageId} roomId={conversationId} />
    //         </UploadContextProvider>
    //     ),
    // );
};
