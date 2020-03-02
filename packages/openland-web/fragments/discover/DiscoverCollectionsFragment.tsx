import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';
import { css } from 'linaria';
import { DiscoverCollection } from './components/DiscoverCollection';

const collectionsContainer = css`
    margin-top: 20px;
    margin-left: 16px;

    display: flex;
    flex-wrap: wrap;
`;

export const DiscoverCollectionsFragment = React.memo(() => {
    const client = useClient();
    const collections = client.useDiscoverCollections({ first: 20 });

    if (!collections || !collections.discoverCollections) {
        // TODO replace with empty placeholder
        return null;
    }

    const collectionsItems = collections.discoverCollections.items;

    return (
        <Page track="discover_collections">
            <UHeader title="Collections" />

            <div className={collectionsContainer}>
                {collectionsItems.map((collection => (
                    <DiscoverCollection {...collection} />
                )))}
            </div>

        </Page>
    );
});
