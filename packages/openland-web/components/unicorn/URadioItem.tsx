import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { TextBody } from 'openland-web/utils/TextStyles';

const labelClass = css`
    display: flex;
    cursor: pointer;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    height: 48px;
    border-radius: 8px;
    font-size: 15px;
    color: var(--foregroundPrimary);
    line-height: 24px;
    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }
`;

const radioDotStyle = css`
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 2px solid var(--foregroundQuaternary);
`;

const radioDotCheckedStyle = css`
    border: 6px solid var(--accentMuted);
    background-color: var(--foregroundContrast);
`;

const textWithHorizontalPaddingClassName = css`
    padding-left: 16px;
    padding-right: 18px;
`;

const textWithCornersClassName = css`
    border-radius: 0;
`;

const inputClassName = css`
    display: none;
`;

const labelClassName = css`
    flex-grow: 1;
    cursor: pointer;
`;

interface URadioItemProps extends XViewProps {
    label: string;
    value?: string;
    checked?: boolean;
    onChange?: (checked?: string) => void;
    useAnyOption?: boolean;
    withCorners?: boolean;
    disableHorizontalPadding?: boolean;
}

export const URadioDot = (props: { checked?: boolean }) => {
    return <div className={cx(radioDotStyle, props.checked && radioDotCheckedStyle)} />;
};

export const URadioItem = (props: URadioItemProps) => {
    const {
        label,
        value,
        checked,
        onChange,
        useAnyOption,
        withCorners,
        disableHorizontalPadding,
        ...other
    } = props;
    const handleChange = () => {
        if (onChange) {
            onChange(checked ? undefined : value !== undefined ? value : label);
        }
    };

    const id = `toggle_${Math.random().toString().replace(/0\./, '')}`;

    return (
        <XView flexDirection="row" alignItems="center">
            <input
                onClick={useAnyOption === false ? handleChange : undefined}
                onChange={useAnyOption === false ? undefined : handleChange}
                id={id}
                type="radio"
                checked={checked}
                className={inputClassName}
            />
            <label htmlFor={id} className={labelClassName}>
                <div
                    className={cx(
                        labelClass,
                        TextBody,
                        withCorners && textWithCornersClassName,
                        !disableHorizontalPadding && textWithHorizontalPaddingClassName,
                    )}
                >
                    <XView
                        {...other}
                        flexDirection="row"
                        alignItems="center"
                        flexGrow={1}
                        flexBasis={1}
                    >
                        <XView
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                            flexGrow={1}
                            flexBasis={1}
                        >
                            <span>{label}</span>
                            <URadioDot checked={checked} />
                        </XView>
                    </XView>
                </div>
            </label>
        </XView>
    );
};
