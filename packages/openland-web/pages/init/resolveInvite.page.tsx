import * as React from 'react';
import { withAppBase } from '../../components/withAppBase';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { SignInInvite } from './components/signChannelInvite';
import { JoinFragment } from './JoinFragment';
import { AppJoinComponent } from './components/AppJoinComponent';
import { XLoader } from 'openland-x/XLoader';
import * as Cookie from 'js-cookie';

export const ResolveInviteComponent = () => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    let { inviteKey } = router.routeQuery;

    inviteKey = Cookie.get('x-openland-app-invite') || Cookie.get('x-openland-org-invite') || inviteKey;

    const resolvedInvite = client.useWithoutLoaderResolvedInvite({
        key: inviteKey,
    });

    if (resolvedInvite && resolvedInvite.invite) {
        if (resolvedInvite.invite.__typename === 'AppInvite') {
            return <AppJoinComponent inviteKey={inviteKey} />;
        } else if (resolvedInvite.invite.__typename === 'RoomInvite') {
            return <SignInInvite invite={inviteKey} isPaid={resolvedInvite.invite.room.isPaid} />;
        } else if (resolvedInvite.invite.__typename === 'InviteInfo') {
            return <JoinFragment inviteKey={inviteKey} />;
        }
    }

    return <XLoader loading={true} />;
};

export default withAppBase('Join', () => {
    return <ResolveInviteComponent />;
});
