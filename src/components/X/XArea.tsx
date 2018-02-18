import * as React from 'react';

export function XArea(props: { area: number }) {
    let feets = props.area * 10.7639;
    return <span>{Math.round(feets).toString()} ft<sup>2</sup></span>;
}