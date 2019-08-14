import { Span, SpecSymbolsType, SpanType } from 'openland-y-utils/spans/Span';
import { ReactionUser } from 'openland-engines/reactions/types';

export interface TextRenderProccessorApi {
    processSpan(type: SpanType, text: string, size?: 'default' | 'big' | 'huge'): string | Element[] | JSX.Element[] | Element | JSX.Element;
    processText(text: string): string | JSX.Element;
    processReactionsLabel(users: ReactionUser[]): string | JSX.Element;
    cropSpecSymbols(spans: Span[], parent: Span, symbolObject: SpecSymbolsType): Span[];
    removeLineBreakers(spans: Span[]): Span[];
}