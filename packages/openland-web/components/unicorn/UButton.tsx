import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';

type UButtonShape = 'round' | 'square';
type UButtonSize = 'small' | 'medium' | 'large';
export type UButtonStyle = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'pay';

export interface UButtonProps extends XViewProps {
    text: string;
    shape?: UButtonShape;
    size?: UButtonSize;
    style?: UButtonStyle;
    loading?: boolean;
    disable?: boolean;
    left?: any;
    action?: () => void;
    className?: string;
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
    user-select: none;
    transition: color 0.08s ease-in, all 0.15s ease;
`;

const roundStyle = css`
    border-radius: 100px !important;
`;

const squareStyle = css`
    border-radius: 8px !important;
`;

const disableStyle = css`
    cursor: default;
    opacity: 0.48;
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
    color: var(--foregroundSecondary);
    background-color: var(--backgroundTertiaryTrans);
`;

const secondaryHoverStyle = css`
    &:hover {
        background-color: #ebedf0;
    }
`;

const secondaryActiveStyle = css`
    &:active {
        background-color: #e6e7eb;
    }
`;

const tertiaryStyle = css`
    color: var(--foregroundSecondary);
    background-color: transparent;
`;

const tertiaryHoverStyle = css`
    &:hover {
        opacity: 0.64;
    }
`;

const tertiaryActiveStyle = css`
    &:active {
        opacity: 0.48;
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

const successStyle = css`
    color: #fff;
    background-color: var(--accentPositive);
`;

const successHoverStyle = css`
    &:hover {
        background-color: var(--accentPositiveHover);
    }
`;

const successActiveStyle = css`
    &:active {
        background-color: var(--accentPositiveActive);
    }
`;

const payStyle = css`
    color: var(--foregroundInverted);
    background-color: var(--accentPay);
`;

const payHoverStyle = css`
    &:hover {
        background-color: var(--accentPayHover);
    }
`;

const payActiveStyle = css`
    &:active {
        background-color: var(--accentPayActive);
    }
`;

const shapeResolver: { [key in UButtonShape]: string } = {
    round: roundStyle,
    square: squareStyle,
};

const sizeResolver: { [key in UButtonSize]: string } = {
    small: size28,
    medium: size32,
    large: size40,
};

const styleResolver: { [key in UButtonStyle]: string } = {
    primary: primaryStyle,
    secondary: secondaryStyle,
    tertiary: tertiaryStyle,
    danger: dangerStyle,
    success: successStyle,
    pay: payStyle,
};

const styleResolverHover: { [key in UButtonStyle]: string } = {
    primary: primaryHoverStyle,
    secondary: secondaryHoverStyle,
    tertiary: tertiaryHoverStyle,
    danger: dangerHoverStyle,
    success: successHoverStyle,
    pay: payHoverStyle,
};

const styleResolverActive: { [key in UButtonStyle]: string } = {
    primary: primaryActiveStyle,
    secondary: secondaryActiveStyle,
    tertiary: tertiaryActiveStyle,
    danger: dangerActiveStyle,
    success: successActiveStyle,
    pay: payActiveStyle,
};

const loaderStyle: { [key in UButtonStyle]: { contrast: boolean } } = {
    primary: {
        contrast: true,
    },
    secondary: {
        contrast: false,
    },
    tertiary: {
        contrast: false,
    },
    danger: {
        contrast: true,
    },
    success: {
        contrast: true,
    },
    pay: {
        contrast: true,
    },
};

export const UButton = React.memo((props: UButtonProps) => {
    const {
        text,
        shape,
        size = 'medium',
        style = 'primary',
        loading,
        disable,
        action,
        onClick,
        className,
        ...other
    } = props;

    const [loadingState, setLoadingState] = React.useState(loading);

    const actionCallback = React.useCallback(
        async () => {
            if (!action) {
                return;
            }
            setLoadingState(true);
            await action();
            setLoadingState(false);
        },
        [action],
    );

    React.useEffect(
        () => {
            setLoadingState(loading);
        },
        [loading],
    );

    return (
        <XView {...other} onClick={!disable ? (action ? actionCallback : onClick) : undefined}>
            <div
                tabIndex={-1}
                className={cx(
                    buttonWrapperStyle,
                    shape && shapeResolver[shape],
                    (loadingState || disable) && disableStyle,
                    sizeResolver[size],
                    styleResolver[style],
                    !(loadingState || disable) && styleResolverHover[style],
                    !(loadingState || disable) && styleResolverActive[style],
                    className && className,
                )}
            >
                {props.left}
                <span className={cx(textStyle, loadingState && loadingStyle)}>{text}</span>
                {loadingState && (
                    <XLoader
                        loading={true}
                        transparentBackground={true}
                        size="medium"
                        {...loaderStyle[style]}
                    />
                )}
            </div>
        </XView>
    );
});
