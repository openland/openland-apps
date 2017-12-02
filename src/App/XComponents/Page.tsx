import * as React from 'react';

export function Page(props: React.Props<any>) {
    return (
        <div className="sf-page">
            {props.children}
        </div>
    );
}