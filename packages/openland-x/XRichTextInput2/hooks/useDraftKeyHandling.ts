import { getDefaultKeyBinding } from 'draft-js';
import { EmojiSuggestionsStateT } from '../modules/emoji/EmojiSuggestions/useEmojiSuggestions';
import { MentionSuggestionsStateT } from '../modules/mentions/MentionSuggestions/useMentionSuggestions';
import { UserWithOffset } from 'openland-engines/legacy/legacymentions';

export enum XWrapWithSymbolCommand {
    BoldWrap = 'BoldWrap',
    ItalicWrap = 'ItalicWrap',
    IronyWrap = 'IronyWrap',
}

export const cmdSymbolMap = {
    [XWrapWithSymbolCommand.BoldWrap]: '*',
    [XWrapWithSymbolCommand.ItalicWrap]: '_',
    [XWrapWithSymbolCommand.IronyWrap]: '~',
};

export const symbolCmdWrapMap = {
    '*': XWrapWithSymbolCommand.BoldWrap,
    _: XWrapWithSymbolCommand.ItalicWrap,
    '~': XWrapWithSymbolCommand.IronyWrap,
};

export const XEditorCommands = { ...XWrapWithSymbolCommand, EditorSubmit: 'EditorSubmit' };
export type XEditorCommands = typeof XEditorCommands;

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
    wrapSelectedWithSymbols: (a: XWrapWithSymbolCommand) => void;
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
            wrapSelectedWithSymbols(XEditorCommands.BoldWrap);
            return 'handled';
        } else if (command === XEditorCommands.ItalicWrap) {
            wrapSelectedWithSymbols(XEditorCommands.ItalicWrap);

            return 'handled';
        } else if (command === XEditorCommands.IronyWrap) {
            wrapSelectedWithSymbols(XEditorCommands.IronyWrap);
        }
        return 'not-handled';
    };

    return { keyBinding, onHandleKey };
}
