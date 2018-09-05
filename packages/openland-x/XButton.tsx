import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XLoadingCircular } from './XLoadingCircular';
import { XFlexStyles, applyFlex } from './basics/Flex';
import { XIcon } from './XIcon';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { makeActionable, ActionableParentProps } from './Actionable';

export type XButtonSize = 'x-large' | 'large' | 'medium' | 'default' | 'small' | 'r-large' | 'r-default' | 'r-small' | 'r-tiny';
export type XButtonStyle = 'primary' | 'primary-sky-blue' | 'light-blue' | 'danger' | 'default' | 'ghost' | 'electric' | 'flat' | 'link' | 'link_danger' | 'success';
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
}

export type XButtonProps = ActionableParentProps<NavigableParentProps<XButtonStyleProps & { pressed?: boolean; }>>;

let iconsIndentation = styleResolver({
    'x-large': {
        marginLeft: -8,
        marginRight: 12
    },
    'large': {
        marginRight: 10
    },
    'medium': {
        marginRight: 8
    },
    'default': {
        marginRight: 6
    },
    'small': {
        marginRight: 5
    },

    'r-large': {
        marginLeft: -4,
        marginRight: 4
    },
    'r-default': {
        marginLeft: -2,
        marginRight: 4
    },
    'r-small': {
        marginLeft: -2,
        marginRight: 4
    },
    'r-tiny': {
        marginLeft: -2,
        marginRight: 4
    }
});

let iconsIndentationRight = styleResolver({
    'x-large': {
        marginRight: -8,
        marginLeft: 12
    },
    'large': {
        marginLeft: 10
    },
    'medium': {
        marginLeft: 8
    },
    'default': {
        marginLeft: 6
    },
    'small': {
        marginLeft: 5
    },

    'r-large': {
        marginRight: -4,
        marginLeft: 8
    },
    'r-default': {
        marginRight: -2,
        marginLeft: 8
    },
    'r-small': {
        marginRight: -2,
        marginLeft: 8
    },
    'r-tiny': {
        marginRight: -2,
        marginLeft: 8
    }
});

let borderRadiusStyles = styleResolverWithProps((props: { attach?: 'left' | 'right' | 'both' }) => ({
    'x-large': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 6,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 6,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 6,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 6,
    },
    'large': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 6,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 6,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 6,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 6,
    },
    'medium': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 5,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 5,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 5,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 5,
    },
    'default': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
    },
    'small': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 3,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 3,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 3,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 3,
    },

    'r-large': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 20,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 20,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 20,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 20,
    },
    'r-default': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 16,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 16,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 16,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 16,
    },
    'r-small': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 16,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 16,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 16,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 16,
    },
    'r-tiny': {
        borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 9,
        borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 9,
        borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 9,
        borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 9,
    }
}));

let sizeStyles = styleResolver({
    'x-large': {
        height: 56,
        lineHeight: '56px',
        fontSize: 18,
        letterSpacing: -0.4,
        fontWeight: 500,
        '& .button-content': {
            paddingLeft: 32,
            paddingRight: 32
        },
        '& .icon.material': {
            width: 32,
            fontSize: 28,
            lineHeight: '56px',
        },
        '& .loading-icon': {
            width: 56,
            height: 56,
            lineHeight: 'normal',
            top: 'calc(50% - 28px)',
            left: 'calc(50% - 28px)'
        }
    },
    'large': {
        height: 48,
        lineHeight: '48px',
        fontSize: 18,
        letterSpacing: -0.4,
        fontWeight: 500,
        '& .button-content': {
            paddingLeft: 26,
            paddingRight: 26
        },
        '& .icon.material': {
            fontSize: 24
        },
        '& .loading-icon': {
            width: 48,
            height: 48,
            lineHeight: 'normal',
            top: 'calc(50% - 24px)',
            left: 'calc(50% - 24px)'
        }
    },
    'medium': {
        height: 40,
        lineHeight: '40px',
        fontSize: 15,
        letterSpacing: -0.2,
        fontWeight: 500,
        '& .button-content': {
            paddingLeft: 20,
            paddingRight: 20
        },
        '& .icon.material': {
            fontSize: 20
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
        lineHeight: '32px',
        fontSize: 14,
        letterSpacing: -0.2,
        fontWeight: 500,
        '& .button-content': {
            paddingLeft: 14,
            paddingRight: 14
        },
        '& .icon.material': {
            fontSize: 16
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
        height: 24,
        lineHeight: '24px',
        fontSize: 12,
        letterSpacing: -0.3,
        fontWeight: 500,
        '& .button-content': {
            paddingLeft: 10,
            paddingRight: 10
        },
        '& .icon.material': {
            fontSize: 14
        },
        '& .loading-icon': {
            width: 24,
            height: 24,
            lineHeight: 'normal',
            top: 'calc(50% - 12px)',
            left: 'calc(50% - 12px)'
        }
    },

    'r-large': {
        height: 40,
        lineHeight: '38px',
        fontSize: 20,
        letterSpacing: 0.5,
        fontWeight: 500,
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
    'r-default': {
        height: 32,
        lineHeight: '30px',
        fontSize: 14,
        letterSpacing: -0.4,
        fontWeight: 500,
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
    'r-small': {
        height: 28,
        lineHeight: '26px',
        fontSize: 14,
        letterSpacing: -0.4,
        fontWeight: 500,
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
    'r-tiny': {
        height: 18,
        lineHeight: '16px',
        fontSize: 12,
        letterSpacing: 0.3,
        fontWeight: 600,
        '& .button-content': {
            paddingLeft: 8,
            paddingRight: 8
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
        backgroundColor: '#f3f3f5',
        color: '#334562',
        border: 'solid 1px transparent',
        '&:hover': {
            backgroundColor: '#ecedf0',
            color: '#334562'
        },
        '&:active': {
            backgroundColor: '#117fe4',
            color: '#fff'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'primary': {
        backgroundColor: '#654bfa',
        color: '#ffffff',
        border: 'solid 1px transparent',
        '&:hover': {
            backgroundColor: '#816cf9',
            color: '#ffffff'
        },
        '&:active': {
            backgroundColor: '#5640d6',
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
        color: '#334562',
        border: 'solid 1px #dcdee4',
        '&:hover': {
            backgroundColor: '#f3f3f5',
            color: '#334562'
        },
        '&:active': {
            backgroundColor: '#117fe4',
            color: '#fff'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'electric': {
        backgroundColor: '#ffffff',
        color: '#5640d6',
        border: 'solid 1px #654bfa',
        '&:hover': {
            backgroundColor: 'rgba(238, 236, 250, 0.39)',
        },
        '&:active': {
            backgroundColor: '#117fe4',
            border: 'solid 1px transparent',
            color: '#fff'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
    'flat': {
        backgroundColor: 'transparent',
        color: '#334562',
        border: 'solid 1px transparent',
        '&:hover': {
            color: '#334562',
            border: 'solid 1px #dcdee4'
        },
        '&:active': {
            backgroundColor: '#EDF7FF',
            border: 'solid 1px transparent',
            color: '#1790ff',
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },

    'link': {
        color: '#765efd',
        border: 'solid 1px transparent',
        '&:hover': {
            textDecoration: 'underline'
        },
        '&:focus': {
            textDecoration: 'underline'
        }
    },

    'link_danger': {
        color: '#d75454',
        border: 'solid 1px transparent',
        '&:hover': {
            color: '#ec6262',
            textDecoration: 'underline'
        },
        '&:focus': {
            textDecoration: 'underline'
        }
    },

    'primary-sky-blue': {
        backgroundColor: '#1790ff',
        color: '#ffffff',
        border: 'solid 1px transparent',
        '&:hover': {
            backgroundColor: '#45a6ff',
            color: '#ffffff'
        },
        '&:active': {
            backgroundColor: '#117fe4',
            color: '#ffffff'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },

    'light-blue': {
        backgroundColor: 'rgba(23, 144, 255, 0.08)',
        color: '#1790ff',
        border: 'solid 1px transparent',
        '&:hover': {
            backgroundColor: 'rgba(23, 144, 255, 0.10)',
            color: '#1790ff'
        },
        '&:active': {
            backgroundColor: 'rgba(23, 144, 255, 0.15)',
            color: '#1790ff'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        }
    },
});

let colorDisabledStyles = styleResolver({
    'default': {
        backgroundColor: '#f3f3f5 !important',
        color: 'rgba(51, 69, 98, 0.7) !important',
        border: 'solid 1px transparent !important',
    },
    'primary': {
        backgroundColor: '#9380fc !important',
        color: 'rgba(255, 255, 255, 0.7) !important',
        border: 'solid 1px transparent !important',
    },
    'danger': {
        backgroundColor: '#e28787 !important',
        color: 'rgba(255, 255, 255, 0.7) !important',
        border: 'solid 1px transparent !important',
    },
    'ghost': {
        backgroundColor: '#ffffff !important',
        color: 'rgba(51, 69, 98, 0.7) !important',
        border: 'solid 1px #dcdee4 !important',
    },
    'electric': {
        backgroundColor: '#ffffff !important',
        color: 'rgba(86, 64, 214, 0.7) !important',
        border: 'solid 1px #b1a4f9 !important',
    },
    'flat': {
        backgroundColor: '#ffffff !important',
        color: 'rgba(51, 69, 98, 0.7) !important',
        border: 'solid 1px transparent !important',
    },
    'link': {
        color: 'rgba(51, 69, 98, 0.7) !important',
    },
    'link_danger': {
        color: '#e28787 !important',
    },
    'primary-sky-blue': {
        backgroundColor: '#45a6ff !important',
        border: 'solid 1px transparent !important',
        color: '#c7e4ff !important'
    },
    'success': {
    },
    'light-blue': {
    },
});

let colorPressedStyles = styleResolver({
    'default': {
        backgroundColor: '#117fe4 !important',
        border: 'solid 1px transparent !important',
        color: '#fff !important'
    },
    'primary': {
        backgroundColor: '#5640d6 !important',
        border: 'solid 1px transparent !important',
        color: '#ffffff !important'
    },
    'danger': {
        backgroundColor: '#c54f4f !important',
        border: 'solid 1px transparent !important',
        color: '#ffffff !important'
    },
    'ghost': {
        backgroundColor: '#117fe4 !important',
        border: 'solid 1px transparent !important',
        color: '#fff !important'
    },
    'electric': {
        backgroundColor: '#117fe4 !important',
        border: 'solid 1px transparent !important',
        color: '#fff !important'
    },
    'flat': {
        backgroundColor: '#117fe4 !important',
        border: 'solid 1px transparent !important',
        color: '#fff !important'
    },
    'link': {
    },
    'link_danger': {
    },
    'primary-sky-blue': {
        backgroundColor: '#117fe4 !important',
        border: 'solid 1px transparent !important',
        color: '#ffffff !important'
    },
    'success': {
    },
    'light-blue': {
    },
});

let colorResponsiveStyles = styleResolver({
    'default': {
        background: 'none!important',
        color: '#939ca8!important',
        
        '&:hover': {
            color: '#85c4ff!important'
        },
        '&:active': {
            color: '#1790ff!important'
        },
    },
    'primary': {
    },
    'danger': {
    },
    'ghost': {
    },
    'electric': {
    },
    'flat': {
    },
    'link': {
    },
    'link_danger': {
    },
    'primary-sky-blue': {
    },
    'success': {
    },
    'light-blue': {
    },
});

let loaderStyles = styleResolver({
    'default': {
        color: '#334562'
    },
    'primary': {
        color: '#ffffff'
    },
    'danger': {
        color: '#ffffff'
    },
    'ghost': {
        color: '#334562'
    },
    'electric': {
        color: '#5640d6'
    },
    'flat': {
        color: '#334562'
    },
    'link': {
        color: '#5640d6'
    },
    'primary-sky-blue': {
        color: '#ffffff'
    },
    'success': {
        color: '#ffffff'
    },
    'light-blue': {
        color: '#1790ff'
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
    (props) => ({
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }),
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
}

const StyledButton = Glamorous.a<StyledButtonProps>([
    (props) => ({
        display: 'flex', boxSizing: 'border-box',
        '& .loading-icon': {
            position: 'absolute',
            // left: 'calc(50% - 10px)',
            // top: 'calc(50% - 10px)',
        },
        '& .icon-responsive': { display: 'none' }
    }),
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
        >
            <StyledButtonContentWrapper tabIndex={-1} className="button-content">
                <MainContent className="main-content">
                    {props.iconResponsive && (
                        typeof(props.iconResponsive) === 'string'
                        ? <StyledIcon size={props.size} text={props.text} icon={props.iconResponsive} opacity={props.iconOpacity} className="icon icon-responsive material" />
                        : <i className="icon icon-responsive">{props.iconResponsive}</i>
                    )}
                    {props.icon && (
                        typeof(props.icon) === 'string'
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
                        typeof(props.iconRight) === 'string'
                        ? <StyledIconRight size={props.size} text={props.text} icon={props.iconRight} opacity={props.iconOpacity} className="icon material" />
                        : <i className="icon icon-svg">{props.iconRight}</i>
                    )}
                </MainContent>
                {props.loading && <XLoadingCircular className="loading-icon" color={loaderStyles(props.style).color!! as string} />}
            </StyledButtonContentWrapper>
        </StyledButton>
    );
}));

export const XButton = Glamorous(XButtonRaw)();