// @see https://github.com/facebook/draft-js/blob/0a1f981a42ba665471bf35e3955560988de24c78/src/component/handlers/edit/editOnPaste.js#L197
import { EditorState, Modifier, convertFromRaw } from 'draft-js';
import { getEditorStateFromText } from './useHandleEditorChange/useHandleEditorChange';
import { getEmojiAndMentionBlocksAndEntityMap } from './useHandleEditorChange/dataConversion';

const insertFragment = (editorState: EditorState, fragment: any, entityMap: any) => {
    const newContent = Modifier.replaceWithFragment(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        fragment,
    );

    return EditorState.push(
        editorState,
        newContent.set('entityMap', entityMap) as any,
        'insert-fragment',
    );
};

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
