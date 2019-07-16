import * as React from 'react';
import { css } from 'linaria';
import { XView, XViewProps } from 'react-mental';
import { XLoader } from './XLoader';

export type XButtonSize = 'small' | 'medium' | 'large';
export type XButtonStyle = 'default' | 'danger' | 'primary';

const textClassName = css`
    white-space: nowrap;
    overflow: hidden;
`;

interface XButtonProps extends XViewProps {
    square?: boolean;
    text: string;
    icon?: any;
    iconRight?: any;
    size?: XButtonSize;
    style?: XButtonStyle;
    loading?: boolean;
    disable?: boolean;
}

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

const colorStyle = {
    default: {
        color: '#676D7A',
        backgroundColor: '#F0F2F5',
    },
    danger: {
        color: '#fff',
        backgroundColor: '#E62E3D',
    },
    primary: {
        color: '#fff',
        backgroundColor: '#1885F2',
    },
};

const propertyStyle = {
    small: {
        height: 28,
        paddingHorizontal: 16,
        fontSize: 14,
        lineHeight: '20px',
    },
    medium: {
        height: 32,
        paddingHorizontal: 16,
        fontSize: 13,
        lineHeight: '18px',
    },
    large: {
        height: 40,
        paddingHorizontal: 24,
        fontSize: 15,
        lineHeight: '24px',
    },
};

export const XButton = (props: XButtonProps) => {
    const { text, icon, iconRight, square, size, style, loading, disable, ...other } = props;
    return (
        <XView
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            fontWeight="600"
            borderRadius={square ? 8 : 100}
            cursor={loading || disable ? undefined : 'pointer'}
            {...propertyStyle[size || 'medium']}
            {...colorStyle[style || 'primary']}
            {...other}
        >
            {icon && (
                <XView flexDirection="row" alignItems="center">
                    {icon}
                </XView>
            )}
            <XView
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                opacity={loading ? 0 : 1}
            >
                <span className={textClassName}>{text}</span>
            </XView>
            {iconRight && (
                <XView flexDirection="row" alignItems="center">
                    {iconRight}
                </XView>
            )}
            {loading && (
                <XLoader
                    loading={true}
                    size="small"
                    transparentBackground
                    {...loaderColor[style || 'primary']}
                />
            )}
        </XView>
    );
};
