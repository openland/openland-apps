import { EditorState, Modifier } from 'draft-js';
import { UserShort } from 'openland-api/Types';

export function findActiveWordStart(state: EditorState): number {
    let content = state.getCurrentContent();
    let selection = state.getSelection();
    if (selection.getStartKey() !== selection.getEndKey()) {
        return -1;
    }
    let text = content.getBlockForKey(selection.getStartKey()).getText();

    let startIndex = selection.getStartOffset() - 1;
    while (startIndex >= 0) {
        if (text.charAt(startIndex) !== ' ') {
            startIndex--;
        } else {
            break;
        }
    }

    return startIndex + 1;
}

export function findActiveWord(state: EditorState): string | undefined {
    let content = state.getCurrentContent();
    let selection = state.getSelection();
    if (!selection.getHasFocus()) {
        return undefined;
    }
    let text = content
        .getBlockForKey(selection.getStartKey())
        .getText()
        .toLowerCase();
    let startIndex = findActiveWordStart(state);
    let res = text.substring(startIndex, selection.getEndOffset());
    if (res.length === 0) {
        return undefined;
    } else {
        return res;
    }
}

const getSearchTextAt = (blockText: string, position: number, trigger: string) => {
    const str = blockText.substr(0, position);
    const begin = trigger.length === 0 ? 0 : str.lastIndexOf(trigger);
    const matchingString = trigger.length === 0 ? str : str.slice(begin + trigger.length);
    const end = str.length;

    return {
        begin,
        end,
        matchingString,
    };
};

const getSearchText = (editorState: EditorState, selection: any, trigger: any) => {
    const anchorKey = selection.getAnchorKey();
    const anchorOffset = selection.getAnchorOffset();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(anchorKey);
    const blockText = currentBlock.getText();
    return getSearchTextAt(blockText, anchorOffset, trigger);
};

type addMentionT = {
    editorState: EditorState;
    mention: UserShort;
    mentionPrefix?: any;
    mentionTrigger?: any;
    entityMutability?: any;
};

export const addMention = ({
    editorState,
    mention,
    mentionPrefix = '@',
    mentionTrigger = '@',
    entityMutability = 'IMMUTABLE',
}: addMentionT) => {
    const contentStateWithEntity = editorState
        .getCurrentContent()
        .createEntity('MENTION', entityMutability, mention);
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const currentSelectionState = editorState.getSelection();
    const { begin, end } = getSearchText(editorState, currentSelectionState, mentionTrigger);

    // get selection of the @mention search text
    const mentionTextSelection = currentSelectionState.merge({
        anchorOffset: begin,
        focusOffset: end,
    }) as any;

    let mentionReplacedContent = Modifier.replaceText(
        editorState.getCurrentContent(),
        mentionTextSelection as any,
        `${mentionPrefix}${mention.name}`,
        null as any, // no inline style needed
        entityKey,
    );

    // If the mention is inserted at the end, a space is appended right after for
    // a smooth writing experience.
    const blockKey = mentionTextSelection.getAnchorKey();
    const blockSize = editorState
        .getCurrentContent()
        .getBlockForKey(blockKey)
        .getLength();
    if (blockSize === end) {
        mentionReplacedContent = Modifier.insertText(
            mentionReplacedContent,
            mentionReplacedContent.getSelectionAfter(),
            ' ',
        );
    }

    const newEditorState = EditorState.push(
        editorState,
        mentionReplacedContent,
        'insert-mention' as any,
    );
    return EditorState.forceSelection(newEditorState, mentionReplacedContent.getSelectionAfter());
};
