import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XLoadingCircular } from './XLoadingCircular';
import { XFlexStyles, applyFlex } from './basics/Flex';
import { XIcon } from './XIcon';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { makeActionable, ActionableParentProps } from './Actionable';
import { XRoleContext } from 'openland-x-permissions/XRoleContext';

export type XButtonSize = 'large' | 'default' | 'small' | 'tiny';
export type XButtonStyle = 'default' | 'primary' | 'success' | 'danger' | 'ghost' | 'electric' | 'flat' | 'light' | 'link' | 'link-danger';
export type XButtonTooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface XButtonStyleProps extends XFlexStyles {
    className?: string;
    text?: string;
    icon?: string | any;
    iconRight?: string | any;
    iconResponsive?: string | any;
    iconOpacity?: number;
    size?: XButtonSize;
    style?: XButtonStyle;
    attach?: 'left' | 'right' | 'both';
    breakpoint?: number;
    tooltipPlacement?: XButtonTooltipPlacement;
    insaneMode?: boolean;
}

export type XButtonProps = ActionableParentProps<NavigableParentProps<XButtonStyleProps & { pressed?: boolean; }>>;

let iconsIndentation = styleResolver({
    'large': {
        marginLeft: -4,
        marginRight: 4
    },
    'default': {
        marginLeft: -2,
        marginRight: 4
    },
    'small': {
        marginLeft: -2,
        marginRight: 4
    },
    'tiny': {
        marginLeft: -2,
        marginRight: 4
    }
});

let iconsIndentationRight = styleResolver({
    'large': {
        marginRight: -4,
        marginLeft: 8
    },
    'default': {
        marginRight: -2,
        marginLeft: 8
    },
    'small': {
        marginRight: -2,
        marginLeft: 8
    },
    'tiny': {
        marginRight: -2,
        marginLeft: 8
    }
});

let borderRadiusStyles = styleResolverWithProps((props: { attach?: 'left' | 'right' | 'both' }) => ({
    'large': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 20,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 20,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 20,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 20,
    },
    'default': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 16,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 16,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 16,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 16,
    },
    'small': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 14,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 14,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 14,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 14,
    },
    'tiny': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 9,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 9,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 9,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 9,
    }
}));

let sizeStyles = styleResolver({
    'large': {
        height: 40,
        lineHeight: '38px',
        fontSize: 15,
        letterSpacing: 0,
        fontWeight: 600,
        '& .button-content': {
            paddingLeft: 20,
            paddingRight: 20
        },
        '& .icon.material': {
            fontSize: 24
        },
        '& .loading-icon': {
            width: 40,
            height: 40,
            lineHeight: 'normal',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)'
        }
    },
    'default': {
        height: 32,
        lineHeight: '30px',
        fontSize: 13,
        letterSpacing: 0,
        fontWeight: 600,
        '& .button-content': {
            paddingLeft: 16,
            paddingRight: 16
        },
        '& .icon.material': {
            fontSize: 20
        },
        '& .loading-icon': {
            width: 32,
            height: 32,
            lineHeight: 'normal',
            top: 'calc(50% - 16px)',
            left: 'calc(50% - 16px)'
        }
    },
    'small': {
        height: 28,
        lineHeight: '26px',
        fontSize: 13,
        letterSpacing: 0,
        fontWeight: 600,
        '& .button-content': {
            paddingLeft: 12,
            paddingRight: 12
        },
        '& .icon.material': {
            fontSize: 16
        },
        '& .loading-icon': {
            width: 28,
            height: 28,
            lineHeight: 'normal',
            top: 'calc(50% - 14px)',
            left: 'calc(50% - 14px)'
        }
    },
    'tiny': {
        height: 18,
        lineHeight: '16px',
        fontSize: 11,
        letterSpacing: 0,
        fontWeight: 600,
        '& .button-content': {
            paddingLeft: 9,
            paddingRight: 9
        },
        '& .icon.material': {
            fontSize: 12
        },
        '& .loading-icon': {
            width: 18,
            height: 18,
            lineHeight: 'normal',
            top: 'calc(50% - 9px)',
            left: 'calc(50% - 9px)'
        }
    }
});

let colorStyles = styleResolver({
    'default': {
        backgroundColor: '#f6f6f6',
        color: 'rgba(0, 0, 0, 0.7)',
        border: 'solid 1px transparent',
        '&:hover': {
            backgroundColor: '#e6e9ec',
            color: 'rgba(0, 0, 0, 0.7)'
        },
        '&:active': {
            backgroundColor: '#1790ff',
            color: '#ffffff'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'primary': {
        backgroundColor: '#1790ff',
        color: '#ffffff',
        border: 'solid 1px transparent',
        '&:hover': {
            backgroundColor: '#1585ed',
            color: '#ffffff'
        },
        '&:active': {
            backgroundColor: '#147ee0',
            color: '#ffffff'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'success': {
        backgroundColor: '#69d06d',
        color: '#ffffff',
        border: 'solid 1px transparent',
        cursor: 'default',
        '&:hover': {
            backgroundColor: '#69d06d',
            color: '#ffffff'
        },
        '&:active': {
            backgroundColor: '#69d06d',
            color: '#ffffff'
        }
    },
    'danger': {
        backgroundColor: '#d75454',
        color: '#ffffff',
        border: 'solid 1px transparent',
        '&:hover': {
            backgroundColor: '#ec6262',
            color: '#ffffff'
        },
        '&:active': {
            backgroundColor: '#c54f4f',
            color: '#ffffff'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'ghost': {
        backgroundColor: '#ffffff',
        color: 'rgba(0, 0, 0, 0.7)',
        border: 'solid 1px rgba(0, 0, 0, 0.07)',
        '&:hover': {
            backgroundColor: 'rgba(23, 144, 255, 0.08)',
            color: 'rgba(23, 144, 255, 0.9)',
            borderColor: 'transparent'
        },
        '&:active': {
            backgroundColor: '#1790ff',
            color: '#ffffff',
            borderColor: 'transparent'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'electric': {
        backgroundColor: '#ffffff',
        color: 'rgba(23, 144, 255, 0.9)',
        border: 'solid 1px #1790ff',
        '&:hover': {
            backgroundColor: 'rgba(23, 144, 255, 0.08)',
            color: 'rgba(23, 144, 255, 0.9)'
        },
        '&:active': {
            backgroundColor: '#1790ff',
            color: '#ffffff',
            borderColor: 'transparent'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'flat': {
        backgroundColor: 'transparent',
        color: 'rgba(0, 0, 0, 0.7)',
        border: 'solid 1px transparent',
        '&:hover': {
            color: 'rgba(0, 0, 0, 0.7)',
            border: 'solid 1px rgba(0, 0, 0, 0.07)'
        },
        '&:active': {
            backgroundColor: 'rgba(23, 144, 255, 0.08)',
            color: 'rgba(23, 144, 255, 0.9)',
            borderColor: 'transparent'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'light': {
        backgroundColor: 'rgba(23, 144, 255, 0.08)',
        color: 'rgba(23, 144, 255, 0.9)',
        border: 'solid 1px transparent',
        '&:hover': {
            backgroundColor: 'rgba(23, 144, 255, 0.12)',
            color: 'rgba(23, 144, 255, 0.9)'
        },
        '&:active': {
            backgroundColor: 'rgba(23, 144, 255, 0.16)',
            color: 'rgba(23, 144, 255, 0.9)'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'link': {
        color: 'rgba(23, 144, 255, 0.9)',
        border: 'solid 1px transparent',
        '&:hover': {
            color: 'rgba(23, 144, 255, 0.9)',
            textDecoration: 'underline'
        },
        '&:active': {
            color: 'rgba(23, 144, 255, 0.9)',
            textDecoration: 'underline'
        },
        '&:focus': {
            color: 'rgba(23, 144, 255, 0.9)',
            textDecoration: 'underline'
        }
    },
    'link-danger': {
        color: '#d75454',
        border: 'solid 1px transparent',
        '&:hover': {
            color: '#d75454',
            textDecoration: 'underline'
        },
        '&:active': {
            color: '#d75454',
            textDecoration: 'underline'
        },
        '&:focus': {
            color: '#d75454',
            textDecoration: 'underline'
        }
    },
});

let colorDisabledStyles = styleResolver({
    'default': {
        backgroundColor: '#f6f6f6 !important',
        color: 'rgba(0, 0, 0, 0.4) !important',
        border: 'solid 1px transparent !important',
    },
    'primary': {
        backgroundColor: '#45a6ff !important',
        color: 'rgba(255, 255, 255, 0.5) !important',
        border: 'solid 1px transparent !important',
    },
    'success': {
    },
    'danger': {
        backgroundColor: '#e28787 !important',
        color: 'rgba(255, 255, 255, 0.7) !important',
        border: 'solid 1px transparent !important',
    },
    'ghost': {
        backgroundColor: '#ffffff !important',
        color: 'rgba(0, 0, 0, 0.4) !important',
        border: 'solid 1px rgba(0, 0, 0, 0.07) !important',
    },
    'electric': {
        backgroundColor: '#ffffff !important',
        color: 'rgba(23, 144, 255, 0.4) !important',
        border: 'solid 1px rgba(23, 144, 255, 0.5) !important',
    },
    'flat': {
        backgroundColor: '#ffffff !important',
        color: 'rgba(0, 0, 0, 0.4) !important',
        border: 'solid 1px transparent !important',
    },
    'light': {
        backgroundColor: 'rgba(23, 144, 255, 0.08) !important',
        color: 'rgba(23, 144, 255, 0.4) !important',
        border: 'solid 1px transparent !important',
    },
    'link': {
    },
    'link-danger': {
    }
});

let colorPressedStyles = styleResolver({
    'default': {
        backgroundColor: '#1790ff !important',
        border: 'solid 1px transparent !important',
        color: '#ffffff !important'
    },
    'primary': {
        backgroundColor: '#147ee0 !important',
        border: 'solid 1px transparent !important',
        color: '#ffffff !important'
    },
    'success': {
    },
    'danger': {
        backgroundColor: '#c54f4f !important',
        border: 'solid 1px transparent !important',
        color: '#ffffff !important'
    },
    'ghost': {
        backgroundColor: '#1790ff !important',
        border: 'solid 1px transparent !important',
        color: '#ffffff !important'
    },
    'electric': {
        backgroundColor: '#1790ff !important',
        border: 'solid 1px transparent !important',
        color: '#ffffff !important'
    },
    'flat': {
        backgroundColor: 'rgba(23, 144, 255, 0.08) !important',
        border: 'solid 1px transparent !important',
        color: 'rgba(23, 144, 255, 0.9) !important'
    },
    'light': {
        backgroundColor: 'rgba(23, 144, 255, 0.16) !important',
        border: 'solid 1px transparent !important',
        color: 'rgba(23, 144, 255, 0.9) !important'
    },
    'link': {
    },
    'link-danger': {
    }
});

let colorResponsiveStyles = styleResolver({
    'default': {
    },
    'primary': {
    },
    'success': {
    },
    'danger': {
    },
    'ghost': {
    },
    'electric': {
    },
    'flat': {
    },
    'light': {
    },
    'link': {
    },
    'link-danger': {
    }
});

let loaderStyles = styleResolver({
    'default': {
        color: '#334562'
    },
    'primary': {
        color: '#ffffff'
    },
    'success': {
        color: '#ffffff'
    },
    'danger': {
        color: '#ffffff'
    },
    'ghost': {
        color: '#334562'
    },
    'electric': {
        color: '#1790ff'
    },
    'flat': {
        color: '#334562'
    },
    'light': {
        color: '#1790ff'
    },
    'link': {
    },
    'link-danger': {
    }
});

const StyledIcon = Glamorous<XButtonProps & { opacity?: number }>(XIcon)([
    (props) => iconsIndentation(props.size, !!props.text),
    (props) => ({ opacity: props.opacity || .5 }),
]);

const StyledIconRight = Glamorous<XButtonProps & { opacity?: number }>(XIcon)([
    (props) => iconsIndentationRight(props.size, !!props.text),
    (props) => ({ opacity: props.opacity || .5 }),
]);

const StyledButtonContentWrapper = Glamorous.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    flexDirection: 'row',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    wordBreak: 'keep-all',
    position: 'relative',
    outline: 'none',
});

const MainContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center'
});

const defaultResponsiveBreakpoint = 1200;

interface StyledButtonTextProps {
    responsive?: boolean;
    breakpoint?: number;
    tooltipPlacement?: XButtonTooltipPlacement;
}

let tooltipPlacementStyles = styleResolverWithProps((props: StyledButtonTextProps) => ({
    'top': {
        ['@media (max-width: ' + props.breakpoint + 'px)']: {
            bottom: 'calc(100% + 5px)',
            left: '50%',
            transform: 'translate(-50%, 0)',

            '&:before': {
                bottom: -2,
                left: '50%',
                transform: 'translate(-50%, 0) rotate(45deg)',
            }
        }
    },
    'right': {
        ['@media (max-width: ' + props.breakpoint + 'px)']: {
            left: 'calc(100% - 5px)',
            top: '50%',
            transform: 'translate(0, -50%)',

            '&:before': {
                left: -2,
                top: '50%',
                transform: 'translate(0, -50%) rotate(45deg)',
            }
        }
    },
    'bottom': {
        ['@media (max-width: ' + props.breakpoint + 'px)']: {
            top: 'calc(100% + 5px)',
            left: '50%',
            transform: 'translate(-50%, 0)',

            '&:before': {
                top: -2,
                left: '50%',
                transform: 'translate(-50%, 0) rotate(45deg)',
            }
        }
    },
    'left': {
        ['@media (max-width: ' + props.breakpoint + 'px)']: {
            right: 'calc(100% - 5px)',
            top: '50%',
            transform: 'translate(0, -50%)',

            '&:before': {
                right: -2,
                top: '50%',
                transform: 'translate(0, -50%) rotate(45deg)',
            }
        }
    },
}));

const ButtonText = Glamorous.span<StyledButtonTextProps>([
    {
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    (props) => (props.responsive && {
        ['@media (max-width: ' + props.breakpoint + 'px)']: {
            maxWidth: 'initial',
            position: 'absolute',
            whiteSpace: 'nowrap',
            textOverflow: 'initial',
            overflow: 'initial',
            background: '#6E7588',
            color: '#ffffff',
            borderRadius: 15,
            padding: '6px 12px 8px',
            lineHeight: '16px',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, .2)',
            fontSize: 14,
            fontWeight: 400,
            opacity: 0,
            visibility: 'hidden',
            transition: '300ms opacity ease',
            textAlign: 'center',

            '&:before': {
                display: 'block',
                position: 'absolute',
                height: 10,
                width: 10,
                background: '#6E7588',
                borderRadius: 2,
                content: ' ',
            }
        }
    } || {}),
    (props) => (props.responsive && tooltipPlacementStyles(props, props.tooltipPlacement || 'bottom') || {})
]);

interface StyledButtonProps extends XFlexStyles {
    buttonSize?: string;
    buttonStyle?: string;
    loading?: boolean;
    enabled?: boolean;
    pressed?: boolean;
    attach?: 'left' | 'right' | 'both';
    responsive?: boolean;
    breakpoint?: number;
    tooltipPlacement?: XButtonTooltipPlacement;
    insaneMode?: boolean;
}

const StyledButton = Glamorous.a<StyledButtonProps>([
    {
        display: 'flex', boxSizing: 'border-box',
        '& .loading-icon': {
            position: 'absolute',
        },
        '& .icon-responsive': { display: 'none' }
    },
    (props) => ({
        pointerEvents: (props.loading || props.enabled === false) ? 'none' : 'auto',
        cursor: (props.loading || props.enabled === false) ? 'inherit' : 'pointer',
        transition: 'box-shadow .08s ease-in,color .08s ease-in, border .0s, all .15s ease'
    }),
    (props) => (props.loading && {
        '& .main-content': { opacity: 0 }
    } || {}),
    (props) => applyFlex(props),
    (props) => colorStyles(props.buttonStyle, props.enabled !== false && !props.pressed),
    (props) => colorDisabledStyles(props.buttonStyle, props.enabled === false),
    (props) => colorPressedStyles(props.buttonStyle, !!props.pressed),
    (props) => sizeStyles(props.buttonSize),
    (props) => borderRadiusStyles({ attach: props.attach }, props.buttonSize),
    (props) => (props.responsive && {
        ['@media (max-width: ' + props.breakpoint + 'px)']: {
            '&': colorResponsiveStyles(props.buttonStyle),
            '&:hover span': {
                visibility: 'visible',
                opacity: 1,
            },
            '& .icon': {
                margin: 0,
                display: 'none'
            },
            '& .icon-responsive': {
                display: 'block',
                opacity: 1
            }
        }
    } || {}),
    (props) => ({
        '& i.icon-svg': {
            display: 'flex'
        },
        '& svg': iconsIndentation(props.buttonSize)
    }),
    (props => ({
        ...props.insaneMode ? {
            background: 'url(https://attachments-staging.keyframes.net/media/cover/zlqfwz/b6eea0e0-a93f-434d-bfd1-3e1de3eac571.gif)',
            backgroundPosition: '-10px -10px'
        } : {}
    }))
]);

const XButtonRaw = makeActionable(makeNavigable<XButtonProps>((props) => {
    return (
        <StyledButton
            href={props.href}
            target={props.hrefTarget}
            buttonSize={props.size}
            buttonStyle={props.style}
            loading={props.loading}
            enabled={props.enabled}
            pressed={props.pressed}
            attach={props.attach}
            flexBasis={props.flexBasis}
            flexGrow={props.flexGrow}
            flexShrink={props.flexShrink}
            alignSelf={props.alignSelf}
            onClick={props.onClick}
            className={props.className}
            zIndex={props.zIndex}
            breakpoint={props.breakpoint || defaultResponsiveBreakpoint}
            responsive={props.iconResponsive ? true : false}
            insaneMode={props.insaneMode}
        >
            <StyledButtonContentWrapper tabIndex={-1} className="button-content">
                <MainContent className="main-content">
                    {props.iconResponsive && (
                        typeof (props.iconResponsive) === 'string'
                            ? <StyledIcon size={props.size} text={props.text} icon={props.iconResponsive} opacity={props.iconOpacity} className="icon icon-responsive material" />
                            : <i className="icon icon-responsive">{props.iconResponsive}</i>
                    )}
                    {props.icon && (
                        typeof (props.icon) === 'string'
                            ? <StyledIcon size={props.size} text={props.text} icon={props.icon} opacity={props.iconOpacity} className="icon material" />
                            : <i className="icon icon-svg">{props.icon}</i>
                    )}
                    <ButtonText
                        responsive={props.iconResponsive ? true : false}
                        breakpoint={props.breakpoint || defaultResponsiveBreakpoint}
                        tooltipPlacement={props.tooltipPlacement}
                    >
                        {props.text}
                    </ButtonText>
                    {props.iconRight && (
                        typeof (props.iconRight) === 'string'
                            ? <StyledIconRight size={props.size} text={props.text} icon={props.iconRight} opacity={props.iconOpacity} className="icon material" />
                            : <i className="icon icon-svg">{props.iconRight}</i>
                    )}
                </MainContent>
                {props.loading && <XLoadingCircular className="loading-icon" color={loaderStyles(props.style).color!! as string} />}
            </StyledButtonContentWrapper>
        </StyledButton>
    );
}));

const XButtonWithRole = (props: any) => (
    <XRoleContext.Consumer>
        {userRoles => <XButtonRaw {...props} insaneMode={userRoles && userRoles.roles.indexOf('feature-insane-buttons') > -1} />}
    </XRoleContext.Consumer>
);

export const XButton = Glamorous(XButtonWithRole)();