import * as React from 'react';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/useInputMethods';

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
    };

    const setInputValue = (text: string) => {
        if (inputRef.current) {
            return inputRef.current.setInputValue(text);
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
