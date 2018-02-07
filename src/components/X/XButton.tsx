import * as glamor from 'glamor'
import { XLink, XLinkProps } from './XLink';
import XStyled from './XStyled';

interface XButtonProps extends XLinkProps {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    style?: 'normal' | 'dark' | 'important';
    size?: 'large' | 'normal';
    bounce?: boolean;
    loading?: boolean;
}

const loading = glamor.keyframes({
    '0%': { transform: `rotate(0deg)` },
    '100%': { transform: `rotate(360deg)` }
})

let textColors = {
    'normal': '#525f7f',
    'dark': '#ffffff',
    'important': '#ffffff'
}
let textHoveredColors = {
    'normal': '#32325d',
    'dark': '#ffffff',
    'important': '#ffffff'
}
let backgroundColors = {
    'normal': '#ffffff',
    'dark': '#6B50FF',
    'important': '#3ecf8e'
}
let backgroundHoveredColors = {
    'normal': undefined,
    'dark': '#8571f3',
    'important': undefined
}
let backgroundPressedColors = {
    'normal': undefined,
    'dark': '#5032f3',
    'important': undefined
}

export const XButton = XStyled<XButtonProps>(XLink)((props) => {
    let style = props.style !== undefined && props.style !== 'normal' ? props.style : 'normal'
    return {
        textDecoration: 'none',
        textAlign: 'center',
        cursor: props.loading ? 'inherit' : 'pointer',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        wordBreak: 'keep-all',
        position: 'relative',

        padding: props.size === 'large' ? '16px 20px' : '6px 14px',

        color: textColors[style],
        backgroundColor: backgroundColors[style],

        borderRadius: '4px',

        boxShadow: '0 0 0 1px rgba(50,50,93,.1), 0 2px 5px 0 rgba(50,50,93,.08), 0 1px 1.5px 0 rgba(0,0,0,.07), 0 1px 2px 0 rgba(0,0,0,.08), 0 0 0 0 transparent',
        transition: 'box-shadow .08s ease-in,color .08s ease-in,all .15s ease',

        fontSize: props.size === 'large' ? '15px' : '13px',
        lineHeight: '20px',
        fontWeight: 500,

        alignSelf: props.alignSelf,

        '&:hover': {
            transform: props.bounce ? 'translateY(-1px)' : undefined,
            color: textHoveredColors[style],
            backgroundColor: backgroundHoveredColors[style],
            boxShadow: props.size === 'large'
                ? '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)'
                : '0 0 0 1px rgba(50,50,93,.1), 0 2px 5px 0 rgba(50,50,93,.1), 0 3px 9px 0 rgba(50,50,93,.08), 0 1px 1.5px 0 rgba(0,0,0,.08), 0 1px 2px 0 rgba(0,0,0,.08)'
        },
        '&:active': {
            transform: props.bounce ? 'translateY(1px)' : undefined,
            color: textHoveredColors[style],
            backgroundColor: backgroundPressedColors[style],
            boxShadow: props.size === 'large'
                ? '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)'
                : '0 0 0 1px rgba(50,50,93,.08), 0 2px 5px 0 rgba(50,50,93,.06), 0 1px 1.5px 0 rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.06), 0 0 0 0 transparent'
        },
        '&:focus': {
            boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
            outline: 0
        },
        '&::after': {
            content: props.loading ? `''` : undefined,
            display: 'block',
            position: 'absolute',
            width: '20px',
            height: '20px',
            left: 'calc(50% - 10px)',
            top: 'calc(50% - 10px)',
            backgroundImage: 'url(/static/X/loading.svg)',
            backgroundSize: '20px',
            animation: `${loading} 2s linear infinite`
        }
    }
});