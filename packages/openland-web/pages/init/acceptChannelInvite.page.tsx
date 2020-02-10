import * as React from 'react';
import { withAppBase } from 'openland-web/components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { AuthRouter } from 'openland-web/pages/root/AuthRouter';
import { InitTexts } from './_text';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-api/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

const AcceptInviteComponent = () => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    let invite = client.useResolvedInvite({ key: router.routeQuery.invite });

    React.useEffect(() => {
        console.warn(invite);
        if (invite && invite.invite && invite.invite.__typename === 'RoomInvite') {
            if (invite.invite.room.isPremium) {
                window.location.href = `/invite/${router.routeQuery.invite}`;
            } else {
                (async () => {
                    await client.mutateRoomJoinInviteLink({
                        invite: router.routeQuery.invite,
                    });
                    window.location.href = '/';
                })();

            }
        }
    });
    return <XLoader loading={true} />;
};

export default withAppBase('Room Invite', () => {
    return (
        <AuthRouter>
            <XDocumentHead
                title={InitTexts.invite.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <React.Suspense fallback={<XLoader loading={true} />}>
                <AcceptInviteComponent />
            </React.Suspense>
        </AuthRouter>
    );
});
