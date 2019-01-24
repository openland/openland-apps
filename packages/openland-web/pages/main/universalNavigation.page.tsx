import * as React from 'react';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { withApp } from 'openland-web/components/withApp';
import { withRouter } from 'openland-x-routing/withRouter';
import { MessagesUniversalNavigation } from './MessagesUniversalNavigation';
import { DirectoryUniversalNavigation } from './DirectoryUniversalNavigation';

export const LinkOverwriteContext = React.createContext<{
    prefix: string;
}>({
    prefix: '',
});

export default withApp(
    'Mail',
    'viewer',
    withRouter(
        withQueryLoader((props: any) => {
            let { router, organizationId, userId } = props;
            const { path, routeQuery } = router;
            let cid = routeQuery.conversationId;
            let oid = organizationId || routeQuery.organizationId;
            let uid = userId || routeQuery.userId;
            let isDirectory = path.includes('/directory');

            return (
                <LinkOverwriteContext.Provider
                    value={{
                        prefix: '/universalNavigation',
                    }}
                >
                    {isDirectory ? (
                        <DirectoryUniversalNavigation path={path} />
                    ) : (
                        <MessagesUniversalNavigation cid={cid} oid={oid} uid={uid} path={path} />
                    )}
                </LinkOverwriteContext.Provider>
            );
        }),
    ),
);
