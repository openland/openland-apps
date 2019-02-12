import * as React from 'react';
import { UploadContext } from './FileUploading/UploadContext';
import { MessageComposeComponentDraftProps } from './MessageComposeComponentDesktop';
import { useHandleSend } from './useHandleSend';
import { useGeneralCompose } from './useGeneralCompose';
import { DumpSendMessage } from './DumpSendMessage';
import { MobileSendMessage } from './SendMessage/MobileSendMessage';

export const MobileMessageCompose = (messageComposeProps: MessageComposeComponentDraftProps) => {
    const [inputValue, setInputValue] = React.useState('');
    const { handleDrop } = React.useContext(UploadContext);
    const inputRef = React.useRef<HTMLDivElement>(null);

    const { handleChange, handleDialogDone } = useGeneralCompose({
        setInputValue,
        onChange: messageComposeProps.onChange,
    });

    const { handleSend } = useHandleSend({
        getMessages: messageComposeProps.getMessages,
        conversationId: messageComposeProps.conversationId,
        inputValue,
        setInputValue,
    });

    // TODO maybe some other pattern here
    return (
        <DumpSendMessage
            TextInputComponent={MobileSendMessage}
            handleDrop={handleDrop}
            handleChange={handleChange}
            handleSend={handleSend}
            inputRef={inputRef}
            inputValue={inputValue}
            enabled={messageComposeProps.enabled}
            handleHideChat={messageComposeProps.handleHideChat}
            handleDialogDone={handleDialogDone}
        />
    );
};
