import * as React from 'react';
import { XRichTextInput2RefMethods } from 'openland-x/XRichTextInput2/hooks/useInputMethods';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';

export type InputMethodsStateT = XRichTextInput2RefMethods & {
    focusIfNeeded: Function;
};

type useInputMethodsT = {
    enabled?: boolean;
    inputRef: React.RefObject<XRichTextInput2RefMethods>;
};

export function useInputMethods({ inputRef, enabled }: useInputMethodsT) {
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

    const getElement = () => {
        if (inputRef.current) {
            return inputRef.current.getElement();
        }
        return null;
    };

    const getMentions = () => {
        if (inputRef.current) {
            return inputRef.current.getMentions();
        }
        return [];
    };

    const setInputValue = ({ text, mentions }: { text: string; mentions: UserWithOffset[] }) => {
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
        getElement,
        focus,
        resetAndFocus,
        getHasFocus,
        focusIfNeeded,
        getMentions,
        setInputValue,
    };
}
