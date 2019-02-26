import { getDefaultKeyBinding } from 'draft-js';

const keyBinding = (e: React.KeyboardEvent<any>): string | null => {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
};

export function useKeyHandling({ onSubmit }: { onSubmit?: () => void }) {
    const onHandleKey = (command: string) => {
        if (command === 'x-editor-submit') {
            if (onSubmit) {
                onSubmit();
                return 'handled';
            }
        }
        return 'not-handled';
    };

    return { keyBinding, onHandleKey };
}
