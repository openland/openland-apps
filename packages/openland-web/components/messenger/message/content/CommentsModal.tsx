import * as React from 'react';
import { XView } from 'react-mental';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { useClient } from 'openland-web/utils/useClient';
import { XButton } from 'openland-x/XButton';
import { DumpSendMessage } from 'openland-web/fragments/MessageComposeComponent/DumpSendMessage';
import { DesktopSendMessage } from 'openland-web/fragments/MessageComposeComponent/SendMessage/DesktopSendMessage';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import { UserShort, RoomMembers_members } from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { useHandleSend } from 'openland-web/fragments/MessageComposeComponent/useHandleSend';
import { useInputMethods } from 'openland-web/fragments/MessageComposeComponent/useInputMethods';
import { useQuote } from 'openland-web/fragments/MessageComposeComponent/useQuote';
import { useHandleChange } from 'openland-web/fragments/MessageComposeComponent/useHandleChange';
import { useMentions } from 'openland-web/fragments/MessageComposeComponent/useMentions';
import { UploadContext } from 'openland-web/fragments/MessageComposeComponent/FileUploading/UploadContext';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

type CommentsInputProps = {
    onSend?: (text: string, mentions: UserShort[] | null) => void;
    onSendFile?: (file: UploadCare.File) => void;
    onChange?: (text: string) => void;
    getMessages?: () => ModelMessage[];
    members?: RoomMembers_members[];
};

const CommentsInput = ({ members, onSend, onSendFile, onChange }: CommentsInputProps) => {
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

    const messageComments = client.useMessageComments({
        messageId: curMesssageId,
    });

    const addComment = async ({ messageId, message }: { messageId: string; message: string }) => {
        try {
            await client.mutateAddMessageComment({
                messageId,
                message,
                replyComment: null,
            });

            await client.refetchMessageComments({
                messageId,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <XView flexDirection="row" marginBottom={16}>
            <XView flexGrow={1} paddingLeft={16}>
                <XView>count: {messageComments.messageComments.count}</XView>
                <XView>
                    {messageComments.messageComments.comments
                        .slice(
                            messageComments.messageComments.comments.length - 3,
                            messageComments.messageComments.comments.length,
                        )
                        .map((item, key) => {
                            return (
                                <XView key={key}>
                                    {item.comment.message}
                                    <XView width={400}>
                                        <XButton
                                            size="default"
                                            text="Reply"
                                            onClick={() => {
                                                setShowInputId(item.comment.id);
                                            }}
                                        />
                                        {showInputId === item.comment.id && (
                                            <CommentsInput
                                                onSend={msgToSend => {
                                                    addComment({
                                                        messageId: item.comment.id,
                                                        message: msgToSend,
                                                    });
                                                }}
                                            />
                                        )}
                                    </XView>
                                </XView>
                            );
                        })}
                </XView>
                <XView width={400}>
                    Add root Comment
                    <CommentsInput
                        onSend={msgToSend => {
                            addComment({ messageId: curMesssageId, message: msgToSend });
                            setShowInputId(null);
                        }}
                    />
                </XView>
            </XView>
        </XView>
    );
};

export const CommentsModal = () => {
    return (
        <XModalForm
            title={'TITLE'}
            targetQuery="comments"
            defaultData={{
                input: {},
            }}
            defaultAction={async ({ input }) => {
                console.log(input);
                //
            }}
        >
            <CommentsInner />
        </XModalForm>
    );
};
