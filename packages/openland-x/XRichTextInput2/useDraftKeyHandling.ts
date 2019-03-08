import { getDefaultKeyBinding } from 'draft-js';
import { EmojiSuggestionsStateT } from './useEmojiSuggestions';
import { MentionSuggestionsStateT } from './useMentionSuggestions';

const keyBinding = (e: React.KeyboardEvent<any>): string | null => {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
};

type useKeyHandlingT = {
    onSubmit?: () => void;
    mentionState: MentionSuggestionsStateT;
    emojiState: EmojiSuggestionsStateT;
    applyCurrentSuggestedMention: Function;
    applyCurrentSuggestedEmoji: Function;
    updateEditorStateFromTextAndMentions: (a: string) => void;
};

export function useDraftKeyHandling({
    onSubmit,
    mentionState,
    applyCurrentSuggestedMention,
    emojiState,
    applyCurrentSuggestedEmoji,
    updateEditorStateFromTextAndMentions,
}: useKeyHandlingT) {
    const onHandleKey = (command: string) => {
        if (command === 'x-editor-submit') {
            if (emojiState.isSelecting) {
                applyCurrentSuggestedEmoji();
                return 'handled';
            } else if (mentionState.isSelecting) {
                applyCurrentSuggestedMention();
                return 'handled';
            }

            if (onSubmit) {
                onSubmit();
                updateEditorStateFromTextAndMentions('');

                return 'handled';
            }
        }
        return 'not-handled';
    };

    return { keyBinding, onHandleKey };
}
