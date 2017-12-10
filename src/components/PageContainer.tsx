import * as React from 'react';

export function PageContainer(props: React.Props<any>) {
    return (
        <div className="x-page">
            {props.children}
        </div>
    );
}