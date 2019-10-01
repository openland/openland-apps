import * as React from 'react';
import { css } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { FormField } from 'openland-form/useField';

const textAreaStyle = css`
    width: 100%;
    height: 100%;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    font-size: 15px;
    color: var(--foregroundPrimary);
    line-height: 24px;
    border-radius: 8px;
    background-color: var(--backgroundTertiary);
    &::placeholder {
        color: #9d9fa3;
    }
`;

export interface UTextAreaProps extends XViewProps {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    invalid?: boolean;
    autofocus?: boolean;
    onChange?: (v: string) => void;
    resize?: boolean;
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

    const resizing = resize ? 'vertical' : 'none';

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
            <textarea
                className={textAreaStyle}
                value={val}
                placeholder={placeholder}
                autoFocus={autofocus}
                onChange={e => handleChange(e.target.value)}
                disabled={disabled}
                style={{ resize: resizing }}
            />
        </XView>
    );
};

export const UTextAreaField = (props: UTextAreaProps & { field: FormField<string> }) => {
    const { field, ...other } = props;
    return <UTextArea {...field.input} {...other} />;
};
