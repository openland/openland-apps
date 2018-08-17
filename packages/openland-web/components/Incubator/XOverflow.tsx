import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper, Placement } from 'openland-x/XPopper';
import { XMenuVertical } from 'openland-x/XMenuItem';

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

interface DottedMenuButtonStyleProps {
    active?: boolean;
    horizontal?: boolean;
    flat?: boolean;
}

const DottedMenuButtonStyle = Glamorous.div<DottedMenuButtonStyleProps>((props) => ({
    width: 32,
    height: 32,
    display: 'flex',
    flexDirection: props.horizontal ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    borderRadius: 5,
    backgroundColor: props.flat
        ? 'transparent'
        : props.active
            ? '#654bfa'
            : 'transparent',
    border: 'solid 1px transparent',
    transition: 'background-color .2s',
    '&:hover': {
        border: props.flat
            ? 'solid 1px #dcdee4'
            : props.active
                ? 'solid 1px transparent'
                : 'solid 1px #dcdee4'
    },
    '& > div': {
        backgroundColor: (props.flat && props.active) ? '#1790ff' : props.active ? '#fff' : '#abbacb',
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

interface XOverflowProps {
    placement?: Placement;
    show?: boolean;
    content: any;
    width?: number;
    target?: any;
    shadow?: boolean;
    horizontal?: boolean;
    flat?: boolean;
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
                            flat={this.props.flat}
                        >
                            <div />
                            <div />
                            <div />
                        </DottedMenuButtonStyle>
                    )}
                </XPopper>
            </>
        );
    }
}