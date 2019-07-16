import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { MessagesNavigation } from './components/MessagesNavigation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { MessageStateProviderComponent } from 'openland-web/fragments/chat/messenger/MessagesStateContext';
import { XTrack } from 'openland-x-analytics/XTrack';
import { MessagesStateContext } from 'openland-web/fragments/chat/messenger/MessagesStateContext';

const CheckContextRerender = React.memo(() => {
    const context = React.useContext(MessagesStateContext);
    console.log('CheckContextRerender:', context);
    return null;
});

export default withApp('Mail', 'viewer', () => {
    const router = React.useContext(XRouterContext) as XRouter;
    const { path, routeQuery } = router;
    let cid = routeQuery.conversationId;
    let oid = routeQuery.organizationId;
    let uid = routeQuery.userId;

    return (
        <XTrack event="mail_view">
            <MessageStateProviderComponent router={router} cid={cid}>
                <CheckContextRerender />
                <MessagesNavigation
                    path={path}
                    cid={cid}
                    oid={oid}
                    uid={uid}
                    isCommentsNotifications={path === '/notifications/comments'}
                />
            </MessageStateProviderComponent>
        </XTrack>
    );
});
