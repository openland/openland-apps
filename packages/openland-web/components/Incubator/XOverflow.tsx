import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper, Placement } from 'openland-x/XPopper';
import { XLink } from 'openland-x/XLink';
import { XPopperContent } from 'openland-x/popper/XPopperContent';

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

const DottedMenuButtonStyle = Glamorous.div<{ active?: boolean, horizontal?: boolean }>((props) => ({
    width: 32,
    height: 32,
    display: 'flex',
    flexDirection: props.horizontal ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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
        width: 4,
        height: 4,
        borderRadius: 100,
        marginBottom: props.horizontal ? undefined : 2,
        marginRight: props.horizontal ? 2 : undefined,
        '&:last-child': {
            marginBottom: props.horizontal ? undefined : 0,
            marginRight: props.horizontal ? 0 : undefined,
        }
    },
    zIndex: props.active ? 11 : undefined
}));

export const XMenuVertical = Glamorous(XPopperContent)({
    padding: 0,
    paddingTop: 8,
    paddingBottom: 8,
});

export const XMenuItem = Glamorous(XLink)<{ style?: 'danger' | 'default' }>((props) => ({
    height: 40,
    flexShrink: 0,
    paddingLeft: '18px',
    paddingRight: '18px',
    fontSize: '15px',
    lineHeight: '40px',
    color: props.style === 'danger' ? '#d75454' : '#334562',
    fontWeight: 500,
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    ':hover': {
        color: props.style === 'danger' ? '#ec6262' : '#6b50ff',
        backgroundColor: props.style === 'danger' ? '#fbeded' : '#f8f8fb'
    }
}));

interface XOverflowProps {
    placement?: Placement;
    show?: boolean;
    content: any;
    width?: number;
    target?: any;
    shadow?: boolean;
    horizontal?: boolean;
}

export class XOverflow extends React.PureComponent<XOverflowProps, { show: boolean }> {

    static Item = XMenuItem;

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

    render() {

        const { target, shadow } = this.props;

        let targetElement: any;

        if (target !== undefined) {
            targetElement = React.cloneElement(target as any, { onClick: this.switch, innerRef: this.createRef });
        }

        return (
            <>
                {shadow && <Shadow active={this.state.show} />}
                <XPopper
                    show={this.state.show}
                    contentContainer={<XMenuVertical />}
                    content={this.props.content}
                    arrow={null}
                    placement={this.props.placement || 'auto'}
                    width={this.props.width}
                    onClickOutside={this.handleClose}
                >
                    {targetElement ? targetElement : (
                        <DottedMenuButtonStyle
                            onClick={this.switch}
                            active={this.state.show}
                            innerRef={this.createRef}
                            horizontal={this.props.horizontal}
                        >
                            <div/>
                            <div/>
                            <div/>
                        </DottedMenuButtonStyle>
                    )}
                </XPopper>
            </>
        );
    }
}