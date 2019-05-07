import * as React from 'react';
import { css } from 'linaria';
import { UserWithOffset } from 'openland-y-utils/mentionsConversion';

const TextArea = css`
    border-radius: 10px;
    background-color: #fff;
    border: solid 1px #ececec;
    min-height: 40px;
    max-height: 255px;
    overflow: auto;
    padding-top: 9px;
    padding-bottom: 9px;
    padding-left: 16px;
    padding-right: 16px;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const InputPlaceholder = css`
    position: absolute;
    top: 10px;
    left: 17px;
    pointer-events: none;
    color: rgba(0, 0, 0, 0.5);
`;

const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '\n': '<br>',
};

function escapeHtml(str: string) {
    return String(str).replace(/[&<>"'`=\/\n]/g, function(s: string) {
        return entityMap[s];
    });
}

export const ContentEditableTextInput = React.forwardRef(
    (
        {
            placeholder,
            onChange,
            value,
        }: {
            value: string;
            placeholder: string;
            onPasteFile?: Function;
            onSubmit?: Function;
            onChange: (a: { text: string; mentions: UserWithOffset[] }) => void;
        },
        ref: any,
    ) => {
        const [html, setHtml] = React.useState(value);
        const onInput = () => {
            if (!ref || !ref.current) {
                return;
            }

            const msg = ref.current.innerText;

            setHtml(msg);
            onChange({ text: msg, mentions: [] });
        };

        const onPaste = (e: any) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertHTML', false, escapeHtml(text));
            if (ref.current) {
                ref.current.scrollTop = ref.current.scrollHeight;
            }
        };

        React.useEffect(() => {
            if (value !== html) {
                ref.current.innerHTML = value;
            }
        }, [value]);

        return (
            <>
                <div
                    contentEditable={true}
                    className={TextArea}
                    onInput={onInput}
                    onPaste={onPaste}
                    ref={ref}
                />
                {value === '' && <div className={InputPlaceholder}>{placeholder}</div>}
            </>
        );
    },
);
