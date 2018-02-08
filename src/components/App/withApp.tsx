import * as React from 'react';
import { withData } from '../../utils/withData';
import { XDocumentAppRoot } from '../X/Scaffold/XDocumentRoot';
import { withAccountQuery } from '../../api';

export function withApp(WrappedComponent: React.ComponentType<{}>) {
    return withData(withAccountQuery((props) => (
        <XDocumentAppRoot>
            <WrappedComponent />
        </XDocumentAppRoot>
    )));
};