import * as React from 'react';
import Glamorous from 'glamorous';
import { Layout } from './_Layout';

let PageRootDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    position: 'relative'
});

let CoverDiv = Glamorous.div({
    position: 'relative',

    margin: '-16px 0 -170px',

    background: '#ffffff center calc(50% - 85px) no-repeat',
    backgroundSize: '100% auto',

    alignSelf: 'stretch',
    height: 553,

    [Layout.XS]: {
        margin: '-16px 0 -50px',
        backgroundPosition: 'center calc(50% - 25px)',
        height: 200
    },

    '&:before': {
        content: '""',
        background: 'url(/static/img/map-marker.svg) no-repeat',
        backgroundSize: '100% 100%',
        margin: '-132px 0 0 -47px',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        bottom: 'auto',
        right: 'auto',
        height: '94px',
        width: '94px',

        [Layout.XS]: {
            margin: '-52px 0 0 -27px',
            height: '54px',
            width: '54px'
        }
    },

    '&:after': {
        content: '""',
        backgroundImage: 'linear-gradient(-180deg, transparent 0%, transparent 47%, rgba(25,39,67,0.32) 100%)',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
});

let CoverImage = Glamorous.img({
    margin: '-170px 0 -170px 0',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '723px',
    width: '100%',

    [Layout.XS]: {
        margin: '-50px 0 -50px 0',
        width: '100%',
        height: '250px'
    }
})

export function XPageCover(props: { src?: string, children?: any }) {
    return (
        <PageRootDiv>
            <CoverDiv>
                {props.src && <CoverImage style={{ backgroundImage: `url(${props.src})` }}/>}
            </CoverDiv>
            {props.children}
        </PageRootDiv>
    )
}