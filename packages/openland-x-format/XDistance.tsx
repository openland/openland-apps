import * as React from 'react';

export function XDistance(props: { value: number, valueUnits?: 'metric' | 'imperial' }) {
    let distance = props.value;
    if (props.valueUnits !== 'imperial') {
        distance = props.value * 3.28084;
    }
    return <span>{Math.round(distance)} ft</span>;
}