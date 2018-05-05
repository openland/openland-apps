import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import { XLink, XLinkProps } from './XLink';
import { withLayout, XLayoutProps } from './withLayout';
import { XIcon } from 'openland-x/XIcon';

function LoadingIcon(props: {white?: boolean}) {
    return (
        <svg className="loading-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve" width={512} height={512}>
            <g>
                <g>
                    <path d="M256.001,0c-8.284,0-15,6.716-15,15v96.4c0,8.284,6.716,15,15,15s15-6.716,15-15V15C271.001,6.716,264.285,0,256.001,0z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M256.001,385.601c-8.284,0-15,6.716-15,15V497c0,8.284,6.716,15,15,15s15-6.716,15-15v-96.399    C271.001,392.316,264.285,385.601,256.001,385.601z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M196.691,123.272l-48.2-83.485c-4.142-7.175-13.316-9.633-20.49-5.49c-7.174,4.142-9.632,13.316-5.49,20.49l48.2,83.485    c2.778,4.813,7.82,7.502,13.004,7.502c2.545,0,5.124-0.648,7.486-2.012C198.375,139.62,200.833,130.446,196.691,123.272z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M389.491,457.212l-48.199-83.483c-4.142-7.175-13.316-9.633-20.49-5.49c-7.174,4.142-9.632,13.316-5.49,20.49    l48.199,83.483c2.778,4.813,7.82,7.502,13.004,7.502c2.545,0,5.124-0.648,7.486-2.012    C391.175,473.56,393.633,464.386,389.491,457.212z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M138.274,170.711L54.788,122.51c-7.176-4.144-16.348-1.685-20.49,5.49c-4.142,7.174-1.684,16.348,5.49,20.49    l83.486,48.202c2.362,1.364,4.941,2.012,7.486,2.012c5.184,0,10.226-2.69,13.004-7.503    C147.906,184.027,145.448,174.853,138.274,170.711z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M472.213,363.51l-83.484-48.199c-7.176-4.142-16.349-1.684-20.49,5.491c-4.142,7.175-1.684,16.349,5.49,20.49    l83.484,48.199c2.363,1.364,4.941,2.012,7.486,2.012c5.184,0,10.227-2.69,13.004-7.502    C481.845,376.825,479.387,367.651,472.213,363.51z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M111.401,241.002H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h96.401c8.284,0,15-6.716,15-15    S119.685,241.002,111.401,241.002z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M497,241.002h-96.398c-8.284,0-15,6.716-15,15s6.716,15,15,15H497c8.284,0,15-6.716,15-15S505.284,241.002,497,241.002z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M143.765,320.802c-4.142-7.175-13.314-9.633-20.49-5.49l-83.486,48.2c-7.174,4.142-9.632,13.316-5.49,20.49    c2.778,4.813,7.82,7.502,13.004,7.502c2.545,0,5.124-0.648,7.486-2.012l83.486-48.2    C145.449,337.15,147.907,327.976,143.765,320.802z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M477.702,128.003c-4.142-7.175-13.315-9.632-20.49-5.49l-83.484,48.2c-7.174,4.141-9.632,13.315-5.49,20.489    c2.778,4.813,7.82,7.503,13.004,7.503c2.544,0,5.124-0.648,7.486-2.012l83.484-48.2    C479.386,144.351,481.844,135.177,477.702,128.003z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M191.201,368.239c-7.174-4.144-16.349-1.685-20.49,5.49l-48.2,83.485c-4.142,7.174-1.684,16.348,5.49,20.49    c2.362,1.364,4.941,2.012,7.486,2.012c5.184,0,10.227-2.69,13.004-7.502l48.2-83.485    C200.833,381.555,198.375,372.381,191.201,368.239z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
            <g>
                <g>
                    <path d="M384.001,34.3c-7.175-4.144-16.349-1.685-20.49,5.49l-48.199,83.483c-4.143,7.174-1.685,16.348,5.49,20.49    c2.362,1.364,4.941,2.012,7.486,2.012c5.184,0,10.226-2.69,13.004-7.502l48.199-83.483    C393.633,47.616,391.175,38.442,384.001,34.3z" fill={props.white ? '#fff' : '#933EC5'} />
                </g>
            </g>
        </svg>
    );
}

export interface XButtonStyleProps extends XLayoutProps {
    style?: 'normal' | 'dark' | 'important' | 'google';
    size?: 'large' | 'medium' | 'normal';
    bounce?: boolean;
    loading?: boolean;
    disabled?: boolean;
    icon?: string;
    accent?: boolean;
    borderless?: boolean;
}

export interface XButtonProps extends XLinkProps, XButtonStyleProps {

}

const loading = glamor.keyframes({
    '0%': { transform: `rotate(0deg)` },
    '100%': { transform: `rotate(360deg)` }
});

let textColors = {
    'normal': '#525f7f',
    'dark': '#ffffff',
    'important': '#ffffff',
    'google': '#525f7f'
};

let textHoveredColors = {
    'normal': '#32325d',
    'dark': '#ffffff',
    'important': '#ffffff',
    'google': '#32325d'
};

let backgroundColors = {
    'normal': '#ffffff',
    'dark': '#6B50FF',
    'important': '#3ecf8e',
    'google': '#ffffff'
};

let backgroundHoveredColors = {
    'normal': undefined,
    'dark': '#8571f3',
    'important': undefined,
    'google': undefined
};

let backgroundPressedColors = {
    'normal': undefined,
    'dark': '#5032f3',
    'important': undefined,
    'google': undefined
};

let fontSize = {
    'normal': '13px',
    'medium': '14px',
    'large': '15px'
};

let iconSize = {
    'normal': '15px',
    'medium': '18px',
    'large': '20px'
};

let paddings = {
    'normal': '6px 14px',
    'medium': '10px 18px',
    'large': '16px 20px'
};

export const XButtonComponent = withLayout(Glamorous<XButtonProps>(XLink)((props) => {
    let style = props.style !== undefined && props.style !== 'normal' ? props.style : 'normal';
    let size = props.size !== undefined && props.size !== 'normal' ? props.size : 'normal';
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

        padding: props.borderless ? undefined : paddings[size],

        color: props.accent ? '#4428e0' : (props.loading ? 'transparent' : textColors[style]),
        backgroundColor: props.accent ? '#fff' : backgroundColors[style],

        border: props.borderless ? undefined : (props.accent ? '1px solid #4428e0' : undefined),
        borderRadius: '4px',

        boxShadow: props.borderless ? undefined : ('0 0 0 1px rgba(50,50,93,.1), 0 2px 5px 0 rgba(50,50,93,.08), 0 1px 1.5px 0 rgba(0,0,0,.07), 0 1px 2px 0 rgba(0,0,0,.08), 0 0 0 0 transparent'),
        transition: 'box-shadow .08s ease-in,color .08s ease-in,all .15s ease',

        fontSize: fontSize[size],
        lineHeight: '20px',
        fontWeight: 500,

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
        '& > i': {
            opacity: props.loading ? 0 : 1,
            fontSize: iconSize[size],
            lineHeight: '20px'
        },
        '& > span': {
            marginLeft: props.icon ? (props.accent ? 7 : 3) : 0
        },
        '& > .loading-icon': {
            display: 'block',
            position: 'absolute',
            width: '20px',
            height: '20px',
            left: 'calc(50% - 10px)',
            top: 'calc(50% - 10px)',
            animation: `${loading} 2s linear infinite`
        }
    };
}));

export function XButton(props: XButtonProps & { children?: any }) {
    let { icon, children, ...other } = props;
    return (
        <XButtonComponent {...other} icon={icon}>
            {icon && <XIcon icon={icon} />}
            {children && (<span>{children}</span>)}
            {props.loading && <LoadingIcon white={(props.style === 'dark' || props.style === 'important') ? true : false}/>}
        </XButtonComponent>
    );
}