import * as React from 'react';
import * as QuillType from 'quill';
import { css } from 'linaria';

const quillStyle = css`
    flex-grow: 1;
    border-radius: 8px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    .ql-container {
        background-color: #F0F2F5;
        border-radius: 8px;
    }
    .ql-editor {
        padding: 8px 16px;
        padding-right: 32px;
        font-size: 15px;
        line-height: 24px;
    }
    .ql-editor.ql-blank::before {
        color: #969AA3;
        font-style: normal;
    }
`;

export interface URickInputInstance {
    clear: () => void;
    focus: () => void;
}

export interface URickInputProps {
    initialText?: string;
    placeholder?: string;
    autofocus?: boolean;
    onTextChange?: (text: string) => void;
    onEnterPress?: (text: string) => void;
}

export const URickInput = React.memo(React.forwardRef((props: URickInputProps, ref: React.Ref<URickInputInstance>) => {
    const Quill = require('quill') as typeof QuillType.Quill;
    let editor = React.useRef<QuillType.Quill>();
    let containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
        clear: () => {
            let ed = editor.current;
            if (ed) {
                ed.setText('');
            }
        },
        focus: () => {
            let ed = editor.current;
            if (ed) {
                ed.focus();
            }
        }
    }));

    React.useLayoutEffect(() => {
        let q = new Quill(containerRef.current!, { formats: [], placeholder: props.placeholder });
        if (props.initialText) {
            q.setText(props.initialText);
        }
        if (props.autofocus) {
            q.focus();
        }

        // Hack to handle enter before text edit
        q.keyboard.addBinding({ key: 13 as any }, () => {
            if (props.onEnterPress) {
                props.onEnterPress(q.getText());
                return false;
            } else {
                return true;
            }
        });
        (q.keyboard as any).bindings[13].unshift((q as any).keyboard.bindings[13].pop());

        // Handle text change
        let lastKnownText: string = props.initialText || '';
        q.on('editor-change', () => {
            let tx = q.getText();
            if (tx !== lastKnownText) {
                lastKnownText = tx;
                if (props.onTextChange) {
                    props.onTextChange(tx);
                }
            }
        });
        editor.current = q;
    }, []);

    return (
        <div className={quillStyle}>
            <div ref={containerRef} />
        </div>
    );
}));