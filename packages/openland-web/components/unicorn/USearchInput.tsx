import React, { FC, ChangeEvent } from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import SearchIcon from 'openland-icons/ic-search-16.svg';
import ClearIcon from 'openland-icons/ic-close-16.svg';

const field = css`
    appearance: none;
    position: relative;
    background-color: var(--backgroundTertiary);
    padding: 8px 40px 8px 36px;
    border-radius: 8px;

    &::-webkit-search-cancel-button {
        display: none;
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
        transition: fill 0.2s cubic-bezier(.25, .8, .25, 1);
    }

    &:hover svg *,
    &:focus svg * {
        transition: fill 0.01s cubic-bezier(.25, .8, .25, 1);
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

interface USearchInputProps {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onReset?: () => void;
    autoFocus?: boolean;
    placeholder?: string;
}

export const USearchInput: FC<USearchInputProps> = (props) => (
    <XView position="relative">
        <input
            type="search"
            className={field}
            value={props.value}
            onChange={props.onChange}
            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
        />
        <div className={searchIconWrapper}>
            <SearchIcon />
        </div>
        {props.value && props.value.length > 0 && (
            <button className={reset} onClick={props.onReset}>
                <ClearIcon />
            </button>
        )}
    </XView>
);

USearchInput.defaultProps = {
    placeholder: 'Search'
};