import * as React from 'react';
import { XView } from 'react-mental';
import { MessagePage } from 'openland-web/components/MessagePage';
import { MessagePageContent } from 'openland-web/components/MessagePageContent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { InitTexts } from '../_text';
import { useClient } from 'openland-web/utils/useClient';
import { XLoader } from 'openland-x/XLoader';
import { AuthRouter } from 'openland-web/pages/root/AuthRouter';
import { XTrack } from 'openland-x-analytics/XTrack';

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
    const data = client.useAccountAppInviteInfo({
        inviteKey,
    }, { suspense: false });

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
                {(data.invite || data.appInvite) && <AcceptInviteComponent inviteKey={inviteKey} />}

                {!(data.invite || data.appInvite) && (
                    <MessagePage>
                        <MessagePageContent title="Invite">
                            <XView marginBottom={15}>{InitTexts.invite.unableToFindInvite}</XView>
                        </MessagePageContent>
                    </MessagePage>
                )}
            </AuthRouter>
        </XTrack>
    );
};
