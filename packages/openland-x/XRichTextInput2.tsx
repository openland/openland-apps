import * as React from 'react';
import { Editor, EditorState, Modifier } from 'draft-js';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

function findActiveWordStart(state: EditorState): number {
    let content = state.getCurrentContent();
    let selection = state.getSelection();
    if (selection.getStartKey() !== selection.getEndKey()) {
        return -1;
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
    return startIndex + 1;
}

function findActiveWord(state: EditorState): string | undefined {
    let content = state.getCurrentContent();
    let selection = state.getSelection();
    if (!selection.getHasFocus()) {
        return undefined;
    }
    let startIndex = findActiveWordStart(state);
    let text = content.getBlockForKey(selection.getStartKey()).getText();
    let res = text.substring(startIndex, selection.getStartOffset());
    if (res.length === 0) {
        return undefined;
    } else {
        return res;
    }
}

export interface XRichTextInput2Props {
    onCurrentWordChanged?: (word: string | undefined) => void;
}

export class XRichTextInput2 extends React.PureComponent<XRichTextInput2Props, { editorState: EditorState }> {

    private ref = React.createRef<Editor>();

    constructor(props: XRichTextInput2Props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
    }

    applyMention = (src: { name: string, id: string }) => {
        this.setState((s) => {
            let selection = s.editorState.getSelection()
            let start = findActiveWordStart(s.editorState);
            if (start < 0) {
                return s;
            }
            let s2 = selection.merge({
                anchorOffset: start,
                focusOffset: selection.getFocusOffset()
            }) as any;
            let replace = Modifier.replaceText(s.editorState.getCurrentContent(), s2, src.name)

            let s3 = EditorState.push(
                s.editorState,
                replace,
                'insert-mention' as any,
            );
            return { editorState: s3 };
        }, () => this.ref.current!.focus());
    }

    private handleEditorChange = (value: EditorState) => {
        if (this.props.onCurrentWordChanged) {
            this.props.onCurrentWordChanged(findActiveWord(value));
        }
        this.setState({ editorState: value });
    }

    render() {
        if (!canUseDOM) {
            return null;
        }

        return <Editor ref={this.ref} stripPastedStyles={true} editorState={this.state.editorState} onChange={this.handleEditorChange} />;
    }
}