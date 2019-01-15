import * as React from 'react';
import PrivacyPage from 'openland-landing/privacy.page';
import { withAppBase } from 'openland-web/components/withAppBase';
import { AuthRouter } from '../root/AuthRouter';

export default withAppBase('Privacy', () => {
    return (
        <AuthRouter>
            <PrivacyPage />
        </AuthRouter>
    );
});
