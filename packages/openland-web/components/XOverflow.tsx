import * as React from 'react';
import Glamorous from 'glamorous';
import { Placement } from 'openland-x/XPopper';
import { XPolitePopper } from 'openland-x/XPolitePopper';
import { XMenuVertical } from 'openland-x/XMenuItem';

interface DottedMenuButtonStyleProps {
    active?: boolean;
    horizontal?: boolean;
}

const DottedMenuButtonStyle = Glamorous.div<DottedMenuButtonStyleProps>(
    ({ horizontal, active }) => ({
        width: 20,
        height: 20,
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        cursor: 'pointer',
        borderRadius: 5,
        transition: 'background-color .2s',
        '&:hover': {
            '& > div': {
                backgroundColor: '#1790ff',
            },
        },
        '& > div': {
            backgroundColor: active ? '#1790ff' : 'rgba(0, 0, 0, 0.2)',
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
        zIndex: active ? 2 : undefined,
    }),
);

export class XOverflowDefalutTarget extends React.PureComponent<
    DottedMenuButtonStyleProps & { onClick: () => void }
> {
    render() {
        const { props } = this;
        return (
            <DottedMenuButtonStyle
                onClick={props.onClick}
                active={props.active}
                horizontal={props.horizontal}
            >
                <div />
                <div />
                <div />
            </DottedMenuButtonStyle>
        );
    }
}

interface XOverflowProps {
    placement?: Placement;
    show?: boolean;
    content: any;
    width?: number;
    target?: any;
    horizontal?: boolean;
    onClickTarget?: any;
    useCustomTarget?: boolean;
    showOnHover?: boolean;
    onClickOutside?: () => void;
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
        const { show, onClickTarget } = this.props;

        if (typeof show === 'undefined') {
            this.setState({ show: !this.state.show });
        }

        if (onClickTarget) {
            onClickTarget();
        }
    };

    handleClose = () => {
        const { show, onClickOutside } = this.props;
        if (typeof show === 'undefined') {
            this.setState({ show: false });
        } else if (onClickOutside !== undefined) {
            onClickOutside();
        }
    };

    createRef = (el: any) => {
        this.refComp = el;
    };

    render() {
        const { target, useCustomTarget } = this.props;

        let targetElement: any;

        let show: boolean | undefined =
            typeof this.props.show === 'undefined' ? this.state.show : this.props.show;

        if (this.props.showOnHover) {
            show = undefined;
        }

        if (useCustomTarget) {
            targetElement = target;
        } else if (target !== undefined && !useCustomTarget) {
            targetElement = React.cloneElement(target as any, {
                onClick: this.switch,
                innerRef: this.createRef,
            });
        }

        return (
            <XPolitePopper
                show={show}
                contentContainer={<XMenuVertical />}
                content={this.props.content}
                arrow={null}
                placement={this.props.placement || 'auto'}
                width={this.props.width}
                onClickOutside={this.handleClose}
                showOnHover={this.props.showOnHover}
            >
                {targetElement ? (
                    targetElement
                ) : (
                    <DottedMenuButtonStyle
                        onClick={this.switch}
                        active={show}
                        innerRef={this.createRef}
                        horizontal={this.props.horizontal}
                    >
                        <div />
                        <div />
                        <div />
                    </DottedMenuButtonStyle>
                )}
            </XPolitePopper>
        );
    }
}
