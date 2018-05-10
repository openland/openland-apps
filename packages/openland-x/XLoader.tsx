import * as React from 'react';
import Glamorous from 'glamorous';
import { XLoadingCircular } from './XLoadingCircular';

const XCardLoaderDiv = Glamorous.div<{ loading?: boolean }>((props) => ({
    display: props.loading ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexGrow: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 2,
    '& svg path': {
        stroke: '#1f3449 !important'
    }
}));

export const XLoader = (props: { loading?: boolean }) => (
    <XCardLoaderDiv loading={props.loading}>
        <XLoadingCircular />
    </XCardLoaderDiv>
);