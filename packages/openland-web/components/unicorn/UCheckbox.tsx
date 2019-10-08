import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextBody, TextTitle3 } from 'openland-web/utils/TextStyles';
import CheckIcon from 'openland-icons/ic-checkbox.svg';
import { FormField } from 'openland-form/useField';

const inputClassName = css`
    display: none;
`;

const labelClassName = css`
    flex-grow: 1;
    cursor: pointer;
`;

const textClassName = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--foregroundPrimary);
    flex-grow: 1;
    border-radius: 8px;
    padding-left: 16px;
    padding-right: 18px;
    height: 48px;
    &:hover {
        background-color: var(--backgroundPrimaryHover);
    }
`;

const checkDotStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 2px solid #c4c7cc;
    background-color: #fff;
    transition: all 0.15s ease;

    & * {
        transition: all 0.2s ease;
    }

    & svg {
        transform: scale(0);
    }
`;

const checkSquareStyle = css`
    border-radius: 4px;
`;

const checkDotCheckedStyle = css`
    background-color: #1885f2;
    border: 0px solid transparent;
    & svg {
        transform: scale(1);
    }
`;

const switcherWrapStyle = css`
    width: 40px;
    height: 24px;
    position: relative;
    border-radius: 100px;
    transition: all 0.15s ease;
    background-color: #c4c7cc;
`;

const switcherDotStyle = css`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    position: absolute;
    transition: all 0.15s ease;
    background-color: #fff;
    left: 2px;
    top: 2px;
`;

const switcherWrapCheckedStyle = css`
    background-color: #1885f2;
`;

const switcherDotCheckedStyle = css`
    left: 18px;
`;

export const CheckComponent = ({ checked, squared }: { checked?: boolean; squared?: boolean }) => (
    <div
        className={cx(checkDotStyle, squared && checkSquareStyle, checked && checkDotCheckedStyle)}
    >
        <CheckIcon />
    </div>
);

export const SwitcherComponent = ({ checked }: { checked?: boolean }) => (
    <div className={cx(switcherWrapStyle, checked && switcherWrapCheckedStyle)}>
        <div className={cx(switcherDotStyle, checked && switcherDotCheckedStyle)} />
    </div>
);

interface UCheckboxItemProps {
    label: string;
    value?: string;
    checked?: boolean;
    onChange?: (value: boolean) => void;
    asSwitcher?: boolean;
    squared?: boolean;
    boldTitle?: boolean;
}

export const UCheckbox = (props: UCheckboxItemProps) => {
    const handleChange = () => {
        if (props.onChange) {
            props.onChange(!props.checked);
        }
    };

    const id = `toggle_${Math.random()
        .toString()
        .replace(/0\./, '')}`;

    return (
        <XView flexDirection="row" alignItems="center">
            <input
                onChange={handleChange}
                id={id}
                type="checkbox"
                checked={props.checked}
                className={inputClassName}
            />
            <label htmlFor={id} className={labelClassName}>
                <div className={cx(textClassName, props.boldTitle ? TextTitle3 : TextBody)}>
                    <span>{props.label}</span>
                    {!props.asSwitcher && (
                        <CheckComponent checked={props.checked} squared={props.squared} />
                    )}
                    {props.asSwitcher && <SwitcherComponent checked={props.checked} />}
                </div>
            </label>
        </XView>
    );
};

export const UCheckboxFiled = (props: UCheckboxItemProps & { field: FormField<boolean> }) => {
    const { field, ...other } = props;

    return <UCheckbox onChange={field.input.onChange} checked={field.input.value} {...other} />;
};
