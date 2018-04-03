import * as React from 'react';

export function XCounter(props: { value: number, oldValue: number | null | undefined }) {
    if (props.oldValue) {
        if (props.oldValue < props.value) {
            return <span>{props.value} <span style={{ color: 'green' }}>(+{props.value - props.oldValue})</span></span>;
        } else if (props.oldValue > props.value) {
            return <span>{props.value} <span style={{ color: 'red' }}>({props.value - props.oldValue})</span></span>;
        }
    }
    return <span>{props.value}</span>;
}