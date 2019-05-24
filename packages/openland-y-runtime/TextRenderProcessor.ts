import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { Span, SpecSymbolsType, SpanType } from 'openland-y-utils/spans/Span';

export const TextRenderProccessor: TextRenderProccessorApi = {
    processSpan(type: SpanType, text: string, size?: 'default' | 'big' | 'huge') {
        return text;
    },

    cropSpecSymbols(spans: Span[], parent: Span, symbols: SpecSymbolsType[]) {
        return spans;
    },

    removeLineBreakers(spans: Span[]) {
        return spans;
    }
};