import * as React from 'react';
import Glamorous from 'glamorous';

interface XMapControlsProps {
    children?: any;
    topLeft?: boolean;
    topRight?: boolean;
    bottomLeft?: boolean;
    BottomRight?: boolean;
}

const XMapControlsDiv = Glamorous.div<XMapControlsProps>((props) => ({
    position: 'absolute',
    top: (props.topLeft || props.topRight) ? 32 : undefined,
    left: (props.topLeft || props.bottomLeft) ? 32 : undefined,
    bottom: (props.bottomLeft || props.BottomRight) ? 64 : undefined,
    right: (props.topRight || props.BottomRight) ? 32 : undefined,
    opacity: .6,
    zIndex: 1,
    '&:hover': {
        opacity: 1
    }
}));

export class XMapControls extends React.Component<XMapControlsProps> {
    render() {
        return (
            <XMapControlsDiv
                topLeft={this.props.topLeft}
                topRight={this.props.topRight}
                bottomLeft={this.props.bottomLeft}
                BottomRight={this.props.BottomRight}
            >
                {this.props.children}
            </XMapControlsDiv>
        );
    }
}