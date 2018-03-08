import * as React from 'react';
import { withApp } from '../../components/withApp';
import { AppContent } from '../../components/App/AppContent';

export default withApp('super-admin', () => {
    return (
        <AppContent>
            {}
        </AppContent>
    )
});
