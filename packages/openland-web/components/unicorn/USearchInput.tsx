import React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import SearchIcon from 'openland-icons/ic-search-16.svg';
import ClearIcon from 'openland-icons/ic-close-16.svg';
import { TextBody } from 'openland-web/utils/TextStyles';

const field = css`
    appearance: textfield;
    position: relative;
    background-color: var(--backgroundTertiary);
    padding: 8px 40px 8px 36px;
    border-radius: 8px;

    &::-webkit-search-cancel-button {
        display: none;
    }

    &::-webkit-search-decoration {
        appearance: none;
    }

    &::placeholder {
        color: var(--foregroundTertiary);
        opacity: 1;
    }
`;

const reset = css`
    appearance: none;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);

    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg * {
        fill: var(--foregroundTertiary);
        transition: fill 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    &:hover svg *,
    &:focus svg * {
        transition: fill 0.01s cubic-bezier(0.25, 0.8, 0.25, 1);
        fill: var(--foregroundSecondary);
    }
`;

const searchIconWrapper = css`
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);

    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    & svg * {
        fill: var(--foregroundTertiary);
    }
`;

interface USearchInputProps extends XViewProps {
    value?: string;
    onChange?: (e: string) => void;
    autoFocus?: boolean;
    placeholder?: string;
}

export const USearchInput = React.forwardRef(
    (props: USearchInputProps, ref: React.RefObject<HTMLInputElement>) => {
        const { value, onChange, autoFocus, placeholder = 'Search', ...other } = props;

        const [val, setValue] = React.useState(value || '');

        const handleChange = (v: string) => {
            setValue(v);
            if (onChange) {
                onChange(v);
            }
        };

        return (
            <XView position="relative" {...other}>
                <input
                    type="search"
                    className={cx(TextBody, field)}
                    value={val || ''}
                    onChange={e => handleChange(e.target.value)}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    ref={ref}
                />
                <div className={searchIconWrapper}>
                    <SearchIcon />
                </div>
                {props.value &&
                    props.value.length > 0 && (
                        <button className={reset} onClick={() => handleChange('')}>
                            <ClearIcon />
                        </button>
                    )}
            </XView>
        );
    },
);
