import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { Span } from 'openland-y-utils/spans/Span';

export const TextRenderProccessor: TextRenderProccessorApi = {
    emojify(text: string, isBig?: boolean) {
        return text;
    },

    cropSpecSymbols(spans: Span[], symbol: string, opened?: boolean) {
        return spans;
    }
};