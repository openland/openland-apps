import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal'
import { XBullet } from './XBullet';

export const XCardTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '22px',
    lineHeight: '1.6',
    fontWeight: 500,
    color: '#32325d'
})

export const XCardDescription = Glamorous.div<{ ellipcise?: boolean }>((props) => ({
    color: '#525f7f',
    fontSize: '14px',
    lineHeight: '1.6',
    fontWeight: 400,
    overflow: props.ellipcise ? 'hidden' : undefined,
    whiteSpace: props.ellipcise ? 'nowrap' : undefined,
    textOverflow: props.ellipcise ? 'ellipsis' : undefined,
}))

export const TargetDivStyle = Glamorous(XHorizontal)({
    alignItems: 'center'
})

let XCardHeaderDiv = Glamorous.div({
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    display: 'flex',
    flexDirection: 'column'
})

interface XCardHeaderProps {
    children?: any,
    text?: string | null,
    description?: string | null,
    truncateDescription?: boolean,
    filter?: string,
    bullet?: string
}

export class HeaderTargetElement extends React.Component<({ children: any })> {
    static defaultProps = {
        _isTargetElement: true
    }
    render() {
        return (
            <>
                {this.props.children}
            </>
        )
    }
}

export class XCardHeader extends React.Component<XCardHeaderProps> {
    static Target = HeaderTargetElement

    render() {
        let target: any[] = []
        let content: any[] = []
        for (let i of React.Children.toArray(this.props.children)) {
            if (React.isValidElement(i) && (i.props as any)._isTargetElement === true) {
                target.push(i)
            } else {
                content.push(i)
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
        )
    }
}