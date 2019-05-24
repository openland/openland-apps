import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { Span, SpecSymbolsType, SpanType } from 'openland-y-utils/spans/Span';
import { cropSpecSymbols } from 'openland-y-utils/spans/cropSpecSymbols';
import { removeLineBreakers } from 'openland-y-utils/spans/removeLineBreakers';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';

export const TextRenderProccessor: TextRenderProccessorApi = {
    processSpan(type: SpanType, text: string, size?: 'default' | 'big' | 'huge') {
        if (type === 'mention_user' || type === 'mention_users' || type === 'mention_room') {
            return useNonBreakingSpaces(text) || text;
        }

        return text;
    },

    cropSpecSymbols(spans: Span[], parent: Span, symbolObject: SpecSymbolsType) {
        if (symbolObject.supportMobile) {
            return cropSpecSymbols(spans, parent, symbolObject);
        }

        return spans;
    },

    removeLineBreakers(spans: Span[]) {
        return removeLineBreakers(spans, ['code_block', 'loud']);
    }
};