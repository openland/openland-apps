import * as React from 'react';

export type XRichTextInput2RefMethods = {
    focus: () => void;
    resetAndFocus: () => void;
    getHasFocus: () => boolean;
};

export type InputMethodsStateT = {
    focus: Function;
    resetAndFocus: Function;
    hasFocus: Function;
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

    const hasFocus = () => {
        return !!(inputRef && inputRef.current && inputRef.current.getHasFocus());
    };

    return {
        focus,
        resetAndFocus,
        hasFocus,
        focusIfNeeded,
    };
}
