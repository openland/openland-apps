import { findActiveWordStart } from './useHandleEditorChange';
import { EditorState, Modifier, SelectionState, getDefaultKeyBinding } from 'draft-js';

const keyBinding = (e: React.KeyboardEvent<any>): string | null => {
    if (e.keyCode === 13 /* `Enter` key */ && !e.shiftKey) {
        return 'x-editor-submit';
    }
    return getDefaultKeyBinding(e);
};

type useKeyHandlingT = {
    onSubmit?: () => void;
    editorState: any;
    setEditorState: any;
    filteredSuggestions: any;
    applyMentionById: any;
    selectedMentionEntryIndex: any;
};

export function useKeyHandling({
    onSubmit,
    editorState,
    setEditorState,
    filteredSuggestions,
    applyMentionById,
    selectedMentionEntryIndex,
}: useKeyHandlingT) {
    const applyMention = (src: { name: string; id: string }) => {
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

        let entity = content.createEntity('MENTION', 'IMMUTABLE', { uid: src.id });

        let replace = Modifier.replaceText(
            entity,
            s2,
            `@${src.name}`,
            undefined,
            entity.getLastCreatedEntityKey(),
        );

        // let stext = src.name;
        if (
            selection.getEndOffset() === text.length ||
            text.charAt(selection.getEndOffset()) !== ' '
        ) {
            // stext = src.name + ' ';

            replace = Modifier.insertText(replace, replace.getSelectionAfter(), ' ');
        }

        let s3 = EditorState.moveFocusToEnd(
            EditorState.push(editorState, replace, 'insert-mention' as any),
        );

        setEditorState(s3);
    };

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

    return { keyBinding, onHandleKey, applyMention };
}
