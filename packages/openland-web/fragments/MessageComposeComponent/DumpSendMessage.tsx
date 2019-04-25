import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { FileUploader } from '../../modules/FileUploading/FileUploader';
import { SendMessageWrapper, SendMessageContent } from './Components';
import { AttachmentButtons } from './AttachmentButtons';
import { EditView } from './EditView';
import { MentionsStateT } from './useMentions';
import { QuoteStateT } from './useQuote';
import { DropZone } from '../../modules/FileUploading/DropZone';
import { UploadContext } from '../../modules/FileUploading/UploadContext';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

export type TextInputComponentT = {
    topLevelComment?: boolean;
    fullWidth?: boolean;
    minimal?: boolean;
    hideAttach?: boolean;
    round?: boolean;
    handleChange: (a: { text: string; mentions: UserWithOffset[] }) => void;
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

export const DumpSendMessage = React.memo(
    ({
        TextInputComponent,
        topLevelComment,
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
        round,
        hideAttach,
    }: DumpSendMessageT) => {
        const { handleDrop } = React.useContext(UploadContext);
        return (
            <SendMessageWrapper
                fullWidth={fullWidth}
                minimal={minimal}
                topLevelComment={topLevelComment}
            >
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
                            round={round}
                            minimal={minimal}
                            hideAttach={hideAttach}
                        />
                        <XHorizontal
                            alignItems="center"
                            justifyContent="space-between"
                            flexGrow={1}
                        >
                            {!minimal && !hideAttach && <AttachmentButtons enabled={enabled} />}

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
    },
);
