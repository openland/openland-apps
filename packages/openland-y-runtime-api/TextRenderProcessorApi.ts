import { Span, SpecSymbolsType, SpanType } from 'openland-y-utils/spans/Span';
import { MessageCounterReactions } from 'openland-api/spacex.types';

export interface TextRenderProccessorApi {
    processSpan(type: SpanType, text: string, size?: 'default' | 'big' | 'huge'): string | Element[] | JSX.Element[] | Element | JSX.Element;
    processReactionCounters(reactions: MessageCounterReactions[]): string;
    cropSpecSymbols(spans: Span[], parent: Span, symbolObject: SpecSymbolsType): Span[];
    removeLineBreakers(spans: Span[]): Span[];
}