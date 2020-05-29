import * as QuillType from 'quill';
import { quillToParagraphs, QuillParagraph } from './quillConverters';

describe('quillConverters', () => {
    it('should split to paragraphs', () => {
        function doTest(from: QuillType.DeltaOperation[], to: QuillParagraph[]) {
            expect(quillToParagraphs(from)).toEqual(to);
        }
        doTest([{ insert: 'sample-text\n' }], [{ segments: [{ text: 'sample-text', attributes: { bold: false, italic: false } }] }]);
        doTest([{ insert: 'sample-text\n\n' }],
            [{
                segments: [{ text: 'sample-text', attributes: { bold: false, italic: false } }]
            }, {
                segments: [{ text: '', attributes: { bold: false, italic: false } }]
            }]
        );

        doTest([{ insert: '1\n2\n' }, { insert: '3', attributes: { bold: true } }, { insert: '\n4\n' }],
            [{
                segments: [{ text: '1', attributes: { bold: false, italic: false } }]
            }, {
                segments: [{ text: '2', attributes: { bold: false, italic: false } }]
            }, {
                segments: [{ text: '3', attributes: { bold: true, italic: false } }]
            }, {
                segments: [{ text: '4', attributes: { bold: false, italic: false } }]
            }]
        );
    });
});