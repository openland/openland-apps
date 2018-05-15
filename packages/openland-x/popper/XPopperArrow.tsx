import * as React from 'react';
import Glamorous from 'glamorous';
import * as classnames from 'classnames';

const PlacementTop = '&[x-placement^="top"]';
const PlacementBottom = '&[x-placement^="bottom"]';
const PlacementRight = '&[x-placement^="right"]';
const PlacementLeft = '&[x-placement^="left"]';

const ArrowDiv = Glamorous.div({
    borderStyle: 'solid',
    position: 'absolute',
    backgroundColor: '#ff0000',
    [PlacementTop]: {
        borderWidth: '5px 5px 0 5px',
        borderColor: '#fff transparent transparent transparent',
        bottom: 5,
        marginLeft: -5,
    },
    [PlacementBottom]: {
        borderWidth: '0 5px 5px 5px',
        borderColor: 'transparent transparent #fff transparent',
        top: 5,
        marginLeft: -5,
    },
    [PlacementRight]: {
        borderWidth: '5px 5px 5px 0',
        borderColor: 'transparent #fff transparent transparent',
        left: 5,
        marginTop: -5,
    },
    [PlacementLeft]: {
        borderWidth: '5px 0 5px 5px',
        borderColor: 'transparent transparent transparent #fff',
        right: 5,
        marginTop: -5,
    },
});

export class XPopperArrow extends React.PureComponent<{ arrowRef: (arrow: any) => void, className?: string }> {
    static PlacementTop = PlacementTop;
    static PlacementBottom = PlacementBottom;
    static PlacementRight = PlacementRight;
    static PlacementLeft = PlacementLeft;

    render() {
        return (<ArrowDiv className={classnames('arrow', this.props.className)} innerRef={this.props.arrowRef} />);
    }
}