import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/hooks/useInputMethods';
import { CommentWatch_event_CommentUpdateSingle_update, UserForMention } from 'openland-api/Types';
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
import { UploadContextProvider } from 'openland-web/modules/FileUploading/UploadContext';
import { IsActiveContext } from 'openland-web/pages/main/mail/components/Components';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { DeleteCommentConfirmModal } from './DeleteCommentConfirmModal';
import { convertMessage } from './convertMessage';
import { useSendMethods } from './useSendMethods';
import { DataSourceWebMessageItem } from 'openland-web/components/messenger/data/WebMessageItemDataSource';

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

const CommentView = ({
    message,
    setShowInputId,
    showInputId,
    getMentionsSuggestions,
    commentsMap,
    scrollRef,
    currentCommentsInputRef,
}: {
    setShowInputId: (a: string | null) => void;
    showInputId: string | null;
    message: DataSourceWebMessageItem & { depth: number };
    getMentionsSuggestions: () => Promise<UserForMention[]>;
    commentsMap: any;
    scrollRef: React.RefObject<XScrollView3 | null>;
    currentCommentsInputRef: React.RefObject<XRichTextInput2RefMethods | null>;
}) => {
    const messenger = React.useContext(MessengerContext);
    const client = useClient();

    const { onSendFile, onSend } = useSendMethods({
        messageId: message.id,
        setShowInputId,
    });

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

    return (
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
        </div>
    );
};

const OriginalMessageComponent = ({ messageId }: { messageId: string }) => {
    const messenger = React.useContext(MessengerContext);
    const client = useClient();
    const commentedMessage = client.useMessage({
        messageId,
    });
    const maybeGeneralMessage = commentedMessage.message;

    if (!maybeGeneralMessage || maybeGeneralMessage.__typename === 'ServiceMessage') {
        return null;
    }

    const finalMessage = convertDsMessage(convertMessage(maybeGeneralMessage));

    return (
        <MessageComponent
            noSelector
            message={finalMessage}
            showNumberOfComments={false}
            onlyLikes={true}
            me={messenger.user}
            isModal={true}
        />
    );
};

export const CommentsView = ({
    messageId,
    setShowInputId,
    showInputId,
    getMentionsSuggestions,
    scrollRef,
    currentCommentsInputRef,
}: {
    setShowInputId: (a: string | null) => void;
    showInputId: string | null;
    messageId: string;
    getMentionsSuggestions: () => Promise<UserForMention[]>;
    scrollRef: React.RefObject<XScrollView3 | null>;
    currentCommentsInputRef: React.RefObject<XRichTextInput2RefMethods | null>;
}) => {
    const client = useClient();
    const isMobile = React.useContext(IsMobileContext);
    const commentsMap = {};

    const messageComments = client.useMessageComments(
        {
            messageId,
        },
        { fetchPolicy: 'cache-and-network' },
    );

    messageComments.messageComments.comments.forEach(comment => {
        commentsMap[comment.id] = comment;
    });

    const commentsElements = sortComments(messageComments.messageComments.comments, commentsMap)
        .map(item => {
            const res = convertDsMessage(convertMessage(item.comment));
            return { ...res, depth: getDepthOfComment(item, commentsMap) };
        })
        .map(message => {
            return (
                <CommentView
                    key={`comment_${message.id}`}
                    scrollRef={scrollRef}
                    message={message}
                    setShowInputId={setShowInputId}
                    showInputId={showInputId}
                    getMentionsSuggestions={getMentionsSuggestions}
                    currentCommentsInputRef={currentCommentsInputRef}
                    commentsMap={commentsMap}
                />
            );
        });

    return (
        <>
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
        </>
    );
};

const ModalCloser = () => {
    const modal = React.useContext(XModalContext);
    const modalBox = React.useContext(XModalBoxContext);

    const onCloseModal = () => {
        if (modal) {
            modal.close();
        }
        if (modalBox) {
            modalBox.close();
        }
    };
    return <XModalCloser onClick={onCloseModal} />;
};

export const CommentsModalInnerNoRouter = ({
    messageId,
    roomId,
}: {
    messageId: string;
    roomId: string;
}) => {
    const client = useClient();
    const currentCommentsInputRef = React.useRef<XRichTextInput2RefMethods | null>(null);
    const scrollRef = React.useRef<XScrollView3 | null>(null);
    const [showInputId, setShowInputId] = React.useState<string | null>(null);

    const getMentionsSuggestions = async () => {
        const data = await client.queryRoomMembersForMentionsPaginated({
            roomId,
        });

        return data.members.map(({ user }) => user);
    };

    const { onSendFile, onSend } = useSendMethods({
        messageId,
        setShowInputId,
    });

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

    return (
        <IsActiveContext.Provider value={true}>
            <XView>
                <DeleteCommentConfirmModal />

                <XScrollView3
                    useDefaultScroll
                    flexGrow={1}
                    flexShrink={1}
                    maxHeight={700}
                    ref={scrollRef}
                >
                    <XView position="absolute" zIndex={100} right={32} top={28}>
                        <ModalCloser />
                    </XView>
                    <XView paddingHorizontal={32} paddingTop={28}>
                        <OriginalMessageComponent messageId={messageId} />
                    </XView>
                    <XView
                        marginTop={28}
                        height={1}
                        backgroundColor={'rgba(216, 218, 229, 0.45)'}
                        width="100%"
                    />
                    <CommentsView
                        scrollRef={scrollRef}
                        messageId={messageId}
                        setShowInputId={setShowInputId}
                        showInputId={showInputId}
                        getMentionsSuggestions={getMentionsSuggestions}
                        currentCommentsInputRef={currentCommentsInputRef}
                    />
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
            </XView>
        </IsActiveContext.Provider>
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
