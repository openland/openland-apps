import { EditorState, SelectionState, Modifier } from 'draft-js';
import { MentionDataT } from '../components/MentionEntry';

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
    let text = content.getBlockForKey(selection.getStartKey()).getText();
    let startIndex = findActiveWordStart(state);
    let res = text.substring(startIndex, selection.getEndOffset());
    if (res.length === 0) {
        return undefined;
    } else {
        return res;
    }
}

export const addMention = ({
    editorState,
    mention: { id, name },
}: {
    editorState: any;
    mention: MentionDataT;
}) => {
    let selection = editorState.getSelection();
    let start = findActiveWordStart(editorState);
    if (start < 0) {
        return;
    }
    let content = editorState.getCurrentContent();
    let text = content.getBlockForKey(selection.getStartKey()).getText();

    let s2 = SelectionState.createEmpty(selection.getStartKey()).merge({
        anchorOffset: start,
        focusOffset: selection.getEndOffset(),
    }) as any;

    let entity = content.createEntity('MENTION', 'IMMUTABLE', { uid: id });

    let replace = Modifier.replaceText(
        entity,
        s2,
        `@${name}`,
        undefined,
        entity.getLastCreatedEntityKey(),
    );

    if (selection.getEndOffset() === text.length || text.charAt(selection.getEndOffset()) !== ' ') {
        replace = Modifier.insertText(replace, replace.getSelectionAfter(), ' ');
    }

    let s3 = EditorState.moveFocusToEnd(
        EditorState.push(editorState, replace, 'insert-mention' as any),
    );

    return s3;
};
