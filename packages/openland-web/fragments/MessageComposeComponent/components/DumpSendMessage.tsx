import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { FileUploader } from '../../../modules/FileUploading/FileUploader';
import { AttachmentButtons } from './AttachmentButtons';
import { UserForMention } from 'openland-api/Types';
import { EditView } from './EditView';
import { QuoteStateT } from '../hooks/useQuote';
import { DropZone } from '../../../modules/FileUploading/DropZone';
import { UploadContext } from '../../../modules/FileUploading/UploadContext';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';
import Glamorous from 'glamorous';
import { XThemeDefault } from 'openland-x/XTheme';
import { XView } from 'react-mental';

const SendMessageContent = Glamorous(XHorizontal)(({ fullWidth }: { fullWidth?: boolean }) => {
    return {
        width: '100%',
        maxWidth: fullWidth ? '100%' : 980,
        minWidth: fullWidth ? '100%' : 512,
        paddingLeft: fullWidth ? 0 : 128,
        paddingRight: fullWidth ? 0 : 128,
        flexBasis: '100%',
        alignSelf: 'stretch',
        '@media (max-width: 750px)': {
            minWidth: 0,
            paddingLeft: 0,
            paddingRight: 0,
        },
    };
});

const SendMessageWrapper = Glamorous.div<{
    minimal?: boolean;
    bright?: boolean;
    topLevelComment?: boolean;
}>(({ minimal, bright, topLevelComment }) => {
    return {
        display: 'flex',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexShrink: 0,
        marginBottom: minimal ? -6 : undefined,
        minHeight: minimal ? undefined : 120,
        backgroundColor: minimal || bright ? undefined : XThemeDefault.backyardColor,
        paddingLeft: minimal ? (topLevelComment ? 39 : 26) : 32,
        paddingRight: minimal ? 0 : 32,
        paddingTop: minimal ? 6 : 16,
        paddingBottom: minimal ? 0 : 16,
        borderTopStyle: bright ? undefined : 'solid',
        borderTopWidth: minimal || bright ? undefined : '1px',
        borderTopColor: minimal || bright ? undefined : XThemeDefault.separatorColor,
    };
});

export type TextInputComponentT = {
    showAllMentionsSuggestion: boolean;
    topLevelComment?: boolean;
    fullWidth?: boolean;
    minimal?: boolean;
    bright?: boolean;
    hideAttachments?: boolean;
    round?: boolean;
    handleChange: (a: { text: string; mentions: UserWithOffset[] }) => void;
    handleSend: () => any;
    inputValue: string;
    handleDrop?: ((file: any) => void) | undefined;
    dropZoneHeight?: string | number;
    getMentionsSuggestions: () => Promise<UserForMention[]>;
    initialMentions?: UserWithOffset[];
    inputRef: any;
    placeholder?: string;
};

export type DumpSendMessagePropsT = TextInputComponentT & {
    enabled?: boolean;
    quoteState?: QuoteStateT;
    closeEditor?: () => void;
};

type DumpSendMessageT = {
    TextInputComponent: React.ComponentType<TextInputComponentT>;
} & DumpSendMessagePropsT;

export const DumpSendMessage = React.memo(
    ({
        TextInputComponent,
        showAllMentionsSuggestion,
        initialMentions,
        getMentionsSuggestions,
        topLevelComment,
        handleChange,
        handleSend,
        inputRef,
        inputValue,
        enabled,
        quoteState,
        closeEditor,
        fullWidth,
        minimal,
        bright,
        round,
        hideAttachments,
        placeholder,
        dropZoneHeight,
    }: DumpSendMessageT) => {
        const { fileSrc, fileName, fileSize, handleDrop } = React.useContext(UploadContext);

        return (
            <SendMessageWrapper minimal={minimal} bright={bright} topLevelComment={topLevelComment}>
                <DropZone
                    height={dropZoneHeight ? dropZoneHeight : 'calc(100% - 115px)'}
                    onFileDrop={handleDrop}
                />
                <SendMessageContent separator={4} fullWidth={fullWidth} alignItems="center">
                    <XVertical flexGrow={1} maxWidth="100%">
                        {closeEditor &&
                            quoteState &&
                            quoteState.quoteMessageReply && (
                                <EditView
                                    message={quoteState.quoteMessageReply}
                                    title={quoteState.quoteMessageSender || 'Edit message'}
                                    onCancel={closeEditor}
                                />
                            )}
                        {(fileSrc || (fileName && fileSize)) && (
                            <XView marginLeft={14}>
                                <FileUploader />
                            </XView>
                        )}
                        <TextInputComponent
                            showAllMentionsSuggestion={showAllMentionsSuggestion}
                            initialMentions={initialMentions}
                            getMentionsSuggestions={getMentionsSuggestions}
                            placeholder={placeholder || 'Write a message...'}
                            handleChange={handleChange}
                            handleSend={handleSend}
                            inputRef={inputRef}
                            inputValue={inputValue}
                            handleDrop={handleDrop}
                            round={round}
                            minimal={minimal}
                            bright={bright}
                            hideAttachments={hideAttachments}
                        />
                        <XHorizontal
                            alignItems="center"
                            justifyContent="space-between"
                            flexGrow={1}
                        >
                            {!minimal &&
                                !hideAttachments && <AttachmentButtons enabled={enabled} />}

                            {!minimal && (
                                <XButton
                                    text="Send"
                                    style="primary"
                                    action={handleSend}
                                    iconRight={bright ? undefined : 'send'}
                                    enabled={enabled}
                                    square={bright}
                                />
                            )}
                        </XHorizontal>
                    </XVertical>
                </SendMessageContent>
            </SendMessageWrapper>
        );
    },
);
