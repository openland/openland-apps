import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { DropZone } from './FileUploading/DropZone';
import { FileUploader } from './FileUploading/FileUploader';
import { SendMessageWrapper, SendMessageContent } from './Components';
import { AttachmentButtons } from './AttachmentButtons';
import { PostMessageType } from 'openland-api/Types';
import { EditView } from './EditView';
import { MentionsStateT } from './useMentions';
import { QuoteStateT } from './useQuote';

export type TextInputComponentT = {
    handleChange: (value: string) => void;
    handleSend: () => any;
    inputValue: string;
    handleDrop?: ((file: any) => void) | undefined;
    mentionsState?: MentionsStateT;
    inputRef: any;
};

export type TextInputComponentInnerT = TextInputComponentT & { placeholder: string };

export type DumpSendMessagePropsT = TextInputComponentT & {
    handleDialogDone: (result: UploadCare.File) => void;
    enabled?: boolean;
    handleHideChat?: (show: boolean, postType: PostMessageType | null) => void;
    quoteState?: QuoteStateT;
    closeEditor?: () => void;
};

type DumpSendMessageT = {
    TextInputComponent: React.ComponentType<TextInputComponentInnerT>;
} & DumpSendMessagePropsT;

export const DumpSendMessage = ({
    TextInputComponent,
    mentionsState,
    handleDrop,
    handleChange,
    handleSend,
    inputRef,
    inputValue,
    enabled,
    handleHideChat,
    handleDialogDone,
    quoteState,
    closeEditor,
}: DumpSendMessageT) => {
    return (
        <SendMessageWrapper>
            <DropZone height="calc(100% - 115px)" onFileDrop={handleDrop} />
            <SendMessageContent separator={4} alignItems="center">
                <XVertical separator={6} flexGrow={1} maxWidth="100%">
                    {closeEditor && quoteState && quoteState.quoteMessageReply && (
                        <EditView
                            message={quoteState.quoteMessageReply}
                            title={quoteState.quoteMessageSender || 'Edit message'}
                            onCancel={closeEditor}
                        />
                    )}

                    <TextInputComponent
                        placeholder="Write a message..."
                        mentionsState={mentionsState}
                        handleChange={handleChange}
                        handleSend={handleSend}
                        inputRef={inputRef}
                        inputValue={inputValue}
                        handleDrop={handleDrop}
                    />
                    <XHorizontal alignItems="center" justifyContent="space-between" flexGrow={1}>
                        <AttachmentButtons
                            enabled={enabled}
                            handleHideChat={handleHideChat}
                            handleDialogDone={handleDialogDone}
                        />

                        <XButton
                            text="Send"
                            style="primary"
                            action={handleSend}
                            iconRight="send"
                            enabled={enabled}
                        />
                    </XHorizontal>
                    <FileUploader />
                </XVertical>
            </SendMessageContent>
        </SendMessageWrapper>
    );
};
