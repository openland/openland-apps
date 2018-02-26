import * as React from 'react';
import Glamorous from 'glamorous';
import Select, { ReactSelectProps } from 'react-select';

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