import * as React from 'react';
import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XLink, XLinkProps } from './XLink';
import { XLoadingCircular } from './XLoadingCircular';
import { XLayoutProps, applyFlex } from './Flex';

export interface XButtonStyleProps extends XLayoutProps {
    text?: string;
    size?: 'x-large' | 'large' | 'medium' | 'default' | 'small';
    style?: 'primary' | 'danger' | 'default' | 'ghost' | 'flat';
}

export interface XButtonProps extends XButtonStyleProps, XLinkProps {
    loading?: boolean;
}

let sizeStyles = styleResolver({
    'x-large': {
        height: '56px',
        lineHeight: '56px',
        fontSize: '18px',
        fontWeight: 500,
        paddingLeft: 32,
        paddingRight: 32,
        borderRadius: '4px'
    },
    'large': {
        height: '48px',
        lineHeight: '48px',
        fontSize: '18px',
        fontWeight: 500,
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: '4px'
    },
    'medium': {
        height: '40px',
        lineHeight: '40px',
        fontSize: '16px',
        fontWeight: 500,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: '4px'
    },
    'default': {
        height: '32px',
        lineHeight: '32px',
        fontSize: '14px',
        fontWeight: 500,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: '4px'
    },
    'small': {
        height: '24px',
        lineHeight: '24px',
        fontSize: '12px',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: '3px'
    }
});

let colorStyles = styleResolver({
    'default': {
        backgroundColor: '#edf0f6',
        color: '#1f3449',
        '&:hover': {
            backgroundColor: '#f4f6fb',
            color: '#1f3449',
            boxShadow: '0 1px 2px 0 #ced5e2'
        },
        '&:active': {
            backgroundColor: '#d6dde9',
            color: '#1f3449',
            boxShadow: 'none'
        }
    },
    'primary': {
        backgroundColor: '#654bfa',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#7159f9',
            color: '#ffffff',
            boxShadow: '0 1px 2px 0 rgba(29, 21, 74, 0.42)'
        },
        '&:active': {
            backgroundColor: '#5640d6',
            color: '#ffffff',
            boxShadow: 'none'
        }
    },
    'danger': {
        backgroundColor: '#d75454',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#ec6262',
            color: '#ffffff',
            boxShadow: '0 1px 2px 0 #d29d9d'
        },
        '&:active': {
            backgroundColor: '#c54f4f',
            color: '#ffffff',
            boxShadow: 'none'
        }
    },
    'ghost': {
        backgroundColor: '#ffffff',
        color: '#1f3449',
        border: 'solid 1px #c2cbde',
        '&:hover': {
            boxShadow: '0 1px 2px 0 #dbe2ef',
        },
        '&:active': {
            boxShadow: 'none'
        }
    },
    'flat': {
        backgroundColor: '#ffffff',
        color: '#1f3449',
        '&:hover': {
            color: '#1f3449',
            boxShadow: '0 1px 2px 0 #dbe2ef',
            border: 'solid 1px #c2cbde'
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#edf0f6',
            border: 'solid 1px #c2cbde'
        }
    }
});

let colorDisabledStyles = styleResolver({
    'default': {
        backgroundColor: '#edf0f6!important',
        color: '#1f3449!important',
    },
    'primary': {
        backgroundColor: '#654bfa!important',
        color: '#ffffff!important',
    },
    'danger': {
        backgroundColor: '#d75454!important',
        color: '#ffffff!important',
    },
    'ghost': {
        backgroundColor: '#ffffff!important',
        color: '#1f3449!important',
        border: 'solid 1px #c2cbde!important',
    },
    'flat': {
        backgroundColor: '#ffffff!important',
        color: '#1f3449!important',
    }
});

let loaderStyles = styleResolver({
    'default': {
        '& svg path': {
            stroke: '#1f3449 !important'
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
            stroke: '#1f3449 !important'
        }
    },
    'flat': {
        '& svg path': {
            stroke: '#1f3449 !important'
        }
    }
});

const StyledButton = Glamorous<XButtonProps>(XLink)([
    (props) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        wordBreak: 'keep-all',
        position: 'relative',
        outline: 'none',
        pointerEvents: (props.loading || props.disabled) ? 'none' : 'auto',
        cursor: (props.loading || props.disabled) ? 'inherit' : 'pointer',
        transition: 'box-shadow .08s ease-in,color .08s ease-in, border .0s, all .15s ease'
    }),
    (props) => (props.loading && {
        '& > span': { opacity: 0 }
    } || {}),
    (props) => (props.disabled && !props.loading && {
        '& > span': { opacity: 0.5 }
    } || {}),
    (props) => (!props.disabled && {
        '&:hover': {
            transform: 'translateY(-1px)',
        }
    } || {}),
    (props) => colorStyles(props.style, !props.disabled),
    (props) => colorDisabledStyles(props.style, props.disabled),
    (props) => loaderStyles(props.style),
    (props) => sizeStyles(props.size),
    (props) => applyFlex(props)
]);

export class XButton extends React.PureComponent<XButtonProps> {
    render() {
        return (
            <StyledButton {...this.props}>
                <span>{this.props.text}</span>
                {this.props.loading && <XLoadingCircular inverted={this.props.style === 'primary' || this.props.style === 'danger'} />}
            </StyledButton>
        );
    }
}