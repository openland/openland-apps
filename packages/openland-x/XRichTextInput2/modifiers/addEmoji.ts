import { EditorState, Modifier } from 'draft-js';
import { getSearchText } from '../utils/getSearchText';
import { emojiList } from '../utils/emojiList';
import { convertShortNameToUnicode } from '../utils/convertShortNameToUnicode';

// This modifier can inserted emoji to current cursor position (with replace selected fragment),
// or replaced emoji shortname like ":thumbsup:". Behavior determined by `Mode` parameter.
export const Mode = {
    INSERT: 'INSERT', // insert emoji to current cursor position
    REPLACE: 'REPLACE', // replace emoji shortname
};

export const addEmoji = ({
    editorState,
    emojiShortName,
    mode = Mode.INSERT,
}: {
    editorState: EditorState;
    emojiShortName?: string;
    mode?: string;
}) => {
    let emoji;
    // :male_sign: fails now
    if (!emojiShortName || !emojiList.list[emojiShortName]) {
        emoji = '📷';
    } else {
        const unicode = emojiList.list[emojiShortName][0];
        emoji = convertShortNameToUnicode(unicode);
    }

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('emoji', 'IMMUTABLE', {
        emojiUnicode: emoji,
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const currentSelectionState = editorState.getSelection();

    let emojiAddedContent;
    let emojiEndPos = 0;
    let blockSize = 0;

    switch (mode) {
        case Mode.INSERT: {
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

            emojiEndPos = targetSelection.getAnchorOffset();
            const blockKey = targetSelection.getAnchorKey();
            blockSize = contentState.getBlockForKey(blockKey).getLength();

            break;
        }

        case Mode.REPLACE: {
            const { begin, end } = getSearchText(editorState, currentSelectionState);

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

            emojiEndPos = end;
            const blockKey = emojiTextSelection.getAnchorKey();
            blockSize = contentState.getBlockForKey(blockKey).getLength();

            break;
        }

        default:
            throw new Error('Unidentified value of "mode"');
    }

    const newEditorState = EditorState.push(editorState, emojiAddedContent, 'insert-emoji' as any);
    return EditorState.forceSelection(newEditorState, emojiAddedContent.getSelectionAfter());
};
