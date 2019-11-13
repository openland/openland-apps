import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { FormField } from 'openland-form/useField';

const inputWrapper = css`
    display: flex;
    align-items: stretch;
    position: relative;
    border-radius: 8px;
    background-color: var(--backgroundTertiary);
    height: 56px;

    &:focus-within div.input-label {
        font-size: 13px;
        line-height: 18px;
        color: var(--accentPrimary);
        top: 8px;
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0; 
    }
    input[type=number] {
        -moz-appearance: textfield;
    }
`;

const inputStyle = css`
    width: 100%;
    height: 100%;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 18px;
    font-size: 15px;
    color: var(--foregroundPrimary);
    line-height: 24px;
`;

const labelStyle = css`
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

const labelValueStyle = css`
    font-size: 13px;
    line-height: 18px;
    color: var(--foregroundSecondary);
    top: 8px;
`;

const labelInvalidStyle = css`
    color: var(--accentNegative) !important;
`;

export interface UInputProps extends XViewProps {
    label?: string;
    value?: string;
    disabled?: boolean;
    invalid?: boolean;
    type?: string;
    pattern?: string;
    autofocus?: boolean;
    onChange?: (v: string) => void;
}

export const UInput = (props: UInputProps) => {
    const { label, value, disabled, invalid, type, pattern, autofocus, onChange, ...other } = props;

    const [val, setValue] = React.useState(value || '');

    const handleChange = (v: string) => {
        setValue(v);
        if (onChange) {
            onChange(v);
        }
    };

    React.useLayoutEffect(() => {
        setValue(value || '');
    }, [value]);

    return (
        <XView {...other}>
            <div className={inputWrapper}>
                <input
                    disabled={disabled}
                    value={val || ''}
                    className={inputStyle}
                    type={type}
                    pattern={pattern}
                    autoFocus={autofocus}
                    onChange={e => handleChange(e.target.value)}
                />
                <div
                    className={cx(
                        labelStyle,
                        val && labelValueStyle,
                        invalid && labelInvalidStyle,
                        'input-label',
                    )}
                >
                    {label}
                </div>
            </div>
        </XView>
    );
};

export const UInputField = (props: UInputProps & { field: FormField<string> }) => {
    const { field, ...other } = props;
    return <UInput {...field.input} {...other} />;
};
