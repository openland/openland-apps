import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XInput } from 'openland-x/XInput';
import { FormField } from 'openland-form/useField';

const InputStyledClassName = css`
    height: 52px !important;
    border-radius: 8px !important;
    background-color: #f2f3f4 !important;
    border-color: transparent !important;
    &:focus-within {
        border-color: transparent !important;
        border-bottom: 1px solid #1790ff !important;
        box-shadow: none !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        & .input-placeholder {
            color: #1488f3 !important;
        }
    }
    & input {
        padding-top: 11px !important;
    }
    & .input-placeholder {
        top: -11px !important;
        left: 0 !important;
        background-color: transparent !important;
        color: #696c6e !important;
        padding-left: 16px !important;
        height: 100% !important;
        width: 100% !important;
        font-size: 12px !important;
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

interface InputProps {
    field: FormField<string>;
    title: string;
    ref?: any;
    setFocusOnError?: boolean;
    hideErrorText?: boolean;
}

export const InputField = (props: InputProps) => {
    const ref: any = React.useRef(null);
    if (props.setFocusOnError && props.field.input.invalid) {
        if (ref && ref.current) {
            ref.current.focus();
        }
    }
    return (
        <>
            <XInput
                {...props.field.input}
                title={props.title}
                ref={ref}
                className={cx(
                    InputStyledClassName,
                    props.field.input.value !== '' && InputValueStyledClassName,
                    props.field.input.invalid && InputInvalidStyledClassName,
                )}
            />
            {props.field.input.invalid &&
                !props.hideErrorText && (
                    <XView color="#d75454" paddingLeft={16} marginTop={8} fontSize={12}>
                        {props.field.input.errorText}
                    </XView>
                )}
        </>
    );
};
