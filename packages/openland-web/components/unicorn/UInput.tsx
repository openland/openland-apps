import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { FormField } from 'openland-form/useField';

const inputWrapper = css`
    display: flex;
    align-items: stretch;
    position: relative;
    border-radius: 8px;
    background-color: var(--backgroundTertiaryTrans);
    height: 56px;

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }

    &:focus-within div.input-label {
        font-size: 13px;
        line-height: 18px;
        color: var(--accentPrimary);
        top: 8px;
    }

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
    }
    input[type='number'] {
        -moz-appearance: textfield;
    }
`;

const inputWrapperWithPlaceholder = css`
    height: 40px;
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

const inputStyleWithPlaceholder = css`
    padding-top: 8px;
    padding-bottom: 8px;

    &::placeholder {
        color: var(--foregroundTertiary);
    }
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
    hasPlaceholder?: boolean;
    pattern?: string;
    autofocus?: boolean;
    onChange?: (v: string) => void;
    maxLength?: number;
}

export const UInput = React.forwardRef(
    (props: UInputProps, ref: React.RefObject<HTMLInputElement>) => {
        const {
            label,
            value,
            disabled,
            invalid,
            type,
            hasPlaceholder,
            pattern,
            autofocus,
            onChange,
            maxLength,
            ...other
        } = props;

        const [val, setValue] = React.useState(value || '');

        const handleChange = (v: string) => {
            setValue(v);
            if (onChange) {
                onChange(v);
            }
        };

        React.useLayoutEffect(
            () => {
                setValue(value || '');
            },
            [value],
        );

        return (
            <XView {...other}>
                <div className={cx(inputWrapper, hasPlaceholder && inputWrapperWithPlaceholder)}>
                    <input
                        disabled={disabled}
                        value={val || ''}
                        className={cx(inputStyle, hasPlaceholder && inputStyleWithPlaceholder)}
                        type={type}
                        pattern={pattern}
                        autoFocus={autofocus}
                        autoComplete="off"
                        onChange={e => handleChange(e.target.value)}
                        maxLength={maxLength}
                        ref={ref}
                        {...hasPlaceholder && { placeholder: label }}
                    />
                    {!hasPlaceholder && (
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
                    )}
                </div>
            </XView>
        );
    },
);

export const UInputField = React.forwardRef(
    (
        props: UInputProps & {
            field: FormField<string>;
            errorText?: string | null;
            hideErrorText?: boolean;
        },
        ref: React.RefObject<HTMLInputElement>,
    ) => {
        const { field, ...other } = props;
        return (
            <>
                <UInput {...field.input} {...other} ref={ref} />
                {(field.input.invalid || props.errorText) && !props.hideErrorText && (
                    <XView color="#d75454" paddingLeft={16} marginTop={8} fontSize={12}>
                        {props.errorText ? props.errorText : field.input.errorText}
                    </XView>
                )}
            </>
        );
    },
);
