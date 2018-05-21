import * as React from 'react';
import Glamorous from 'glamorous';
import * as classnames from 'classnames';

interface ContentDivProps {
    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    bordered?: boolean;
}

export const ContentDiv = Glamorous.div<ContentDivProps>((props) => ({
    position: 'relative',
    maxWidth: props.maxWidth,
    maxHeight: props.maxHeight,
    minWidth: props.minWidth,
    minHeight: props.minHeight,
    width: props.width,
    height: props.height,
    padding: 10,
    background: '#fff',
    borderRadius: 6,
    boxShadow: props.bordered ? '0px 0px 0px 1px rgba(0, 0, 0, 0.08)' : '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    color: '#525f7f',
    fontSize: 14,
    lineHeight: 'normal',
    fontWeight: 400,
    display: 'flex',
    flexDirection: 'column'
}));

export class XPopperContent extends React.PureComponent<{ captureContent?: (arrow: any) => void, width?: number, height?: number, maxWidth?: number, maxHeight?: number, minWidth?: number, minHeight?: number, className?: string, bordered?: boolean }> {

    render() {
        return (
            <ContentDiv
                className={classnames('content', this.props.className)}
                innerRef={this.props.captureContent}
                maxWidth={this.props.maxWidth}
                maxHeight={this.props.maxHeight}
                minWidth={this.props.minWidth}
                minHeight={this.props.minHeight}
                width={this.props.width}
                height={this.props.height}
                bordered={this.props.bordered}>
                {this.props.children}
            </ContentDiv>);
    }
}