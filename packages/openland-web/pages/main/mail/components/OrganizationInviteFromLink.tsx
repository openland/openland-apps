import * as React from 'react';
import { InviteLandingComponent } from 'openland-web/fragments/invite/InviteLandingComponent';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';

export const OrganizationInviteFromLink = () => {
    const client = useClient();
    const {
        routeQuery: { inviteKey },
    } = React.useContext(XRouterContext) as XRouter;

    const data = client.useWithoutLoaderAccountInviteInfo({
        inviteKey,
    });

    if (!data || !data.invite) {
        return null;
    }

    return (
        <InviteLandingComponent />
    );
};
