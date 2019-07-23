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

    onPressEnter?: () => boolean;
    onPressUp?: () => boolean;
    onPressDown?: () => boolean;
    onPressTab?: () => boolean;
    onPressEsc?: () => boolean;
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

        // Hacky method to add key binding before editor processing
        function addBinding(key: number, callback?: () => boolean) {
            q.keyboard.addBinding({ key: key as any }, () => {
                if (callback) {
                    let res = callback();
                    if (res) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            });
            (q.keyboard as any).bindings[key].unshift((q as any).keyboard.bindings[key].pop());
        }

        addBinding(9, props.onPressTab);
        addBinding(13, props.onPressEnter);
        addBinding(38, props.onPressUp);
        addBinding(40, props.onPressDown);
        addBinding(27, props.onPressEsc);

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
                if (selection) {
                    let autocompleteWord: string | null = null;
                    let activeWord = findActiveWord(tx, { start: selection.index, end: selection.index + selection.length });
                    if (activeWord) {
                        for (let p of props.autocompletePrefixes) {
                            if (activeWord.startsWith(p)) {
                                autocompleteWord = activeWord;
                                break;
                            }
                        }
                    }
                    if (lastAutocompleteText !== autocompleteWord) {
                        lastAutocompleteText = autocompleteWord;
                        props.onAutocompleteWordChange(autocompleteWord);
                    }
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