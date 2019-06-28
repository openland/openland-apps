import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XInput } from 'openland-x/XInput';
import { FormField } from 'openland-form/useField';
import { XInputBasicProps } from 'openland-x/basics/XInputBasic';

const InputStyledClassName = css`
    height: 52px !important;
    border-radius: 8px !important;
    background-color: #f9f9f9 !important;
    border-color: transparent !important;
    &:focus-within {
        border-color: transparent !important;
        border-bottom: 1px solid #1790ff !important;
        box-shadow: none !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        & .input-placeholder {
            font-size: 12px !important;
            top: -11px !important;
            color: #1488f3 !important;
        }
    }
    & input {
        padding-top: 11px !important;
    }
    & .input-placeholder {
        top: 0px !important;
        left: 0 !important;
        background-color: transparent !important;
        color: #696c6e !important;
        padding-left: 16px !important;
        height: 100% !important;
        width: 100% !important;
        font-size: 15px !important;
        font-weight: normal !important;
        font-style: normal !important;
        font-stretch: normal !important;
        line-height: normal !important;
        pointer-events: none !important;
        display: flex !important;
        align-items: center !important;
    }
`;

const InputValueStyledClassName = css`
    & .input-placeholder {
        font-size: 12px !important;
        top: -11px !important;
        color: #1488f3 !important;
    }
`;

const InputInvalidStyledClassName = css`
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    border-color: transparent !important;
    border-bottom: 1px solid #d75454 !important;
    & .input-placeholder {
        color: #d75454 !important;
    }
    &:focus-within {
        border-bottom: 1px solid #d75454 !important;
        & .input-placeholder {
            color: #d75454 !important;
        }
    }
`;

interface InputProps extends XInputBasicProps {
    field: FormField<string>;
    title: string;
    ref?: any;
    setFocusOnError?: boolean;
    hideErrorText?: boolean;
    disableError?: boolean;
}

export const InputField = (props: InputProps) => {
    const { field, disableError, title, hideErrorText, ...other } = props;
    const ref: any = React.useRef(null);
    if (props.setFocusOnError && props.field.input.invalid) {
        if (ref && ref.current) {
            ref.current.focus();
        }
    }
    return (
        <>
            <XInput
                {...field.input}
                {...other}
                title={title}
                ref={ref}
                className={cx(
                    InputStyledClassName,
                    field.input.value !== '' && InputValueStyledClassName,
                    field.input.invalid && InputInvalidStyledClassName,
                )}
            />
            {!disableError && field.input.invalid && !hideErrorText && (
                <XView color="#d75454" paddingLeft={16} marginTop={8} fontSize={12}>
                    {field.input.errorText}
                </XView>
            )}
        </>
    );
};
