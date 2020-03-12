import React from 'react';
import { Page } from 'openland-unicorn/Page';
import { USlider } from 'openland-web/components/unicorn/USlider';
import { css } from 'linaria';
import { ListingCompact } from './components/ListingCompact';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { UHeader } from 'openland-unicorn/UHeader';
import { DiscoverCollection } from './components/DiscoverCollection';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { EditorsChoiceItem } from './components/EditorsChoiceItem';
import { getRandomSeed } from './utils/getRandomSeed';
import { normalizePopularItems } from 'openland-y-utils/discover/normalizePopularItems';

const editorsChoiceItem = css`
    width: calc(100% + 16px);
    max-width: 576px;
    flex-shrink: 0;

    &:last-child {
        max-width: 560px;
        width: 100%;
    }
`;

const sliderCollectionItem = css`
    width: 192px;
    flex-shrink: 0;

    &:last-child {
        width: 176px;
    }
`;

const listingsContainer = css`
    margin: 0 -16px;

    & > * {
        width: 50%;
        display: inline-block;
    }

    @media (max-width: 1051px) {
        & > * {
            display: block;
            width: 100%;
        }
    }
`;

export const DiscoverHomeFragment = React.memo(() => {
    const client = useClient();
    const seed = getRandomSeed();

    let rooms = client.useExploreRooms({ seed: seed }, { fetchPolicy: 'cache-and-network' });

    const collections = client.useDiscoverCollectionsShort({ first: 20 });
    const collectionsItems = collections.discoverCollections!.items;

    const editorsChoice = client.useDiscoverEditorsChoice();
    const editorsChoiceItems = editorsChoice.discoverEditorsChoice;

    const isTabVisible = useVisibleTab();

    return (
        <Page track="discover_home" padded={true}>
            <UHeader title="Home" maxWidth={577} />

            <XView maxWidth={560} marginTop={25}>
                {isTabVisible && (
                    <USlider title="Featured" childrenCount={editorsChoiceItems.length}>
                        {editorsChoiceItems.map(item => (
                            <div className={editorsChoiceItem}>
                                <EditorsChoiceItem {...item} />
                            </div>
                        ))}
                    </USlider>
                )}

                <XView marginTop={10} marginBottom={24}>
                    <div className={listingsContainer}>
                        <ListingCompact title="New and growing" items={rooms.discoverNewAndGrowing.items || []} path="/discover/new" />
                        <ListingCompact title="Popular now" items={normalizePopularItems(rooms.discoverPopularNow.items)} path="/discover/popular" />
                    </div>
                </XView>

                {isTabVisible && (
                    <USlider title="Collections" path="/discover/collections" childrenCount={collectionsItems.length}>
                        {collectionsItems.map(collection => (
                            <div className={sliderCollectionItem}>
                                <DiscoverCollection {...collection} />
                            </div>
                        ))}
                    </USlider>
                )}

                <XView marginBottom={40} marginTop={20}>
                    <div className={listingsContainer}>
                        <ListingCompact title="Top premium" items={rooms.discoverTopPremium.items || []} path="/discover/premium" />
                        <ListingCompact title="Top free" items={rooms.discoverTopFree.items || []} path="/discover/free" />
                    </div>
                </XView>
            </XView>
        </Page>
    );
});
