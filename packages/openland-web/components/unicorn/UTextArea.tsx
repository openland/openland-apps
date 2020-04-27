import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { FormField } from 'openland-form/useField';

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
    padding-top: 22px;
    padding-bottom: 16px;
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

export const UTextArea = (props: UTextAreaProps) => {
    const {
        placeholder,
        value,
        disabled,
        invalid,
        autofocus,
        onChange,
        resize = false,
        ...other
    } = props;

    const [val, setValue] = React.useState(value || '');
    const ref = React.createRef<HTMLTextAreaElement>();

    const resizing = resize ? 'vertical' : 'none';

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    React.useLayoutEffect(() => {
        setValue(value || '');
        if (props.autoResize && ref && ref.current) {
            ref.current.style.cssText = 'auto';
            ref.current.style.cssText = 'height:' + ref.current.scrollHeight + 'px';
            ref.current.style.resize = 'none';
        }
    }, [value]);

    return (
        <XView {...other} position="relative">
            <div className={textareaContainer}>
                <textarea
                    className={textAreaStyle}
                    value={val}
                    autoFocus={autofocus}
                    onChange={handleChange}
                    disabled={disabled}
                    style={{ resize: resizing }}
                    ref={ref}
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
};

export const UTextAreaField = (props: UTextAreaProps & { field: FormField<string> }) => {
    const { field, ...other } = props;
    return <UTextArea {...field.input} {...other} />;
};
