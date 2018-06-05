import '../../globals';
import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XLink } from 'openland-x/XLink';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';

export default withAppBase((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title="Blocked" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Suspended">
                <MessagePage>
                    <MessagePageContent
                        title="Account suspended"
                    >
                        This account has been suspended. Please, contact <XLink href="mailto:support@openland.com">support</XLink> to restore access to your account.
                </MessagePageContent>
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
});