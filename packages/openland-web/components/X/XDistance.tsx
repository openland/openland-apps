import * as React from 'react';

export function XDistance(props: { value: number }) {
    return (
        <>
            {Math.round(props.value * 3.28084).toString()} ft
        </>
    );
}