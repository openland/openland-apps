import * as React from 'react';

export function XRow(props: { children: any }) {
    return (
        <div className={'row'}>
            {props.children}
        </div>
    );
}