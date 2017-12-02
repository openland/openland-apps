import * as React from 'react';

export function Page(props: React.Props<any>) {
    return (
        <div className="sf-page" style={{ overflowY: 'auto', height: '100vh' }}>
            {props.children}
        </div>
    );
}