import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { Span } from 'openland-y-utils/spans/Span';
import { cropSpecSymbols } from 'openland-y-utils/cropSpecSymbols';

export const TextRenderProccessor: TextRenderProccessorApi = {
    emojify(text: string, isBig?: boolean) {
        return text;
    },

    cropSpecSymbols(spans: Span[], symbol: string, opened?: boolean, isBigParent?: boolean) {
        if (['*', '_', ':', '@'].includes(symbol)) {
            return cropSpecSymbols(spans, symbol, opened, isBigParent);
        }

        return spans;
    }
};