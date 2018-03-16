import * as React from 'react';

export function XArea(props: { area: number, convert?: boolean }) {
    let feets = props.area;
    if (props.convert !== false) {
        feets = props.area * 10.7639;
    }
    return <span>{Math.round(feets).toString()} ft<sup>2</sup></span>;
}