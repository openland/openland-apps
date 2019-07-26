import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { emoji } from 'openland-y-utils/emoji';
import { Span, SpecSymbolsType, SpanType } from 'openland-y-utils/spans/Span';
import { removeLineBreakers } from 'openland-y-utils/spans/removeLineBreakers';
import { cropSpecSymbols } from 'openland-y-utils/spans/cropSpecSymbols';
import emojiData from 'openland-y-utils/data/emoji-data';
import { emojiAnimated } from 'openland-y-utils/emojiAnimated';

export const TextRenderProccessor: TextRenderProccessorApi = {
    processSpan(type: SpanType, text: string, size?: 'default' | 'big' | 'huge') {
        if (size === 'huge' && emojiData.animUnicodeToName.has(text)) {
            return emojiAnimated(text);
        }

        return emoji(text);
    },

    cropSpecSymbols(spans: Span[], parent: Span, symbolObject: SpecSymbolsType) {
        return cropSpecSymbols(spans, parent, symbolObject);
    },

    removeLineBreakers(spans: Span[]) {
        return removeLineBreakers(spans, ['code_block']);
    }
};