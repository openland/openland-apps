import * as React from 'react';
import { MessagePage } from '../../../components/MessagePage';
import { MessagePageContent } from '../../../components/MessagePageContent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { InitTexts } from '../_text';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';
import { css } from 'linaria';
import { AuthRouter } from '../../root/AuthRouter';
import { XTrack } from 'openland-x-analytics/XTrack';

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
        <XTrack event="invite_landing_view" params={{ invite_type: 'Openland' }}>
            <AuthRouter>
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
            </AuthRouter>
        </XTrack>
    );
};
