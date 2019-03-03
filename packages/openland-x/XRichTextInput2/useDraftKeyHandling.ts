import { getDefaultKeyBinding } from 'draft-js';
import { MentionDataT } from './components/MentionSuggestionsEntry';

const keyBinding = (e: React.KeyboardEvent<any>): string | null => {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
};

type useKeyHandlingT = {
    onSubmit?: () => void;
    mentionSuggestions: MentionDataT[];
    applyCurrentSuggestedMention: Function;
    emojiSuggestions: string[];
    applyCurrentSuggestedEmoji: Function;
};

export function useDraftKeyHandling({
    onSubmit,
    mentionSuggestions,
    applyCurrentSuggestedMention,
    emojiSuggestions,
    applyCurrentSuggestedEmoji,
}: useKeyHandlingT) {
    const onHandleKey = (command: string) => {
        if (command === 'x-editor-submit') {
            if (!!emojiSuggestions.length) {
                applyCurrentSuggestedEmoji();

                return 'handled';
            }
            if (!!mentionSuggestions.length) {
                applyCurrentSuggestedMention();

                return 'handled';
            }

            if (onSubmit) {
                onSubmit();
                return 'handled';
            }
        }
        return 'not-handled';
    };

    return { keyBinding, onHandleKey };
}
