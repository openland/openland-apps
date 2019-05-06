import * as React from 'react';
import Glamorous from 'glamorous';
import * as classnames from 'classnames';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XPopperStyleType } from '../XPopper';

interface ContentDivProps {
    width?: number | string;
    height?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;

    colorStyle?: XPopperStyleType;
    className?: string;
}

let colorStyles = styleResolver({
    dark: {
        background: '#6E7588',
        color: '#ffffff',
        borderRadius: 10,
        padding: '6px 12px 8px',
        lineHeight: '16px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, .2)',
    },
    default: {
        borderRadius: 10,
        background: '#ffffff',
        color: '#525f7f',
        padding: 10,
        lineHeight: 'normal',
        boxShadow:
            '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    },
});

export const ContentDiv = Glamorous.div<ContentDivProps>(
    props => ({
        position: 'relative',
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeight ? props.maxHeight : '70vh',
        minWidth: props.minWidth,
        minHeight: props.minHeight,
        width: props.width,
        height: props.height,
        fontSize: 14,
        fontWeight: 400,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
    }),

    props => colorStyles(props.colorStyle),
);

interface XPopperContentProps {
    captureContent?: (arrow: any) => void;
    width?: number | string;
    height?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;

    colorStyle?: XPopperStyleType;
    className?: string;
}

export class XPopperContent extends React.PureComponent<XPopperContentProps> {
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
                colorStyle={this.props.colorStyle}
            >
                {this.props.children}
            </ContentDiv>
        );
    }
}
