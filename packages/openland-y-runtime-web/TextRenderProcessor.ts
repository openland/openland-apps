import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { emoji } from 'openland-y-utils/emoji';
import { Span } from 'openland-y-utils/spans/Span';
import { cropSpecSymbols } from 'openland-y-utils/cropSpecSymbols';

export const TextRenderProccessor: TextRenderProccessorApi = {
    emojify(text: string, isBig?: boolean) {
        return emoji({
            src: text,
            size: isBig ? 38 : undefined
        });
    },

    cropSpecSymbols(spans: Span[], symbol: string, opened?: boolean) {
        return cropSpecSymbols(spans, symbol, opened);
    }
};