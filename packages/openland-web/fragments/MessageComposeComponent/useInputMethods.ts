import * as React from 'react';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';
import { MentionDataT } from 'openland-x/XRichTextInput2/components/MentionSuggestionsEntry';

export type InputMethodsStateT = XRichTextInput2RefMethods & {
    focusIfNeeded: Function;
};

export function useInputMethods({
    inputRef,
    enabled,
}: {
    enabled?: boolean;
    inputRef: React.RefObject<XRichTextInput2RefMethods>;
}) {
    const focus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const focusIfNeeded = () => {
        if (enabled !== false) {
            focus();
        }
    };

    const resetAndFocus = () => {
        if (inputRef.current) {
            inputRef.current.resetAndFocus();
        }
    };

    const getMentions = () => {
        if (inputRef.current) {
            return inputRef.current.getMentions();
        }
        return [];
    };

    const setInputValue = ({ text, mentions }: { text: string; mentions: MentionDataT[] }) => {
        if (inputRef.current) {
            return inputRef.current.setInputValue({
                text,
                mentions,
            });
        }
    };

    const getHasFocus = () => {
        return !!(inputRef && inputRef.current && inputRef.current.getHasFocus());
    };

    return {
        focus,
        resetAndFocus,
        getHasFocus,
        focusIfNeeded,
        getMentions,
        setInputValue,
    };
}
