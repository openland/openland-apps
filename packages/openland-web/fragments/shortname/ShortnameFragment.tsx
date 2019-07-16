import * as React from 'react';
import { UserProfile } from 'openland-web/fragments/account/components/UserProfileComponent';
import { NotFound } from 'openland-unicorn/NotFound';
import { OrganizationProfileInner } from 'openland-web/fragments/account/components/OrganizationProfileComponent';
import { ResolveShortName_item_User, ResolveShortName_item_Organization } from 'openland-api/Types';
import { useClient } from 'openland-web/utils/useClient';
import { useXRouter } from 'openland-x-routing/useXRouter';

export const ShortnameFragment = React.memo(() => {
    let client = useClient();
    let router = useXRouter();
    let shortname = router.routeQuery.shortname as string;
    let data = client.useResolveShortName({ shortname: shortname }).item;

    if (data && data.__typename) {
        let user = data.__typename === 'User' ? (data as ResolveShortName_item_User) : undefined;
        let org =
            data.__typename === 'Organization'
                ? (data as ResolveShortName_item_Organization)
                : undefined;
        if (user) {
            return (<UserProfile userId={user.id} hideBack={true} />);
        }
        if (org) {
            return (
                <OrganizationProfileInner
                    router={router}
                    organization={org}
                    hideBack={true}
                />
            );
        }
    }

    return <NotFound />;
});