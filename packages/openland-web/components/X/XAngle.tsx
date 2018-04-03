import * as React from 'react';

export function XAngle(props: { value: number }) {
    return <span>{(180 * props.value / Math.PI).toFixed(2).toString()}°</span>;
}