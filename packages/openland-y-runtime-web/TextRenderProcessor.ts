import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { emoji } from 'openland-y-utils/emoji';
import { Span, SpecSymbolsType, SpanType } from 'openland-y-utils/spans/Span';
import { removeLineBreakers } from 'openland-y-utils/spans/removeLineBreakers';
import { cropSpecSymbols } from 'openland-y-utils/spans/cropSpecSymbols';

export const TextRenderProccessor: TextRenderProccessorApi = {
    processSpan(type: SpanType, text: string, size?: 'default' | 'big' | 'huge') {
        let emojiSize: 16 | 20 | 38 = 16;

        if (size === 'big') {
            emojiSize = 20;
        }

        if (size === 'huge') {
            emojiSize = 38;
        }

        return emoji({
            src: text,
            size: emojiSize
        });
    },

    cropSpecSymbols(spans: Span[], parent: Span, symbolObject: SpecSymbolsType) {
        return cropSpecSymbols(spans, parent, symbolObject);
    },

    removeLineBreakers(spans: Span[]) {
        return removeLineBreakers(spans, ['code_block']);
    }
};