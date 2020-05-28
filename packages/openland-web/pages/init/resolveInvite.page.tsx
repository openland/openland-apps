import * as React from 'react';
import { withAppBase } from '../../components/withAppBase';
import { useClient } from 'openland-api/useClient';
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

    inviteKey = Cookie.get('x-openland-app-invite') || inviteKey;

    const resolvedInvite = client.useResolvedInvite({ key: inviteKey }, { suspense: false });

    if (resolvedInvite && resolvedInvite.invite) {
        if (resolvedInvite.invite.__typename === 'AppInvite') {
            return <AppJoinComponent inviteKey={inviteKey} />;
        } else if (resolvedInvite.invite.__typename === 'RoomInvite') {
            return <SignInInvite invite={inviteKey} />;
        } else if (resolvedInvite.invite.__typename === 'InviteInfo') {
            return <JoinFragment inviteKey={inviteKey} />;
        }
    }

    return <XLoader loading={true} />;
};

export default withAppBase('Join', () => {
    return <ResolveInviteComponent />;
});
