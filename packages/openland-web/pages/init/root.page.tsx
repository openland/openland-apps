import '../init';
import '../../globals';
import * as React from 'react';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';
import { withUserInfo } from '../../components/UserInfo';
import { withAppBase } from '../../components/withAppBase';

export default withAppBase('Root', withUserInfo((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.rootPageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="View Root">
                <XWithRole role="feature-marketplace">
                    <XPageRedirect path="/home" />
                </XWithRole>
                <XWithRole role="feature-marketplace" negate={true}>
                    {props.organization && (
                        < XPageRedirect path={'/o/' + props.organization!!.id} />
                    )}
                    {!props.organization && (
                        < XPageRedirect path={'/pickOrganization'} />
                    )}
                </XWithRole>
            </XTrack>
        </AuthRouter>
    );
}));