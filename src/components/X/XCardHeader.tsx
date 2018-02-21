import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './XHorizontal'

export const XCardTitle = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '22px',
    lineHeight: '1.6',
    fontWeight: 500,
    color: '#32325d'
})

export const XCardDescription = Glamorous.div<{ellipcise?: boolean}>((props) => ({
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
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    flexDirection: 'column'
})

interface XCardHeaderProps {
    children?: any,
    text?: string | null, 
    description?: string | null, 
    ellipcise?: boolean,
    filter?: string
}

export class HeaderTargetElement extends React.Component<({children: any})> {
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

        if (React.Children.count(this.props.children) > 0) {

            let thisChildArr = React.Children.toArray(this.props.children)
            
            thisChildArr.forEach((i: any) => {
                if (React.isValidElement(i) && (i.props as any)._isTargetElement === true) {
                    target.push(i)
                } else if (React.isValidElement(i) && (i.props as any)._isTargetElement !== true) {
                    content.push(i)
                }
            })
        }

        return (
            <XCardHeaderDiv>
                <XCardTitle>
                    {(target.length === 0)
                        ? (this.props.text)
                        : (
                            <TargetDivStyle>
                                {target.map((item: any) => (
                                    item
                                ))}
                                {this.props.text}
                            </TargetDivStyle>
                        )
                    }
                    {(content.length !== 0)
                        ?  (
                        <XHorizontal separator="normal">
                            {content.map((item: any) => (
                                    item
                            ))}
                        </XHorizontal>
                        )
                        : null
                    }
                </XCardTitle>
                <XCardDescription ellipcise={this.props.ellipcise}>
                    {this.props.description}
                </XCardDescription>
            </XCardHeaderDiv>
        )
    }
}