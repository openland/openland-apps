import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';

const radioDotStyle = css`
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 2px solid var(--foregroundQuaternary);
    transition: all 0.15s ease;
`;

const radioDotCheckedStyle = css`
    border: 6px solid var(--accentMuted);
`;

const inputClassName = css`
    display: none;
`;

const labelClassName = css`
    flex-grow: 1;
    cursor: pointer;
`;

interface URadioItemProps {
    label: string;
    value?: string;
    checked?: boolean;
    onChange?: (checked?: string) => void;
    useAnyOption?: boolean;
}

export const URadioDot = (props: { checked?: boolean }) => {
    return <div className={cx(radioDotStyle, props.checked && radioDotCheckedStyle)} />;
};

export const URadioItem = (props: URadioItemProps) => {
    const handleChange = () => {
        if (props.onChange) {
            props.onChange(
                props.checked ? undefined : props.value !== undefined ? props.value : props.label,
            );
        }
    };

    const id = `toggle_${Math.random()
        .toString()
        .replace(/0\./, '')}`;

    return (
        <XView flexDirection="row" alignItems="center">
            <input
                onClick={props.useAnyOption === false ? handleChange : undefined}
                onChange={props.useAnyOption === false ? undefined : handleChange}
                id={id}
                type="radio"
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
                    color="var(--foregroundPrimary)"
                    lineHeight="24px"
                    hoverBackgroundColor="var(--backgroundPrimaryHover)"
                >
                    <span>{props.label}</span>
                    <URadioDot checked={props.checked} />
                </XView>
            </label>
        </XView>
    );
};
