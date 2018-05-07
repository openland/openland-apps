import * as React from 'react';

export function XArea(props: { value: number, valueUnits?: 'metric' | 'imperial' }) {
    let feets = props.value;
    if (props.valueUnits !== 'imperial') {
        feets = props.value * 10.7639;
    }
    return <span>{Math.round(feets).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ft<sup>2</sup></span>;
}