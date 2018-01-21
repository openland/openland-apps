import * as React from 'react';

export function XFullScreenPage (props: { underHeader?: boolean, children: any }) {
    return (
        <div className={`x-fullscreen ${props.underHeader? 'under-header' : ''}`}>
            {props.children}
        </div>
    )
}