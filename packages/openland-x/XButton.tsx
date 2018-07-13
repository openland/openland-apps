import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XLoadingCircular } from './XLoadingCircular';
import { XFlexStyles, applyFlex } from './basics/Flex';
import { XIcon } from './XIcon';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { makeActionable, ActionableParentProps } from './Actionable';

export type XButtonSize = 'x-large' | 'large' | 'medium' | 'default' | 'small';
export type XButtonStyle = 'primary' | 'danger' | 'default' | 'ghost' | 'electric' | 'flat' | 'link' | 'link_danger';

export interface XButtonStyleProps extends XFlexStyles {
    className?: string;
    text?: string;
    icon?: string;
    iconRight?: string;
    iconOpacity?: number;
    size?: XButtonSize;
    style?: XButtonStyle;
    attach?: 'left' | 'right' | 'both';
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
        '& .icon': {
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
        '& .icon': {
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
        '& .icon': {
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
        '& .icon': {
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
        '& .icon': {
            fontSize: 14
        },
        '& .loading-icon': {
            width: 24,
            height: 24,
            lineHeight: 'normal',
            top: 'calc(50% - 12px)',
            left: 'calc(50% - 12px)'
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
            backgroundColor: '#eeecfa',
            color: '#5640d6'
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
            backgroundColor: '#eeecfa',
            color: '#5640d6'
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
            backgroundColor: '#eeecfa',
            border: 'solid 1px transparent',
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
            backgroundColor: '#eeecfa',
            border: 'solid 1px transparent',
            color: '#5640d6'
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
    }
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
    }
});

let colorPressedStyles = styleResolver({
    'default': {
        backgroundColor: '#eeecfa !important',
        border: 'solid 1px transparent !important',
        color: '#5640d6 !important'
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
        backgroundColor: '#eeecfa !important',
        border: 'solid 1px transparent !important',
        color: '#5640d6 !important'
    },
    'electric': {
        backgroundColor: '#eeecfa !important',
        border: 'solid 1px transparent !important',
        color: '#5640d6 !important'
    },
    'flat': {
        backgroundColor: '#eeecfa !important',
        border: 'solid 1px transparent !important',
        color: '#5640d6 !important'
    },
    'link': {
    },
    'link_danger': {
    }
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
    }
});

const StyledIcon = Glamorous<XButtonProps & { opacity?: number }>(XIcon)([
    (props) => iconsIndentation(props.size, !!props.text),
    (props) => ({ opacity: props.opacity }),
]);

const StyledIconRight = Glamorous<XButtonProps & { opacity?: number }>(XIcon)([
    (props) => iconsIndentationRight(props.size, !!props.text),
    (props) => ({ opacity: props.opacity }),
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
    outline: 'none'
});

const MainContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center'
});

const ButtomText = Glamorous.span({
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
});

interface StyledButtonProps extends XFlexStyles {
    buttonSize?: string;
    buttonStyle?: string;
    loading?: boolean;
    enabled?: boolean;
    pressed?: boolean;
    attach?: 'left' | 'right' | 'both';
}

const StyledButton = Glamorous.a<StyledButtonProps>([
    (props) => ({
        display: 'flex', boxSizing: 'border-box',
        '& .loading-icon': {
            position: 'absolute',
            // left: 'calc(50% - 10px)',
            // top: 'calc(50% - 10px)',
        }
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
    (props) => borderRadiusStyles({ attach: props.attach }, props.buttonSize)
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
        >
            <StyledButtonContentWrapper tabIndex={-1} className="button-content">
                <MainContent className="main-content">
                    {props.icon && <StyledIcon text={props.text} icon={props.icon} opacity={props.iconOpacity} className="icon" />}
                    <ButtomText>{props.text}</ButtomText>
                    {props.iconRight && <StyledIconRight text={props.text} icon={props.iconRight} opacity={props.iconOpacity} className="icon" />}
                </MainContent>
                {props.loading && <XLoadingCircular className="loading-icon" color={loaderStyles(props.style).color!! as string} />}
            </StyledButtonContentWrapper>
        </StyledButton>
    );
}));

export const XButton = Glamorous(XButtonRaw)();