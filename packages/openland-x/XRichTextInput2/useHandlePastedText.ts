import { EditorState, BlockMapBuilder, DefaultDraftBlockRenderMap } from 'draft-js';
const DraftPasteProcessor = require('draft-js/lib/DraftPasteProcessor');
import convertEmojioneImageToUnicode from './utils/convertEmojioneImageToUnicode';
import { insertFragment } from './utils/insertFragment';
import { getUnicode } from './utils/defaultGetUnicode';

export function useHandlePastedText({ setEditorState }: { setEditorState: Function }) {
    const selector = 'img.emojione';

    const handlePastedText = (text: string, html: string | boolean, editorState: EditorState) => {
        if (!html) {
            return 'not-handled';
        }
        if ((html = convertEmojioneImageToUnicode(html, { selector, getUnicode }))) {
            // eslint-disable-line no-cond-assign
            // refer to original
            // @see https://github.com/facebook/draft-js/blob/0a1f981a42ba665471bf35e3955560988de24c78/src/component/handlers/edit/editOnPaste.js#L153-L168

            const blockRenderMap = DefaultDraftBlockRenderMap;
            const htmlFragment = DraftPasteProcessor.processHTML(html, blockRenderMap);
            if (htmlFragment) {
                const { contentBlocks, entityMap } = htmlFragment;
                if (contentBlocks) {
                    setEditorState(
                        insertFragment(
                            editorState,
                            BlockMapBuilder.createFromArray(contentBlocks),
                            entityMap,
                        ),
                    );
                    return 'handled';
                }
            }
        }
        return 'not-handled';
    };

    return {
        handlePastedText,
    };
}
