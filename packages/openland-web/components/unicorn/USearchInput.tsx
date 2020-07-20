import React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import SearchIcon from 'openland-icons/ic-search-16.svg';
import ClearIcon from 'openland-icons/ic-close-16.svg';
import { TextBody } from 'openland-web/utils/TextStyles';
import { SvgLoader } from 'openland-x/XLoader';

const wrapper = css`
    background-color: var(--backgroundTertiaryTrans);
    border-radius: 8px;
    padding: 8px 40px 8px 36px;

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }
`;

const field = css`
    appearance: textfield;
    position: relative;

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

const wrapperRounded = css`
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

    & svg * {
        fill: var(--foregroundTertiary);
    }

    &:hover, &:focus {
        opacity: 0.56
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
    rounded?: boolean;
    className?: string;
    loading?: boolean;
}

export interface USearchInputRef {
    reset: () => void;
    focus: () => void;
}

export const USearchInput = React.forwardRef((props: USearchInputProps, ref: React.RefObject<USearchInputRef>) => {
    const { value, onChange, autoFocus, onKeyDown, onFocus, rounded, loading, className, placeholder = 'Search', ...other } = props;

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
    }));

    return (
        <XView position="relative" {...other}>
            <div className={cx('x', wrapper, rounded && wrapperRounded, className)}>
                <div className={searchIconWrapper}>
                    {loading ? <SvgLoader size="small" /> : <SearchIcon />}
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
                    ref={inputRef}
                    autoComplete="off"
                />
                {props.value && props.value.length > 0 && (
                    <button
                        className={resetClassName}
                        onClick={() => {
                            inputRef.current?.focus();
                            handleChange('');
                        }}
                    >
                        <ClearIcon />
                    </button>
                )}
            </div>
        </XView>
    );
});
