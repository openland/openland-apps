import * as React from 'react';
import { SharedRoomKind } from 'openland-api/Types';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { EntityKind, CreateEntity } from './createEntity';

export default withApp(
    'Create Room',
    'viewer',
    withUserInfo(({ user, organization }) => {
        const router = React.useContext(XRouterContext) as XRouter;
        const { routeQuery } = router;
        const isChannel = routeQuery.channel || routeQuery.orgchannel;
        const inOrganization = routeQuery.orgchannel || routeQuery.org;
        const entityKind = isChannel !== undefined ? EntityKind.CHANNEL : EntityKind.GROUP;

        let chatTypeStr = entityKind.toLowerCase();

        return (
            <>
                <XDocumentHead title={'Create Room'} />
                <CreateEntity
                    myId={user ? user.id : ''}
                    myOrgId={organization ? organization.id : ''}
                    inOrgId={inOrganization}
                    entityKind={entityKind}
                    selectOptions={[
                        {
                            value: SharedRoomKind.GROUP,
                            label: `Secret ${chatTypeStr.toLocaleLowerCase()}`,
                            labelShort: 'Secret',
                            subtitle: `People can view and join only by invite from a ${chatTypeStr.toLocaleLowerCase()} member`,
                        },
                        {
                            value: SharedRoomKind.PUBLIC,
                            label: `Shared ${chatTypeStr.toLocaleLowerCase()}`,
                            labelShort: 'Shared',
                            subtitle: `${chatTypeStr} where your organization or community members communicate`,
                        },
                    ]}
                />
            </>
        );
    }),
);
