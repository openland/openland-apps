import * as React from 'react';
import * as glamor from 'glamor'
import Glamorous from 'glamorous';
import { XLink, XLinkProps } from './XLink';
import { XIcon } from './XIcon'
import XStyled from './XStyled';

interface XButtonProps extends XLinkProps {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number;
    style?: 'normal' | 'dark' | 'important';
    size?: 'large' | 'medium' | 'normal';
    bounce?: boolean;
    loading?: boolean;
    disabled?: boolean;
    icon?: string,
    accent?: boolean,
    borderless?: boolean
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

let fontSize = {
    'normal': '13px',
    'medium': '14px',
    'large': '15px'
}

let iconSize = {
    'normal': '15px',
    'medium': '18px',
    'large': '20px'
}

let paddings = {
    'normal': '6px 14px',
    'medium': '10px 18px',
    'large': '16px 20px'
}

export const XButtonComponent = XStyled<XButtonProps>(XLink)((props) => {
    let style = props.style !== undefined && props.style !== 'normal' ? props.style : 'normal'
    let size = props.size !== undefined && props.size !== 'normal' ? props.size : 'normal'
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        textAlign: props.icon ? 'right' : 'center',
        cursor: (props.loading || props.disabled) ? 'inherit' : 'pointer',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        wordBreak: 'keep-all',
        position: 'relative',
        minHeight: '32px',
        minWidth: '32px',
        outline: 'none',
        opacity: props.disabled ? 0.8 : 1,
        pointerEvents: (props.loading || props.disabled) ? 'none' : 'auto',

        flexGrow: props.flexGrow,
        flexShrink: props.flexShrink,
        flexBasis: props.flexBasis,
        padding: props.borderless ? undefined : paddings[size],

        color: props.accent ? '#4428e0' : (props.loading ? 'transparent' : textColors[style]),
        backgroundColor: props.accent ? '#fff' : backgroundColors[style],

        border: props.borderless ? undefined : (props.accent ? '1px solid #4428e0' : undefined),
        borderRadius: '4px',

        boxShadow: props.borderless ? undefined : ('0 0 0 1px rgba(50,50,93,.1), 0 2px 5px 0 rgba(50,50,93,.08), 0 1px 1.5px 0 rgba(0,0,0,.07), 0 1px 2px 0 rgba(0,0,0,.08), 0 0 0 0 transparent'),
        transition: 'box-shadow .08s ease-in,color .08s ease-in,all .15s ease',

        fontSize: fontSize[size],
        lineHeight: '20px',
        fontWeight: 600,

        alignSelf: props.alignSelf,

        '&:hover': {
            transform: props.bounce ? 'translateY(-1px)' : undefined,
            color: props.accent ? '#4428e0' : (props.loading ? 'transparent' : textHoveredColors[style]),
            backgroundColor: (props.loading || props.disabled) ? backgroundColors[style] : backgroundHoveredColors[style],
            boxShadow: props.borderless ? undefined : (((props.loading || props.disabled) ? undefined
                : ((props.size === 'large')
                    ? '0 7px 14px rgba(50,50,93,.1), 0 3px 6px rgba(0,0,0,.08)'
                    : '0 0 0 1px rgba(50,50,93,.1), 0 2px 5px 0 rgba(50,50,93,.1), 0 3px 9px 0 rgba(50,50,93,.08), 0 1px 1.5px 0 rgba(0,0,0,.08), 0 1px 2px 0 rgba(0,0,0,.08)'
                )
            ))
        },
        '&:active': {
            transform: props.bounce ? 'translateY(1px)' : undefined,
            color: props.loading ? 'transparent' : textHoveredColors[style],
            backgroundColor: (props.loading || props.disabled) ? backgroundColors[style] : backgroundPressedColors[style],
            boxShadow: props.borderless ? undefined : (((props.loading || props.disabled) ? undefined
                : ((props.size === 'large')
                    ? '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)'
                    : '0 0 0 1px rgba(50,50,93,.08), 0 2px 5px 0 rgba(50,50,93,.06), 0 1px 1.5px 0 rgba(0,0,0,.05), 0 1px 2px 0 rgba(0,0,0,.06), 0 0 0 0 transparent'
                )
            ))
        },
        '&:focus': {
            boxShadow: (props.loading || props.disabled || props.borderless)
                ? undefined
                : '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
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
        },
        '& > i': {
            opacity: props.loading ? 0 : 1,
            fontSize: iconSize[size],
            lineHeight: '20px'
        },
        '& > span': {
            marginLeft: props.icon ? (props.accent ? 7 : 3) : 0
        }
    }
});

export function XButton(props: XButtonProps & { children?: any }) {
    return (
        <XButtonComponent
            alignSelf={props.alignSelf}
            style={props.style}
            size={props.size}
            bounce={props.bounce}
            loading={props.loading}
            disabled={props.disabled}
            icon={props.icon}
            href={props.href}
            path={props.path}
            query={props.query}
            onClick={props.onClick}
            accent={props.accent}
            flexGrow={props.flexGrow}
            flexShrink={props.flexShrink}
            flexBasis={props.flexBasis}
            borderless={props.borderless}
        >
            {props.icon && <XIcon icon={props.icon} />}
            {props.children && (<span>{props.children}</span>)}
        </XButtonComponent>
    )
}

const heartBurst = glamor.keyframes({
    'from': { backgroundPosition: 'left' },
    'to': { backgroundPosition: 'right' }
})

let XLikeButton = Glamorous.div<{ active: boolean }>((props) => ({
    cursor: 'pointer',
    height: 50,
    width: 50,
    marginLeft: -16,
    marginRight: -16,
    backgroundImage: 'url(/static/X/likeButtonAnimation.png)',
    backgroundPosition: props.active ? 'right' : 'left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '2900%',
    '&:hover': {
        backgroundPosition: 'right',
    },
    animation: props.active ? `${heartBurst} .8s steps(28)` : undefined
}))

export class XButtonLike extends React.Component<{ onChange?: (value: boolean) => void, value?: boolean }> {
    handler = (e: any) => {
        e.preventDefault();
        if (this.props.onChange) {
            this.props.onChange(!(this.props.value || false))
        }
    }
    render() {
        return (
            <XLikeButton active={this.props.value || false} onClick={this.handler} />
        )
    }
}