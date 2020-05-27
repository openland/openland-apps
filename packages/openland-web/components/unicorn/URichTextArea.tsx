import * as React from 'react';
import { getQuill } from '../quill/getQuill';
import * as QuillType from 'quill';
import { css, cx } from 'linaria';

const quillStyle = css`
    flex-grow: 1;
    border-radius: 8px;
    -webkit-overflow-scrolling: touch;
    position: relative;

    .ql-container {
        border-radius: 8px;
        font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    }
    .ql-editor.ql-blank::before {
        color: var(--foregroundTertiary);
        font-style: normal;
        left: 16px;
    }

    /* copy of quill.snow.css, line 21 */
    /* it seems like quill styles doesn't apply every time */
    /* so we should patch them */
    .ql-clipboard {
        left: -100000px;
        height: 1px;
        overflow-y: hidden;
        position: absolute;
        top: 50%;
    }
`;

// function isValueEquals(a: URichTextAreaValue, b: URichTextAreaValue) {
//     if (a.length !== b.length) {
//         return false;
//     }
//     for (let i = 0; i < a.length; i++) {
//         if (a[i] !== b[i]) {
//             return false;
//         }
//     }
//     return true;
// }

export type URichTextAreaValue = URichTextParagraph[];
export type URichTextParagraph = string[];

export interface URichTextAreaProps {
    initialValue: URichTextAreaValue;
    placeholder?: string;
    onValueChange: (value: URichTextAreaValue) => void;
}

export const URickTextArea = React.memo((props: URichTextAreaProps) => {
    const lib = React.useMemo(() => getQuill(), []);
    const Quill = lib.Quill;
    const QuillDelta = lib.QuillDelta;
    let editor = React.useRef<QuillType.Quill>();
    let containerRef = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        let q = new Quill(containerRef.current!, {
            formats: ['bold', 'italic'],
            scrollingContainer: '.scroll-container',
            placeholder: props.placeholder,
        });

        // Initial Content
        function toQuillValue(src: URichTextAreaValue) {
            let ops: QuillType.DeltaOperation[] = [];
            for (let p of src) {
                for (let s of p) {
                    if (typeof s === 'string') {
                        ops.push({ insert: s + '\n' });
                    }
                }
            }
            return new QuillDelta(ops);
        }

        function toExternalValue(src: QuillType.Delta) {
            let res: URichTextAreaValue = [];
            for (let op of src.ops!) {
                if (op.insert) {
                    if (typeof op.insert === 'string') {
                        let str = op.insert;
                        for (let p of str.split('\n')) {
                            res.push([p]);
                        }
                    }
                }
            }
            
            // Remove last element since it is always empty paragraph
            res.pop();

            return res;
        }

        // Handle content changes
        q.setContents(toQuillValue(props.initialValue));
        q.on('editor-change', () => {
            let contents = q.getContents();
            let parsed = toExternalValue(contents);
            console.warn(contents);
            console.warn(parsed);
            props.onValueChange(parsed);
        });

        editor.current = q;
    }, []);

    return (
        <div
            className={cx(
                quillStyle,
                'scroll-container',
            )}
        >
            <div ref={containerRef} />
        </div>
    );
});