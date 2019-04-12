import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { XButton } from 'openland-x/XButton';
import { DumpSendMessage } from 'openland-web/fragments/MessageComposeComponent/DumpSendMessage';
import { DesktopSendMessage } from 'openland-web/fragments/MessageComposeComponent/SendMessage/DesktopSendMessage';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import {
    UserShort,
    RoomMembers_members,
    CommentWatch_event_CommentUpdateSingle_update,
    FullMessage,
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
import { MessageModalBody } from 'openland-web/fragments/chat/MessageModal';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { convertDsMessage } from 'openland-web/components/messenger/data/WebMessageItemDataSource';
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
    onSend?: (text: string, mentions: UserShort[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
    getMessages?: () => ModelMessage[];
    members?: RoomMembers_members[];
};

const separatorClassName = css`
    height: 1px;
    background-color: rgba(216, 218, 229, 0.45);
    width: 100%;
`;

const Separator = () => {
    return <div className={separatorClassName} />;
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

const CommentsInner = () => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const curMesssageId = router.routeQuery.comments;
    const [showInputId, setShowInputId] = React.useState<string | null>(null);

    const commentedMessage = client.useMessage({
        messageId: curMesssageId,
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
    }: {
        messageId: string;
        message: string;
        replyComment: string | null;
    }) => {
        try {
            await client.mutateAddMessageComment({
                messageId,
                message,
                replyComment,
            });

            await client.refetchMessageComments({
                messageId,
            });
        } catch (err) {
            console.log(err);
        }
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
        commentsElements.push(
            <XView key={message.key} marginLeft={10 * message.depth}>
                <MessageComponent message={message} isChannel={true} me={null} />
                <XView width={500}>
                    <XButton
                        size="default"
                        text="Reply"
                        onClick={() => {
                            setShowInputId(message.key);
                        }}
                    />
                    {showInputId === message.key && (
                        <CommentsInput
                            minimal
                            onSend={msgToSend => {
                                addComment({
                                    messageId: curMesssageId,
                                    message: msgToSend,
                                    replyComment: message.text ? message.text : null,
                                });
                                setShowInputId(null);
                            }}
                        />
                    )}
                </XView>
            </XView>,
        );
    }

    const commentsElems = (
        <XView flexDirection="row" marginBottom={16}>
            <XView flexGrow={1} paddingLeft={16}>
                <XView>{commentsElements}</XView>
            </XView>
        </XView>
    );

    return (
        <>
            <MessageModalBody generalMessage={maybeGeneralMessage}>
                <XView>Comments {messageComments.messageComments.count}</XView>
                <Separator />
                {commentsElems}
            </MessageModalBody>
            <XView>
                <CommentsInput
                    onSend={msgToSend => {
                        addComment({
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
            <CommentsInner />
        </XModalForm>
    );
};
