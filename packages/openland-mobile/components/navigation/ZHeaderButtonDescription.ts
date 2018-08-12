import * as React from 'react';

export interface ZHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}