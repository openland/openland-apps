import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { Span, SpecSymbolsType } from 'openland-y-utils/spans/Span';
import { cropSpecSymbols } from 'openland-y-utils/cropSpecSymbols';

export const TextRenderProccessor: TextRenderProccessorApi = {
    emojify(text: string, isBig?: boolean) {
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
    }
};