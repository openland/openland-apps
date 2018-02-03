import * as React from 'react';

export function XList(props: { children?: any }) {
    return (
        <div className="x-in--list">
            {props.children}
        </div>
    );
}

export function XListItem(props: { children?: any }) {
    return (
        <div className="x-in--item">
            {props.children}
        </div>
    )
}