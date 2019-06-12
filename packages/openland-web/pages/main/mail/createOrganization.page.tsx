import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { EntityKind, CreateEntity } from './createEntity';

export default withApp(
    'Create Organization',
    'viewer',
    withUserInfo(({ user, organization }) => {
        const router = React.useContext(XRouterContext) as XRouter;
        const { routeQuery } = router;
        const inOrganization = routeQuery.orgchannel || routeQuery.org;

        return (
            <>
                <XDocumentHead title={'Create Organization'} />

                <CreateEntity
                    myId={user ? user.id : ''}
                    myOrgId={organization ? organization.id : ''}
                    inOrgId={inOrganization}
                    entityKind={EntityKind.ORGANIZATION}
                />
            </>
        );
    }),
);
