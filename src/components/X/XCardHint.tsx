import * as React from 'react';
import Glamorous from 'glamorous';

export const XHintText = Glamorous.div({
    textAlign: 'center',
    color: '#FFF',
    fontSize: '10px',
    lineHeight: '13px',
    textTransform: 'uppercase',
    backgroundColor: '#FEBD6E',
    padding: '0 8px',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
})

let XHintDiv = Glamorous.div({
    height: 1,
    width: '100%',
    backgroundColor: '#FEBD6E',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    left: 0,
    top: 0,
})

export function XCardHint(props: { title: string }) {
    return (
        <XHintDiv>
            <XHintText>{props.title}</XHintText>
        </XHintDiv>
    )
}