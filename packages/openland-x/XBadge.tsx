import * as React from 'react';
import { XMemo } from 'openland-y-utils/XMemo';
import { XView, XViewProps } from 'react-mental';

export interface XBadgeProps {
    name: string;
    verified: boolean;

    size?: 'default' | 'big';
    onClick?: () => void;
}

const XBadgeWrapperDefault = XMemo<XViewProps>((props) => {
    return (
        <XView
            {...props}
            paddingHorizontal={5}
            height={16}
            borderRadius={4}
            fontSize={11}
            lineHeight="16px"
        >
            {props.children}
        </XView>
    );
});

const XBadgeWrapperBig = XMemo<XViewProps>((props) => {
    return (
        <XView
            {...props}
            paddingHorizontal={12}
            height={27}
            borderRadius={4}
            fontSize={15}
            lineHeight="27px"
        >
            {props.children}
        </XView>
    );
});

export const XBadge = XMemo<XBadgeProps>((props) => {
    const color = props.verified ? '#5CCC6E' : 'rgba(0, 0, 0, 0.5)';
    const backgroundColor = props.verified ? 'rgba(92, 204, 110, 0.1)' : 'rgba(0, 0, 0, 0.06)';

    if (props.size === 'big') {
        return (
            <XBadgeWrapperBig color={color} backgroundColor={backgroundColor} onClick={props.onClick}>
                {props.name}
            </XBadgeWrapperBig>
        )
    }

    return (
        <XBadgeWrapperDefault color={color} backgroundColor={backgroundColor} onClick={props.onClick}>
            {props.name}
        </XBadgeWrapperDefault>
    )
});