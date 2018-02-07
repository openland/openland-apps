import { XLink, XLinkProps } from './XLink';
import XStyled from './XStyled';

interface XButtonProps extends XLinkProps {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end';
    style?: 'normal' | 'dark';
    size?: 'large' | 'normal';
    bounce?: boolean;
}

export const XButton = XStyled<XButtonProps>(XLink)((props) => ({
    textDecoration: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    wordBreak: 'keep-all',

    padding: props.size === 'large' ? '16px 20px' : '6px 14px',

    color: props.style === 'dark' ? '#ffffff' : '#525f7f',
    backgroundColor: props.style === 'dark' ? '#6B50FF' : '#ffffff',

    borderRadius: '4px',

    boxShadow: '0 0 0 1px rgba(50,50,93,.1), 0 2px 5px 0 rgba(50,50,93,.08), 0 1px 1.5px 0 rgba(0,0,0,.07), 0 1px 2px 0 rgba(0,0,0,.08), 0 0 0 0 transparent',
    transition: 'box-shadow .08s ease-in,color .08s ease-in,all .15s ease',

    fontSize: props.size === 'large' ? '15px' : '13px',
    lineHeight: '20px',
    fontWeight: 500,

    alignSelf: props.alignSelf,

    '&:hover': {
        transform: props.bounce ? 'translateY(-1px)' : undefined,
        color: props.style === 'dark' ? '#ffffff' : '#32325d',
        backgroundColor: props.style === 'dark' ? '#8571f3' : undefined,
        boxShadow: props.size === 'large'
            ? '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)'
            : '0 0 0 1px rgba(50,50,93,.1), 0 2px 5px 0 rgba(50,50,93,.1), 0 3px 9px 0 rgba(50,50,93,.08), 0 1px 1.5px 0 rgba(0,0,0,.08), 0 1px 2px 0 rgba(0,0,0,.08)'
    },
    '&:active': {
        transform: props.bounce ? 'translateY(1px)' : undefined,
        color: props.style === 'dark' ? '#ffffff' : '#32325d',
        backgroundColor: props.style === 'dark' ? '#5032f3' : undefined,
        boxShadow: props.size === 'large'
            ? '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)'
            : '0 0 0 1px rgba(50,50,93,.08), 0 2px 5px 0 rgba(50,50,93,.06), 0 1px 1.5px 0 rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.06), 0 0 0 0 transparent'
    },
    '&:focus': {
        boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
        outline: 0
    }
}));