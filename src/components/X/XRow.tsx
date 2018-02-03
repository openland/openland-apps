import * as React from 'react';

export function XRow(props: { children: any }) {
    return (
        <div className={'x-row'}>
            {props.children}
        </div>
    );
}