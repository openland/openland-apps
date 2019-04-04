import * as React from 'react';
import { withAppBase } from '../../components/withAppBase';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { SignInInvite } from './components/signChannelInvite';
import { JoinComponent } from './join.page';
import { AppJoinComponent } from './components/AppJoinComponent';
import { XLoader } from 'openland-x/XLoader';

export default withAppBase('Join', () => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    const { inviteKey } = router.routeQuery;

    const resolvedInvite = client.useWithoutLoaderResolvedInvite({
        key: inviteKey,
    });

    if (resolvedInvite && resolvedInvite.invite) {
        if (resolvedInvite.invite.__typename === 'AppInvite') {
            return <AppJoinComponent inviteKey={inviteKey} />;
        } else if (resolvedInvite.invite.__typename === 'RoomInvite') {
            return <SignInInvite invite={inviteKey} />;
        } else if (resolvedInvite.invite.__typename === 'InviteInfo') {
            return <JoinComponent inviteKey={inviteKey} />;
        }
    }

    return <XLoader loading={true} />;
});
