import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';
import { css } from 'linaria';
import { DiscoverCollections_discoverCollections_items } from 'openland-api/spacex.types';
import { XCloudImage } from 'openland-x/XCloudImage';
import { TextLabel1, TextSubhead } from 'openland-web/utils/TextStyles';
import { XView } from 'react-mental';

const collectionItem = css`
    margin-right: 16px;
    margin-bottom: 32px;
`;

const collectionsContainer = css`
    margin-top: 20px;
    margin-left: 16px;

    display: flex;
    flex-wrap: wrap;
`;

const collectionPhoto = css`
    width: 176px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
`;

const Collection = React.memo((props: DiscoverCollections_discoverCollections_items) => {
    return (
        <XView path={`/discover/collections/${props.id}`} cursor="pointer">
            <div className={collectionItem}>
                <div className={collectionPhoto}>
                    <XCloudImage photoRef={props.image} width={176} height={100} />
                </div>
                <h2 className={TextLabel1}>{props.title}</h2>
                <XView color="var(--foregroundSecondary)">
                    <span className={TextSubhead}>{props.chatsCount} groups</span>
                </XView>
            </div>
        </XView>
    );
});

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
                    <Collection {...collection} />
                )))}
            </div>

        </Page>
    );
});
