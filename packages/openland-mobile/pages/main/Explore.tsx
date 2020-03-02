import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Text, View, Image } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItem } from 'openland-mobile/components/ZListItem';
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

export const RoomsList = (props: { router: SRouter, isDiscoverDone: boolean }) => {
    const theme = useTheme();
    let discoverSeed = Math.floor(Math.random() * 100);
    let rooms = getClient().useExploreRooms({seed: discoverSeed}, { fetchPolicy: 'cache-and-network' });
    let suggestedRooms = rooms.suggestedRooms || [];
    let newRooms = rooms.discoverNewAndGrowing.items || [];
    let popularRooms = rooms.discoverPopularNow.items || [];
    let topFreeRooms = rooms.discoverTopFree.items || [];
    let topPremiumRooms = rooms.discoverTopPremium.items || [];

    return (
        <>
            <EditorsChoiceList />
            <ZListGroup
                header="New and growing"
                headerMarginTop={0}
                actionRight={newRooms.length === 5 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: newRooms,
                        type: 'new',
                        seed: discoverSeed,
                        after: rooms.discoverNewAndGrowing.cursor,
                        title: 'New and growing',
                    })
                } : undefined}
            >
                {newRooms.map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            id: v.id,
                            title: v.title,
                        }}
                        subTitle={v.membersCount + (v.membersCount === 1 ? ' member' : ' members')}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListGroup>

            <ZListGroup
                header="Popular now"
                headerMarginTop={0}
                actionRight={popularRooms.length === 5 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: popularRooms,
                        type: 'popular',
                        after: rooms.discoverPopularNow.cursor,
                        title: 'Popular now',
                    })
                } : undefined}
            >
                {popularRooms.map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            id: v.id,
                            title: v.title,
                        }}
                        subTitle={v.membersCount + (v.membersCount === 1 ? ' member' : ' members')}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListGroup>

            <DiscoverCollectionsList />

            <ZListGroup
                header="Top premium"
                headerMarginTop={0}
                actionRight={topPremiumRooms.length === 5 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: topPremiumRooms,
                        type: 'top-premium',
                        after: rooms.discoverTopPremium.cursor,
                        title: 'Top premium',
                    })
                } : undefined}
            >
                {topPremiumRooms.map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            id: v.id,
                            title: v.title,
                        }}
                        subTitle={v.membersCount + (v.membersCount === 1 ? ' member' : ' members')}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListGroup>

            <ZListGroup
                header="Top free"
                headerMarginTop={0}
                actionRight={topFreeRooms.length === 5 ? {
                    title: 'See all', onPress: () => props.router.push('DiscoverListing', {
                        initialRooms: topFreeRooms,
                        type: 'top-free',
                        after: rooms.discoverTopFree.cursor,
                        title: 'Top free',
                    })
                } : undefined}
            >
                {topFreeRooms.map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.title}
                        leftAvatar={{
                            photo: v.photo,
                            id: v.id,
                            title: v.title,
                        }}
                        subTitle={v.membersCount + (v.membersCount === 1 ? ' member' : ' members')}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListGroup>

            {props.isDiscoverDone ? (
                <>
                    <ZListGroup header="Recommendations">
                        {suggestedRooms.map(v => (
                            v.__typename === 'SharedRoom' ? <ZListItem
                                key={v.id}
                                text={v.title}
                                leftAvatar={{
                                    photo: v.photo,
                                    id: v.id,
                                    title: v.title,
                                }}
                                subTitle={v.membersCount + (v.membersCount === 1 ? ' member' : ' members')}
                                path="Conversation"
                                pathParams={{ flexibleId: v.id }}
                            /> : null
                        ))}
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
                <SScrollView marginTop={-16}>
                    <SDeferred>
                        <RoomsList router={props.router} isDiscoverDone={discoverDone.betaIsDiscoverDone} />
                    </SDeferred>
                </SScrollView>
            </SSearchControler>
        </>
    );
};

export const Explore = withApp(ExplorePage, { navigationAppearance: 'large' });
