import * as React from 'react';
import { EditorState, ContentState } from 'draft-js';

export type XRichTextInput2RefMethods = {
    focus: () => void;
    resetAndFocus: () => void;
    getHasFocus: () => boolean;
};

type useInputMethodsT = {
    ref: any;
    editorRef?: any;
    setEditorState: any;
    editorState: any;
};

export function useInputMethods({ ref, editorRef, setEditorState, editorState }: useInputMethodsT) {
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
        focus,
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
