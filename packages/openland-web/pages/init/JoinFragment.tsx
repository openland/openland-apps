import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { MessagePageContent } from 'openland-web/components/MessagePageContent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { InviteLandingComponent } from 'openland-web/fragments/invite/InviteLandingComponent';
import { InitTexts } from './_text';
import { AuthRouter } from 'openland-web/pages/root/AuthRouter';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { UserInfoContext } from 'openland-web/components/UserInfo';

export const JoinFragment = ({ inviteKey }: { inviteKey: string }) => {
    const client = useClient();
    let userCtx = React.useContext(UserInfoContext)!!;
    const data = client.useWithoutLoaderAccountInviteInfo({
        inviteKey,
    });

    if (userCtx.isLoggedIn && userCtx.isCompleted) {
        return <XPageRedirect path={`/mail/join/${inviteKey}`} />;
    }

    if (data === null) {
        return null;
    }

    return (
        <AuthRouter>
            <XDocumentHead
                title={InitTexts.join.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />

            <XView flexDirection="column" minHeight="100vh" width="100%" backgroundColor="#fff">
                <XView flexGrow={1}>
                    {data.invite && <InviteLandingComponent />}
                    {!data.invite && (
                        <MessagePageContent title="Join">
                            <XView marginBottom={15}>{InitTexts.join.unableToFindInvite}</XView>
                        </MessagePageContent>
                    )}
                </XView>
            </XView>
        </AuthRouter>
    );
};
