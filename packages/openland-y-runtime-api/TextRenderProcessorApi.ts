import { Span, SpecSymbolsType } from 'openland-y-utils/spans/Span';

export interface TextRenderProccessorApi {
    emojify(text: string, isBig?: boolean): string | Element[] | JSX.Element[] | Element | JSX.Element;
    cropSpecSymbols(spans: Span[], parent: Span, symbols: SpecSymbolsType[]): Span[];
    removeLineBreakers(spans: Span[]): Span[];
}