import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { DumpSendMessage } from 'openland-web/fragments/MessageComposeComponent/DumpSendMessage';
import { DesktopSendMessage } from 'openland-web/fragments/MessageComposeComponent/SendMessage/DesktopSendMessage';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import {
    RoomMembers_members,
    CommentWatch_event_CommentUpdateSingle_update,
    FullMessage,
    FileAttachmentInput,
} from 'openland-api/Types';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { ModelMessage } from 'openland-engines/messenger/types';
import { useHandleSend } from 'openland-web/fragments/MessageComposeComponent/useHandleSend';
import { useInputMethods } from 'openland-web/fragments/MessageComposeComponent/useInputMethods';
import { useQuote } from 'openland-web/fragments/MessageComposeComponent/useQuote';
import { useHandleChange } from 'openland-web/fragments/MessageComposeComponent/useHandleChange';
import { useMentions } from 'openland-web/fragments/MessageComposeComponent/useMentions';
import { UploadContext } from 'openland-web/fragments/MessageComposeComponent/FileUploading/UploadContext';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { convertDsMessage } from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { convertToMentionInput, UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { UploadContextProvider } from 'openland-web/fragments/MessageComposeComponent/FileUploading/UploadContext';

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

type CommentsInputProps = {
    minimal?: boolean;
    onSend?: (text: string, mentions: UserWithOffset[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
    getMessages?: () => ModelMessage[];
    members?: RoomMembers_members[];
};

const CommentsInput = ({ minimal, members, onSend, onSendFile, onChange }: CommentsInputProps) => {
    const inputRef = React.useRef<XRichTextInput2RefMethods>(null);
    const inputMethodsState = useInputMethods({ inputRef, enabled: true });
    const { file } = React.useContext(UploadContext);

    if (file) {
        inputMethodsState.focusIfNeeded();
    }

    const [inputValue, setInputValue] = React.useState('');

    const quoteState = useQuote({
        inputMethodsState,
    });

    const mentionsState = useMentions({
        members,
    });

    const { handleSend, closeEditor } = useHandleSend({
        members,
        onSend,
        onSendFile,
        inputValue,
        setInputValue,
        quoteState,
        mentionsState,
        inputMethodsState,
    });

    const { handleChange } = useHandleChange({
        mentionsState,
        onChange,
        setInputValue,
    });

    return (
        <DumpSendMessage
            round
            fullWidth
            hideAttach
            minimal={minimal}
            TextInputComponent={DesktopSendMessage}
            quoteState={quoteState}
            handleChange={handleChange}
            handleSend={handleSend}
            inputRef={inputRef}
            inputValue={inputValue}
            enabled={true}
            closeEditor={closeEditor}
            mentionsState={mentionsState}
        />
    );
};

export const CommentsInner = () => {
    const client = useClient();

    let router = React.useContext(XRouterContext)!;

    const [messageId, roomId] = router.routeQuery.comments.split('&');

    const addComment = async ({
        message,
        replyComment,
        mentions,
        fileAttachments,
    }: {
        message: string;
        replyComment: string | null;
        mentions: UserWithOffset[] | null;
        fileAttachments?: FileAttachmentInput[] | null;
    }) => {
        const finalMentions = convertToMentionInput({
            mentions: mentions ? mentions : [],
            text: message,
        });

        await client.mutateAddMessageComment({
            messageId,
            message,
            replyComment,
            mentions: finalMentions,
            fileAttachments,
        });

        await client.refetchMessageComments({
            messageId,
        });
    };

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

    const commentsElements = [];

    for (let message of dsMessages) {
        const onCommentReplyClick = () => {
            setShowInputId(showInputId === message.key ? null : message.key);
        };

        commentsElements.push(
            <XView key={message.key} marginLeft={(message.depth > 0 ? 44 : 55) * message.depth}>
                <MessageComponent
                    commentDepth={message.depth}
                    noSelector
                    isComment
                    onCommentReplyClick={onCommentReplyClick}
                    message={message}
                    onlyLikes={true}
                    isChannel={true}
                    me={messenger.user}
                />

                {showInputId === message.key && (
                    <UploadContextProvider>
                        <CommentsInput
                            members={members.members}
                            minimal
                            onSend={async (msgToSend, mentions) => {
                                await addComment({
                                    mentions,
                                    message: msgToSend,
                                    replyComment: message.key,
                                    // fileAttachments: [],
                                });
                                setShowInputId(null);
                            }}
                        />
                    </UploadContextProvider>
                )}
            </XView>,
        );
    }

    const finalMessages = convertDsMessage(convertMessage(maybeGeneralMessage));

    return (
        <>
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
                        {commentsElements.length ? (
                            <>
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
                            </>
                        ) : (
                            undefined
                        )}
                    </XView>
                </>
            ) : (
                undefined
            )}

            <XView>
                <UploadContextProvider>
                    <CommentsInput
                        members={members.members}
                        onSend={async (msgToSend, mentions) => {
                            await addComment({
                                mentions,
                                message: msgToSend,
                                replyComment: null,
                                // fileAttachments: [],
                            });
                            setShowInputId(null);
                        }}
                    />
                </UploadContextProvider>
            </XView>
        </>
    );
};

export const CommentsModal = () => {
    return (
        <XModalForm
            useTopCloser
            width={800}
            noPadding
            targetQuery="comments"
            defaultData={{
                input: {},
            }}
            defaultAction={async () => {
                //
            }}
            customFooter={null}
        >
            <CommentsInner />
        </XModalForm>
    );
};
