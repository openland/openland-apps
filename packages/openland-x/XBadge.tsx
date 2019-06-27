import * as React from 'react';
import { XMemo } from 'openland-y-utils/XMemo';
import { XView, XViewProps } from 'react-mental';

export interface XBadgeProps {
    name: string;
    verified: boolean;

    primary?: boolean;
    size?: 'default' | 'big';
    onClick?: () => void;
}

const XBadgeWrapperDefault = XMemo<XViewProps>((props) => (
    <XView
        {...props}
        paddingHorizontal={4}
        height={16}
        borderRadius={4}
        fontSize={11}
        lineHeight="14px"
        borderWidth={1}
        fontWeight="600"
    >
        {props.children}
    </XView>
));

const XBadgeWrapperBig = XMemo<XViewProps>((props) => (
    <XView
        {...props}
        paddingHorizontal={11}
        height={27}
        borderRadius={4}
        fontSize={15}
        lineHeight="25px"
        borderWidth={1}
        fontWeight="600"
    >
        {props.children}
    </XView>
));

export const XBadge = XMemo<XBadgeProps>((props) => {
    const color = props.verified ? '#5CCC6E' : 'rgba(0, 0, 0, 0.5)';
    const backgroundColor = props.verified ? 'rgba(92, 204, 110, 0.1)' : 'rgba(0, 0, 0, 0.06)';
    const borderColor = props.primary ? (props.verified ? 'rgba(92, 204, 110, 0.4)' : 'rgba(0, 0, 0, 0.2)') : 'transparent';

    if (props.size === 'big') {
        return (
            <XBadgeWrapperBig color={color} backgroundColor={backgroundColor} borderColor={borderColor} onClick={props.onClick}>
                {props.name}
            </XBadgeWrapperBig>
        )
    }

    return (
        <XBadgeWrapperDefault color={color} backgroundColor={backgroundColor} borderColor={borderColor} onClick={props.onClick}>
            {props.name}
        </XBadgeWrapperDefault>
    )
});

export interface XBadgeAddProps {
    caption: string;

    onClick?: () => void;
}

export const XBadgeAdd = XMemo<XBadgeAddProps>((props) => (
    <XBadgeWrapperBig
        color="rgba(0, 0, 0, 0.5)"
        borderColor="#F0F0F0"
        onClick={props.onClick}
        cursor="pointer"
        hoverBackgroundColor="rgba(0, 0, 0, 0.04)"
        hoverBorderColor="transparent"
    >
        {props.caption}
    </XBadgeWrapperBig>
));