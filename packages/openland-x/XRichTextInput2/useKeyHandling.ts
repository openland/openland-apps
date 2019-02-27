import { getDefaultKeyBinding } from 'draft-js';

const keyBinding = (e: React.KeyboardEvent<any>): string | null => {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
};

type useKeyHandlingT = {
    onSubmit?: () => void;
    filteredSuggestions: any;
    applyMentionById: any;
    selectedMentionEntryIndex: any;
};

export function useKeyHandling({
    onSubmit,
    filteredSuggestions,
    applyMentionById,
    selectedMentionEntryIndex,
}: useKeyHandlingT) {
    const onHandleKey = (command: string) => {
        if (!!filteredSuggestions.length) {
            applyMentionById(selectedMentionEntryIndex);

            return 'handled';
        }
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
