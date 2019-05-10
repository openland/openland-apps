import { Span, ServerSpan } from 'openland-y-utils/spans/Span';
import { findChildSpans, convertServerSpan, getTextSpans } from './utils';

const recursiveProcessing = (text: string, spans: ServerSpan[], proccessText?: (text: string) => any): Span[] => {
    let res: Span[] = [];

    if (spans.length > 0) {
        const span = spans[0];
        const { childs, lastIndex } = findChildSpans(spans.slice(1), span);

        let currentSpan: Span = {
            ...convertServerSpan(text, span),

            childrens: recursiveProcessing(text, childs, proccessText),
        }

        let textSpans = getTextSpans(text, currentSpan, proccessText);

        currentSpan.childrens = (currentSpan.childrens || []).concat(textSpans).sort((a, b) => a.offset - b.offset);

        res = [...[currentSpan], ...recursiveProcessing(text, spans.slice(lastIndex + 1), proccessText)];
    }

    return res;
}

export const processSpans = (text: string, spans?: ServerSpan[], proccessText?: (text: string) => any): Span[] => {
    let res: Span[] = [];
    let sortedSpans = (spans || []).sort((a, b) => ((a.offset - b.offset) * 100000) + (b.length - a.length));
    let rootSpan = [{ offset: 0, length: text.length }];

    spans = [...rootSpan as any, ...sortedSpans];

    res = recursiveProcessing(text, spans, proccessText)[0].childrens!;

    return res;
}