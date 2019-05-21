import { Span } from './Span';

export const removeLineBreakers = (spans: Span[], sliceBy: string[]): Span[]  => {
    let res: Span[] = [];

    while (spans.findIndex((v) => sliceBy.includes(v.type)) >= 0) {
        let index = spans.findIndex((v) => sliceBy.includes(v.type));

        if (index > 0) {
            let sliceStart = spans[0].type === 'new_line' ? 1 : 0;
            let sliceEnd = spans[index - 1].type === 'new_line' ? (index - 1) : index;

            res.push(...spans.slice(sliceStart, sliceEnd));
        }

        // current code-block
        res.push(spans[index]);

        spans = spans.slice(index + 1);
    }

    // after all code-blocks
    let lastSliceStart = (spans.length > 0 && spans[0].type === 'new_line') ? 1 : 0;

    res.push(...spans.slice(lastSliceStart));

    return res;
}