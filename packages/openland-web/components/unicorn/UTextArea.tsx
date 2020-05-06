import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { FormField } from 'openland-form/useField';
import { useCombinedRefs } from "openland-x-utils/combineRef";

const textareaContainer = css`
    display: flex;
    align-items: stretch;
    position: relative;

    &:focus-within div.textarea-label {
        font-size: 13px;
        line-height: 18px;
        color: var(--accentPrimary);
        top: 8px;
    }
`;

const textAreaStyle = css`
    width: 100%;
    height: 100%;
    max-height: 300px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 25px;
    padding-bottom: 13px;
    font-size: 15px;
    color: var(--foregroundPrimary);
    line-height: 24px;
    border-radius: 8px;
    background-color: var(--backgroundTertiaryTrans);

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }

    &::placeholder {
        color: #9d9fa3;
    }
`;

const textAreaStyleAutoResize = css`
    height: 56px;
`;

const placeholderStyle = css`
    pointer-events: none;
    position: absolute;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 15px;
    color: var(--foregroundTertiary);
    line-height: 24px;
    top: 14px;
    transition: all 0.15s ease;
`;

const placeholderValueStyle = css`
    font-size: 13px;
    line-height: 18px;
    color: var(--foregroundSecondary);
    top: 8px;
`;

const placeholderInvalidStyle = css`
    color: var(--accentNegative) !important;
`;

export interface UTextAreaProps extends XViewProps {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    invalid?: boolean;
    autofocus?: boolean;
    onChange?: (v: string) => void;
    resize?: boolean;
    autoResize?: boolean;
}

export const UTextArea = React.forwardRef(
    (props: UTextAreaProps, ref: React.RefObject<HTMLTextAreaElement>) => {
        const {
            placeholder,
            value,
            disabled,
            invalid,
            autofocus,
            onChange,
            resize = false,
            autoResize,
            ...other
        } = props;

        const inputRef = React.useRef<HTMLTextAreaElement>(null);
        const combinedRef = useCombinedRefs(ref, inputRef);
        const [val, setValue] = React.useState(value || '');

        const resizing = resize ? 'vertical' : 'none';

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setValue(e.target.value);
            if (onChange) {
                onChange(e.target.value);
            }
        };

        React.useLayoutEffect(() => {
            if (autoResize && combinedRef && combinedRef.current) {
                const rect = combinedRef.current;
                rect.style.cssText = 'auto';
                rect.style.cssText = 'height:' + (rect.scrollHeight - 6) + 'px';
                rect.style.resize = 'none';
            }
        }, [value, ref]);

        return (
            <XView {...other} position="relative">
                <div className={textareaContainer}>
                    <textarea
                        className={cx(textAreaStyle, autoResize && textAreaStyleAutoResize)}
                        value={val}
                        autoFocus={autofocus}
                        onChange={handleChange}
                        disabled={disabled}
                        style={{ resize: resizing }}
                        ref={combinedRef}
                    />
                    {placeholder && (
                        <div
                            className={cx(
                                placeholderStyle,
                                val && placeholderValueStyle,
                                invalid && placeholderInvalidStyle,
                                'textarea-label',
                            )}
                        >
                            {placeholder}
                        </div>
                    )}
                </div>
            </XView>
        );
    },
);

export const UTextAreaField = React.forwardRef(
    (
        props: UTextAreaProps & { field: FormField<string> },
        ref: React.RefObject<HTMLTextAreaElement>,
    ) => {
        const { field, ...other } = props;
        return <UTextArea {...field.input} {...other} ref={ref} />;
    },
);
