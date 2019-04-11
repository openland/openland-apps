import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { FileUploader } from './FileUploading/FileUploader';
import { SendMessageWrapper, SendMessageContent } from './Components';
import { AttachmentButtons, PhotoButton, DocumentButton } from './AttachmentButtons';
import { EditView } from './EditView';
import { MentionsStateT } from './useMentions';
import { QuoteStateT } from './useQuote';
import { DropZone } from './FileUploading/DropZone';
import { UploadContext } from './FileUploading/UploadContext';
import { MentionDataT } from 'openland-x/XRichTextInput2/components/MentionSuggestionsEntry';

export type TextInputComponentT = {
    fullWidth?: boolean;
    minimal?: boolean;
    handleChange: (a: { text: string; mentions: MentionDataT[] }) => void;
    handleSend: () => any;
    inputValue: string;
    handleDrop?: ((file: any) => void) | undefined;
    mentionsState?: MentionsStateT;
    inputRef: any;
};

export type TextInputComponentInnerT = TextInputComponentT & { placeholder: string };

export type DumpSendMessagePropsT = TextInputComponentT & {
    enabled?: boolean;
    quoteState?: QuoteStateT;
    closeEditor?: () => void;
};

type DumpSendMessageT = {
    TextInputComponent: React.ComponentType<TextInputComponentInnerT>;
} & DumpSendMessagePropsT;

export const DumpSendMessage = React.memo(({
    TextInputComponent,
    mentionsState,
    handleChange,
    handleSend,
    inputRef,
    inputValue,
    enabled,
    quoteState,
    closeEditor,
    fullWidth,
    minimal,
}: DumpSendMessageT) => {
    const { handleDrop } = React.useContext(UploadContext);
    return (
        <SendMessageWrapper fullWidth={fullWidth} minimal={minimal}>
            <DropZone height="calc(100% - 115px)" onFileDrop={handleDrop} />
            <SendMessageContent separator={4} fullWidth={fullWidth} alignItems="center">
                <XVertical separator={6} flexGrow={1} maxWidth="100%">
                    {closeEditor && quoteState && quoteState.quoteMessageReply && (
                        <EditView
                            message={quoteState.quoteMessageReply}
                            title={quoteState.quoteMessageSender || 'Edit message'}
                            onCancel={closeEditor}
                        />
                    )}
                    <FileUploader />
                    <TextInputComponent
                        placeholder="Write a message..."
                        mentionsState={mentionsState}
                        handleChange={handleChange}
                        handleSend={handleSend}
                        inputRef={inputRef}
                        inputValue={inputValue}
                        handleDrop={handleDrop}
                        minimal={minimal}
                    />
                    <XHorizontal alignItems="center" justifyContent="space-between" flexGrow={1}>
                        {!minimal && <AttachmentButtons enabled={enabled} />}

                        {!minimal && (
                            <XButton
                                text="Send"
                                style="primary"
                                action={handleSend}
                                iconRight="send"
                                enabled={enabled}
                            />
                        )}
                    </XHorizontal>
                </XVertical>
            </SendMessageContent>
        </SendMessageWrapper>
    );
});
