import '../init';
import '../../globals';
import * as React from 'react';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { withInviteInfo } from '../../api/withInviteInfo';
import { InitTexts } from './_text';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';

export default withAppBase('Invite', withInviteInfo((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.join.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Invite">
                <XPageRedirect path="/" />
            </XTrack>
        </AuthRouter>
    );
}));