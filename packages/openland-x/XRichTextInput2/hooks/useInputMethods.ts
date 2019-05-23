import * as React from 'react';
import { EditorState, ContentState } from 'draft-js';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';
import { IsActivePoliteContext } from 'openland-web/pages/main/mail/components/CacheComponent';
import {
    FullMessage_GeneralMessage_spans_MessageSpanUserMention,
    FullMessage_GeneralMessage_spans_MessageSpanAllMention,
} from 'openland-api/Types';

export type XRichTextInput2RefMethods = {
    getElement: () => HTMLElement | null;
    focus: () => void;
    resetAndFocus: () => void;
    getHasFocus: () => boolean;
    setInputValue: (a: { text: string; mentions: UserWithOffset[] }) => void;
    getMentions: () => (
        | FullMessage_GeneralMessage_spans_MessageSpanUserMention
        | FullMessage_GeneralMessage_spans_MessageSpanAllMention)[];
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
    const activeChecker = React.useContext(IsActivePoliteContext);
    const focus = () => {
        if (!activeChecker.getValue()) {
            return;
        }
        window.requestAnimationFrame(() => {
            if (editorRef && editorRef.current) {
                editorRef.current.focus();
            }
        });
    };

    const resetAndFocus = () => {
        if (!activeChecker.getValue()) {
            return;
        }
        window.requestAnimationFrame(() => {
            setEditorState(
                EditorState.push(editorState, ContentState.createFromText(''), 'remove-range'),
            );

            focus();
        });
    };

    React.useImperativeHandle<XRichTextInput2RefMethods, any>(ref, () => ({
        getElement: () => {
            return editorRef.current.editorContainer;
        },
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
