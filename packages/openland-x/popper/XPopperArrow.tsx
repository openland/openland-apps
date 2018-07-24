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
    [PlacementTop]: {
        borderWidth: `5px 5px 0 5px`,
        borderColor: 'rgba(0, 0, 0, .04) transparent transparent transparent',
        bottom: -6,
    },
    [PlacementTop + '> *']: {
        borderStyle: 'solid',
        position: 'absolute',
        borderWidth: `5px 5px 0 5px`,
        borderColor: '#fff transparent transparent transparent ',
        top: -6,
        left: -5,
    },
    [PlacementBottom]: {
        borderWidth: `0 5px 5px 5px`,
        borderColor: 'transparent transparent rgba(0, 0, 0, .06) transparent',
        top: -6,
    },
    [PlacementBottom + '> *']: {
        borderStyle: 'solid',
        position: 'absolute',
        borderWidth: `0 5px 5px 5px`,
        borderColor: 'transparent transparent #fff transparent ',
        bottom: -6,
        left: -5,
    },
    [PlacementRight]: {
        borderWidth: `6px 6px 6px 0`,
        borderColor: 'transparent rgba(0, 0, 0, .04) transparent transparent',
        left: -6,
    },

    [PlacementRight + '> *']: {
        borderStyle: 'solid',
        position: 'absolute',
        borderWidth: `5px 5px 5px 0px`,
        borderColor: 'transparent #fff transparent transparent',
        top: -5,
        right: -6,
    },

    [PlacementLeft]: {
        borderWidth: `5px 0 5px 5px`,
        borderColor: 'transparent transparent transparent rgba(0, 0, 0, .04)',
        right: -6,
    },

    [PlacementLeft + '> *']: {
        borderStyle: 'solid',
        position: 'absolute',
        borderWidth: `5px 0 5px 5px`,
        borderColor: 'transparent transparent transparent #fff',
        top: -5,
        left: -6,
    },

});

export class XPopperArrow extends React.PureComponent<{ captureArrow?: (arrow: any) => void, className?: string }> {
    static PlacementTop = PlacementTop;
    static PlacementBottom = PlacementBottom;
    static PlacementRight = PlacementRight;
    static PlacementLeft = PlacementLeft;

    render() {
        return (
            <ArrowDiv className={classnames('arrow', this.props.className)} innerRef={this.props.captureArrow} >
                <div />
            </ArrowDiv>
        );
    }
}