import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { Scaffold } from 'openland-web/components/Scaffold';
import { XView } from 'react-mental';
import { UserProfileInner } from './components/UserProfileComponent';
import { OrganizationProfileInner } from './components/OrganizationProfileComponent';
import { ResolveShortName_item_User, ResolveShortName_item_Organization } from 'openland-api/Types';
import { useClient } from 'openland-web/utils/useClient';
import { useXRouter } from 'openland-x-routing/useXRouter';

export default withApp('Shortname', 'viewer', (props) => {

    let client = useClient();
    let router = useXRouter();
    let shortname = router.routeQuery.shortname as string;
    let data = client.useResolveShortName({ shortname: shortname }).item

    if (data && data.__typename) {
        let user =
            data.__typename === 'User'
                ? (data as ResolveShortName_item_User)
                : undefined;
        let org =
            data.__typename === 'Organization'
                ? (data as ResolveShortName_item_Organization)
                : undefined;

        return (
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <XView flexDirection="column" width="100%" height="100%" flexShrink={0}>
                        {user && (
                            <UserProfileInner
                                router={router}
                                user={user}
                                hideBack={true}
                            />
                        )}
                        {org && (
                            <OrganizationProfileInner
                                router={router}
                                organization={org}
                                hideBack={true}
                            />
                        )}
                    </XView>
                </Scaffold.Content>
            </Scaffold>
        );
    }

    return <XPageRedirect path="/404" />;
});
