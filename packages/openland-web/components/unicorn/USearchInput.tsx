import React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import SearchIcon from 'openland-icons/ic-search-16.svg';
import ClearIcon from 'openland-icons/ic-close-16.svg';
import ThinLoaderIcon from 'openland-icons/s/ic-loader-thin-16.svg';
import { TextBody } from 'openland-web/utils/TextStyles';
import { rotate } from 'openland-x/XLoader';

const inputWrapper = css`
    display: flex;
    flex-direction: row;
    height: 40px;
    padding: 8px 40px 8px 36px;
    border-radius: 8px;
    align-items: center;
    background-color: var(--backgroundTertiaryTrans);
    
    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }
`;

const inputWrapperRounded = css`
    border-radius: 100px;
    padding: 4px 40px 4px 36px;
`;

const field = css`
    appearance: textfield;
    position: relative;
    flex-shrink: 1;
    width: 100%;
    color: var(--foregroundPrimary);

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
    top: 0;
    right: 0;

    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.01s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 1;

    & svg * {
        fill: var(--foregroundTertiary);
    }

    &:hover, &:focus {
        opacity: 0.56;
    }

    &:hover+.${field} {
        background-color: var(--backgroundTertiaryHoverTrans);
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

const messageClassName = css`
    padding-left: 16px;
    margin-right: -24px;
    color: var(--foregroundTertiary);
    flex-shrink: 0;
`;

interface USearchInputProps extends XViewProps {
    value?: string;
    onChange?: (e: string) => void;
    onKeyDown?: React.KeyboardEventHandler;
    onFocus?: React.FocusEventHandler;
    onBlur?: React.FocusEventHandler;
    onCancel?: () => void;
    autoFocus?: boolean;
    placeholder?: string;
    rounded?: boolean;
    message?: string;
    className?: string;
    loading?: boolean;
}

export interface USearchInputRef {
    reset: () => void;
    focus: () => void;
    blur: () => void;
}

export const USearchInput = React.forwardRef((props: USearchInputProps, ref: React.RefObject<USearchInputRef>) => {
    const { value, onChange, autoFocus, onKeyDown, onFocus, onBlur, rounded, loading, className, message, placeholder = 'Search', onCancel, ...other } = props;

    const [val, setValue] = React.useState(typeof value === 'string' ? value : '');
    const [focused, setFocused] = React.useState(!!autoFocus);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useLayoutEffect(() => {
        if (val !== value) {
            setValue(value || '');
        }
    }, [value]);

    const handleChange = (v: string) => {
        setValue(v);
        if (onChange) {
            onChange(v);
        }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (!onCancel) {
            setFocused(false);
        }
        if (onBlur) {
            onBlur(event);
        }
    };

    const handleClear = () => {
        if (props.value && props.value.length > 0) {
            inputRef.current?.focus();
            handleChange('');
        } else if (!!onCancel) {
            onCancel();
            setFocused(false);
        }
    };

    React.useImperativeHandle<any, { reset: () => void }>(ref, () => ({
        reset: () => {
            handleChange('');
            setFocused(false);
        },
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
    }));

    const showClear = (props.value && props.value.length > 0) || (!!onCancel && focused);
    const inputClassNames = cx(
        'x',
        TextBody,
        field,
    );

    return (
        <XView position="relative" {...other}>
            <div className={searchIconWrapper}>
                {loading ? <ThinLoaderIcon className={rotate} /> : <SearchIcon />}
            </div>
            {showClear && (
                <div
                    tabIndex={-1}
                    className={resetClassName}
                    onClick={handleClear}
                >
                    <ClearIcon />
                </div>
            )}
            <div className={cx(inputWrapper, rounded && inputWrapperRounded)}>
                <input
                    type="search"
                    value={val || ''}
                    className={inputClassNames}
                    onChange={e => handleChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    ref={inputRef}
                    autoComplete="openland-search" // chrome does not *always* follow standards and *sometimes* ignores autocomplete="off", hence we must use arbitrary values
                />
                {message && <div className={cx(messageClassName, TextBody)}>{message}</div>}
            </div>
        </XView>
    );
});
