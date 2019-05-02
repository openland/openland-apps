import * as React from 'react';
import { UploadContext } from '../../../modules/FileUploading/UploadContext';
import { MessageComposeComponentDraftProps } from './MessageComposeComponentDesktop';
import { useHandleSend } from '../hooks/useHandleSend';
import { useHandleChange } from '../hooks/useHandleChange';
import { DumpSendMessage } from './DumpSendMessage';
import { MobileSendMessage } from './SendMessage/MobileSendMessage';

export const MobileMessageCompose = (messageComposeProps: MessageComposeComponentDraftProps) => {
    const [inputValue, setInputValue] = React.useState('');
    const { handleDrop } = React.useContext(UploadContext);
    const inputRef = React.useRef<HTMLDivElement>(null);

    const { handleChange } = useHandleChange({
        setInputValue,
        onChange: messageComposeProps.onChange,
    });

    const { handleSend } = useHandleSend({
        conversationId: messageComposeProps.conversationId,
        onSend: messageComposeProps.onSend,
        onSendFile: messageComposeProps.onSendFile,
        scrollToBottom: messageComposeProps.scrollToBottom,
        inputValue,
        setInputValue,
    });

    // TODO maybe some other pattern here
    return (
        <DumpSendMessage
            TextInputComponent={MobileSendMessage}
            getMentionsSuggestions={async () => []}
            initialMentions={[]}
            handleDrop={handleDrop}
            handleChange={handleChange}
            handleSend={handleSend}
            inputRef={inputRef}
            inputValue={inputValue}
            enabled={messageComposeProps.enabled}
        />
    );
};
