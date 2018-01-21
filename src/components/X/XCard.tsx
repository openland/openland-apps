import * as React from 'react';

export function XCard(props: { children: any }) {
    return (
        <div className={'x-card'}>
            {props.children}
        </div>
    );
}