import '../init';
import '../../globals';
import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { XButton } from 'openland-x/XButton';
import { InitTexts } from './_text';
import { withInviteActivation } from '../../api/withInviteActivation';
import createHistory from 'history/createBrowserHistory';

export default withAppBase('Invite', withInviteActivation((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.invite.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Join">
                <MessagePage>
                    <MessagePageContent title={InitTexts.invite.title}>
                        <XButton
                            text={InitTexts.invite.joinButton}
                            action={async () => {
                                await props.activate({});
                                createHistory({
                                    forceRefresh: true
                                }).replace('/');
                            }}
                            style="primary"
                        />
                    </MessagePageContent>

                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
}));