import * as React from 'react';
import Glamorous from 'glamorous';
import * as classnames from 'classnames';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XPopperStyleType } from '../XPopper';

const PlacementTop = '&[x-placement^="top"]';
const PlacementBottom = '&[x-placement^="bottom"]';
const PlacementRight = '&[x-placement^="right"]';
const PlacementLeft = '&[x-placement^="left"]';

interface ArrowDivProps {
    colorStyle?: XPopperStyleType;
}

// For correct calculation of the center 

let arrowDOMstyles = {
    'dark': {
        height: 10,
        width: 10,
    },
    'default': {
        height: 12,
        width: 6,
    }
};

let colorStyles = styleResolver({
    'dark': {
        height: 10,
        width: 10,
        background: '#6E7588',
        transform: 'rotate(45deg)',
        borderRadius: 2,

        [PlacementTop]: {
            bottom: -2,
        },
        [PlacementBottom]: {
            top: -2,
        },
        [PlacementRight]: {
            left: -2,
        },
        [PlacementLeft]: {
            right: -2,
        },
    },

    'default': {
        borderStyle: 'solid',

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
    }
});

const ArrowDiv = Glamorous.div<ArrowDivProps>(
    (props) => ({
        position: 'absolute',
    }),

    (props) => colorStyles(props.colorStyle),
);

export class XPopperArrow extends React.PureComponent<{ captureArrow?: (arrow: any) => void, className?: string, colorStyle?: XPopperStyleType, orientation?: string }> {
    static PlacementTop = PlacementTop;
    static PlacementBottom = PlacementBottom;
    static PlacementRight = PlacementRight;
    static PlacementLeft = PlacementLeft;

    render() {
        return (
            <ArrowDiv
                className={classnames('arrow', this.props.className)}
                innerRef={this.props.captureArrow}
                colorStyle={this.props.colorStyle}
                style={(this.props.orientation === 'horizontal') ? arrowDOMstyles[this.props.colorStyle || 'default'] : undefined}
            >
                <div />
            </ArrowDiv>
        );
    }
}