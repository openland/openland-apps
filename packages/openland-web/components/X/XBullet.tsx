import * as React from 'react';
import Glamorous from 'glamorous';

interface XBulletProps {
    color?: 'red' | 'green' | 'blue' | 'yellow';
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
}

let style = {
    'red': {
        'color': '#e25950',
        'boxShadow': 'inset 0 0 0 1px rgba(226, 89, 80, .2)'
    },
    'green': {
        'color': '#24b47e',
        'boxShadow': 'inset 0 0 0 1px rgba(36, 180, 126, .2)'
    },
    'blue': {
        'color': '#6772e5',
        'boxShadow': 'inset 0 0 0 1px rgba(103, 114, 229, .2)'
    },
    'yellow': {
        'color': '#e39f48',
        'boxShadow': 'inset 0 0 0 1px rgba(227, 159, 72, .2)'
    }
};

let XBulletDiv = Glamorous.div<XBulletProps>((props) => ({
    display: 'flex',
    alignSelf: props.alignSelf,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    textTransform: 'uppercase',
    color: props.color ? style[props.color].color : '#888',
    boxShadow: props.color ? style[props.color].boxShadow : 'inset 0 0 0 1px hsla(0, 0%, 53%, .5)',
    borderRadius: '20px'
}));

export function XBullet(props: XBulletProps & { children?: any }) {
    return (
        <XBulletDiv color={props.color} alignSelf={props.alignSelf}>
            <span>{props.children}</span>
        </XBulletDiv>
    );
}