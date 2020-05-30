import { toQuillValue, toExternalValue, URichTextAreaValue } from './URichTextArea';
import * as QuillType from 'quill';

function doTestToQuill(src: URichTextAreaValue, ops: QuillType.DeltaOperation[]) {
    let res = toQuillValue(src, { editorId: '!', data: new Map(), components: new Map() });
    expect(res).toEqual(ops);
}

function doTestFromQuill(src: URichTextAreaValue, ops: QuillType.DeltaOperation[]) {
    let dec = toExternalValue(ops, { data: new Map(), components: new Map() });
    expect(dec).toEqual(src);
}

function doTest(src: URichTextAreaValue, ops: QuillType.DeltaOperation[]) {
    let res = toQuillValue(src, { editorId: '!', data: new Map(), components: new Map() });
    expect(res).toEqual(ops);
    let dec = toExternalValue(ops, { data: new Map(), components: new Map() });
    expect(dec).toEqual(src);
}

describe('UIRichTextArea', () => {
    it('should handle single line text', () => {
        doTest(
            [{ type: 'paragraph', text: 'sample-text', spans: [] }],
            [{ insert: 'sample-text\n' }]
        );
    });

    it('should handle mutiple paragraph', () => {
        doTestToQuill(
            [{ type: 'paragraph', text: 'sample-text-1', spans: [] },
            { type: 'paragraph', text: 'sample-text-2', spans: [] }],
            [{ insert: 'sample-text-1\n' }, { insert: 'sample-text-2\n' }]
        );
        doTestFromQuill(
            [{ type: 'paragraph', text: 'sample-text-1', spans: [] },
            { type: 'paragraph', text: 'sample-text-2', spans: [] }],
            [{ insert: 'sample-text-1\nsample-text-2\n' }]
        );
    });

    it('should handle simple formatting', () => {
        doTest(
            [
                { type: 'paragraph', text: 'sample-text', spans: [{ start: 1, end: 3, type: 'bold' }] }
            ],
            [
                { insert: 's' },
                { insert: 'am', attributes: { bold: true } },
                { insert: 'ple-text\n' }
            ]
        );
    });

    it('should handle complex formatting', () => {
        doTestToQuill(
            [
                { type: 'paragraph', text: 'sample-text', spans: [{ start: 1, end: 3, type: 'bold' }, { start: 2, end: 6, type: 'italic' }] }
            ],
            [
                { insert: 's' },
                { insert: 'a', attributes: { bold: true } },
                { insert: 'm', attributes: { bold: true, italic: true } },
                { insert: 'ple', attributes: { italic: true } },
                { insert: '-text\n' }
            ]
        );

        doTestFromQuill(
            [
                {
                    type: 'paragraph',
                    text: 'sample-text', spans: [
                        { start: 1, end: 2, type: 'bold' },
                        { start: 2, end: 3, type: 'bold' },
                        { start: 2, end: 3, type: 'italic' },
                        { start: 3, end: 6, type: 'italic' }
                    ]
                }
            ],
            [
                { insert: 's' },
                { insert: 'a', attributes: { bold: true } },
                { insert: 'm', attributes: { bold: true, italic: true } },
                { insert: 'ple', attributes: { italic: true } },
                { insert: '-text\n' }
            ]
        );
    });

    it('should throw if new line found in paragraph text', () => {
        expect(() => toQuillValue([{ type: 'paragraph', text: 'sample\ntext', spans: [] }], { editorId: '!', data: new Map(), components: new Map() })).toThrowError();
    });
});