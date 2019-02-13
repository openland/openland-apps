import { XRichTextInput } from 'openland-x/XRichTextInput';

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
    inputRef: XRichTextInput | any;
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
        return !!(
            inputRef &&
            inputRef.current &&
            inputRef.current.state.editorState.getSelection().getHasFocus()
        );
    };

    return {
        focus,
        resetAndFocus,
        hasFocus,
        focusIfNeeded,
    };
}
