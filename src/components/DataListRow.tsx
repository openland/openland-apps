import * as React from 'react';

export function DataListRow(props: { children: any }) {
    return (
        <div className="x-card without-photo">
            {props.children}
        </div>
    );
}