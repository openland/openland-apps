import * as QuillType from 'quill';
import { quillToParagraphs, QuillParagraph } from './quillConverters';

describe('quillConverters', () => {
    it('should split to paragraphs', () => {
        function doTest(from: QuillType.DeltaOperation[], to: QuillParagraph[]) {
            expect(quillToParagraphs(from)).toEqual(to);
        }
        doTest([{ insert: 'sample-text\n' }], [{ type: 'body', segments: [{ text: 'sample-text', attributes: { bold: false, italic: false } }] }]);
        doTest([{ insert: 'sample-text\n\n' }],
            [{
                type: 'body',
                segments: [{ text: 'sample-text', attributes: { bold: false, italic: false } }]
            }, {
                type: 'body',
                segments: [{ text: '', attributes: { bold: false, italic: false } }]
            }]
        );

        doTest([{ insert: '1\n2\n' }, { insert: '3', attributes: { bold: true } }, { insert: '\n4\n' }],
            [{
                type: 'body',
                segments: [{ text: '1', attributes: { bold: false, italic: false } }]
            }, {
                type: 'body',
                segments: [{ text: '2', attributes: { bold: false, italic: false } }]
            }, {
                type: 'body',
                segments: [{ text: '3', attributes: { bold: true, italic: false } }]
            }, {
                type: 'body',
                segments: [{ text: '4', attributes: { bold: false, italic: false } }]
            }]
        );

        doTest([{ insert: 'sample-text' }, { insert: '\n', attributes: { header: 1 } }], [{ type: 'header1', segments: [{ text: 'sample-text', attributes: { bold: false, italic: false } }] }]);
    });
});