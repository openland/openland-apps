import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { emoji } from 'openland-y-utils/emoji';
import { Span, SpecSymbolsType } from 'openland-y-utils/spans/Span';
import { cropSpecSymbols } from 'openland-y-utils/cropSpecSymbols';

export const TextRenderProccessor: TextRenderProccessorApi = {
    emojify(text: string, isBig?: boolean) {
        return emoji({
            src: text,
            size: isBig ? 20 : 16
        });
    },

    cropSpecSymbols(spans: Span[], parent: Span, symbols: SpecSymbolsType[]) {
        return cropSpecSymbols(spans, parent, symbols);
    }
};