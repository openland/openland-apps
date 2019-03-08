import * as React from 'react';
import { EditorState, ContentState } from 'draft-js';

export type XRichTextInput2RefMethods = {
    focus: () => void;
    resetAndFocus: () => void;
    getHasFocus: () => boolean;
    getMentions: any;
    setInputValue: Function;
};

type useInputMethodsT = {
    ref: any;
    editorRef?: any;
    setEditorState: (a: EditorState) => void;
    editorState: EditorState;
    getMentions: any;
    updateEditorStateFromTextAndMentions: ({
        text,
        mentions,
    }: {
        text: string;
        mentions: any;
    }) => void;
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
    const useImperativeHandle = (React as any)
        .useImperativeHandle as typeof React.useImperativeMethods;

    useImperativeHandle<XRichTextInput2RefMethods, any>(ref, () => ({
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
