import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper, Placement } from 'openland-x/XPopper';
import { XMenuVertical } from 'openland-x/XMenuItem';
import NotifyIcon from 'openland-icons/notify-icon.svg';

const Shadow = Glamorous.div<{ active: boolean }>(props => ({
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
    small?: boolean;
    active?: boolean;
    horizontal?: boolean;
    flat?: boolean;
}

const DottedMenuButtonStyle = Glamorous.div<DottedMenuButtonStyleProps>(
    ({ small, horizontal, flat, active }) => ({
        width: small ? 10 : 22,
        height: 17,
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        cursor: 'pointer',
        borderRadius: 5,
        backgroundColor: flat ? 'transparent' : active ? '#654bfa' : 'transparent',
        border: flat ? 'none' : 'solid 1px transparent',
        transition: 'background-color .2s',
        '&:hover': {
            border: flat ? 'none' : active ? 'solid 1px transparent' : 'solid 1px #dcdee4',

            '& > div': {
                backgroundColor: flat ? '#1790ff' : undefined,
            },
        },
        '& > div': {
            backgroundColor: flat && active ? '#1790ff' : active ? '#fff' : 'rgba(0, 0, 0, 0.2)',
            width: 4,
            height: 4,
            borderRadius: 100,
            marginBottom: horizontal ? undefined : 2,
            marginRight: horizontal ? 2 : undefined,
            '&:last-child': {
                marginBottom: horizontal ? undefined : 0,
                marginRight: horizontal ? 0 : undefined,
            },
        },
        zIndex: active ? 11 : undefined,
    }),
);

const NotificationButton = Glamorous.div<{ active: boolean }>(props => ({
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 5,
    '& svg': {
        marginTop: 1,
        marginBottom: -1,
        height: 21,
        width: 15,
        '& > g > path:last-child': {
            fill: props.active ? '#1790ff' : 'rgba(0, 0, 0, 0.2)',
        },
    },
    '&:hover': {
        '& svg': {
            '& > g > path:last-child': {
                fill: '#1790ff',
            },
        },
    },
}));

interface XOverflowProps {
    small?: boolean;
    placement?: Placement;
    show?: boolean;
    content: any;
    width?: number;
    target?: any;
    shadow?: boolean;
    horizontal?: boolean;
    flat?: boolean;
    notificationStyle?: boolean;
    onClickTarget?: any;
}

export class XOverflow extends React.PureComponent<XOverflowProps, { show: boolean }> {
    refComp?: Element;

    constructor(props: XOverflowProps) {
        super(props);

        this.state = {
            show: false,
        };
    }

    switch = (e: any) => {
        e.stopPropagation();

        if (typeof this.props.show === 'undefined') {
            this.setState({ show: !this.state.show });
        }

        if (this.props.onClickTarget) {
            this.props.onClickTarget();
        }
    };

    handleClose = () => {
        if (typeof this.props.show === 'undefined') {
            this.setState({ show: false });
        }
    };

    createRef = (el: any) => {
        this.refComp = el;
    };

    render() {
        const { target, shadow, small } = this.props;

        let targetElement: any;

        let show = typeof this.props.show === 'undefined' ? this.state.show : this.props.show;

        if (target !== undefined) {
            targetElement = React.cloneElement(target as any, {
                onClick: this.switch,
                innerRef: this.createRef,
            });
        }

        return (
            <>
                {shadow && <Shadow active={show} />}
                <XPopper
                    show={show}
                    contentContainer={<XMenuVertical />}
                    content={this.props.content}
                    arrow={null}
                    placement={this.props.placement || 'auto'}
                    width={this.props.width}
                    onClickOutside={this.handleClose}
                >
                    {targetElement ? (
                        targetElement
                    ) : this.props.notificationStyle === true ? (
                        <NotificationButton
                            onClick={this.switch}
                            active={show}
                            innerRef={this.createRef}
                        >
                            <NotifyIcon />
                        </NotificationButton>
                    ) : (
                        <DottedMenuButtonStyle
                            onClick={this.switch}
                            active={show}
                            small={small}
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
