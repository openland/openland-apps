import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import { XIcon } from './XIcon';

const loading = glamor.keyframes({
    '0%': { transform: `rotate(0deg) scaleX(-1)` },
    '100%': { transform: `rotate(360deg) scaleX(-1)` }
});

const ItemIcon = Glamorous(XIcon)({
    display: 'block',
    fontSize: '25px',
    color: '#6b7c93',
    lineHeight: 'normal',
    verticalAlign: 'middle'
});

const LoadingDiv = Glamorous.div({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    top: 'calc(50% - 12.5px)',
    left: 'calc(50% - 12.5px)',
    animation: `${loading} 1s linear infinite`,
});

const HidenComponents = Glamorous.div<{ loading?: boolean }>((props) => ({
    opacity: props.loading ? 0 : 1,
    '& *': {
        cursor: props.loading ? 'default' : undefined
    },
}));

const XCardLoaderDiv = Glamorous.div<{ loading?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flexGrow: props.loading ? 1 : undefined,
    pointerEvents: props.loading ? 'none' : undefined
}));

const ContentCloser = Glamorous.div({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
});

export const XLoader = (props: { children?: any, loading?: boolean }) => (
    <XCardLoaderDiv loading={props.loading}>
        {props.loading && <LoadingDiv><ItemIcon icon="cached" /></LoadingDiv>}
        <HidenComponents loading={props.loading}>
            {props.children}
            {props.loading && <ContentCloser />}
        </HidenComponents>
    </XCardLoaderDiv>
);