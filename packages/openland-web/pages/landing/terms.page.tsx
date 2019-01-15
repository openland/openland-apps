import * as React from 'react';
import TermsPage from 'openland-landing/terms.page';
import { withAppBase } from 'openland-web/components/withAppBase';
import { AuthRouter } from '../root/AuthRouter';

export default withAppBase('Terms', () => {
    return (
        <AuthRouter>
            <TermsPage />
        </AuthRouter>
    );
});
