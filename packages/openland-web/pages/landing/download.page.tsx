import * as React from 'react';
import { withAppBase } from 'openland-web/components/withAppBase';
import { AuthRouter } from '../root/AuthRouter';
import { DownloadPage } from 'openland-landing/download.page';

export default withAppBase('Download', () => {
    return (
        <AuthRouter>
            <DownloadPage />
        </AuthRouter>
    );
});
