import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { ThemeLightBlue } from 'openland-y-utils/themes';

const inputClassName = css`
    display: none;
`;

const labelClassName = css`
    flex-grow: 1;
`;

interface XRadioItemProps {
    label: string;
    value?: string;
    checked?: boolean;
    onChange?: (checked?: string) => void;
    useAnyOption?: boolean;
}

export const XRadioItem = (props: XRadioItemProps) => {
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
        <XView
            flexDirection="row"
            alignItems="center"
        >
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
                    color="#171B1F"
                    lineHeight="24px"
                    hoverBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
                >
                    <span>{props.label}</span>
                    <XView
                        width={20}
                        height={20}
                        flexShrink={0}
                        borderRadius={20}
                        borderWidth={props.checked ? 6 : 2}
                        borderColor={props.checked ? '#1885F2' : '#C4C7CC'}
                        backgroundColor="#fff"
                    />
                </XView>
            </label>
        </XView>
    );
};
