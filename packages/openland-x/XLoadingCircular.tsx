import * as React from 'react';
import { css } from 'linaria';
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
        transform: 'scale(0)',
    },
    '40%': {
        transform: 'scale(1.0)',
    },
});

const CSSLoader = Glamorous.div<{ color?: string }>(props => ({
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
        backgroundColor: props.color || '#ff000',
    },
    '> .bounce1': {
        animationDelay: '-0.32s',
    },
    '> .bounce2': {
        animationDelay: '-0.16s',
    },
}));

export class XLoadingCircular extends React.PureComponent<{ color?: string; className?: string }> {
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

const RoundLoaderClassName = css`
    .loader {
        position: relative;
        margin: 0 auto;
        width: 100%;
        &:before {
            content: '';
            display: block;
            padding-top: 100%;
        }
    }
`;

const RoundLoaderCircularClassName = css`
    animation: rotate 2s linear infinite;
    height: 34px;
    transform-origin: center center;
    width: 34px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    
    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
`;

const RoundLoaderPathClassName = css`
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
    stroke: #1790ff;
    stroke-linecap: round;
    
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
`;

export const XLoadingRound = () => (
    <div className={RoundLoaderClassName}>
        <svg className={RoundLoaderCircularClassName} viewBox="25 25 50 50">
            <circle
                className={RoundLoaderPathClassName}
                cx="50"
                cy="50"
                r="20"
                fill="none"
                strokeWidth="2"
                strokeMiterlimit="10"
            />
        </svg>
    </div>
);
