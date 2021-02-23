import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Text, View, Image } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { useClient } from 'openland-api/useClient';
import { SDeferred } from 'react-native-s/SDeferred';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';
import { SRouter } from 'react-native-s/SRouter';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { EditorsChoiceList } from './components/discover/EditorsChoiceList';
import { DiscoverCollectionsList } from './components/discover/DiscoverCollectionsList';
import { normalizePopularItems, normalizePopularOrgItems } from 'openland-y-utils/discover/normalizePopularItems';
import {
    DiscoverListItem,
    DiscoverListItemOrg,
    DiscoverListItemVoice
} from './components/discover/DiscoverListItem';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { getRandomSeed } from './DiscoverListing';
import { ComponentRefContext } from './Home';
import { DiscoverCreateList } from './components/discover/DiscoverCreateList';
import { ZListItem } from 'openland-mobile/components/ZListItem';

const ActiveVoiceChats = React.memo((props: PageProps) => {
    const client = useClient();
    const voiceRooms = client.useActiveVoiceChats({ first: 3 }, { fetchPolicy: 'cache-and-network' }).activeVoiceChats;

    React.useLayoutEffect(() => {
        let timer = setInterval(async () => {
            await client.refetchActiveVoiceChats({ first: 3 });
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <ZListGroup
            header="Rooms"
            actionRight={{
                title: 'See all', onPress: () => props.router.push('RoomsFeed', { cursor: voiceRooms.cursor })
            }}
        >
            {voiceRooms.items.length > 0
                ? voiceRooms.items.map(v => <DiscoverListItemVoice key={v.id} item={v} />)
                : (
                    <ZListItem
                        leftIcon={require('assets/ic-add-glyph-24.png')}
                        text="Start room"
                        path="CreateRoom"
                    />
                )
            }
        </ZListGroup>
    );
});

export const RoomsList = (props: { router: SRouter, isDiscoverDone: boolean }) => {
    const theme = useTheme();
    const client = useClient();
    const discoverSeed = getRandomSeed();
    const rooms = client.useExploreRooms({ seed: discoverSeed }, { fetchPolicy: 'cache-and-network' });
    const suggestedRooms = (rooms.suggestedRooms || []).filter(v => v.__typename === 'SharedRoom') as DiscoverSharedRoom[];
    const newRooms = rooms.discoverNewAndGrowing.items || [];
    const popularRooms = normalizePopularItems(rooms.discoverPopularNow.items);
    const topFreeRooms = rooms.discoverTopFree.items || [];
    const topPremiumRooms = rooms.discoverTopPremium.items || [];
    const popularOrgs = normalizePopularOrgItems(rooms.discoverTopOrganizations.items);
    const newOrgs = rooms.discoverNewAndGrowingOrganizations.items || [];

    return (
        <>
            <ActiveVoiceChats {...props} />
            <DiscoverCreateList />
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
            <ZListGroup
                header="Top communities"
                actionRight={popularOrgs.length === 3 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialOrgs: popularOrgs,
                        type: 'top-orgs',
                        after: rooms.discoverTopOrganizations.cursor,
                    })
                } : undefined}
            >
                {popularOrgs.map(v => <DiscoverListItemOrg key={v.id} item={v} />)}
            </ZListGroup>
            <ZListGroup
                header="Top groups"
                actionRight={topFreeRooms.length === 3 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: topFreeRooms,
                        type: 'top-free',
                        after: rooms.discoverTopFree.cursor,
                    })
                } : undefined}
            >
                {topFreeRooms.map(v => <DiscoverListItem key={v.id} item={v} />)}
            </ZListGroup>
            <DiscoverCollectionsList />
            <ZListGroup
                header="New communities"
                actionRight={newOrgs.length === 3 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialOrgs: newOrgs,
                        type: 'new-orgs',
                        after: rooms.discoverNewAndGrowingOrganizations.cursor,
                    })
                } : undefined}
            >
                {newOrgs.map(v => <DiscoverListItemOrg key={v.id} item={v} />)}
            </ZListGroup>
            <ZListGroup
                header="New groups"
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
            <EditorsChoiceList />
            <ZListGroup
                header="Top premium"
                actionRight={topPremiumRooms.length === 3 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: topPremiumRooms,
                        type: 'top-premium',
                        after: rooms.discoverTopPremium.cursor,
                    })
                } : undefined}
            >
                {topPremiumRooms.map(v => <DiscoverListItem key={v.id} item={v} />)}
            </ZListGroup>

            {props.isDiscoverDone ? (
                <>
                    <ZListGroup
                        header="Recommendations"
                        actionRight={suggestedRooms.length > 5 ? {
                            title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                                initialRooms: suggestedRooms,
                                type: 'recommendations',
                            })
                        } : undefined}
                    >
                        {suggestedRooms.slice(0, 5).map(v => <DiscoverListItem key={v.id} item={v} />)}
                    </ZListGroup>
                    <View style={{ height: 32 }} />
                </>
            ) : (
                    <>
                        <LinearGradient
                            colors={[theme.gradient0to100End, theme.gradient0to100Start]}
                            style={{
                                paddingVertical: 16,
                                paddingHorizontal: 32,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={require('assets/art-discover.png')}
                                style={{ width: 240, height: 150, marginBottom: 16 }}
                            />
                            <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginBottom: 4 }}>Get chat recommendations</Text>
                            <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary, marginBottom: 16 }}>Find the right chats for you</Text>
                            <ZButton title="Start" onPress={() => { props.router.push('Discover'); }} />
                        </LinearGradient>
                        <View style={{ height: 16 }} />
                    </>
                )}
        </>
    );
};

const ExplorePage = (props: PageProps) => {
    const client = useClient();
    let discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });
    const scrollRef = React.useContext(ComponentRefContext);

    return (
        <>
            <SHeader title="Discover" />
            <SHeaderButton />
            <SSearchControler
                searchPlaceholder="Groups, communities, and more"
                searchRender={(p) => (
                    <GlobalSearch
                        query={p.query}
                        router={props.router}
                        onUserPress={(id: string) => props.router.push('ProfileUser', { id: id })}
                    />
                )}
            >
                <React.Suspense fallback={<ZLoader />}>
                    <SScrollView style={{ marginTop: -16 }} scrollRef={scrollRef}>
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
