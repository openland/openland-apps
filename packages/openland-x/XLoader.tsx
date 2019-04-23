import * as React from 'react';
import Glamorous from 'glamorous';
import { XLoadingCircular, XLoadingRound } from './XLoadingCircular';

interface XLoaderProps {
    loading?: boolean;
    height?: number | string;
}

const XCardLoaderDiv = Glamorous.div<XLoaderProps>(props => ({
    display: props.loading ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexGrow: 1,
    height: props.height ? props.height : '100%',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    zIndex: 2,
    overflow: 'hidden',
}));

export const XLoader = (props: XLoaderProps) => (
    <XCardLoaderDiv loading={props.loading} height={props.height}>
        <XLoadingRound />
    </XCardLoaderDiv>
);
