import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';

type UButtonSize = 'small' | 'medium' | 'large';
export type UButtonStyle = 'primary' | 'secondary' | 'danger';

export interface UButtonProps extends XViewProps {
    square?: boolean;
    text: string;
    size?: UButtonSize;
    style?: UButtonStyle;
    loading?: boolean;
    disable?: boolean;
    action?: () => void;
}

const textStyle = css`
    white-space: nowrap;
    overflow: hidden;
    font-weight: 600;
`;

const buttonWrapperStyle = css`
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: color 0.08s ease-in, all 0.15s ease;
`;

const squareStyle = css`
    border-radius: 8px;
`;

const disableStyle = css`
    cursor: default;
`;

const loadingStyle = css`
    opacity: 0;
`;

const size28 = css`
    font-size: 14px;
    line-height: 20px;
    height: 28px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 100px;
`;

const size32 = css`
    font-size: 13px;
    line-height: 18px;
    height: 32px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 100px;
`;

const size40 = css`
    font-size: 15px;
    line-height: 24px;
    height: 40px;
    padding-left: 24px;
    padding-right: 24px;
    border-radius: 8px;
`;

const primaryStyle = css`
    color: #fff;
    background-color: var(--accentPrimary);
`;

const primaryHoverStyle = css`
    &:hover {
        background-color: var(--accentPrimaryHover);
    }
`;

const primaryActiveStyle = css`
    &:active {
        background-color: var(--accentPrimaryActive);
    }
`;

const secondaryStyle = css`
    color: #676d7a;
    background-color: var(--backgroundTertiary);
`;

const secondaryHoverStyle = css`
    &:hover {
        background-color: var(--backgroundTertiaryHover);
    }
`;

const secondaryActiveStyle = css`
    &:active {
        background-color: var(--backgroundTertiaryActive);
    }
`;

const dangerStyle = css`
    color: #fff;
    background-color: var(--accentNegative);
`;

const dangerHoverStyle = css`
    &:hover {
        background-color: var(--accentNegativeHover);
    }
`;

const dangerActiveStyle = css`
    &:active {
        background-color: var(--accentNegativeActive);
    }
`;

const sizeResolver = {
    small: size28,
    medium: size32,
    large: size40,
};

const styleResolver = {
    primary: primaryStyle,
    secondary: secondaryStyle,
    danger: dangerStyle,
};

const styleResolverHover = {
    primary: primaryHoverStyle,
    secondary: secondaryHoverStyle,
    danger: dangerHoverStyle,
};

const styleResolverActive = {
    primary: primaryActiveStyle,
    secondary: secondaryActiveStyle,
    danger: dangerActiveStyle,
};

const loaderColor = {
    primary: {
        color: '#fff',
    },
    secondary: {
        color: '#676D7A',
    },
    danger: {
        color: '#fff',
    },
};

export const UButton = (props: UButtonProps) => {
    const { text, square, size = 'medium', style = 'primary', loading, disable, action, onClick, ...other } = props;
    const [loadingState, setLoadingState] = React.useState(loading);
    const actionCallback = React.useCallback(async () => {
        if (!action) {
            return;
        }
        setLoadingState(true);
        await action();
        setLoadingState(false);
    }, [action]);

    React.useEffect(() => {
        setLoadingState(loading);
    }, [loading]);

    return (
        <XView {...other} onClick={action ? actionCallback : onClick}>
            <div
                tabIndex={-1}
                className={cx(
                    buttonWrapperStyle,
                    square && squareStyle,
                    (loadingState || disable) && disableStyle,
                    sizeResolver[size],
                    styleResolver[style],
                    !(loadingState || disable) && styleResolverHover[style],
                    !(loadingState || disable) && styleResolverActive[style],
                )}
            >
                <span className={cx(textStyle, loadingState && loadingStyle)}>{text}</span>
                {loadingState && (
                    <XLoader
                        loading={true}
                        size="small"
                        transparentBackground
                        {...loaderColor[style]}
                    />
                )}
            </div>
        </XView>
    );
};
