import * as React from 'react';
import Glamorous from 'glamorous';

interface XSwitcherProps {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center',
    title1?: string,
    title2?: string,
}

const XSwitcherWrapper = Glamorous.div<{ alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' }>((props) => ({
    display: 'flex',
    alignSelf: props.alignSelf,
    paddingTop: 4,
    paddingLeft: 9,
    paddingRight: 9,
    paddingBottom: 2,
    borderRadius: 4,
    boxSizing: 'border-box',
    boxShadow: '0 0 0 1px rgba(50, 50, 93, .1), 0 2px 5px 0 rgba(50, 50, 93, .08), 0 1px 1.5px 0 rgba(0, 0, 0, .07), 0 1px 2px 0 rgba(0, 0, 0, .08), 0 0 0 0 transparent'
}))

const XSwitcherItem = Glamorous.div<{ active?: boolean }>((props) => ({
    fontSize: 14,
    lineHeight: 1.6,
    fontWeight: 500,
    color: props.active ? '#6772e5' : '#6b7c93',
    cursor: 'pointer',
    marginRight: 8,
    '&:last-child': {
        marginRight: 0
    }
}))

export class XSwitcher extends React.Component<XSwitcherProps, { leftSide: boolean, rightSide: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            leftSide: true,
            rightSide: false
        };

        this.switchHendler = this.switchHendler.bind(this)
    }

    switchHendler(side: string) {
        switch (side) {
            case 'left':
                this.setState({
                    leftSide: true,
                    rightSide: false
                })
                break;
            case 'right':
                this.setState({
                    leftSide: false,
                    rightSide: true
                })
                break;
            default: break
        }
    }

    render() {
        let { leftSide, rightSide } = this.state

        return (
            <XSwitcherWrapper alignSelf={this.props.alignSelf}>
                <XSwitcherItem active={leftSide} onClick={() => { this.switchHendler('left') }}>{this.props.title1}</XSwitcherItem>
                <XSwitcherItem active={rightSide} onClick={() => { this.switchHendler('right') }}>{this.props.title2}</XSwitcherItem>
            </XSwitcherWrapper>
        )
    }
}