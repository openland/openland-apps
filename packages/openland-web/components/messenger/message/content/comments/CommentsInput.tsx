import * as React from 'react';
import { DumpSendMessage } from 'openland-web/fragments/MessageComposeComponent/components/DumpSendMessage';
import { DesktopSendMessage } from 'openland-web/fragments/MessageComposeComponent/components/SendMessage/DesktopSendMessage';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/hooks/useInputMethods';
import { ModelMessage } from 'openland-engines/messenger/types';
import { useHandleSend } from 'openland-web/fragments/MessageComposeComponent/hooks/useHandleSend';
import { useInputMethods } from 'openland-web/fragments/MessageComposeComponent/hooks/useInputMethods';
import { useQuote } from 'openland-web/fragments/MessageComposeComponent/hooks/useQuote';
import { useHandleChange } from 'openland-web/fragments/MessageComposeComponent/hooks/useHandleChange';
import { UploadContext } from 'openland-web/modules/FileUploading/UploadContext';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';
import { UserForMention } from 'openland-api/Types';

type CommentsInputProps = {
    topLevelComment?: boolean;
    minimal?: boolean;
    onSend?: (text: string, mentions: UserWithOffset[] | null, uploadedFileKey?: string) => void;
    onSendFile?: (file: UploadCare.File) => Promise<string> | void;
    onChange?: (text: string) => void;
    getMessages?: () => ModelMessage[];
    commentsInputRef?: React.RefObject<XRichTextInput2RefMethods | null>;
    getMentionsSuggestions: () => Promise<UserForMention[]>;
};

export const CommentsInput = ({
    topLevelComment,
    minimal,
    getMentionsSuggestions,
    onSend,
    onSendFile,
    onChange,
    commentsInputRef,
}: CommentsInputProps) => {
    const inputRef = commentsInputRef || React.useRef<XRichTextInput2RefMethods>(null);
    const inputMethodsState = useInputMethods({ inputRef, enabled: true });
    const { file } = React.useContext(UploadContext);

    if (file) {
        inputMethodsState.focusIfNeeded();
    }

    const [inputValue, setInputValue] = React.useState('');

    const quoteState = useQuote({
        inputMethodsState,
    });

    const { handleSend, closeEditor } = useHandleSend({
        onSend,
        onSendFile,
        inputValue,
        setInputValue,
        quoteState,
        inputMethodsState,
    });

    const { handleChange } = useHandleChange({
        onChange,
        setInputValue,
    });

    const initialMentions: any[] = [];

    return (
        <DumpSendMessage
            placeholder={'Write a comment...'}
            topLevelComment={topLevelComment}
            getMentionsSuggestions={getMentionsSuggestions}
            round
            fullWidth
            minimal={minimal}
            initialMentions={initialMentions}
            TextInputComponent={DesktopSendMessage}
            quoteState={quoteState}
            handleChange={handleChange}
            handleSend={handleSend}
            inputRef={inputRef}
            inputValue={inputValue}
            enabled={true}
            closeEditor={closeEditor}
        />
    );
};
