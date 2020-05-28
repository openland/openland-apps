import { toQuillValue, toExternalValue, URichTextAreaValue } from './URichTextArea';
import * as QuillType from 'quill';

function doTest(src: URichTextAreaValue, ops: QuillType.DeltaOperation[]) {
    let res = toQuillValue(src);
    expect(res).toEqual(ops);
    let dec = toExternalValue(res);
    expect(dec).toEqual(src);
}

describe('UIRichTextArea', () => {
    it('should handle single line text', () => {
        doTest(
            [{ text: 'sample-text', spans: [] }],
            [{ insert: 'sample-text\n' }]
        );
    });

    it('should handle simple formatting', () => {
        let res = toQuillValue([{ text: 'sample-text', spans: [{ start: 1, end: 3, type: 'bold' }] }]);
        expect(res).toEqual([
            { insert: 's' },
            { insert: 'am', attributes: { bold: true } },
            { insert: 'ple-text\n' }
        ]);
    });

    it('should handle complex formatting', () => {
        let res = toQuillValue([{ text: 'sample-text', spans: [{ start: 1, end: 3, type: 'bold' }, { start: 2, end: 6, type: 'italic' }] }]);
        expect(res).toEqual([
            { insert: 's' },
            { insert: 'a', attributes: { bold: true } },
            { insert: 'm', attributes: { bold: true, italic: true } },
            { insert: 'ple', attributes: { italic: true } },
            { insert: '-text\n' }
        ]);
    });

    it('should throw if new line found in paragraph text', () => {
        expect(() => toQuillValue([{ text: 'sample\ntext', spans: [] }])).toThrowError();
    });
});