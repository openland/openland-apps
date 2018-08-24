import * as React from 'react';

export interface FastHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}