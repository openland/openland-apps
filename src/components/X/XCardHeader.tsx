import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal';
import { XBullet } from './XBullet';

export const XCardTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 20,
    lineHeight: 1.6,
    fontWeight: 600,
    color: '#182642'
});

export const XCardDescription = Glamorous.div<{ ellipcise?: boolean }>((props) => ({
    opacity: 0.7,
    color: '#182642',
    fontSize: '14px',
    lineHeight: 'normal',
    fontWeight: 'normal',
    overflow: props.ellipcise ? 'hidden' : undefined,
    whiteSpace: props.ellipcise ? 'nowrap' : undefined,
    textOverflow: props.ellipcise ? 'ellipsis' : undefined,
}));

export const TargetDivStyle = Glamorous(XHorizontal)({
    alignItems: 'center'
});

let XCardHeaderDiv = Glamorous.div({
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'column'
});

interface XCardHeaderProps {
    children?: any;
    text?: string | null;
    description?: string | null;
    truncateDescription?: boolean;
    filter?: string;
    bullet?: string;
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

export class XCardHeader extends React.Component<XCardHeaderProps> {
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
                        {this.props.bullet && <XBullet color="green">{this.props.bullet}</XBullet>}
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