import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XBullet } from 'openland-x/XBullet';
import XStyles from 'openland-x/XStyles';

const XCardTitle = Glamorous.div<{ appStyle?: 'default' | 'compact' }>((props) => ({
    ...(props.appStyle === 'compact' ? XStyles.text.h600 : XStyles.text.h700),
    lineHeight: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}));

const XCardDescription = Glamorous.div<{ ellipcise?: boolean }>((props) => ({
    opacity: 0.7,
    color: '#182642',
    fontSize: 14,
    letterSpacing: -0.2,
    overflow: props.ellipcise ? 'hidden' : undefined,
    whiteSpace: props.ellipcise ? 'nowrap' : undefined,
    textOverflow: props.ellipcise ? 'ellipsis' : undefined,
}));

const TargetDivStyle = Glamorous(XHorizontal)<{ ellipcise?: boolean }>((props) => ({
    alignItems: 'center',
    overflow: props.ellipcise ? 'hidden' : undefined,
    whiteSpace: props.ellipcise ? 'nowrap' : undefined,
    textOverflow: props.ellipcise ? 'ellipsis' : undefined,
}));

let XCardHeaderDiv = Glamorous.div<{ appStyle?: 'default' | 'compact', separated?: boolean }>((props) => ({
    paddingLeft: props.appStyle === 'compact' ? XStyles.paddings.large : XStyles.paddings.xlarge,
    paddingRight: props.appStyle === 'compact' ? XStyles.paddings.large : XStyles.paddings.xlarge,
    paddingTop: XStyles.paddings.large,
    paddingBottom: XStyles.paddings.large,
    display: 'flex',
    flexDirection: 'column',
    borderBottom: props.separated ? '1px solid rgba(229, 233, 242, 0.5)' : undefined,
    flexGrow: 1
}));

interface XCardHeaderProps {
    style?: 'default' | 'compact';
    children?: any;
    text?: string | React.ReactElement<any> | null;
    description?: string | React.ReactElement<any> | null;
    truncateDescription?: boolean;
    truncateTitle?: boolean;
    filter?: string;
    bullet?: string | null;
    bulletColor?: 'red' | 'blue' | 'green' | 'yellow';
    separated?: boolean;
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

const HorizontalOuter = Glamorous(XHorizontal)({
    alignItems: 'center',

});

const HorizontalInner = Glamorous(XHorizontal)({
    padding: 24
});

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

        let headerMain = (
            <XCardHeaderDiv appStyle={this.props.style} separated={this.props.separated}>
                <XCardTitle appStyle={this.props.style}>
                    <TargetDivStyle ellipcise={this.props.truncateTitle}>
                        {target}
                        {this.props.text}
                        {this.props.bullet && <XBullet color={this.props.bulletColor || 'green'}>{this.props.bullet}</XBullet>}
                    </TargetDivStyle>

                </XCardTitle>
                <XCardDescription ellipcise={this.props.truncateDescription}>
                    {this.props.description}
                </XCardDescription>

            </XCardHeaderDiv>
        );

        let res = headerMain;

        if (content.length > 0) {
            res = (
                <HorizontalOuter>
                    {headerMain}
                    {content.length > 0 && (
                        <HorizontalInner separator="normal" >
                            {content}
                        </HorizontalInner>
                    )}
                </HorizontalOuter>
            );
        }

        return res;
    }
}