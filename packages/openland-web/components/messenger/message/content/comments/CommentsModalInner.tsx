import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/hooks/useInputMethods';
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
import { CommentsInput } from './CommentsInput';
import { useAddComment } from './useAddComment';
import { uploadFile } from './uploadFile';
import { UploadContextProvider } from 'openland-web/modules/FileUploading/UploadContext';
import { IsActiveContext } from 'openland-web/pages/main/mail/components/Components';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { DeleteCommentConfirmModal } from './DeleteCommentConfirmModal';
import { convertMessage } from './convertMessage';

const getCommentElem = (commentId: string) => {
    const items = document.querySelectorAll(`[data-comment-id='${commentId}']`);
    if (items.length === 1) {
        return items[0] as HTMLElement;
    }
    return null;
};

const scrollToComment = ({
    commentId,
    scrollRef,
    mode = 'bottom',
}: {
    commentId: string;
    scrollRef: React.RefObject<XScrollView3>;
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

    const [showInputId, setShowInputId] = React.useState<string | null>(null);

    const commentedMessage = client.useMessage({
        messageId,
    });

    const getMentionsSuggestions = async () => {
        const data = await client.queryRoomMembersForMentionsPaginated({
            roomId,
        });

        return data.members.map(({ user }) => user);
    };

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

    React.useEffect(() => {
        const watcher = new SequenceModernWatcher(
            'comment messageId:' + messageId,
            client.subscribeCommentWatch({ peerId: messageId }),
            client.client,
            async (event: CommentWatch_event_CommentUpdateSingle_update) => {
                if (event.__typename === 'CommentReceived') {
                    await client.refetchMessageComments({
                        messageId,
                    });
                }
            },
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

    const onSendFile = async (file: UploadCare.File) => {
        return await uploadFile({
            file,
            onProgress: (progress: number) => {
                console.log('onProgress', progress);
            },
        });
    };

    const onSend = async (
        msgToSend: string,
        mentions: UserWithOffset[] | null,
        uploadedFileKey: string,
    ) => {
        const newCommentId = await addComment({
            messageId,
            mentions,
            message: msgToSend,
            replyComment: null,
            fileAttachments: uploadedFileKey ? [{ fileId: uploadedFileKey }] : [],
        });
        setShowInputId(null);
        return newCommentId;
    };

    const commentsElements = [];

    for (let message of dsMessages) {
        const onCommentReplyClick = () => {
            setShowInputId(showInputId === message.key ? null : message.key);
        };

        const onCommentEditClick = async () => {
            await client.mutateEditComment({
                id: message.key,
                message: 'edit',
            });
        };

        const onCommentDeleteClick = async () => {
            await client.mutateDeleteComment({
                id: message.key,
            });

            await client.refetchMessageComments({
                messageId: message.key,
            });
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
            <div data-comment-id={message.id}>
                <XView
                    key={message.key}
                    marginLeft={offset}
                    width={`calc(800px - 32px - 32px - ${offset}px)`}
                >
                    <MessageComponent
                        onCommentBackToUserMessageClick={
                            parentComment
                                ? () => {
                                      scrollToComment({
                                          scrollRef,
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
                        commentDepth={message.depth}
                        noSelector
                        isComment
                        onCommentReplyClick={onCommentReplyClick}
                        onCommentEditClick={onCommentEditClick}
                        onCommentDeleteClick={onCommentDeleteClick}
                        message={message}
                        onlyLikes={true}
                        me={messenger.user}
                    />

                    {showInputId === message.key && (
                        <UploadContextProvider>
                            <CommentsInput
                                topLevelComment={message.depth === 0}
                                commentsInputRef={currentCommentsInputRef}
                                getMentionsSuggestions={getMentionsSuggestions}
                                minimal
                                onSendFile={onSendFile}
                                onSend={async (
                                    msgToSend: string,
                                    mentions: UserWithOffset[] | null,
                                    uploadedFileKey: string,
                                ) => {
                                    const newCommentId = await onSend(
                                        msgToSend,
                                        mentions,
                                        uploadedFileKey,
                                    );
                                    scrollToComment({
                                        scrollRef,
                                        commentId: newCommentId,
                                    });
                                }}
                            />
                        </UploadContextProvider>
                    )}
                </XView>
            </div>,
        );
    }

    const finalMessages = convertDsMessage(convertMessage(maybeGeneralMessage));

    return (
        <XView>
            <DeleteCommentConfirmModal />
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
                    <CommentsInput
                        getMentionsSuggestions={getMentionsSuggestions}
                        onSendFile={onSendFile}
                        onSend={async (
                            msgToSend: string,
                            mentions: UserWithOffset[] | null,
                            uploadedFileKey: string,
                        ) => {
                            await onSend(msgToSend, mentions, uploadedFileKey);

                            if (scrollRef && scrollRef.current) {
                                scrollRef.current.scrollToBottom();
                            }
                        }}
                    />
                </XView>
            </IsActiveContext.Provider>
        </XView>
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

export const openDeleteCommentsModal = ({
    router,
    commentId,
}: {
    router: XRouter;
    commentId: string;
}) => {
    router.pushQuery('deleteComment', `${commentId}`);
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
