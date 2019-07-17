import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';

const inputWrapper = css`
    display: flex;
    align-items: stretch;
    position: relative;
    border-radius: 8px;
    background-color: #f0f2f5;
    height: 56px;

    &:focus-within div.input-label {
        font-size: 13px;
        line-height: 18px;
        color: #1885f2;
        top: 8px;
    }
`;

const inputStyle = css`
    width: 100%;
    height: 100%;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 18px;
    font-size: 15px;
    color: #171b1f;
    line-height: 24px;
`;

const labelStyle = css`
    pointer-events: none;
    position: absolute;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 15px;
    color: #969aa3;
    line-height: 24px;
    top: 14px;
`;

const labelValueStyle = css`
    font-size: 13px;
    line-height: 18px;
    color: #676d7a;
    top: 8px;
`;

const labelInvalidStyle = css`
    color: #e62e3d !important;
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
