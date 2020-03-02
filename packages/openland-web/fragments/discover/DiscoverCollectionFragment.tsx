import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { Listing } from './components/Listing';

export const DiscoverCollectionFragment = React.memo(() => {
    const client = useClient();
    const unicorn = useUnicorn();
    const { collectionId } = unicorn.query;

    const collection = client.useDiscoverCollection({ id: collectionId });

    if (!collection.discoverCollection) {
        // TODO replace with empty placeholder
        return null;
    }

    const title = collection.discoverCollection.title;
    const chats = collection.discoverCollection.chats;

    return (
        <Page track="discover_collection">
            <UHeader title={title} />
            <Listing items={chats} />
        </Page>
    );
});
