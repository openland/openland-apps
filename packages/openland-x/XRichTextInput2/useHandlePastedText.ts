import { BlockMapBuilder } from 'draft-js';
const DraftPasteProcessor = require('draft-js/lib/DraftPasteProcessor');

import convertEmojioneImageToUnicode from './utils/convertEmojioneImageToUnicode';
import insertFragment from './utils/insertFragment';
import getUnicode from './utils/defaultGetUnicode';

const createHandlePastedText = (config: any) => (
    text: string,
    html: string | boolean,
    editorState: any,
    {
        getProps,
        getEditorState,
        setEditorState,
    }: { getProps: any; getEditorState: any; setEditorState: any },
) => {
    if (!html) {
        return 'not-handled';
    }
    if ((html = convertEmojioneImageToUnicode(html, config))) {
        // eslint-disable-line no-cond-assign
        // refer to original
        // @see https://github.com/facebook/draft-js/blob/0a1f981a42ba665471bf35e3955560988de24c78/src/component/handlers/edit/editOnPaste.js#L153-L168
        const htmlFragment = DraftPasteProcessor.processHTML(html, getProps().blockRenderMap);
        if (htmlFragment) {
            const { contentBlocks, entityMap } = htmlFragment;
            if (contentBlocks) {
                setEditorState(
                    insertFragment(
                        getEditorState(),
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

export function useHandlePastedText() {
    return {
        handlePastedText: createHandlePastedText({ selector: 'img.emojione', getUnicode }),
    };
}
