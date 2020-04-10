import * as React from 'react';
import { css } from 'linaria';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import {
    AuthSidebarComponent,
    AuthMobileHeader,
} from 'openland-web/pages/root/AuthSidebarComponent';
import { editorsChoiceItem, listingsContainer, sliderCollectionItem } from 'openland-web/fragments/discover/DiscoverHomeFragment';
import { useClient } from 'openland-api/useClient';
import { getRandomSeed } from 'openland-web/fragments/discover/utils/getRandomSeed';
import { XView, XViewRouterContext } from 'react-mental';
import { USlider } from 'openland-web/components/unicorn/USlider';
import { EditorsChoiceItem } from 'openland-web/fragments/discover/components/EditorsChoiceItem';
import { ListingCompact } from 'openland-web/fragments/discover/components/ListingCompact';
import { normalizePopularItems } from 'openland-y-utils/discover/normalizePopularItems';
import { DiscoverCollection } from 'openland-web/fragments/discover/components/DiscoverCollection';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XLoader } from 'openland-x/XLoader';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

const rootContainer = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

const boxContainer = css`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex-grow: 1;
`;

const AuthDiscoverInner = React.memo(() => {
    const client = useClient();
    const seed = getRandomSeed();

    let rooms = client.useExploreRoomsNoAuth({ seed }, { fetchPolicy: 'cache-and-network' });

    const collections = client.useDiscoverCollectionsShort({ first: 20 });
    const collectionsItems = collections.discoverCollections!.items;

    const editorsChoice = client.useDiscoverEditorsChoice();
    const editorsChoiceItems = editorsChoice.discoverEditorsChoice;

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
                <XView maxWidth={560} marginTop={25} alignSelf="center">
                    <USlider title="Featured" childrenCount={editorsChoiceItems.length}>
                        {editorsChoiceItems.map(i => (
                            <div className={editorsChoiceItem} key={i.id}>
                                <EditorsChoiceItem {...i} />
                            </div>
                        ))}
                    </USlider>

                    <XView marginTop={10} marginBottom={24}>
                        <div className={listingsContainer}>
                            <ListingCompact title="Popular now" items={normalizePopularItems(rooms.discoverPopularNow.items)} path="/discover/popular" />
                            <ListingCompact title="New and growing" items={rooms.discoverNewAndGrowing.items || []} path="/discover/new" />
                        </div>
                    </XView>

                    <USlider title="Collections" path="/discover/collections" childrenCount={collectionsItems.length}>
                        {collectionsItems.map(i => (
                            <div className={sliderCollectionItem} key={i.id}>
                                <DiscoverCollection {...i} />
                            </div>
                        ))}
                    </USlider>

                    <XView marginBottom={40} marginTop={20}>
                        <div className={listingsContainer}>
                            <ListingCompact title="Top premium" items={rooms.discoverTopPremium.items || []} path="/discover/premium" />
                            <ListingCompact title="Top free" items={rooms.discoverTopFree.items || []} path="/discover/free" />
                        </div>
                    </XView>
                </XView>
            </XScrollView3>
        </XView>
    );
});

export const AuthDiscoverFragment = React.memo(() => {
    const isMobile = useIsMobile();

    const xRouting = React.useMemo(
        () => ({
            navigate: (to: string) => {
                if (canUseDOM) {
                    window.location.replace(to);
                }
            },
        }),
        [],
    );

    return (
        <div className={rootContainer}>
            {!isMobile && <AuthSidebarComponent />}
            <div className={mainContainer}>
                {isMobile && <AuthMobileHeader />}
                <div className={boxContainer}>

                    <XViewRouterContext.Provider value={xRouting}>

                        <React.Suspense fallback={<XLoader loading={true} />}>
                            <AuthDiscoverInner />
                        </React.Suspense>

                    </XViewRouterContext.Provider>

                </div>
            </div>
        </div>
    );
});