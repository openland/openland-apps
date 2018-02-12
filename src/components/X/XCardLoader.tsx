import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor'
import { XIcon } from './XIcon'

const loading = glamor.keyframes({
    '0%': { transform: `rotate(0deg) scaleX(-1)` },
    '100%': { transform: `rotate(360deg) scaleX(-1)` }
})

let ItemIcon = Glamorous(XIcon)<{load?: boolean}>((props) => ({
    display: props.load ? 'block' : 'none',
    position: 'absolute',
    top: 'calc(50% - 12.5px)',
    left: 'calc(50% - 12.5px)',
    width: '25px',
    fontSize: '25px',
    color: '#6b7c93',
    animation: `${loading} 1s linear infinite`,
}))

let HidenComponents = Glamorous.div<{load?: boolean | undefined}>((props) => ({
    opacity: props.load ? 0 : 1
}))

let XCardLoaderDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
})

export function XCardLoader(props: { children?: any, load?: boolean }) {
    return (
        <XCardLoaderDiv>
            <ItemIcon icon="cached" load={props.load} />
            <HidenComponents load={props.load}>
                {props.children}
            </HidenComponents>
        </XCardLoaderDiv>
    )
}