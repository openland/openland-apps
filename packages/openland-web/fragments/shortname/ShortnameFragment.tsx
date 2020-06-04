import * as React from 'react';
import { NotFound } from 'openland-unicorn/NotFound';
import { useClient } from 'openland-api/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UserProfileFragment } from './UserProfileFragment';
import { OrganizationProfileFragment } from './OrganizationProfileFragment';
import { FeedChannelFragment } from './FeedChannelFragment';
import { MessengerFragment } from '../chat/MessengerFragment';
import { DiscoverCollectionFragment } from '../discover/DiscoverCollectionFragment';
import { HubFragment } from '../discussions/HubFragment';
import { DiscussionFragment } from '../discussions/DiscussionFragment';

export const ShortnameFragment = React.memo(() => {
    let client = useClient();
    let unicorn = useUnicorn();
    let data = client.useResolveShortName({ shortname: unicorn.query.shortname }, { fetchPolicy: 'cache-and-network' }).item;
    // remove ts-ignore adfter SharedRoom deletion logic is implemented
    // @ts-ignore
    if (data && data.__typename && !data.isDeleted!) {
        if (data.__typename === 'User') {
            return <UserProfileFragment id={data.id} />;
        }
        if (data.__typename === 'Organization') {
            return <OrganizationProfileFragment id={data.id} />;
        }
        if (data.__typename === 'FeedChannel') {
            return <FeedChannelFragment id={data.id} />;
        }
        if (data.__typename === 'SharedRoom') {
            return <MessengerFragment id={data.id} />;
        }
        if (data.__typename === 'DiscoverChatsCollection') {
            return <DiscoverCollectionFragment id={data.id} />;
        }
        if (data.__typename === 'Channel') {
            if (unicorn.query.id) {
                return <DiscussionFragment id={unicorn.query.id} />;
            }
            return <HubFragment id={data.id} />;
        }
    }

    return <NotFound />;
});