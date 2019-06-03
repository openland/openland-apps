import { getDefaultKeyBinding } from 'draft-js';
import { EmojiSuggestionsStateT } from '../modules/emoji/EmojiSuggestions/useEmojiSuggestions';
import { MentionSuggestionsStateT } from '../modules/mentions/MentionSuggestions/useMentionSuggestions';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';

enum XEditorCommands {
    BoldWrap = 'BoldWrap',
    ItalicWrap = 'ItalicWrap',
    IronyWrap = 'IronyWrap',
    EditorSubmit = 'EditorSubmit',
}

const keyBinding = (e: React.KeyboardEvent<any>): string | null => {
    if (e.key === 'b' && e.metaKey) {
        return XEditorCommands.BoldWrap;
    }
    if (e.key === 'i' && e.metaKey) {
        return XEditorCommands.ItalicWrap;
    }
    if (e.key === 'u' && e.metaKey) {
        return XEditorCommands.IronyWrap;
    }

    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return XEditorCommands.EditorSubmit;
    }
    return getDefaultKeyBinding(e);
};

type useKeyHandlingT = {
    wrapSelectedWithSymbols: (a: { startSymbol: string; endSymbol: string }) => void;
    onSubmit?: () => Promise<void>;
    mentionState: MentionSuggestionsStateT;
    emojiState: EmojiSuggestionsStateT;
    addMention: Function;
    addEmoji: Function;
    updateEditorStateFromTextAndMentions: (a: { text: string; mentions: UserWithOffset[] }) => void;
};

export function useDraftKeyHandling({
    wrapSelectedWithSymbols,
    onSubmit,
    mentionState,
    addMention,
    emojiState,
    addEmoji,
    updateEditorStateFromTextAndMentions,
}: useKeyHandlingT) {
    const onHandleKey = (command: string) => {
        if (command === XEditorCommands.EditorSubmit) {
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
        } else if (command === XEditorCommands.BoldWrap) {
            wrapSelectedWithSymbols({
                startSymbol: '*',
                endSymbol: '*',
            });
            return 'handled';
        } else if (command === XEditorCommands.ItalicWrap) {
            wrapSelectedWithSymbols({
                startSymbol: '_',
                endSymbol: '_',
            });
            return 'handled';
        } else if (command === XEditorCommands.IronyWrap) {
            wrapSelectedWithSymbols({
                startSymbol: '~',
                endSymbol: '~',
            });
        }
        return 'not-handled';
    };

    return { keyBinding, onHandleKey };
}
