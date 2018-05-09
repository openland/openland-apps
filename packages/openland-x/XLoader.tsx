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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    animation: `${loading} 1s linear infinite`,
});

const XCardLoaderDiv = Glamorous.div<{ loading?: boolean }>((props) => ({
    display: props.loading ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexGrow: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 2
}));

export const XLoader = (props: { loading?: boolean }) => (
    <XCardLoaderDiv loading={props.loading}>
        <LoadingDiv><ItemIcon icon="cached" /></LoadingDiv>
    </XCardLoaderDiv>
);