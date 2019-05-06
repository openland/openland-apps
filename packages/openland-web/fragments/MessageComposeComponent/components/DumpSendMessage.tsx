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
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import Glamorous from 'glamorous';
import { XThemeDefault } from 'openland-x/XTheme';

const SendMessageContent = Glamorous(XHorizontal)(({ fullWidth }: { fullWidth?: boolean }) => {
    return {
        width: '100%',
        maxWidth: fullWidth ? '100%' : 930,
        minWidth: fullWidth ? '100%' : 512,
        flexBasis: '100%',
        paddingLeft: fullWidth ? 0 : 97,
        paddingRight: fullWidth ? 0 : 112,
        '@media (max-width: 750px)': {
            minWidth: 0,
            paddingLeft: 0,
            paddingRight: 0,
        },
    };
});

const SendMessageWrapper = Glamorous.div<{
    fullWidth?: boolean;
    minimal?: boolean;
    topLevelComment?: boolean;
}>(({ fullWidth, minimal, topLevelComment }) => {
    return {
        display: 'flex',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexShrink: 0,
        marginBottom: minimal ? -6 : undefined,
        minHeight: minimal ? undefined : 114,
        backgroundColor: minimal ? undefined : XThemeDefault.backyardColor,
        paddingLeft: minimal ? (topLevelComment ? 39 : 26) : fullWidth ? 32 : 16,
        paddingRight: minimal ? 0 : fullWidth ? 32 : 16,
        paddingTop: 12,
        paddingBottom: minimal ? 0 : 12,
        borderTopStyle: 'solid',
        borderTopWidth: minimal ? undefined : '1px',
        borderTopColor: minimal ? undefined : XThemeDefault.separatorColor,
    };
});

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
    getMentionsSuggestions: () => Promise<UserForMention[]>;
    initialMentions: UserWithOffset[];
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
        round,
        hideAttach,
        placeholder,
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
