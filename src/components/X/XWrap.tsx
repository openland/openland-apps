import * as React from 'react';

export function XWrap(props: { title?: string; children: any }) {
    return (
        <div className="x-wrap">
            {props.title && <div className="x-wrap--title">{props.title}</div>}
            {props.children}
        </div>
    );
}

export function XWrapBody(props: { className?: string; children: any }) {
    return (
        <div className={'x-wrap--body ' + props.className!!}>
            {props.children}
        </div>
    );
}