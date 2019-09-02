import { Span, SpanType, ServerSpan, SpanText } from 'openland-y-utils/spans/Span';
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
        };

        let textSpans = getTextSpans(text, currentSpan);

        currentSpan.childrens = (currentSpan.childrens || [])
            .concat(textSpans)
            .sort((a, b) => a.offset - b.offset);

        res = [...[currentSpan], ...recursiveProcessing(text, spans.slice(lastIndex + 1))];
    }

    return res;
};

const handleNoSpans = (text: string, disableBig?: boolean): Span => {
    const { text: rootText, type: rootType } = checkSpanRootSize(text);

    if (rootType !== SpanType.text && !disableBig) {
        return {
            type: rootType as any,
            offset: 0,
            length: rootText.length,
            childrens: [
                {
                    type: SpanType.text,
                    offset: 0,
                    length: rootText.length,
                    textRaw: text,
                    text: TextRenderProccessor.processSpan(
                        rootType,
                        rootText,
                        rootType === 'emoji' ? 'huge' : 'big',
                    ),
                },
            ],
        };
    } else {
        const currentSpan: Span = {
            type: SpanType.root,
            offset: 0,
            length: rootText.length,
            textRaw: rootText,
            text: TextRenderProccessor.processSpan(SpanType.text, rootText),
        };

        currentSpan.childrens = getTextSpans(text, currentSpan);

        return currentSpan;
    }
};

export const processSpans = (text: string, spans?: ServerSpan[], disableBig?: boolean): Span[] => {
    let res: Span[] = [];

    if (text.length > 0 && (!spans || spans.length === 0)) {
        res.push(handleNoSpans(text, disableBig));
    } else {
        let sortedSpans = (spans || []).sort(
            (a, b) => (a.offset - b.offset) * 100000 + (b.length - a.length),
        );
        let rootSpan = { offset: 0, length: text.length };

        spans = [rootSpan as any, ...sortedSpans];

        res.push(
            ...TextRenderProccessor.removeLineBreakers(
                recursiveProcessing(text, spans)[0].childrens!,
            ),
        );
    }

    return res;
};

export const createSimpleSpan = (text: string, type: SpanType) => (
    [{
        type: type,
        offset: 0,
        length: text.length,
        childrens: [{
            type: SpanType.text,
            text: text,
            offset: 0,
            length: text.length
        } as SpanText]
    }]
) as Span[];