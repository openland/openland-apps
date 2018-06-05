import '../../globals';
import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';

export default withAppBase((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title="Need Info" titleSocial="Openland - land acquisition platfom" />
            <XTrack event="View Need Info">
                <MessagePage>
                    <MessagePageContent title="We need more info">
                        To continue working with system we need more information from you
                    </MessagePageContent>
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
});