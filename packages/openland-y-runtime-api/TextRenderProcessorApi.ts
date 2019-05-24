import { Span, SpecSymbolsType, SpanType } from 'openland-y-utils/spans/Span';

export interface TextRenderProccessorApi {
    processSpan(type: SpanType, text: string, size?: 'default' | 'big' | 'huge'): string | Element[] | JSX.Element[] | Element | JSX.Element;
    cropSpecSymbols(spans: Span[], parent: Span, symbols: SpecSymbolsType[]): Span[];
    removeLineBreakers(spans: Span[]): Span[];
}