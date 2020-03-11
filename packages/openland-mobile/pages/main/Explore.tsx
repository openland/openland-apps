import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Text, View, Image } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SDeferred } from 'react-native-s/SDeferred';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';
import { SRouter } from 'react-native-s/SRouter';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { EditorsChoiceList } from './components/discover/EditorsChoiceList';
import { DiscoverCollectionsList } from './components/discover/DiscoverCollectionsList';
import { normalizePopularItems } from 'openland-y-utils/discover/normalizePopularItems';
import { DiscoverListItem } from './components/discover/DiscoverListItem';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { getRandomSeed } from './DiscoverListing';

export const RoomsList = (props: { router: SRouter, isDiscoverDone: boolean }) => {
    const theme = useTheme();
    let discoverSeed = getRandomSeed();
    let rooms = getClient().useExploreRooms({seed: discoverSeed}, { fetchPolicy: 'cache-and-network' });
    let suggestedRooms = (rooms.suggestedRooms || []).filter(v => v.__typename === 'SharedRoom') as DiscoverSharedRoom[];
    let newRooms = rooms.discoverNewAndGrowing.items || [];
    let popularRooms = normalizePopularItems(rooms.discoverPopularNow.items);
    let topFreeRooms = rooms.discoverTopFree.items || [];
    let topPremiumRooms = rooms.discoverTopPremium.items || [];

    return (
        <>
            <EditorsChoiceList />
            <ZListGroup
                header="New and growing"
                actionRight={newRooms.length === 3 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: newRooms,
                        type: 'new',
                        after: rooms.discoverNewAndGrowing.cursor,
                    })
                } : undefined}
            >
                {newRooms.map(v => <DiscoverListItem key={v.id} item={v} />)}
            </ZListGroup>

            <ZListGroup
                header="Popular now"
                actionRight={popularRooms.length === 3 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: popularRooms,
                        type: 'popular',
                        after: rooms.discoverPopularNow.cursor,
                    })
                } : undefined}
            >
                {popularRooms.map(v => <DiscoverListItem key={v.id} item={v} />)}
            </ZListGroup>

            <DiscoverCollectionsList  />

            <ZListGroup
                header="Top premium"
                actionRight={topPremiumRooms.length === 5 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: topPremiumRooms,
                        type: 'top-premium',
                        after: rooms.discoverTopPremium.cursor,
                    })
                } : undefined}
            >
                {topPremiumRooms.map(v => <DiscoverListItem key={v.id} item={v} />)}
            </ZListGroup>

            <ZListGroup
                header="Top free"
                actionRight={topFreeRooms.length === 5 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: topFreeRooms,
                        type: 'top-free',
                        after: rooms.discoverTopFree.cursor,
                    })
                } : undefined}
            >
                {topFreeRooms.map(v => <DiscoverListItem key={v.id} item={v} />)}
            </ZListGroup>

            {props.isDiscoverDone ? (
                <>
                    <ZListGroup 
                        header="Recommendations"
                        actionRight={suggestedRooms.length > 5 ? {
                            title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                                initialRooms: suggestedRooms,
                                title: 'Recommendations',
                            })
                        } : undefined}
                    >
                        {suggestedRooms.slice(0, 5).map(v => <DiscoverListItem key={v.id} item={v} />)}
                    </ZListGroup>
                    <View height={32} />
                </>
            ) : (
                <>
                    <LinearGradient 
                        colors={[theme.gradient0to100End, theme.gradient0to100Start]} 
                        paddingVertical={16} 
                        paddingHorizontal={32}
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image
                            source={require('assets/art-discover.png')}
                            style={{ width: 240, height: 150, marginBottom: 16 }}
                        />
                        <Text style={{...TextStyles.Title2, color: theme.foregroundPrimary, marginBottom: 4}}>Get chat recommendations</Text>
                        <Text style={{...TextStyles.Body, color: theme.foregroundSecondary, marginBottom: 16}}>Find the right chats for you</Text>
                        <ZButton title="Start" onPress={() => { props.router.push('Discover'); }} />
                    </LinearGradient>
                    <View height={16} />
                </>
            )}
        </>
    );
};

const ExplorePage = (props: PageProps) => {
    let discoverDone = getClient().useDiscoverIsDone({ fetchPolicy: 'network-only' });

    return (
        <>
            <SHeader title="Discover" />
            <SHeaderButton />
            <SSearchControler
                searchRender={(p) => (
                    <GlobalSearch
                        query={p.query}
                        router={props.router}
                        onUserPress={(id: string) => props.router.push('ProfileUser', { id: id })}
                    />
                )}
            >
                <React.Suspense fallback={<ZLoader />}>
                    <SScrollView marginTop={-16}>
                        <SDeferred>
                            <RoomsList router={props.router} isDiscoverDone={discoverDone.betaIsDiscoverDone} />
                        </SDeferred>
                    </SScrollView>
                </React.Suspense>
            </SSearchControler>
        </>
    );
};

export const Explore = withApp(ExplorePage, { navigationAppearance: 'large' });
