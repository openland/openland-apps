import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { DumpSendMessage } from 'openland-web/fragments/MessageComposeComponent/DumpSendMessage';
import { DesktopSendMessage } from 'openland-web/fragments/MessageComposeComponent/SendMessage/DesktopSendMessage';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import {
    RoomMembers_members,
    CommentWatch_event_CommentUpdateSingle_update,
    FullMessage,
    MentionInput,
} from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { useHandleSend } from 'openland-web/fragments/MessageComposeComponent/useHandleSend';
import { useInputMethods } from 'openland-web/fragments/MessageComposeComponent/useInputMethods';
import { useQuote } from 'openland-web/fragments/MessageComposeComponent/useQuote';
import { useHandleChange } from 'openland-web/fragments/MessageComposeComponent/useHandleChange';
import { useMentions } from 'openland-web/fragments/MessageComposeComponent/useMentions';
import { UploadContext } from 'openland-web/fragments/MessageComposeComponent/FileUploading/UploadContext';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { sortComments, getDepthOfComment } from 'openland-y-utils/sortComments';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { convertDsMessage } from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { convertToMentionInput, UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { css } from 'linaria';

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

const separatorClassName = css`
    height: 1px;
    background-color: rgba(216, 218, 229, 0.45);
    width: 100%;
`;

const Separator = () => {
    return <div className={separatorClassName} />;
};

const CommentsInner = () => {
    const client = useClient();
    const isMobile = React.useContext(IsMobileContext);
    let router = React.useContext(XRouterContext)!;
    const [curMesssageId, roomId] = router.routeQuery.comments.split('&');

    const [showInputId, setShowInputId] = React.useState<string | null>(null);

    const commentedMessage = client.useMessage({
        messageId: curMesssageId,
    });

    const members = client.useRoomMembers({
        roomId,
    });

    const maybeGeneralMessage = commentedMessage.message;

    if (!maybeGeneralMessage || maybeGeneralMessage.__typename === 'ServiceMessage') {
        return null;
    }

    const messageComments = client.useMessageComments({
        messageId: curMesssageId,
    });

    const updateHandler = async (event: CommentWatch_event_CommentUpdateSingle_update) => {
        if (event.__typename === 'CommentReceived') {
            await client.refetchMessageComments({
                messageId: curMesssageId,
            });
        }
    };

    React.useEffect(() => {
        const watcher = new SequenceModernWatcher(
            'comment messageId:' + curMesssageId,
            client.subscribeCommentWatch({ peerId: curMesssageId }),
            client.client,
            updateHandler,
            undefined,
            { peerId: curMesssageId },
            null,
        );
        return () => {
            watcher.destroy();
        };
    });

    const addComment = async ({
        messageId,
        message,
        replyComment,
        mentions,
    }: {
        messageId: string;
        message: string;
        replyComment: string | null;
        mentions: MentionInput[] | null;
    }) => {
        await client.mutateAddMessageComment({
            messageId,
            message,
            replyComment,
            mentions,
        });

        await client.refetchMessageComments({
            messageId,
        });
    };

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
                    me={null}
                />

                {showInputId === message.key && (
                    <CommentsInput
                        members={members.members}
                        minimal
                        onSend={(msgToSend, mentions) => {
                            const finalMentions = convertToMentionInput({
                                mentions: mentions ? mentions : [],
                                text: msgToSend,
                            });

                            addComment({
                                mentions: finalMentions,
                                messageId: curMesssageId,
                                message: msgToSend,
                                replyComment: message.text ? message.text : null,
                            });
                            setShowInputId(null);
                        }}
                    />
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
                    me={null}
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
                    <Separator />
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
                <CommentsInput
                    members={members.members}
                    onSend={(msgToSend, mentions) => {
                        const finalMentions = convertToMentionInput({
                            mentions: mentions ? mentions : [],
                            text: msgToSend,
                        });

                        addComment({
                            mentions: finalMentions,
                            messageId: curMesssageId,
                            message: msgToSend,
                            replyComment: null,
                        });
                        setShowInputId(null);
                    }}
                />
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
            <React.Suspense
                fallback={
                    <XView
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        backgroundColor="background-color: rgba(0, 0, 0, 0.4)"
                        position="fixed"
                        zIndex={100}
                    />
                }
            >
                <CommentsInner />
            </React.Suspense>
        </XModalForm>
    );
};
