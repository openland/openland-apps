import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { MessagesNavigation } from './components/MessagesNavigation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { MessageStateProviderComponent } from 'openland-web/components/messenger/MessagesStateContext';

export default withApp('Mail', 'viewer', () => {
    const router = React.useContext(XRouterContext) as XRouter;
    const { path, routeQuery } = router;
    let cid = routeQuery.conversationId;
    let oid = routeQuery.organizationId;
    let uid = routeQuery.userId;

    return (
        <MessageStateProviderComponent router={router}>
            <MessagesNavigation path={path} cid={cid} oid={oid} uid={uid} />
        </MessageStateProviderComponent>
    );
});
