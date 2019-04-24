import * as React from 'react';
import Glamorous from 'glamorous';
import { XRichTextInput2 } from 'openland-x/XRichTextInput2';
import { TextInputComponentInnerT } from '../DumpSendMessage';

export const TextInputWrapper = Glamorous.div<{ minimal?: boolean }>(({ minimal }) => {
    return {
        flexGrow: 1,
        marginBottom: minimal ? '0 !important' : undefined,
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
                minHeight: minimal ? undefined : 40,
                maxHeight: 255,
                paddingTop: minimal ? 9 : 9,
                paddingBottom: minimal ? 9 : 9,
                paddingLeft: 16,
                paddingRight: minimal ? 150 : 40,
            },
        },
    };
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
        <TextInputWrapper minimal={minimal}>
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
