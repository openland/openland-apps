import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { AppContent } from '../../../components/App/AppContent';
import { withDeal } from '../../../api';

export default withApp('viewer', withDeal((props) => {
    return (
        <AppContent>
            {}
        </AppContent>
    );
}));