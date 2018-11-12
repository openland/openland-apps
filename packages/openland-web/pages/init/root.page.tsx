import * as React from 'react';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';
import { withUserInfo } from '../../components/UserInfo';
import { withAppBase } from '../../components/withAppBase';

export default withAppBase('Root', withUserInfo((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.rootPageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="View Root">
                <XPageRedirect path={'/mail'} />
            </XTrack>
        </AuthRouter>
    );
}));