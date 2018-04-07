import * as React from 'react';

export function ProjectTypes(props: { types: string[] }) {

    let known: any[] = [];
    let first = true;
    for (let k of props.types) {

        if (k === 'kassita-1') {
            if (!first) {
                known.push(',');
            } else {
                first = false;
            }
            known.push(<span>Elemynt<sup>1</sup></span>);
        } else if (k === 'kassita-2') {
            if (!first) {
                known.push(', ');
            } else {
                first = false;
            }
            known.push(<span>Elemynt<sup>2</sup></span>);
        }
    }
    if (known.length === 0) {
        return <span>No compatible buildings</span>;
    } else {
        return <span>{known}</span>;
    }
}