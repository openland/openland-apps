import React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import SearchIcon from 'openland-icons/ic-search-16.svg';
import ClearIcon from 'openland-icons/ic-close-16.svg';
import ThinLoaderIcon from 'openland-icons/s/ic-loader-thin-16.svg';
import { TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { rotate } from 'openland-x/XLoader';

const field = css`
    appearance: textfield;
    position: relative;
    background-color: var(--backgroundTertiaryTrans);
    border-radius: 8px;
    padding: 8px 40px 8px 36px;

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

const fieldRounded = css`
    border-radius: 100px;
    padding: 4px 40px 4px 36px;
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
    className?: string;
    loading?: boolean;
    showCancel?: boolean;
}

export interface USearchInputRef {
    reset: () => void;
    focus: () => void;
    blur: () => void;
}

export const USearchInput = React.forwardRef((props: USearchInputProps, ref: React.RefObject<USearchInputRef>) => {
    const { value, onChange, autoFocus, onKeyDown, onFocus, onBlur, rounded, loading, className, placeholder = 'Search', showCancel, onCancel, ...other } = props;

    const [val, setValue] = React.useState(typeof value === 'string' ? value : '');
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

    React.useImperativeHandle<any, { reset: () => void }>(ref, () => ({
        reset: () => handleChange(''),
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
    }));

    return (
        <XView flexDirection="row" {...other}>
            <XView flexGrow={1} position="relative">
                <div className={searchIconWrapper}>
                    {loading ? <ThinLoaderIcon className={rotate} /> : <SearchIcon />}
                </div>
                {props.value && props.value.length > 0 && (
                    <div
                        tabIndex={-1}
                        className={resetClassName}
                        onClick={() => {
                            inputRef.current?.focus();
                            handleChange('');
                        }}
                    >
                        <ClearIcon />
                    </div>
                )}
                <input
                    type="search"
                    className={cx('x', TextBody, field, rounded && fieldRounded)}
                    value={val || ''}
                    onChange={e => handleChange(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    ref={inputRef}
                    autoComplete="off"
                />
            </XView>

            {showCancel && (
                <XView
                    onClick={onCancel}
                    marginRight={-16}
                    paddingHorizontal={16}
                    color="var(--accentPrimary)"
                    hoverColor="var(--accentPrimaryHover)"
                    paddingVertical={8}
                    cursor="pointer"
                    {...TextStyles.Body}
                >
                    Cancel
                </XView>
            )}
        </XView>
    );
});
