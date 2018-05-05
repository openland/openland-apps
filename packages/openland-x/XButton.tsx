import Glamorous from 'glamorous';
import { styleResolver } from 'openland-x-utils/styleResolver';
import { XLink } from './XLink';

export interface XButtonProps {
    size?: 'x-large' | 'large' | 'default' | 'small' | 'x-small';
    style?: 'primary' | 'danger' | 'default' | 'ghost' | 'flat';
}

let sizeStyles = styleResolver({
    'x-large': {
        height: '56px',
        lineHeight: '56px',
        fontSize: '18px',
        paddingLeft: 32,
        paddingRight: 32,
        borderRadius: '4px'
    },
    'large': {
        height: '48px',
        lineHeight: '48px',
        fontSize: '18px',
        paddingLeft: 26,
        paddingRight: 26,
        borderRadius: '4px'
    },
    'default': {
        height: '40px',
        lineHeight: '40px',
        fontSize: '16px',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: '4px'
    },
    'small': {
        height: '32px',
        lineHeight: '32px',
        fontSize: '14px',
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: '3px'
    },
    'x-small': {
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
            color: '#1f3449',
            boxShadow: '0 1px 2px 0 #ced5e2'
        }
    },
    'primary': {
        backgroundColor: '#654bfa',
        color: '#ffffff',
        '&:hover': {
            color: '#ffffff',
            boxShadow: '0 1px 2px 0 rgba(29, 21, 74, 0.42)'
        }
    },
    'danger': {
        backgroundColor: '#d86565',
        color: '#ffffff',
        '&:hover': {
            color: '#ffffff',
            boxShadow: '0 1px 2px 0 rgba(172, 42, 42, 0.39)'
        }
    },
    'ghost': {
        backgroundColor: '#ffffff',
        color: '#1f3449',
        border: 'solid 1px #c2cbde',
        '&:hover': {
            color: '#1f3449',
            boxShadow: '0 1px 2px 0 #dbe2ef',
        }
        // 0 1px 2px 0 #dbe2ef;
    },
    'flat': {
        backgroundColor: '#ffffff',
        color: '#1f3449',
        '&:hover': {
            color: '#1f3449',
            boxShadow: '0 1px 2px 0 #dbe2ef',
        }
    }
});

export const XButton = Glamorous<XButtonProps>(XLink)([
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        wordBreak: 'keep-all',
        position: 'relative',
        outline: 'none',
        transition: 'box-shadow .08s ease-in,color .08s ease-in,all .15s ease'
    },
    (props) => colorStyles(props.style),
    (props) => sizeStyles(props.size),
]);