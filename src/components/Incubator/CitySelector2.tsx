import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import { XPopover } from '../X/XPopover';

const showAnimation = glamor.keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0)',
        transformOrigin: '50% calc(100% + 11px)'
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
        transformOrigin: '50% calc(100% + 11px)'
    }
});

const PopperDiv = Glamorous.div({
    display: 'flex',
    marginTop: -10,
    animationDuration: '0.2s',
    animationFillMode: 'forwards',
    animationName: `${showAnimation}`,
    animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    padding: 10,
    background: '#fff',
    minWidth: 150,
    maxWidth: 200,
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    color: '#525f7f',
    fontSize: 14,
    lineHeight: 'normal',
    fontWeight: 400,
    position: 'relative',

    '& .popper__arrow': {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        position: 'absolute',
        borderWidth: '5px 5px 0 5px',
        borderColor: '#fff transparent transparent transparent',
        bottom: -15,
        left: 'calc(50% - 5px)',
        marginTop: 0,
        marginBottom: 10
    }
});

const CityTitle = Glamorous.div<{ inverted?: boolean }>((props) => ({
    cursor: 'pointer',
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    color: props.inverted ? 'RGBA(245, 246, 248, 0.7)' : '#182642',
    fontSize: '20px',
    lineHeight: '18px',
    fontWeight: 600,
    borderBottom: props.inverted ? '1px dashed RGBA(245, 246, 248, 0.5)' : '1px dashed RGBA(24, 38, 66, 0.7)',
    '&:hover': {
        color: props.inverted ? '#f5f6f8' : '#6B50FF',
        borderBottom: props.inverted ? '1px dashed RGBA(245, 246, 248, 0.8)' : '1px dashed RGBA(107, 80, 255, 0.8)',
    }
}));

interface ConfirmPopoverProps {
    children: any;
    title?: string;
    inverted?: boolean;
}

export function CitySelector(props: ConfirmPopoverProps) {
    return (
        <XPopover placement="top">
            <XPopover.Target>
                <CityTitle inverted={props.inverted}>{props.title}</CityTitle>
            </XPopover.Target>
            <XPopover.Content>
                <PopperDiv>
                    {props.children}
                    <div className="popper__arrow" />
                </PopperDiv>
            </XPopover.Content>
        </XPopover>
    );
}