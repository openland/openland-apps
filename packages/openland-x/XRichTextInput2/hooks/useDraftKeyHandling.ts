import { getDefaultKeyBinding } from 'draft-js';
import { EmojiSuggestionsStateT } from '../modules/emoji/EmojiSuggestions/useEmojiSuggestions';
import { MentionSuggestionsStateT } from '../modules/mentions/MentionSuggestions/useMentionSuggestions';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';

const keyBinding = (e: React.KeyboardEvent<any>): string | null => {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
};

type useKeyHandlingT = {
    onSubmit?: () => Promise<void>;
    mentionState: MentionSuggestionsStateT;
    emojiState: EmojiSuggestionsStateT;
    addMention: Function;
    addEmoji: Function;
    updateEditorStateFromTextAndMentions: (a: { text: string; mentions: UserWithOffset[] }) => void;
};

export function useDraftKeyHandling({
    onSubmit,
    mentionState,
    addMention,
    emojiState,
    addEmoji,
    updateEditorStateFromTextAndMentions,
}: useKeyHandlingT) {
    const onHandleKey = (command: string) => {
        if (command === 'x-editor-submit') {
            if (emojiState.isSelecting) {
                addEmoji(emojiState.suggestions[emojiState.selectedEntryIndex]);
                return 'handled';
            } else if (mentionState.isSelecting) {
                addMention(mentionState.suggestions[mentionState.selectedEntryIndex]);
                return 'handled';
            }

            if (onSubmit) {
                onSubmit().then(() => {
                    updateEditorStateFromTextAndMentions({ text: '', mentions: [] });
                });

                return 'handled';
            }
        }
        return 'not-handled';
    };

    return { keyBinding, onHandleKey };
}
