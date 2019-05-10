import { Span, ServerSpan } from 'openland-y-utils/spans/Span';
import { findChildSpans, convertServerSpan, getTextSpans } from './utils';
import { TextRenderProccessor } from 'openland-y-runtime/TextRenderProcessor';
import { checkSpanRootSize } from './checkSpanRootSize';

const recursiveProcessing = (text: string, spans: ServerSpan[]): Span[] => {
    let res: Span[] = [];

    if (spans.length > 0) {
        const span = spans[0];
        const { childs, lastIndex } = findChildSpans(spans.slice(1), span);

        let currentSpan: Span = {
            ...convertServerSpan(text, span),

            childrens: recursiveProcessing(text, childs),
        }

        let textSpans = getTextSpans(text, currentSpan);

        currentSpan.childrens = (currentSpan.childrens || []).concat(textSpans).sort((a, b) => a.offset - b.offset);

        res = [...[currentSpan], ...recursiveProcessing(text, spans.slice(lastIndex + 1))];
    }

    return res;
}

const handleNoSpans = (text: string): Span => {
    const { text: rootText, size: rootSize } = checkSpanRootSize(text);

    if (rootSize === 'big') {
        return ({
            type: 'loud',
            offset: 0,
            length: rootText.length,
            childrens: [{
                type: 'text',
                offset: 0,
                length: rootText.length,
                textRaw: text,
                text: TextRenderProccessor.process(rootText, true)
            }]
        });
    } else {
        return ({
            type: 'text',
            offset: 0,
            length: rootText.length,
            textRaw: rootText,
            text: TextRenderProccessor.process(rootText)
        });
    }
}

export const processSpans = (text: string, spans?: ServerSpan[]): Span[] => {
    let res: Span[] = [];

    if (text.length > 0 && (!spans || spans.length === 0)) {
        res.push(handleNoSpans(text));
    } else {
        let sortedSpans = (spans || []).sort((a, b) => ((a.offset - b.offset) * 100000) + (b.length - a.length));
        let rootSpan = [{ offset: 0, length: text.length }];
    
        spans = [...rootSpan as any, ...sortedSpans];
    
        res = recursiveProcessing(text, spans)[0].childrens!;
    }

    return res;
}