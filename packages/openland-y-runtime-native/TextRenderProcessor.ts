import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { Span, SpecSymbolsType } from 'openland-y-utils/spans/Span';
import { cropSpecSymbols } from 'openland-y-utils/spans/cropSpecSymbols';
import { removeLineBreakers } from 'openland-y-utils/spans/removeLineBreakers';

export const TextRenderProccessor: TextRenderProccessorApi = {
    emojify(text: string, size?: 'default' | 'big' | 'huge') {
        return text;
    },

    cropSpecSymbols(spans: Span[], parent: Span, symbols: SpecSymbolsType[]) {
        let needCrop = false;

        symbols.map(symbol => {
            if (['*', '_', ':', '@', '~', '`', '\'', '```', '\'\'\'', '# '].includes(symbol.s)) {
                needCrop = true;
            }
        });

        if (needCrop) {
            return cropSpecSymbols(spans, parent, symbols);
        }

        return spans;
    },

    removeLineBreakers(spans: Span[]) {
        return removeLineBreakers(spans, ['code_block', 'loud']);
    }
};