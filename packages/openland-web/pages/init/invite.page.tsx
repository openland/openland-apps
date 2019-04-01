import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { AuthRouter } from '../root/AuthRouter';
import { InitTexts } from './_text';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { withInviteActivation } from '../../api/withInviteActivation';
import { XLoader } from 'openland-x/XLoader';
import { css } from 'linaria';

const InfoText = css`
    margin-bottom: 15px;
`;

const AcceptInviteComponent = ({ inviteKey }: { inviteKey: string }) => {
    const client = useClient();

    const [wasRendered, setWasRendered] = React.useState(false);
    const accept = async () => {
        if (!wasRendered) {
            // OrganizationActivateByInviteMutation
            await client.mutateOrganizationActivateByInvite({
                inviteKey,
            });
            window.location.href = '/';
            setWasRendered(true);
        }
    };

    accept();

    return <XLoader loading={true} />;
};

export const AppJoinComponent = ({ inviteKey }: { inviteKey: string }) => {
    const client = useClient();
    const data = client.useWithoutLoaderAccountAppInviteInfo({
        inviteKey,
    });

    if (data === null) {
        return null;
    }
    return (
        <>
            <XDocumentHead
                title={InitTexts.invite.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <MessagePage>
                {data.invite || (data.appInvite && <AcceptInviteComponent inviteKey={inviteKey} />)}
                {!(data.invite || data.appInvite) && (
                    <MessagePageContent title="Invite">
                        <div className={InfoText}>{InitTexts.invite.unableToFindInvite}</div>
                    </MessagePageContent>
                )}
            </MessagePage>
        </>
    );
};

export default withAppBase('Invite', () => {
    let router = React.useContext(XRouterContext)!;

    const { inviteKey } = router.routeQuery;

    return (
        <AuthRouter>
            <AppJoinComponent inviteKey={inviteKey} />
        </AuthRouter>
    );
});
