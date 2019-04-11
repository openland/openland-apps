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

type CommentsInputProps = {
    minimal?: boolean;
    onSend?: (text: string, mentions: UserShort[] | null) => void;
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

    const commentsElements = [];

    for (let item of result) {
        commentsElements.push(
            <XView key={item.id} marginLeft={10 * getDepthOfComment(item, commentsMap)}>
                {item.comment.message}
                <XView width={500}>
                    <XButton
                        size="default"
                        text="Reply"
                        onClick={() => {
                            setShowInputId(item.comment.id);
                        }}
                    />
                    {showInputId === item.comment.id && (
                        <CommentsInput
                            minimal
                            onSend={msgToSend => {
                                addComment({
                                    messageId: curMesssageId,
                                    message: msgToSend,
                                    replyComment: item.comment.id,
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
                <XView>count: {messageComments.messageComments.count}</XView>
                <XView>{commentsElements}</XView>
            </XView>
        </XView>
    );

    return (
        <>
            <MessageModalBody generalMessage={maybeGeneralMessage}>
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
