import * as React from 'react';
import { NotFound } from 'openland-unicorn/NotFound';
import { useClient } from 'openland-web/utils/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UserProfileFragment } from './UserProfileFragment';
import { OrganizationProfileFragment } from './OrganizationProfileFragment';
import { FeedChannelFragment } from './FeedChannelFragment';

export const ShortnameFragment = React.memo(() => {
    let client = useClient();
    let unicorn = useUnicorn();
    let data = client.useResolveShortName({ shortname: unicorn.id }, { fetchPolicy: 'cache-and-network' }).item;

    if (data && data.__typename) {
        if (data.__typename === 'User') {
            return <UserProfileFragment id={data.id} />;
        }
        if (data.__typename === 'Organization') {
            return <OrganizationProfileFragment id={data.id} />;
        }
        if (data.__typename === 'FeedChannel') {
            return <FeedChannelFragment id={data.id} />;
        }
    }

    return <NotFound />;
});