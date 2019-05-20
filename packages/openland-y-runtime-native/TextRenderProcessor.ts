import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { Span } from 'openland-y-utils/spans/Span';
import { cropSpecSymbols } from 'openland-y-utils/cropSpecSymbols';

export const TextRenderProccessor: TextRenderProccessorApi = {
    emojify(text: string, isBig?: boolean) {
        return text;
    },

    cropSpecSymbols(spans: Span[], parent: Span, symbol: string[], opened?: boolean) {
        let needCrop = false;

        symbol.map(s => {
            if (['*', '_', ':', '@', '~', '`', '\'', '```', '\'\'\''].includes(s)) {
                needCrop = true;
            }
        });

        if (needCrop) {
            return cropSpecSymbols(spans, parent, symbol, opened);
        }

        return spans;
    }
};