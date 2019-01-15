import * as React from 'react';
import AboutPage from 'openland-landing/about.page';
import { withAppBase } from 'openland-web/components/withAppBase';
import { AuthRouter } from '../root/AuthRouter';

export default withAppBase('About', () => {
    return (
        <AuthRouter>
            <AboutPage />
        </AuthRouter>
    );
});
