import React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import SearchIcon from 'openland-icons/ic-search-16.svg';
import ClearIcon from 'openland-icons/ic-close-16.svg';
import { TextBody } from 'openland-web/utils/TextStyles';

const field = css`
    appearance: textfield;
    position: relative;
    background-color: var(--backgroundTertiaryTrans);
    padding: 8px 40px 8px 36px;
    border-radius: 8px;

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }

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

const resetClassName = css`
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
    onKeyDown?: React.KeyboardEventHandler;
    onFocus?: React.FocusEventHandler;
    autoFocus?: boolean;
    placeholder?: string;
}

export interface USearchInputRef extends HTMLInputElement {
    reset: () => void;
}

export const USearchInput = React.forwardRef((props: USearchInputProps, ref: React.RefObject<USearchInputRef>) => {
    const { value, onChange, autoFocus, onKeyDown, onFocus, placeholder = 'Search', ...other } = props;

    const [val, setValue] = React.useState(typeof value === 'string' ? value : '');

    const handleChange = (v: string) => {
        setValue(v);
        if (onChange) {
            onChange(v);
        }
    };

    React.useImperativeHandle<any, { reset: () => void }>(ref, () => ({
        reset: () => handleChange(''),
    }));

    return (
        <XView position="relative" {...other}>
            <div className={searchIconWrapper}>
                <SearchIcon />
            </div>
            <input
                type="search"
                className={cx(TextBody, field)}
                value={val || ''}
                onChange={e => handleChange(e.target.value)}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                placeholder={placeholder}
                autoFocus={autoFocus}
                ref={ref}
            />
            {props.value && props.value.length > 0 && (
                <button className={resetClassName} onClick={() => handleChange('')}>
                    <ClearIcon />
                </button>
            )}
        </XView>
    );
});
