import * as React from 'react';
import Glamorous from 'glamorous';
import { XAnimation } from './XAnimation';

const AnimatedLoader = Glamorous<{ color?: string }>(XAnimation(require('./animations/loading_circular.json')))((props) => ({
    display: 'block',
    width: '20px',
    height: '20px',
    lineHeight: '20px',
    '& path': { stroke: props.color || '#ff0000' }
}));

export class XLoadingCircular extends React.PureComponent<{ color?: string, className?: string }> {
    render() {
        return <AnimatedLoader className={this.props.className} color={this.props.color} />;
    }
}