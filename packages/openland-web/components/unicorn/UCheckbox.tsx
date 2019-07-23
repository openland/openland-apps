import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import CheckIcon from 'openland-icons/ic-checkbox.svg';

const inputClassName = css`
    display: none;
`;

const labelClassName = css`
    flex-grow: 1;
    cursor: pointer;
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

const CheckComponent = ({ checked }: { checked?: boolean }) => (
    <div className={cx(checkDotStyle, checked && checkDotCheckedStyle)}>
        <CheckIcon />
    </div>
);

const SwitcherComponent = ({ checked }: { checked?: boolean }) => (
    <div className={cx(switcherWrapStyle, checked && switcherWrapCheckedStyle)}>
        <div className={cx(switcherDotStyle, checked && switcherDotCheckedStyle)} />
    </div>
);

interface XRadioItemProps {
    label: string;
    value?: string;
    checked?: boolean;
    onChange?: () => void;
    asSwitcher?: boolean;
}

export const UCheckbox = (props: XRadioItemProps) => {
    const handleChange = () => {
        if (props.onChange) {
            props.onChange();
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
                <XView
                    cursor="pointer"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexGrow={1}
                    height={48}
                    paddingLeft={16}
                    paddingRight={18}
                    borderRadius={8}
                    fontSize={15}
                    color="#171B1F"
                    lineHeight="24px"
                    hoverBackgroundColor={ThemeDefault.backgroundPrimaryHover}
                >
                    <span>{props.label}</span>
                    {!props.asSwitcher && <CheckComponent checked={props.checked} />}
                    {props.asSwitcher && <SwitcherComponent checked={props.checked} />}
                </XView>
            </label>
        </XView>
    );
};
