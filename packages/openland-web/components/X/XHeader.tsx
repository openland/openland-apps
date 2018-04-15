import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal';
import { XBullet } from './XBullet';
import XStyles from './XStyles';

const XCardTitle = Glamorous.div({
    ...XStyles.text.h700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

const XCardDescription = Glamorous.div<{ ellipcise?: boolean }>((props) => ({
    opacity: 0.7,
    color: '#182642',
    fontSize: '14px',
    lineHeight: 'normal',
    fontWeight: 'normal',
    overflow: props.ellipcise ? 'hidden' : undefined,
    whiteSpace: props.ellipcise ? 'nowrap' : undefined,
    textOverflow: props.ellipcise ? 'ellipsis' : undefined,
}));

const TargetDivStyle = Glamorous(XHorizontal)({
    alignItems: 'center'
});

let XCardHeaderDiv = Glamorous.div({
    paddingLeft: XStyles.paddings.content.horizontal,
    paddingRight: XStyles.paddings.content.horizontal,
    paddingTop: XStyles.paddings.content.vertical,
    paddingBottom: XStyles.paddings.content.vertical,
    display: 'flex',
    flexDirection: 'column'
});

interface XCardHeaderProps {
    children?: any;
    text?: string | null;
    description?: string | null;
    truncateDescription?: boolean;
    filter?: string;
    bullet?: string | null;
    bulletColor?: 'red' | 'blue' | 'green' | 'yellow';
}

export class HeaderTargetElement extends React.Component<({ children: any })> {
    static defaultProps = {
        _isTargetElement: true
    };
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export class XHeader extends React.Component<XCardHeaderProps> {
    static defaultProps = {
        _isVerticalPaddingIncluded: true
    };

    static Target = HeaderTargetElement;

    render() {
        let target: any[] = [];
        let content: any[] = [];
        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (i.props as any)._isTargetElement === true) {
                target.push(i);
            } else {
                content.push(i);
            }
        }

        return (
            <XCardHeaderDiv>
                <XCardTitle>
                    <TargetDivStyle>
                        {target}
                        {this.props.text}
                        {this.props.bullet && <XBullet color={this.props.bulletColor || 'green'}>{this.props.bullet}</XBullet>}
                    </TargetDivStyle>
                    <XHorizontal separator="normal">
                        {content}
                    </XHorizontal>
                </XCardTitle>
                <XCardDescription ellipcise={this.props.truncateDescription}>
                    {this.props.description}
                </XCardDescription>
            </XCardHeaderDiv>
        );
    }
}