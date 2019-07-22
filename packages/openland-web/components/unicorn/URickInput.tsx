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
`;

export const URickInput = React.memo((props: { onTextChange?: (text: string) => void }) => {
    const Quill = require('quill') as typeof QuillType.Quill;
    let editor = React.useRef<QuillType.Quill>();
    let ref = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        let q = new Quill(ref.current!, { formats: [] });
        let lastKnownText: string = '';
        q.setText(lastKnownText);
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