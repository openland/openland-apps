import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { EntityKind, CommunityType, CreateEntity } from './createEntity';

export default withApp(
    'Create Community',
    'viewer',
    withUserInfo(({ user, organization }) => {
        const router = React.useContext(XRouterContext) as XRouter;
        const { routeQuery } = router;
        const inOrganization = routeQuery.orgchannel || routeQuery.org;

        return (
            <>
                <XDocumentHead title={'Create Community'} />

                <CreateEntity
                    myId={user ? user.id : ''}
                    myOrgId={organization ? organization.id : ''}
                    inOrgId={inOrganization}
                    entityKind={EntityKind.COMMUNITY}
                    selectOptions={[
                        {
                            value: CommunityType.COMMUNITY_PUBLIC,
                            label: `Public community`,
                            labelShort: 'Public',
                            subtitle: `Anyone can find and join this community`,
                        },
                        {
                            value: CommunityType.COMMUNITY_PRIVATE,
                            label: `Private community`,
                            labelShort: 'Private',
                            subtitle: `Only invited people can join community and view chats`,
                        },
                    ]}
                />
            </>
        );
    }),
);
