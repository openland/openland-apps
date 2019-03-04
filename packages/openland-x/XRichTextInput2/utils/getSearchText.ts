import { EditorState } from 'draft-js';
import { getWordAt } from './getWordAt';

export const getSearchText = (editorState: EditorState, selection: any) => {
    const anchorKey = selection.getAnchorKey();
    const anchorOffset = selection.getAnchorOffset() - 1;
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(anchorKey);
    const blockText = currentBlock.getText();

    return getWordAt(blockText, anchorOffset);
};
