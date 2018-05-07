import * as React from 'react';

export function XNumber(props: { value?: number | null }) {
    if (props.value !== undefined && props.value !== null && props.value !== 0) {
        return (
            <span>{props.value.toString()}</span>
        );
    } else {
        return (
            <span>-</span>
        );
    }
}