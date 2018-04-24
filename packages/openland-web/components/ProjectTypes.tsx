import * as React from 'react';

export function ProjectTypes(props: { types: string[] }) {

    let known: any[] = [];
    let first = true;
    let ind = 0;
    for (let k of props.types) {
        ind++;
        if (k === 'kassita-1') {
            if (!first) {
                known.push(',');
            } else {
                first = false;
            }
            known.push(<span key={'tp-' + ind}>Elemynt<sup>1</sup></span>);
        } else if (k === 'kassita-2') {
            if (!first) {
                known.push(', ');
            } else {
                first = false;
            }
            known.push(<span key={'tp-' + ind}>Elemynt<sup>2</sup></span>);
        }
    }
    if (known.length === 0) {
        return <span key={'tp-' + ind}>No compatible buildings</span>;
    } else {
        return <span key={'tp-' + ind}>{known}</span>;
    }
}