import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withRouter } from 'openland-x-routing/withRouter';
import { InviteLandingComponent } from '../../fragments/invite/InviteLandingComponent';
import { InitTexts } from './_text';
import { css } from 'linaria';
import Glamorous from 'glamorous';
import { AuthRouter } from '../root/AuthRouter';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { UserInfoContext } from 'openland-web/components/UserInfo';

const InfoText = css`
    margin-bottom: 15px;
`;

const Root = Glamorous.div({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
});

const Content = Glamorous.div({
    flex: 1,
});

export const JoinComponent = ({ inviteKey }: { inviteKey: string }) => {
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

    let invitedByUser = undefined;
    if (data.invite && data.invite.creator) {
        invitedByUser = {
            id: data.invite.creator.id,
            name: data.invite.creator.name,
            photo: data.invite.creator.photo,
        };
    }

    return (
        <AuthRouter>
            <XDocumentHead
                title={InitTexts.join.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />

            <Root>
                <Content>
                    {data.invite && (
                        <InviteLandingComponent />
                    )}
                    {!data.invite && (
                        <MessagePageContent title="Join">
                            <div className={InfoText}>{InitTexts.join.unableToFindInvite}</div>
                        </MessagePageContent>
                    )}
                </Content>
            </Root>
        </AuthRouter>
    );
};

export default withAppBase(
    'Join',
    withRouter(props => {
        let inviteKey = props.router.routeQuery.inviteKey;

        return <JoinComponent inviteKey={inviteKey} />;
    }),
);
