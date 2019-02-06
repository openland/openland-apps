import { XRichTextInput } from 'openland-x/XRichTextInput';

export function useInputMethods({ inputRef }: { inputRef: XRichTextInput | any }) {
    const focus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
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
    };
}
