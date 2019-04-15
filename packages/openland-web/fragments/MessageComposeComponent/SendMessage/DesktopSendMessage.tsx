import * as React from 'react';
import Glamorous from 'glamorous';
import { XRichTextInput2 } from 'openland-x/XRichTextInput2';
import { TextInputComponentInnerT } from '../DumpSendMessage';

export const TextInputWrapper = Glamorous.div({
    flexGrow: 1,
    maxHeight: '100%',
    maxWidth: '100%',
    '& > div': {
        maxHeight: '100%',
        height: '100%',
        '& .DraftEditor-root': {
            overflow: 'auto',
            borderRadius: 10,
            backgroundColor: '#ffffff',
            border: 'solid 1px #ececec',
            minHeight: 40,
            maxHeight: 255,
            paddingTop: 9,
            paddingBottom: 9,
            paddingLeft: 16,
            paddingRight: 40,
        },
    },
});

export const DesktopSendMessage = ({
    inputValue,
    handleChange,
    inputRef,
    handleSend,
    handleDrop,
    mentionsState,
    minimal,
    hideAttach,
    round,
}: TextInputComponentInnerT) => {
    return (
        <TextInputWrapper>
            <XRichTextInput2
                minimal={minimal}
                hideAttach={hideAttach}
                round={round}
                flexGrow={1}
                mentionsData={mentionsState!!.mentionsData}
                placeholder="Write a message..."
                onChange={handleChange}
                onSubmit={handleSend}
                ref={inputRef}
                value={inputValue}
                onPasteFile={handleDrop}
            />
        </TextInputWrapper>
    );
};
