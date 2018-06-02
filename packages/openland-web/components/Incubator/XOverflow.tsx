import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper, Placement } from 'openland-x/XPopper';

const Shadow = Glamorous.div<{ active: boolean }>((props) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    visibility: props.active ? 'visible' : 'hidden',
    opacity: props.active ? 1 : 0,
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    zIndex: 11,
}));

const DottedStyle = Glamorous.div({
    width: 4,
    height: 4,
    borderRadius: 100,
    marginBottom: 2,
    '&:last-child': {
        marginBottom: 0,
    }
});

const DottedMenuButtonStyle = Glamorous.div<{ active?: boolean }>((props) => ({
    width: 32,
    height: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: props.active ? '#654bfa' : 'transparent',
    border: 'solid 1px transparent',
    transition: 'background-color .2s',
    '&:hover': {
        border: props.active ? 'solid 1px transparent' : 'solid 1px #dcdee4'
    },
    '& > div': {
        backgroundColor: props.active ? '#fff' : '#abbacb',
    },
    zIndex: props.active ? 11 : undefined
}));

interface XOverflowProps {
    placement?: Placement;
    show?: boolean;
    content: any;
    width?: number;
}

export class XOverflow extends React.PureComponent<XOverflowProps, { show: boolean }> {

    refComp?: Element;

    constructor(props: XOverflowProps) {
        super(props);

        this.state = {
            show: false
        };
    }

    switch = () => {
        this.setState({ show: !this.state.show });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    createRef = (el: any) => {
        this.refComp = el;
    }

    modifyProps = (component: any) => {
        if (component.props.onClick === undefined) {
            return (
                <div onClick={this.switch} key="xoverflow_component" ref={this.createRef}>
                    {component}
                </div>
            );
        }

        return component;
    }

    render() {

        let target: any = [];

        for (let c of React.Children.toArray(this.props.children)) {
            target.push(React.cloneElement(this.modifyProps(c)));
        }

        return (
            <>
                <Shadow active={this.state.show} />
                <XPopper
                    show={this.state.show}
                    content={this.props.content}
                    padding={10}
                    arrow={null}
                    placement={this.props.placement || 'auto'}
                    width={this.props.width || 170}
                    onClickOutside={this.handleClose}
                >
                    {target.length > 0 ? target : (
                        <DottedMenuButtonStyle onClick={this.switch} active={this.state.show} innerRef={this.createRef}>
                            <DottedStyle />
                            <DottedStyle />
                            <DottedStyle />
                        </DottedMenuButtonStyle>
                    )}
                </XPopper>
            </>
        );
    }
}