import * as React from 'react';
import Glamorous from 'glamorous';

const PlacementTop = '&[x-placement^="top"]';
const PlacementBottom = '&[x-placement^="bottom"]';
const PlacementRight = '&[x-placement^="right"]';
const PlacementLeft = '&[x-placement^="left"]';

const ArrowDiv = Glamorous.div<{ size: number }>((props) => ({
    borderStyle: 'solid',
    position: 'absolute',
    [PlacementTop]: {
        borderWidth: `${props.size}px ${props.size}px 0 ${props.size}px`,
        borderColor: '#fff transparent transparent transparent',
        bottom: -props.size,
    },
    [PlacementBottom]: {
        borderWidth: `0 ${props.size}px ${props.size}px ${props.size}px`,
        borderColor: 'transparent transparent #fff transparent',
        top: -props.size,
    },
    [PlacementRight]: {
        borderWidth: `${props.size}px ${props.size}px ${props.size}px 0`,
        borderColor: 'transparent #fff transparent transparent',
        left: -props.size,
    },
    [PlacementLeft]: {
        borderWidth: `${props.size}px 0 ${props.size}px ${props.size}px`,
        borderColor: 'transparent transparent transparent #fff',
        right: -props.size,
    },
}));

export class XPopperArrow extends React.PureComponent<{ size?: number, captureRef?: (arrow: any) => void }> implements XPopperArrow {
    render() {
        let size = this.props.size === undefined ? 5 : this.props.size;
        return (<ArrowDiv innerRef={this.props.captureRef} size={size}/>);
    }
}