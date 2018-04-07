import * as React from 'react';

export function XNumber(props: { value?: number | null }) {
    if (props.value !== undefined && props.value !== null && props.value !== 0) {
        return (
            <>
                {props.value.toString()}
            </>
        );
    } else {
        return (
            <>-</>
        );
    }
}