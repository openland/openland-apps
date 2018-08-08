import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XPopper, Placement } from 'openland-x/XPopper';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
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

type XMenuItemStyle = 'danger' | 'default';

interface XMenuItemProps extends XLinkProps {
    style?: XMenuItemStyle;
    icon?: string | any;
    iconRight?: string | any;
}

let XMenuItemColorStyles = styleResolver({
    'default': {
        color: '#334562',
        '& i': {
            color: '#bcc3cc'
        },
        ':hover': {
            color: '#1790ff',
            backgroundColor: '#f3f9ff',
            '& i': {
                color: 'rgba(23, 144, 255, 0.5)'
            }
        }
    },
    'danger': {
        color: '#d75454',
        '& i': {
            color: '#d75454'
        },
        ':hover': {
            color: '#d75454',
            backgroundColor: '#fdf6f6',
            '& i': {
                color: '#d75454'
            }
        }
    }
});

const XMenuItemStyled = Glamorous(XLink)<{ colorTheme?: XMenuItemStyle }>([
    (props) => ({
        height: 40,
        flexShrink: 0,
        padding: '0 16px',
        display: 'flex',
    }),
    (props) => XMenuItemColorStyles(props.colorTheme)
]);

const XMenuItemIcon = Glamorous(XIcon)({
    fontSize: 24,
    lineHeight: '40px',
    '&.icon-left': {
        marginLeft: -3,
        marginRight: 10
    },
    '&.icon-right': {
        marginRight: -8,
        marginLeft: 10
    }
});

const XMenuItemText = Glamorous.div({
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '24px',
    padding: '7px 0 9px',
    fontWeight: 500,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
});

export class XMenuItem extends React.Component<XMenuItemProps> {
    render() {
        return (
            <XMenuItemStyled
                {...this.props}
                colorTheme={this.props.style}
            >
                {this.props.icon && (
                    typeof(this.props.icon) === 'string'
                    ? <XMenuItemIcon icon={this.props.icon} className="icon icon-left" />
                    : this.props.icon
                )}
                <XMenuItemText>
                    {this.props.children}
                </XMenuItemText>
                {this.props.iconRight && (
                    typeof(this.props.iconRight) === 'string'
                    ? <XMenuItemIcon icon={this.props.iconRight} className="icon icon-right" />
                    : this.props.iconRight
                )}
            </XMenuItemStyled>
        );
    }
}

export const XMenuItemWrapper = Glamorous.div({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    paddingLeft: '16px',
    paddingRight: '16px',
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',

    '& > *': {
        width: '100%'
    }
});

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