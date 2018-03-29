import * as React from 'react';

export function XDimensions(props: { dimensions: number[], convert?: boolean }) {
    let records: string[] = [];
    for (let d of props.dimensions) {
        if (props.convert !== false) {
            records.push(Math.round(d * 3.28084).toFixed(2) + 'ft');
        } else {
            records.push(d.toFixed(2) + 'ft');
        }
    }
    return <span>{records.join(' x ')}</span >;
}