import * as React from 'react';
import { EditorState, ContentState, CompositeDecorator, ContentBlock } from 'draft-js';

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
    let text = content.getBlockForKey(selection.getStartKey()).getText();
    let startIndex = findActiveWordStart(state);
    let res = text.substring(startIndex, selection.getEndOffset());
    if (res.length === 0) {
        return undefined;
    } else {
        return res;
    }
}

function findLinkMention(contentBlock: ContentBlock, callback: any, contentState: ContentState) {
    contentBlock.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
    }, callback);
}

export function useHandleEditorChange({ onChange, value }: { onChange: any; value: any }) {
    const [plainText, setPlainText] = React.useState('');
    const [activeWord, setActiveWord] = React.useState<string>('');

    const getEditorStateFromText = (text: string) => {
        return EditorState.moveFocusToEnd(
            EditorState.createWithContent(
                ContentState.createFromText(text),
                new CompositeDecorator([
                    {
                        strategy: findLinkMention,
                        component: (p: any) => (
                            <span style={{ backgroundColor: '#f00' }}>{p.children}</span>
                        ),
                    },
                ]),
            ),
        );
    };

    const [editorState, setEditorState] = React.useState(getEditorStateFromText(value));

    const handleEditorChange = (newEditorState: EditorState) => {
        const newActiveWord = findActiveWord(newEditorState);

        if (activeWord !== newActiveWord) {
            setActiveWord(newActiveWord || '');
        }

        const newPlainText = editorState.getCurrentContent().getPlainText();

        setEditorState(newEditorState);
        setPlainText(newPlainText);
    };

    React.useLayoutEffect(() => {
        if (onChange) {
            onChange(plainText);
        }
    }, [plainText]);

    React.useLayoutEffect(() => {
        if (value !== plainText) {
            setEditorState(getEditorStateFromText(value));
            setPlainText(value);
        }
    }, [value]);

    return { activeWord, handleEditorChange, editorState, setEditorState };
}
