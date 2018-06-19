import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
// import { XAnimation } from './XAnimation';

// const AnimatedLoader = Glamorous<{ color?: string }>(XAnimation(require('./animations/loading_circular.json')))((props) => ({
//     display: 'block',
//     width: '20px',
//     height: '20px',
//     lineHeight: '20px',
//     '& path': { stroke: props.color || '#ff0000' }
// }));

const loaderAnimation = glamor.keyframes({
    '0%, 80%, 100%': {
        transform: 'scale(0)'
    }, '40%': {
        transform: 'scale(1.0)'
    }
});

const CSSLoader = Glamorous.div<{ color?: string }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '20px',
    height: '20px',
    alignItems: 'center',
    justifyContent: 'space-between',
    '> div': {
        display: 'flex',
        width: 'calc(100% / 3.8)',
        height: 'calc(100% / 3.8)',
        borderRadius: '100%',
        animation: `${loaderAnimation} 1.4s infinite ease-in-out both`,
        backgroundColor: props.color || '#ff000'
    },
    '> .bounce1': {
        animationDelay: '-0.32s'
    },
    '> .bounce2': {
        animationDelay: '-0.16s'
    }
}));

export class XLoadingCircular extends React.PureComponent<{ color?: string, className?: string }> {
    render() {
        return (
            <CSSLoader className={this.props.className} color={this.props.color}>
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
            </CSSLoader>
        );
    }
}