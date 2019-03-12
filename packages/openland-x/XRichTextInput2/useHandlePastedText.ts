import { EditorState } from 'draft-js';
import { convertFromRaw } from 'draft-js';
import { getEditorStateFromText } from './useHandleEditorChange';
import { insertFragment } from './utils/insertFragment';
import { getEmojiAndMentionBlocksAndEntityMap } from './dataConversion';

export function useHandlePastedText({
    editorState,
    updateEditorState,
}: {
    editorState: EditorState;
    updateEditorState: Function;
}) {
    const handlePastedText = (text: string) => {
        const blocksAndEntity = getEmojiAndMentionBlocksAndEntityMap(text, []);
        const contentState = convertFromRaw(blocksAndEntity as any);

        updateEditorState(
            insertFragment(editorState, contentState.getBlockMap(), blocksAndEntity.entityMap),
            getEditorStateFromText({
                text,
                mentions: [],
            }),
        );
        return 'handled';
    };

    return {
        handlePastedText,
    };
}
