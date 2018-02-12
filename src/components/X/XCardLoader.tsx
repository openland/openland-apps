import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor'
import { XIcon } from './XIcon'

const loading = glamor.keyframes({
    '0%': { 
        transform: `rotate(0deg) scaleX(-1)`},
    '100%': { transform: `rotate(360deg) scaleX(-1)` }
})

let ItemIcon = Glamorous(XIcon)({
    position: 'absolute',
    top: 'calc(50% - 12.5px)',
    left: 'calc(50% - 12.5px)',
    marginRight: '10px',
    width: '25px',
    fontSize: '25px',
    color: '#6b7c93',
    animation: `${loading} 1s linear infinite`,
})

let HidenComponents = Glamorous.div({
    opacity: 0
})

let XCardLoaderDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
})

export function XCardLoader(props: { children?: any }) {
    return (
        <XCardLoaderDiv>
            <ItemIcon icon="cached" />
            <HidenComponents>
                {props.children}
            </HidenComponents>
        </XCardLoaderDiv>
    )
}