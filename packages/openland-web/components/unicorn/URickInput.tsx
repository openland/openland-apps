import * as React from 'react';
import * as QuillType from 'quill';
import { css } from 'linaria';
import { findActiveWord } from 'openland-y-utils/findActiveWord';

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
    getText: () => string;
}

export interface URickInputProps {
    initialText?: string;
    placeholder?: string;
    autofocus?: boolean;
    autocompletePrefixes?: string[];
    onTextChange?: (text: string) => void;
    onAutocompleteWordChange?: (text: string | null) => void;
    onEnterPress?: () => void;
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
        },
        getText: () => {
            let ed = editor.current;
            if (ed) {
                return ed.getText();
            } else {
                return '';
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
                props.onEnterPress();
                return false;
            } else {
                return true;
            }
        });
        (q.keyboard as any).bindings[13].unshift((q as any).keyboard.bindings[13].pop());

        // Handle text change
        let lastKnownText: string = props.initialText || '';
        let lastAutocompleteText: string | null = null;
        q.on('editor-change', () => {
            let tx = q.getText();
            if (tx !== lastKnownText) {
                lastKnownText = tx;
                if (props.onTextChange) {
                    props.onTextChange(tx);
                }
            }

            if (props.onAutocompleteWordChange && props.autocompletePrefixes && props.autocompletePrefixes.length > 0) {
                let selection = q.getSelection();
                let autocompleteWord: string | null = null;
                if (selection) {
                    let activeWord = findActiveWord(tx, { start: selection.index, end: selection.index + selection.length });
                    if (activeWord) {
                        for (let p of props.autocompletePrefixes) {
                            if (activeWord.startsWith(p)) {
                                autocompleteWord = activeWord;
                                break;
                            }
                        }
                    }
                }

                if (lastAutocompleteText !== autocompleteWord) {
                    lastAutocompleteText = autocompleteWord;
                    props.onAutocompleteWordChange(autocompleteWord);
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