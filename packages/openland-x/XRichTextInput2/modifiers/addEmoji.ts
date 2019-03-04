import { EditorState, Modifier } from 'draft-js';
import { emojiList } from '../utils/emojiList';
import { convertShortNameToUnicode } from '../utils/convertShortNameToUnicode';
import { getShortNameForImage } from '../utils/getShortNameForImage';

// This modifier can inserted emoji to current cursor position (with replace selected fragment),
// or replaced emoji shortname like ":thumbsup:". Behavior determined by `Mode` parameter.
export const Mode = {
    INSERT: 'INSERT', // insert emoji to current cursor position
    REPLACE: 'REPLACE', // replace emoji shortname
};

type addEmojiT = {
    editorState: EditorState;
    emojiShortName?: string;
    mode?:
        | {
              type: 'INSERT';
          }
        | {
              type: 'REPLACE';
              begin: number;
              end: number;
          };
};

export const addEmoji = ({ editorState, emojiShortName, mode = { type: 'INSERT' } }: addEmojiT) => {
    let emoji;
    // :male_sign: fails now
    if (!emojiShortName || !getShortNameForImage(emojiShortName)) {
        emoji = '📷';
    } else {
        emoji = convertShortNameToUnicode(getShortNameForImage(emojiShortName));
    }

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('emoji', 'IMMUTABLE', {
        emojiUnicode: emoji,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const currentSelectionState = editorState.getSelection();

    let emojiAddedContent;

    switch (mode.type) {
        case 'INSERT': {
            // in case text is selected it is removed and then the emoji is added
            const afterRemovalContentState = Modifier.removeRange(
                contentState,
                currentSelectionState,
                'backward',
            );

            // deciding on the position to insert emoji
            const targetSelection = afterRemovalContentState.getSelectionAfter();

            emojiAddedContent = Modifier.insertText(
                afterRemovalContentState,
                targetSelection,
                emoji,
                null as any,
                entityKey,
            );

            break;
        }

        case 'REPLACE': {
            const { begin, end } = mode;

            // Get the selection of the :emoji: search text
            const emojiTextSelection = currentSelectionState.merge({
                anchorOffset: begin,
                focusOffset: end,
            }) as any;

            emojiAddedContent = Modifier.replaceText(
                contentState,
                emojiTextSelection,
                emoji,
                null as any,
                entityKey,
            );

            break;
        }

        default:
            throw new Error('Unidentified value of "mode"');
    }

    const newEditorState = EditorState.push(editorState, emojiAddedContent, 'insert-emoji' as any);
    return EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter());
};
