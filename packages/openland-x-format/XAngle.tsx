import * as React from 'react';

export function XAngle(props: { value: number, valueUnits?: 'degres' | 'radians' }) {
    let angle = props.value;
    if (props.valueUnits !== 'radians') {
        angle = 180 * props.value / Math.PI;
    }
    return <span>{angle.toFixed(2).toString()}°</span>;
}