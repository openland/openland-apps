import Glamorous from 'glamorous';
import { XAnimation } from './XAnimation';

export const XLoadingCircular = Glamorous<{ inverted?: boolean }>(XAnimation(require('./animations/loading_circular.json')))((props) => ({
    display: 'block',
    position: 'absolute',
    width: '20px',
    height: '20px',
    lineHeight: '20px',
    left: 'calc(50% - 10px)',
    top: 'calc(50% - 10px)',
    'svg *': { fill: '#ff0000'}
}));