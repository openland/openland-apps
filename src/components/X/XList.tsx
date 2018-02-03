import * as React from 'react';

export function XList(props: { children?: any }) {
    return (
        <div className="x-list">
            {props.children}
        </div>
    );
}

export function XListItem(props: { children?: any }) {
    return (
        <div className="x-list-item">
            {props.children}
        </div>
    )
}