import * as React from 'react';
import { EditorState, ContentState } from 'draft-js';
import { MentionDataT } from './components/MentionSuggestionsEntry';

export type XRichTextInput2RefMethods = {
    focus: () => void;
    resetAndFocus: () => void;
    getHasFocus: () => boolean;
    setInputValue: (a: { text: string; mentions: MentionDataT[] }) => void;
    getMentions: () => MentionDataT[];
};

type useInputMethodsT = {
    ref: any;
    editorRef?: any;
    setEditorState: (a: EditorState) => void;
    editorState: EditorState;
    getMentions: () => MentionDataT[];
    updateEditorStateFromTextAndMentions: (a: { text: string; mentions: MentionDataT[] }) => void;
};

export function useInputMethods({
    ref,
    editorRef,
    setEditorState,
    editorState,
    getMentions,
    updateEditorStateFromTextAndMentions,
}: useInputMethodsT) {
    const focus = () => {
        window.requestAnimationFrame(() => {
            if (editorRef && editorRef.current) {
                editorRef.current.focus();
            }
        });
    };

    const resetAndFocus = () => {
        window.requestAnimationFrame(() => {
            setEditorState(
                EditorState.push(editorState, ContentState.createFromText(''), 'remove-range'),
            );

            focus();
        });
    };

    // hack to fix useImperativeHandle typings
    React.useImperativeHandle<XRichTextInput2RefMethods, any>(ref, () => ({
        getMentions,
        focus,
        setInputValue: updateEditorStateFromTextAndMentions,
        resetAndFocus: () => {
            window.requestAnimationFrame(() => {
                setEditorState(
                    EditorState.push(editorState, ContentState.createFromText(''), 'remove-range'),
                );

                focus();
            });
        },
        getHasFocus: () => {
            return editorState.getSelection().getHasFocus();
        },
    }));

    return {
        focus,
        resetAndFocus,
    };
}
