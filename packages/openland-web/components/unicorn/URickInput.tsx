import * as React from 'react';
import * as QuillType from 'quill';
import { css } from 'linaria';

const quillStyle = css`
    .ql-container {
        background-color: #F0F2F5;
        border-radius: 8px;
    }
    .ql-editor {
        padding: 8px 16px;
        font-size: 15px;
        line-height: 24px;
    }
    .ql-editor.ql-blank::before {
        color: #969AA3;
        font-style: normal;
    }
`;

export const URickInput = React.memo((props: {
    text?: string;
    placeholder?: string,
    onTextChange?: (text: string) => void,
    onEnterPress?: (text: string) => void
}) => {
    const Quill = require('quill') as typeof QuillType.Quill;
    let editor = React.useRef<QuillType.Quill>();
    let ref = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        let q = new Quill(ref.current!, { formats: [], placeholder: props.placeholder });
        if (props.text) {
            q.setText(props.text);
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
        let lastKnownText: string = props.text || '';
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
            <div ref={ref} />
        </div>
    );
});