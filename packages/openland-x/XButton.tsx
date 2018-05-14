import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XLink, XLinkProps } from './XLink';
import { XLoadingCircular } from './XLoadingCircular';
import { XFlexStyles, applyFlex } from './Flex';
import { XIcon } from './XIcon';

export interface XButtonStyleProps extends XFlexStyles {
    text?: string;
    icon?: string;
    size?: 'x-large' | 'large' | 'medium' | 'default' | 'small';
    style?: 'primary' | 'danger' | 'default' | 'ghost' | 'electric' | 'flat';
}

export interface XButtonProps extends XButtonStyleProps, XLinkProps {
    loading?: boolean;
}

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

let sizeStyles = styleResolver({
    'x-large': {
        height: 56,
        lineHeight: '56px',
        fontSize: 18,
        letterSpacing: 0.6,
        fontWeight: 500,
        borderRadius: 4,
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
        borderRadius: 4,
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
        fontSize: 16,
        letterSpacing: 0.5,
        fontWeight: 500,
        borderRadius: 4,
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
        borderRadius: 4,
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
        borderRadius: 3,
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
    },
    'primary': {
        backgroundColor: '#9380fc !important',
        color: 'rgba(255, 255, 255, 0.7) !important',
    },
    'danger': {
        backgroundColor: '#e28787 !important',
        color: 'rgba(255, 255, 255, 0.7) !important',
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

const StyledButton = Glamorous<XButtonProps>(XLink)([
    (props) => ({
        pointerEvents: (props.loading || props.disabled) ? 'none' : 'auto',
        cursor: (props.loading || props.disabled) ? 'inherit' : 'pointer',
        transition: 'box-shadow .08s ease-in,color .08s ease-in, border .0s, all .15s ease'
    }),
    (props) => (props.loading && {
        '& span': { opacity: 0 }
    } || {}),
    (props) => colorStyles(props.style, !props.disabled),
    (props) => colorDisabledStyles(props.style, !!props.disabled),
    (props) => loaderStyles(props.style),
    (props) => sizeStyles(props.size),
    (props) => applyFlex(props)
]);

export class XButton extends React.PureComponent<XButtonProps> {
    render() {
        return (
            <StyledButton {...this.props}>
                <StyledButtonContentWrapper tabIndex={-1} className="button-content">
                    {this.props.icon && <StyledIcon text={this.props.text} icon={this.props.icon} className="icon" />}
                    <span>{this.props.text}</span>
                    {this.props.loading && <XLoadingCircular inverted={this.props.style === 'primary' || this.props.style === 'danger'} className="loading-icon" />}
                </StyledButtonContentWrapper>
            </StyledButton>
        );
    }
}