import * as React from 'react';
import { XView } from 'react-mental';
import { ContentEditableTextInput } from '../ContentEditableTextInput';
import { TextInputComponentInnerT } from '../DumpSendMessage';

export const MobileSendMessage = ({
    inputValue,
    handleChange,
    inputRef,
    handleSend,
    handleDrop,
}: TextInputComponentInnerT) => {
    return (
        <XView flexGrow={1} maxHeight="100%" maxWidth="100%">
            <ContentEditableTextInput
                placeholder="Write a message..."
                onChange={handleChange}
                onSubmit={handleSend}
                ref={inputRef}
                value={inputValue}
                onPasteFile={handleDrop}
            />
        </XView>
    );
};
