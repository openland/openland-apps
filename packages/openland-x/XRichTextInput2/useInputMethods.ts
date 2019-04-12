import * as React from 'react';
import { EditorState, ContentState } from 'draft-js';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

export type XRichTextInput2RefMethods = {
    focus: () => void;
    resetAndFocus: () => void;
    getHasFocus: () => boolean;
    setInputValue: (a: { text: string; mentions: UserWithOffset[] }) => void;
    getMentions: () => UserWithOffset[];
};

type useInputMethodsT = {
    ref: any;
    editorRef?: any;
    setEditorState: (a: EditorState) => void;
    editorState: EditorState;
    getMentions: () => UserWithOffset[];
    updateEditorStateFromTextAndMentions: (a: { text: string; mentions: UserWithOffset[] }) => void;
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
