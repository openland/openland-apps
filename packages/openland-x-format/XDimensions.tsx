import * as React from 'react';

export function XDimensions(props: { value: number[], valueUnits?: 'metric' | 'imperial' }) {
    let records: string[] = [];
    for (let d of props.value) {
        if (props.valueUnits !== 'imperial') {
            records.push(Math.round(d * 3.28084) + ' ft');
        } else {
            records.push(Math.round(d) + ' ft');
        }
    }
    return <span>{records.join(' x ')}</span >;
}