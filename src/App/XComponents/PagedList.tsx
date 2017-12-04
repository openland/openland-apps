import * as React from 'react';

export function PagedList(props: { children?: any }) {
    return (
        <div className="x-in">
            <div className="x-container is-wide">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export function PagedListItems(props: { title: string, children?: any }) {
    return (
        <div className="col-xs-12 col-lg-9">
            <div className="x-in--title">{props.title}</div>
            {props.children}
        </div>
    );
}