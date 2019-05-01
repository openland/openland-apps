import * as React from 'react';
import { DumpSendMessage } from 'openland-web/fragments/MessageComposeComponent/components/DumpSendMessage';
import { DesktopSendMessage } from 'openland-web/fragments/MessageComposeComponent/components/SendMessage/DesktopSendMessage';
import UploadCare from 'uploadcare-widget';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/hooks/useInputMethods';
import { RoomMembers_members } from 'openland-api/Types';
import { ModelMessage } from 'openland-engines/messenger/types';
import { useHandleSend } from 'openland-web/fragments/MessageComposeComponent/hooks/useHandleSend';
import { useInputMethods } from 'openland-web/fragments/MessageComposeComponent/hooks/useInputMethods';
import { useQuote } from 'openland-web/fragments/MessageComposeComponent/hooks/useQuote';
import { useHandleChange } from 'openland-web/fragments/MessageComposeComponent/hooks/useHandleChange';
import { useMentions } from 'openland-web/fragments/MessageComposeComponent/hooks/useMentions';
import { UploadContext } from 'openland-web/modules/FileUploading/UploadContext';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

type CommentsInputProps = {
    topLevelComment?: boolean;
    minimal?: boolean;
    onSend?: (text: string, mentions: UserWithOffset[] | null, uploadedFileKey?: string) => void;
    onSendFile?: (file: UploadCare.File) => Promise<string> | void;
    onChange?: (text: string) => void;
    getMessages?: () => ModelMessage[];
    getMembers: () => Promise<RoomMembers_members[]>;
    commentsInputRef?: React.RefObject<XRichTextInput2RefMethods | null>;
};

export const CommentsInput = ({
    topLevelComment,
    minimal,
    getMembers,
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

    const mentionsState = useMentions({
        getMembers,
    });

    const { handleSend, closeEditor } = useHandleSend({
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
            placeholder={'Write a comment...'}
            topLevelComment={topLevelComment}
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
