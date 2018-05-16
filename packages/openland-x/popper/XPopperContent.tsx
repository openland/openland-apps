import * as React from 'react';
import Glamorous from 'glamorous';

const ContentDiv = Glamorous.div<{ maxWidth?: number }>((props) => ({
    position: 'relative',
    maxWidth: props.maxWidth,
    padding: 10,
    background: '#fff',
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    color: '#525f7f',
    fontSize: 14,
    lineHeight: 'normal',
    fontWeight: 400,
    display: 'flex',
    flexDirection: 'column'
}));

export class XPopperContent extends React.PureComponent<{ captureRef?: (arrow: any) => void, maxWidth?: number, style?: React.CSSProperties}> {

    render() {
        return (
            <ContentDiv innerRef={this.props.captureRef} maxWidth={this.props.maxWidth} style={this.props.style}>
                {this.props.children}
            </ContentDiv>);
    }
}