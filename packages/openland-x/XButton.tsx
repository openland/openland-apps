import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver, styleResolverWithProps } from 'openland-x-utils/styleResolver';
import { XLoadingCircular } from './XLoadingCircular';
import { XFlexStyles, applyFlex } from './Flex';
import { XIcon } from './XIcon';
import { makeNavigable, NavigableParentProps } from './Navigable';
import { makeActionable, ActionableParentProps } from './Actionable';

export type XButtonSize = 'x-large' | 'large' | 'medium' | 'default' | 'small';
export type XButtonStyle = 'primary' | 'danger' | 'default' | 'ghost' | 'electric' | 'flat';

export interface XButtonStyleProps extends XFlexStyles {
    className?: string;
    text?: string;
    additionalText?: string;
    icon?: string;
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

let borderRadiusStyles = styleResolverWithProps((props: { attach?: 'left' | 'right' | 'both' }) => {
    return ({
        'x-large': {
            borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
            borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
            borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
            borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
        },
        'large': {
            borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
            borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
            borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
            borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
        },
        'medium': {
            borderTopLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
            borderBottomLeftRadius: props.attach === 'both' || props.attach === 'left' ? 0 : 4,
            borderTopRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
            borderBottomRightRadius: props.attach === 'both' || props.attach === 'right' ? 0 : 4,
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
    });

});

let sizeStyles = styleResolver({
    'x-large': {
        height: 56,
        lineHeight: '56px',
        fontSize: 18,
        letterSpacing: 0.6,
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
            width: 24,
            height: 24,
            lineHeight: 'normal',
            top: 'calc(50% - 12px)',
            left: 'calc(50% - 12px)'
        }
    },
    'large': {
        height: 48,
        lineHeight: '48px',
        fontSize: 18,
        letterSpacing: 0.6,
        fontWeight: 500,
        '& .button-content': {
            paddingLeft: 26,
            paddingRight: 26
        },
        '& .icon': {
            fontSize: 24
        },
        '& .loading-icon': {
            width: 21,
            height: 21,
            lineHeight: 'normal',
            top: 'calc(50% - 10.5px)',
            left: 'calc(50% - 10.5px)'
        }
    },
    'medium': {
        height: 40,
        lineHeight: '40px',
        fontSize: 15,
        letterSpacing: 0.5,
        fontWeight: 500,
        '& .button-content': {
            paddingLeft: 20,
            paddingRight: 20
        },
        '& .icon': {
            fontSize: 20
        },
        '& .loading-icon': {
            width: 18,
            height: 18,
            lineHeight: 'normal',
            top: 'calc(50% - 9px)',
            left: 'calc(50% - 9px)'
        }
    },
    'default': {
        height: 32,
        lineHeight: '32px',
        fontSize: 14,
        letterSpacing: 0.4,
        fontWeight: 500,
        '& .button-content': {
            paddingLeft: 14,
            paddingRight: 14
        },
        '& .icon': {
            fontSize: 16
        },
        '& .loading-icon': {
            width: 15,
            height: 15,
            lineHeight: 'normal',
            top: 'calc(50% - 7.5px)',
            left: 'calc(50% - 7.5px)'
        }
    },
    'small': {
        height: 24,
        lineHeight: '24px',
        fontSize: 12,
        letterSpacing: 0.4,
        fontWeight: 500,
        '& .button-content': {
            paddingLeft: 10,
            paddingRight: 10
        },
        '& .icon': {
            fontSize: 14
        },
        '& .loading-icon': {
            width: 14,
            height: 14,
            lineHeight: 'normal',
            top: 'calc(50% - 7px)',
            left: 'calc(50% - 7px)'
        }
    }
});

let colorStyles = styleResolver({
    'default': {
        backgroundColor: '#f3f3f5',
        color: '#334562',
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
        '&:hover': {
            backgroundColor: '#7159f9',
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
        color: '#1f3449',
        border: 'solid 1px #c2cbde',
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
            backgroundColor: '#eeecfa',
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
        backgroundColor: '#ffffff',
        color: '#334562',
        border: 'solid 1px transparent',
        '&:hover': {
            color: '#334562',
            backgroundColor: '#f4f6fb',
            border: 'solid 1px #c2cbde'
        },
        '&:active': {
            backgroundColor: '#eeecfa',
            border: 'solid 1px transparent',
            color: '#5640d6'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
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
        border: 'solid 1px #c2cbde !important',
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
        color: '#5640d6 !important',
        border: 'solid 1px transparent !important',
    },
    'flat': {
        backgroundColor: '#eeecfa !important',
        border: 'solid 1px transparent !important',
        color: '#5640d6 !important'
    }
});

let loaderStyles = styleResolver({
    'default': {
        '& svg path': {
            stroke: '#334562 !important'
        }
    },
    'primary': {
        '& svg path': {
            stroke: '#ffffff !important'
        }
    },
    'danger': {
        '& svg path': {
            stroke: '#ffffff !important'
        }
    },
    'ghost': {
        '& svg path': {
            stroke: '#334562 !important'
        }
    },
    'electric': {
        '& svg path': {
            stroke: '#5640d6 !important'
        }
    },
    'flat': {
        '& svg path': {
            stroke: '#334562 !important'
        }
    }
});

const StyledIcon = Glamorous<XButtonProps>(XIcon)([
    (props) => iconsIndentation(props.size, !!props.text)
]);

const StyledButtonContentWrapper = Glamorous.div<{ additionalText?: boolean }>((props) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: props.additionalText ? 'space-between' : 'center',
    alignItems: 'center',
    textDecoration: 'none',
    flexDirection: 'row',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    wordBreak: 'keep-all',
    position: 'relative',
    outline: 'none'
}));

const MainContent = Glamorous.div<{ additionalText?: boolean }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    marginRight: props.additionalText ? 5 : undefined
}));

const AdditionalContent = Glamorous.div<{ additionalText?: boolean }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: props.additionalText ? 5 : undefined
}));

const ButtomText = Glamorous.span({
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
});

const StyledButton = Glamorous.a<
    {
        buttonSize?: string,
        buttonStyle?: string,
        loading?: boolean,
        enabled?: boolean,
        pressed?: boolean,
        attach?: 'left' | 'right' | 'both'
    } & XFlexStyles
    >([
        (props) => ({ display: 'flex', boxSizing: 'border-box' }),
        (props) => ({
            pointerEvents: (props.loading || props.enabled === false) ? 'none' : 'auto',
            cursor: (props.loading || props.enabled === false) ? 'inherit' : 'pointer',
            transition: 'box-shadow .08s ease-in,color .08s ease-in, border .0s, all .15s ease'
        }),
        (props) => (props.loading && {
            '& span': { opacity: 0 }
        } || {}),
        (props) => colorStyles(props.buttonStyle, props.enabled !== false && !props.pressed),
        (props) => colorDisabledStyles(props.buttonStyle, props.enabled === false),
        (props) => colorPressedStyles(props.buttonStyle, !!props.pressed),
        (props) => loaderStyles(props.buttonStyle),
        (props) => sizeStyles(props.buttonSize),
        (props) => borderRadiusStyles({ attach: props.attach }, props.buttonSize),
        (props) => applyFlex(props)
    ]);

export const XButton = makeActionable(makeNavigable<XButtonProps>((props) => {
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
        >
            <StyledButtonContentWrapper tabIndex={-1} className="button-content" additionalText={props.additionalText !== undefined}>
                <MainContent additionalText={props.additionalText !== undefined}>
                    {props.icon && <StyledIcon text={props.text} icon={props.icon} className="icon" />}
                    <ButtomText>{props.text}</ButtomText>
                </MainContent>
                {props.loading && <XLoadingCircular inverted={props.style === 'primary' || props.style === 'danger'} className="loading-icon" />}
                {props.additionalText && (
                    <AdditionalContent additionalText={props.additionalText !== undefined}>
                        <ButtomText>{props.additionalText}</ButtomText>
                    </AdditionalContent>
                )}
            </StyledButtonContentWrapper>
        </StyledButton>
    );
}));