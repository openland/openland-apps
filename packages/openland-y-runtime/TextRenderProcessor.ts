import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { Span, SpecSymbolsType, SpanType } from 'openland-y-utils/spans/Span';
import { ReactionUser } from 'openland-engines/reactions/types';

export const TextRenderProccessor: TextRenderProccessorApi = {
    processSpan(type: SpanType, text: string, size?: 'default' | 'big' | 'huge') {
        return text;
    },

    processReactionsLabel(users: ReactionUser[]) {
        return '';
    },

    cropSpecSymbols(spans: Span[], parent: Span, symbolObject: SpecSymbolsType) {
        return spans;
    },

    removeLineBreakers(spans: Span[]) {
        return spans;
    }
};