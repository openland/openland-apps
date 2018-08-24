import * as React from 'react';
import Glamorous from 'glamorous';

const XCounterStyled = Glamorous.div<{ color?: string, bgColor?: string }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 15,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 4,
    paddingRight: 4,
    lineHeight: '13px',
    borderRadius: 21,
    backgroundColor: props.bgColor || '#e22a2a',
    border: '1px solid white',
    fontSize: 10,
    fontWeight: 500,
    color: props.color || '#ffffff'
}));

export const XCounter = (props: { count: number, color?: string, bgColor?: string }) => (
    <XCounterStyled className="counter">
        <span>{props.count}</span>
    </XCounterStyled>
);