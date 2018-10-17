import * as React from 'react';
import Glamorous from 'glamorous';

const XCounterStyled = Glamorous.div<{ color?: string, bgColor?: string, borderColor?: string }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: '13px',
    borderRadius: 5,
    backgroundColor: props.bgColor || '#e22a2a',
    border: '2px solid ' + (props.borderColor ? props.borderColor : 'white'),
    fontSize: 10,
    fontWeight: 600,
    color: props.color || '#ffffff'
}));

const XCounterBig = Glamorous(XCounterStyled)<{ color?: string, bgColor?: string }>((props) => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    fontSize: 12,
    fontWeight: 600,
    border: 'none',
    textAlign: 'center',
    backgroundColor: props.bgColor || '#1790ff',
    lineHeight: '10px',
    ...props.color ? {
        color: props.color
    } : {}

}));

export const XCounter = (props: { count: number, color?: string, bgColor?: string, borderColor?: string, big?: boolean }) => (
    !props.big ?
        (
            <XCounterStyled className="counter" color={props.color} bgColor={props.bgColor} borderColor={props.borderColor}>
                <span>{props.count}</span>
            </XCounterStyled>
        ) :
        (
            <XCounterBig className="counter" color={props.color} bgColor={props.bgColor} borderColor={props.borderColor}>
                <span>{props.count}</span>
            </XCounterBig>
        )
);