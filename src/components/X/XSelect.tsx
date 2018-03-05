import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import Select, { ReactSelectProps } from 'react-select';

const SelectAnimationFadeIn = glamor.keyframes({
    '0%': { opacity: 0 },
    'to': { opacity: 1 }
})

const SelectAnimationSpin = glamor.keyframes({
    'to': { transform: 'rotate(1turn)' }
})

export const XSelectDiv = Glamorous(Select)({
    '& .Select-menu > .Select-option.is-focused': {
        backgroundColor: 'rgb(68, 40, 224) !important',
        color: '#fff !important'
    },
    '&.Select': {
        position: 'relative'
    },
    '&.Select input::-webkit-contacts-auto-fill-button, &.Select input::-webkit-credentials-auto-fill-button': {
        display: 'none !important'
    },
    '&.Select input::-ms-clear, &.Select input::-ms-reveal': {
        display: 'none !important'
    },
    '&.Select, &.Select div, &.Select input, &.Select span': {
        boxSizing: 'border-box'
    },
    '&.Select.is-disabled .Select-arrow-zone': {
        cursor: 'default',
        pointerEvents: 'none',
        opacity: .35
    },
    '&.Select.is-disabled > .Select-control': {
        backgroundColor: '#f9f9f9'
    },
    '&.Select.is-disabled > .Select-control:hover': {
        boxShadow: 'none'
    },
    '&.Select.is-open > .Select-control': {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        background: '#fff',
        borderColor: '#b3b3b3 #ccc #d9d9d9'
    },
    '&.Select.is-open > .Select-control .Select-arrow': {
        top: -2,
        borderColor: 'transparent transparent #999',
        borderWidth: '0 5px 5px'
    },
    '&.Select.is-searchable.is-focused:not(.is-open) > .Select-control, &.Select.is-searchable.is-open > .Select-control': {
        cursor: 'text'
    },
    '&.Select.is-focused > .Select-control': {
        background: '#fff'
    },
    '&.Select.is-focused:not(.is-open) > .Select-control': {
        borderColor: '#007eff',
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 0 3px rgba(0, 126, 255, .1)',
        background: '#fff'
    },
    '&.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
        paddingRight: 42
    },
    '&.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value .Select-value-label, &.Select.has-value.Select--single > .Select-control .Select-value .Select-value-label': {
        color: '#333'
    },
    '&.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label, &.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label': {
        cursor: 'pointer',
        textDecoration: 'none'
    },
    '&.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus, &.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:hover, &.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus, &.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:hover': {
        color: '#007eff',
        outline: 'none',
        textDecoration: 'underline'
    },
    '&.Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value a.Select-value-label:focus, &.Select.has-value.Select--single > .Select-control .Select-value a.Select-value-label:focus': {
        background: '#fff'
    },
    '&.Select.has-value.is-pseudo-focused .Select-input': {
        opacity: 0
    },
    '&.Select.is-open .Select-arrow, &.Select .Select-arrow-zone:hover > .Select-arrow': {
        borderTopColor: '#666'
    },
    '&.Select.Select--rtl': {
        direction: 'rtl',
        textAlign: 'right'
    },
    '& .Select-control': {
        backgroundColor: '#fff',
        borderColor: '#d9d9d9 #ccc #b3b3b3',
        borderRadius: 4,
        border: '1px solid #ccc',
        color: '#333',
        cursor: 'default',
        display: 'table',
        borderSpacing: 0,
        borderCollapse: 'separate',
        height: 36,
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        width: '100%'
    },
    '& .Select-control:hover': {
        boxShadow: '0 1px 0 rgba(0, 0, 0, .06)'
    },
    '& .Select-control .Select-input:focus': {
        outline: 'none',
        background: '#fff'
    },
    '&.Select--single > .Select-control .Select-value, .Select-placeholder': {
        bottom: 0,
        color: '#aaa',
        left: 0,
        lineHeight: '34px',
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        right: 0,
        top: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    '& .Select-input': {
        height: 34,
        paddingLeft: 10,
        paddingRight: 10,
        verticalAlign: 'middle'
    },
    '& .Select-input > input': {
        width: '100%',
        background: 'none transparent',
        border: '0 none',
        boxShadow: 'none',
        cursor: 'default',
        display: 'inline-block',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        margin: 0,
        outline: 'none',
        lineHeight: '17px',
        padding: '8px 0 12px',
        WebkitAppearance: 'none'
    },
    '&.is-focused .Select-input > input': {
        cursor: 'text'
    },
    '&.has-value.is-pseudo-focused .Select-input': {
        opacity: 0
    },
    '& .Select-control:not(.is-searchable) > .Select-input': {
        outline: 'none'
    },
    '& .Select-loading-zone': {
        cursor: 'pointer',
        display: 'table-cell',
        textAlign: 'center'
    },
    '& .Select-loading, .Select-loading-zone': {
        position: 'relative',
        verticalAlign: 'middle',
        width: 16
    },
    '& .Select-loading': {
        animation: `${SelectAnimationSpin} .4s infinite linear`,
        height: 16,
        boxSizing: 'border-box',
        borderRadius: '50%',
        border: '2px solid #ccc',
        borderRightColor: '#333',
        display: 'inline-block'
    },
    '& .Select-clear-zone': {
        animation: `${SelectAnimationFadeIn} .2s`,
        color: '#999',
        cursor: 'pointer',
        display: 'table-cell',
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 17
    },
    '& .Select-clear-zone:hover': {
        color: '#d0021b'
    },
    '& .Select-clear': {
        display: 'inline-block',
        fontSize: '18px',
        lineHeight: 1
    },
    '&.Select--multi .Select-clear-zone': {
        width: 17
    },
    '& .Select-arrow-zone': {
        cursor: 'pointer',
        display: 'table-cell',
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 25,
        paddingRight: 5
    },
    '&.Select--rtl .Select-arrow-zone': {
        paddingRight: 0,
        paddingLeft: 5
    },
    '& .Select-arrow': {
        borderColor: '#999 transparent transparent',
        borderStyle: 'solid',
        borderWidth: '5px 5px 2.5px',
        display: 'inline-block',
        height: 0,
        width: 0,
        position: 'relative'
    },
    '& .Select-control > :last-child': {
        paddingRight: 5
    },
    '&.Select--multi .Select-multi-value-wrapper': {
        display: 'inline-block'
    },
    '&.Select .Select-aria-only': {
        position: 'absolute',
        display: 'inline-block',
        height: 1,
        width: 1,
        margin: -1,
        clip: 'rect(0, 0, 0, 0)',
        overflow: 'hidden',
        float: 'left'
    },
    '& .Select-menu-outer': {
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderTopColor: '#e6e6e6',
        boxShadow: '0 1px 0 rgba(0, 0, 0, .06)',
        boxSizing: 'border-box',
        marginTop: -1,
        maxHeight: 200,
        position: 'absolute',
        top: '100%',
        width: '100%',
        zIndex: 1,
        WebkitOverflowScrolling: 'touch'
    },
    '& .Select-menu': {
        maxHeight: 198,
        overflowY: 'auto'
    },
    '& .Select-option': {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        color: '#666',
        cursor: 'pointer',
        display: 'block',
        padding: '8px 10px'
    },
    '& .Select-option:last-child': {
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4
    },
    '& .Select-option.is-selected': {
        backgroundColor: '#f5faff',
        color: '#333'
    },
    '& .Select-option.is-focused': {
        backgroundColor: '#ebf5ff',
        color: '#333'
    },
    '& .Select-option.is-disabled': {
        color: '#ccc',
        cursor: 'default'
    },
    '& .Select-noresults': {
        boxSizing: 'border-box',
        color: '#999',
        cursor: 'default',
        display: 'block',
        padding: '8px 10px'
    },
    '&.Select--multi .Select-input': {
        verticalAlign: 'middle',
        marginLeft: 10,
        padding: 0
    },
    '&.Select--multi.Select--rtl .Select-input': {
        marginLeft: 0,
        marginRight: 10
    },
    '&.Select--multi.has-value .Select-input': {
        marginLeft: 5
    },
    '&.Select--multi .Select-value': {
        backgroundColor: '#ebf5ff',
        borderRadius: 2,
        border: '1px solid #c2e0ff',
        color: '#007eff',
        display: 'inline-block',
        fontSize: '.9em',
        lineHeight: 1.4,
        marginLeft: 5,
        marginTop: 5,
        verticalAlign: 'top'
    },
    '&.Select--multi .Select-value-icon, &.Select--multi .Select-value-label': {
        display: 'inline-block',
        verticalAlign: 'middle'
    },
    '&.Select--multi .Select-value-label': {
        borderBottomRightRadius: 2,
        borderTopRightRadius: 2,
        cursor: 'default',
        padding: '2px 5px'
    },
    '&.Select--multi a.Select-value-label': {
        color: '#007eff',
        cursor: 'pointer',
        textDecoration: 'none'
    },
    '&.Select--multi a.Select-value-label:hover': {
        textDecoration: 'underline'
    },
    '&.Select--multi .Select-value-icon': {
        cursor: 'pointer',
        borderBottomLeftRadius: 2,
        borderTopLeftRadius: 2,
        borderRight: '1px solid #c2e0ff',
        padding: '1px 5px 3px'
    },
    '&.Select--multi .Select-value-icon:focus, &.Select--multi .Select-value-icon:hover': {
        backgroundColor: '#d8eafd',
        color: '#0071e6'
    },
    '&.Select--multi .Select-value-icon:active': {
        backgroundColor: '#c2e0ff',
    },
    '&.Select--multi.Select--rtl .Select-value': {
        marginLeft: 0,
        marginRight: 5
    },
    '&.Select--multi.Select--rtl .Select-value-icon': {
        borderRight: 'none',
        borderLeft: '1px solid #c2e0ff',
    },
    '&.Select--multi.is-disabled .Select-value': {
        backgroundColor: '#fcfcfc',
        border: '1px solid #e3e3e3',
        color: '#333'
    },
    '&.Select--multi.is-disabled .Select-value-icon': {
        cursor: 'not-allowed',
        borderRight: '1px solid #e3e3e3'
    },
    '&.Select--multi.is-disabled .Select-value-icon:active, &.Select--multi.is-disabled .Select-value-icon:focus, &.Select--multi.is-disabled .Select-value-icon:hover': {
        backgroundColor: '#fcfcfc'
    }
})

export type XSelectProps = ReactSelectProps;

export function XSelect(props: XSelectProps) {
    return (
        <XSelectDiv {...props} />
    )
}