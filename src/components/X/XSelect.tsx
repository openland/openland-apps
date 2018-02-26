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
})

export type XSelectProps = ReactSelectProps;

export function XSelect(props: XSelectProps) {
    return (
        <XSelectDiv {...props} />
    )
}