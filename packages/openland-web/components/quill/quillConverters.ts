import * as QuillType from 'quill';

export type QuillParagraph =
    | {
        type: 'body' | 'header1' | 'header2',
        segments: {
            text: string, attributes: { bold: boolean, italic: boolean };
        }[];
    }
    | {
        type: 'interactive',
        embedId: string,
        editorId: string
    };

export function quillToParagraphs(ops: QuillType.DeltaOperation[]) {
    let res: QuillParagraph[] = [];
    let currentParagraph: QuillParagraph | undefined = undefined;
    for (let op of ops) {
        if (!op.insert) {
            throw Error('Only insert operations are supported');
        }
        if (typeof op.insert === 'string') {
            let text = op.insert;
            let type: 'body' | 'header1' | 'header2' = 'body';
            let attributes = {
                bold: !!(op.attributes && op.attributes.bold),
                italic: !!(op.attributes && op.attributes.italic)
            };
            if (op.attributes && op.attributes.header === 1) {
                type = 'header1';
            }
            if (op.attributes && op.attributes.header === 2) {
                type = 'header2';
            }
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
                    if (type !== 'body') {
                        currentParagraph.type = type;
                    }
                    res.push(currentParagraph);
                    currentParagraph = undefined;
                } else {
                    res.push({
                        type,
                        segments: [{
                            text: p,
                            attributes
                        }]
                    });
                }
            }
            if (last !== '') {
                if (currentParagraph) {
                    if (type !== 'body') {
                        currentParagraph.type = type;
                    }
                    currentParagraph!.segments.push({
                        text: last,
                        attributes
                    });
                } else {
                    currentParagraph = {
                        type,
                        segments: [{
                            text: last,
                            attributes
                        }]
                    };
                }
            }
        } else if (typeof op.insert === 'object') {
            if (currentParagraph) {
                res.push(currentParagraph);
                currentParagraph = undefined;
            }

            if (op.insert.interactive) {
                let embedId = op.insert.interactive.embedId;
                let editorId = op.insert.interactive.editorId;
                res.push({
                    type: 'interactive',
                    embedId,
                    editorId
                });
            } else {
                throw Error('Unknown embed');
            }

        } else {
            throw Error('Unknown insert');
        }
    }
    if (currentParagraph) {
        res.push(currentParagraph);
        currentParagraph = undefined;
    }
    return res;
}