import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';

export type XButtonSize = 'small' | 'medium' | 'large';
export type XButtonStyle = 'default' | 'danger' | 'primary';

export interface UButtonProps extends XViewProps {
    square?: boolean;
    text: string;
    icon?: any;
    iconRight?: any;
    size?: XButtonSize;
    style?: XButtonStyle;
    loading?: boolean;
    disable?: boolean;
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
    border-radius: 100px;
    cursor: pointer;
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

const iconWrapperStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const size28 = css`
    font-size: 14px;
    line-height: 20px;
    height: 28px;
    padding-left: 16px;
    padding-right: 16px;
`;

const size32 = css`
    font-size: 13px;
    line-height: 18px;
    height: 32px;
    padding-left: 16px;
    padding-right: 16px;
`;

const size40 = css`
    font-size: 15px;
    line-height: 24px;
    height: 40px;
    padding-left: 24px;
    padding-right: 24px;
`;

const defaultStyle = css`
    color: #676d7a;
    background-color: #f0f2f5;
`;

const dangerStyle = css`
    color: #fff;
    background-color: #e62e3d;
`;

const primaryStyle = css`
    color: #fff;
    background-color: #1885f2;
`;

const sizeResolver = {
    small: size28,
    medium: size32,
    large: size40,
};

const styleResolver = {
    default: defaultStyle,
    danger: dangerStyle,
    primary: primaryStyle,
};

const loaderColor = {
    default: {
        color: '#676D7A',
    },
    danger: {
        color: '#fff',
    },
    primary: {
        color: '#fff',
    },
};

export const XButton = (props: UButtonProps) => {
    const { text, icon, iconRight, square, size, style, loading, disable, ...other } = props;
    return (
        <XView {...other}>
            <div
                className={cx(
                    buttonWrapperStyle,
                    square && squareStyle,
                    (loading || disable) && disableStyle,
                    sizeResolver[size || 'medium'],
                    styleResolver[style || 'primary'],
                )}
            >
                {icon && (
                    <div className={cx(iconWrapperStyle, loading && loadingStyle)}>{icon}</div>
                )}
                <span className={cx(textStyle, loading && loadingStyle)}>{text}</span>
                {iconRight && (
                    <div className={cx(iconWrapperStyle, loading && loadingStyle)}>{iconRight}</div>
                )}
                {loading && (
                    <XLoader
                        loading={true}
                        size="small"
                        transparentBackground
                        {...loaderColor[style || 'primary']}
                    />
                )}
            </div>
        </XView>
    );
};
