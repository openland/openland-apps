import * as React from 'react';

export function ProjectTypes(props: { types: string[] }) {

    let known: string[] = [];
    for (let k of props.types) {
        if (k === 'kassita-1') {
            known.push('Kassita-1');
        } else if (k === 'kassita-2') {
            known.push('Kassita-2');
        }
    }
    if (known.length === 0) {
        return <span>No compatible buildings</span>;
    } else {
        return <span>{known.join(', ')}</span>;
    }
}