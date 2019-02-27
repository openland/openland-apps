// @see https://github.com/facebook/draft-js/blob/0a1f981a42ba665471bf35e3955560988de24c78/src/component/handlers/edit/editOnPaste.js#L197
import { EditorState, Modifier } from 'draft-js';

const insertFragment = (editorState: any, fragment: any, entityMap: any) => {
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

export default insertFragment;
