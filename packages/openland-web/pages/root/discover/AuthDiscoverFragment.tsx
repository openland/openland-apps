import * as React from 'react';
import { editorsChoiceItem, listingsContainer, sliderCollectionItem } from 'openland-web/fragments/discover/DiscoverHomeFragment';
import { useClient } from 'openland-api/useClient';
import { getRandomSeed } from 'openland-web/fragments/discover/utils/getRandomSeed';
import { XView } from 'react-mental';
import { USlider } from 'openland-web/components/unicorn/USlider';
import { EditorsChoiceItem } from 'openland-web/fragments/discover/components/EditorsChoiceItem';
import { ListingCompact } from 'openland-web/fragments/discover/components/ListingCompact';
import { normalizePopularItems } from 'openland-y-utils/discover/normalizePopularItems';
import { DiscoverCollection } from 'openland-web/fragments/discover/components/DiscoverCollection';
import { AuthDiscoverContainer } from './AuthDiscoverContainer';
import { XScrollView3 } from 'openland-x/XScrollView3';

const AuthDiscoverInner = React.memo((props: { seed: number }) => {
    const client = useClient();

    const { discoverPopularNow, discoverCollections, discoverEditorsChoice, discoverNewAndGrowing, discoverTopPremium, discoverTopFree } = client.useDiscoverNoAuth({ seed: props.seed });
    const collections = discoverCollections ? discoverCollections.items : [];
    const editorsChoice = discoverEditorsChoice;

    return (
        <XView
            flexDirection="column"
            flexGrow={1}
            minHeight={0}
            flexBasis={0}
            alignSelf="stretch"
            alignItems="stretch"
        >
            <XScrollView3 flexGrow={1} flexBasis={0} minHeight={0}>
                <XView maxWidth={560} alignSelf="center">

                    <USlider title="Featured" childrenCount={editorsChoice.length}>
                        {editorsChoice.map(i => (
                            <div className={editorsChoiceItem} key={i.id}>
                                <EditorsChoiceItem {...i} />
                            </div>
                        ))}
                    </USlider>

                    <XView marginTop={10} marginBottom={24}>
                        <div className={listingsContainer}>
                            <ListingCompact title="Popular now" items={normalizePopularItems(discoverPopularNow.items)} path="/discover/popular" />
                            <ListingCompact title="New and growing" items={discoverNewAndGrowing.items || []} path="/discover/new" />
                        </div>
                    </XView>

                    <USlider title="Collections" path="/discover/collections" childrenCount={collections.length}>
                        {collections.map(i => (
                            <div className={sliderCollectionItem} key={i.id}>
                                <DiscoverCollection {...i} />
                            </div>
                        ))}
                    </USlider>

                    <XView marginBottom={40} marginTop={20}>
                        <div className={listingsContainer}>
                            <ListingCompact title="Top premium" items={discoverTopPremium.items || []} path="/discover/premium" />
                            <ListingCompact title="Top free" items={discoverTopFree.items || []} path="/discover/free" />
                        </div>
                    </XView>
                </XView>
            </XScrollView3>
        </XView>
    );
});

export const AuthDiscoverFragment = React.memo(() => {
    const seed = React.useMemo(getRandomSeed, []);

    return (
        <AuthDiscoverContainer title="Discover">
            <AuthDiscoverInner seed={seed} />
        </AuthDiscoverContainer>
    );
});
