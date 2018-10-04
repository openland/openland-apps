import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';

export default withAppBase('Suspended', (props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.suspended.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="View Suspended">
                <MessagePage>
                    <MessagePageContent title={InitTexts.suspended.title}>
                        {InitTexts.suspended.content}
                    </MessagePageContent>
                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
});