import * as React from 'react';

export function PagedList(props: { children?: any }) {
    return (
        <div className="sf-in">
            <div className="container">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export function PagedListItems(props: { title: string, children?: any }) {
    return (
        <div className="col-lg-9">
            <div className="sf-in--title">{props.title}</div>
            <div className="sf-in--list">
                {props.children}
            </div>
        </div>
    );
}