import * as React from 'react';
import { getQuill } from '../quill/getQuill';
import * as QuillType from 'quill';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { quillToParagraphs } from '../quill/quillConverters';

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

export type URichTextAreaValue = URichTextParagraph[];
export type URichTextParagraph = { text: string, spans: URichTextSpan[] };
export type URichTextSpan = { start: number, end: number, type: 'bold' | 'italic' };

/**
 * Converting URickTextAreaValue to Qull DeltaOperation
 */
export function toQuillValue(src: URichTextAreaValue) {
    let ops: QuillType.DeltaOperation[] = [];
    for (let p of src) {
        if (p.text.indexOf('\n') >= 0) {
            throw new Error('Paragraph could not have new line symbol');
        }
        if (p.spans.length === 0) {
            ops.push({ insert: p.text + '\n' });
        } else {
            let offset = 0;
            while (offset < p.text.length) {
                // Find all spans that cover current offset
                let spans = p.spans.filter((v) => v.start <= offset && offset < v.end);

                if (spans.length === 0) {
                    // If no such spans: find nearest next span
                    let next = p.spans.filter((v) => offset < v.start);
                    if (next.length === 0) {
                        // No remaining spans: append remaining text
                        let text = p.text.substring(offset);
                        ops.push({ insert: text + '\n' });
                        offset = p.text.length;
                    } else {
                        // Append text until nearest next span
                        let min = next[0].start;
                        for (let n of next) {
                            min = Math.min(n.start, min);
                        }
                        let text = p.text.substring(offset, min);
                        ops.push({ insert: text });
                        offset = min;
                    }
                } else {
                    // Check how many different are here
                    let types: Set<'bold' | 'italic'> = new Set();
                    for (let s of spans) {
                        types.add(s.type);
                    }
                    if (types.size === 1) {
                        // Only single type: append until maximum span before any next one
                        let attributes: any = {};
                        if (types.has('bold')) {
                            attributes.bold = true;
                        }
                        if (types.has('italic')) {
                            attributes.italic = true;
                        }

                        // Find maximum common length in case if there are 
                        // multiple overlaping spans of the same type

                        let max = spans[0].end;
                        for (let s of spans) {
                            max = Math.max(s.end, max);
                        }

                        // Reduce size until next span
                        for (let s of p.spans) {
                            if (s.start <= offset) {
                                continue;
                            }
                            max = Math.min(max, s.start);
                        }

                        // Append segment
                        let text = p.text.substring(offset, max);
                        offset = max;
                        if (max >= p.text.length) {
                            ops.push({ insert: text + '\n', attributes });
                        } else {
                            ops.push({ insert: text, attributes });
                        }
                    } else {

                        // Calculate smallest common span
                        let min = spans[0].end;
                        for (let s of spans) {
                            min = Math.min(s.end, min);
                        }

                        // Resolve attributes
                        let attributes: any = {};
                        for (let s of spans) {
                            if (s.type === 'bold') {
                                attributes.bold = true;
                            }
                            if (s.type === 'italic') {
                                attributes.italic = true;
                            }
                        }

                        // Append segment
                        let text = p.text.substring(offset, min);
                        offset = min;
                        if (min >= p.text.length) {
                            ops.push({ insert: text + '\n', attributes });
                        } else {
                            ops.push({ insert: text, attributes });
                        }
                    }
                }
            }
        }
    }
    return ops;
}

export function toExternalValue(ops: QuillType.DeltaOperation[]) {
    let paragraphs = quillToParagraphs(ops);
    let res: URichTextAreaValue = [];
    for (let op of paragraphs) {
        let text = op.segments.map((v) => v.text).join('');
        let spans: URichTextSpan[] = [];
        let offset = 0;
        for (let s of op.segments) {
            if (s.attributes.bold) {
                spans.push({ type: 'bold', start: offset, end: offset + s.text.length });
            }
            if (s.attributes.italic) {
                spans.push({ type: 'italic', start: offset, end: offset + s.text.length });
            }
            offset += s.text.length;
        }
        res.push({ text, spans });
    }
    return res;
}

export interface URichTextAreaProps {
    initialValue: URichTextAreaValue;
    placeholder?: string;
    onValueChange: (value: URichTextAreaValue) => void;
}

export interface URichTextAreaInstance {
    focus: () => void;
}

export const URickTextArea = React.memo(React.forwardRef((props: URichTextAreaProps, ref: React.Ref<URichTextAreaInstance>) => {
    const lib = React.useMemo(() => getQuill(), []);
    const Quill = lib.Quill;
    const QuillDelta = lib.QuillDelta;
    let editor = React.useRef<QuillType.Quill>();
    let containerRef = React.useRef<HTMLDivElement>(null);
    let tooltipRef = React.useRef<HTMLDivElement>(null);
    const [popupLocation, setPopupLocation] = React.useState<{ x: number, y: number } | null>(null);

    React.useLayoutEffect(() => {
        let q = new Quill(containerRef.current!, {
            formats: ['bold', 'italic', 'header'],
            scrollingContainer: '.scroll-container',
            placeholder: props.placeholder,
        });

        // Handle content changes
        q.setContents(new QuillDelta(toQuillValue(props.initialValue)));
        q.on('editor-change', () => {
            let contents = q.getContents();
            let parsed = toExternalValue(contents.ops!);
            props.onValueChange(parsed);

            // Handle selection popup
            let range = q.getSelection();
            if (range === null || range.length === 0) {
                setPopupLocation(null);
                return;
            }
            let rangeBounds = q.getBounds(range.index, range.length);
            setPopupLocation({
                y: rangeBounds.top,
                x: rangeBounds.left + rangeBounds.width / 2
            });
        });

        editor.current = q;
    }, []);

    React.useImperativeHandle(ref, () => ({
        focus: () => {
            let ed = editor.current;
            if (ed) {
                ed.focus();
                ed.setSelection(ed.getLength(), ed.getLength());
            }
        },
    }));

    const onBoldClicked = React.useCallback(() => {
        let ed = editor.current;
        if (ed) {
            let range = ed.getSelection(true);
            if (range && range.length > 0) {
                let formats = ed.getFormat(range);
                if (formats.bold) {
                    ed.format('bold', false);
                } else {
                    ed.format('bold', true);
                }
            }
        }
    }, []);

    const onItalicClicked = React.useCallback(() => {
        let ed = editor.current;
        if (ed) {
            let range = ed.getSelection(true);
            if (range && range.length > 0) {
                let formats = ed.getFormat(range);
                if (formats.italic) {
                    ed.format('italic', false);
                } else {
                    ed.format('italic', true);
                }
            }
        }
    }, []);

    const onH1Clicked = React.useCallback(() => {
        let ed = editor.current;
        if (ed) {
            let range = ed.getSelection(true);
            if (range && range.length > 0) {
                let formats = ed.getFormat(range);
                if (formats.header === 1) {
                    ed.format('header', 0);
                } else {
                    ed.format('header', 1);
                }
            }
        }
    }, []);

    const onH2Clicked = React.useCallback(() => {
        let ed = editor.current;
        if (ed) {
            let range = ed.getSelection(true);
            if (range && range.length > 0) {
                let formats = ed.getFormat(range);
                if (formats.header === 2) {
                    ed.format('header', 0);
                } else {
                    ed.format('header', 1);
                }
            }
        }
    }, []);

    return (
        <div
            className={cx(
                quillStyle,
                'scroll-container',
            )}
        >
            <div ref={containerRef} />

            <div
                ref={tooltipRef}
                style={popupLocation ? {
                    position: 'absolute',
                    top: popupLocation.y - 44 - 10,
                    left: popupLocation.x - 4 * 44 / 2,
                    pointerEvents: 'all'
                } : { display: 'none' }}
            >
                <XView
                    height={44}
                    backgroundColor="#292927"
                    borderRadius={16}
                    flexDirection="row"
                    overflow="hidden"
                >
                    <XView
                        width={44}
                        height={44}
                        backgroundColor="red"
                        onClick={onBoldClicked}
                    >
                        B
                    </XView>
                    <XView
                        width={44}
                        height={44}
                        backgroundColor="yellow"
                        onClick={onItalicClicked}
                    >
                        I
                    </XView>
                    <XView
                        width={44}
                        height={44}
                        backgroundColor="yellow"
                        onClick={onH1Clicked}
                    >
                        H1
                    </XView>
                    <XView
                        width={44}
                        height={44}
                        backgroundColor="yellow"
                        onClick={onH2Clicked}
                    >
                        H2
                    </XView>
                </XView>
            </div>
        </div>
    );
}));