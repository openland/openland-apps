import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor'
import { XIcon } from './XIcon'

const loading = glamor.keyframes({
    '0%': { transform: `rotate(0deg) scaleX(-1)` },
    '100%': { transform: `rotate(360deg) scaleX(-1)` }
})

let ItemIcon = Glamorous(XIcon)<{loading?: boolean}>((props) => ({
    display: props.loading ? 'block' : 'none',
    position: 'absolute',
    top: 'calc(50% - 12.5px)',
    left: 'calc(50% - 12.5px)',
    width: '25px',
    fontSize: '25px',
    color: '#6b7c93',
    animation: `${loading} 1s linear infinite`,
}))

let HidenComponents = Glamorous.div<{loading?: boolean}>((props) => ({
    opacity: props.loading ? 0 : 1,
    '& *': {
        cursor: 'default'
    }
}))

let XCardLoaderDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
})

export function XCardLoader(props: { children?: any, loading?: boolean }) {
    return (
        <XCardLoaderDiv>
            <ItemIcon icon="cached" loading={props.loading} />
            <HidenComponents loading={props.loading}>
                {props.children}
            </HidenComponents>
        </XCardLoaderDiv>
    )
}