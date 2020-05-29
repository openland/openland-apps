import * as QuillType from 'quill';

export interface QuillParagraph {
    segments: {
        text: string, attributes: { bold: boolean, italic: boolean };
    }[];
}

export function quillToParagraphs(ops: QuillType.DeltaOperation[]) {
    let res: QuillParagraph[] = [];
    let currentParagraph: QuillParagraph | undefined = undefined;
    for (let op of ops) {
        if (!op.insert) {
            throw Error('Only insert operations are supported');
        }
        if (typeof op.insert !== 'string') {
            throw Error('Only text insert operations are supported');
        }
        let text = op.insert;
        let attributes = {
            bold: !!(op.attributes && op.attributes.bold),
            italic: !!(op.attributes && op.attributes.italic)
        };
        let parts = text.split('\n');
        let last = parts.pop()!;
        for (let p of parts) {
            if (currentParagraph) {
                if (p !== '') {
                    currentParagraph!.segments.push({
                        text: p,
                        attributes
                    });
                }
                res.push(currentParagraph);
                currentParagraph = undefined;
            } else {
                res.push({
                    segments: [{
                        text: p,
                        attributes
                    }]
                });
            }
        }
        if (last !== '') {
            if (currentParagraph) {
                currentParagraph!.segments.push({
                    text: last,
                    attributes
                });
            } else {
                currentParagraph = {
                    segments: [{
                        text: last,
                        attributes
                    }]
                };
            }
        }
    }
    if (currentParagraph) {
        res.push(currentParagraph);
    }
    return res;
}