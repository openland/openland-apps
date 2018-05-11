import * as React from 'react';
import Glamorous from 'glamorous';
import { XLoadingCircular } from './XLoadingCircular';

interface XLoaderProps {
    loading?: boolean; 
    height?: number | string;
}

const XCardLoaderDiv = Glamorous.div<XLoaderProps>((props) => ({
    display: props.loading ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexGrow: 1,
    height: props.height ? props.height : '100%',
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 2,
    '> .loading': {
        width: 30,
        height: 30,
        lineHeight: 'normal',
        top: 'calc(50% - 15px)',
        left: 'calc(50% - 15px)'
    },
    '& svg path': {
        stroke: '#334562 !important'
    }
}));

export const XLoader = (props: XLoaderProps) => (
    <XCardLoaderDiv loading={props.loading} height={props.height}>
        <XLoadingCircular className="loading"/>
    </XCardLoaderDiv>
);