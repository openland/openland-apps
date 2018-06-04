import '../globals';
import * as React from 'react';
import { withAppBase } from '../components/withAppBase';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { AuthRouter } from '../components/AuthRouter';

export default withAppBase((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title="App" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Root">
                <XWithRole role="feature-marketplace">
                    <XPageRedirect path="/home" />
                </XWithRole>
                <XWithRole role="feature-marketplace" negate={true}>
                    <XPageRedirect path="/map" />
                </XWithRole>
            </XTrack>
        </AuthRouter>
    );
});