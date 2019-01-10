import * as React from 'react';
import { Editor, EditorState } from 'draft-js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

function findActiveWord(state: EditorState): string | undefined {
    let content = state.getCurrentContent();
    let selection = state.getSelection();
    if (!selection.getHasFocus()) {
        return undefined;
    }
    if (selection.getStartKey() !== selection.getEndKey()) {
        return undefined;
    }
    let text = content.getBlockForKey(selection.getStartKey()).getText();

    let startIndex = selection.getStartOffset() - 1;
    while (startIndex >= 0) {
        if (text.charAt(startIndex) !== ' ') {
            startIndex--;
        } else {
            break;
        }
    }

    let res = text.substring(startIndex + 1, selection.getStartOffset());
    if (res.length === 0) {
        return undefined;
    } else {
        return res;
    }
}

export interface XRichTextInput2 {
    onCurrentWordChanged?: (word: string | undefined) => void;
}

export const XRichTextInput2 = React.memo<XRichTextInput2>((props) => {
    if (!canUseDOM) {
        return null;
    }
    let [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    let editorStateHandler = React.useCallback((value: EditorState) => {
        if (props.onCurrentWordChanged) {
            props.onCurrentWordChanged(findActiveWord(value));
        }
        return setEditorState(value);
    }, [props.onCurrentWordChanged]);

    return <Editor editorState={editorState} onChange={editorStateHandler} />;
});