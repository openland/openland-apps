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
    const chatsQuery = JSON.stringify({ isChannel: false });
    const channelsQuery = JSON.stringify({ isChannel: true });
    let rooms = getClient().useAvailableRooms({ chatsQuery, channelsQuery }, { fetchPolicy: 'network-only' });

    let chatsEdges = (rooms.availableChats.edges || []);
    let availableChats = chatsEdges.map(x => x.node);
    let chatsCursor = (rooms.availableChats.edges || []).map(x => x.cursor)[chatsEdges.length - 1];
    let channelsEdges = (rooms.availableChannels.edges || []);
    let availableChannels = channelsEdges.map(x => x.node);
    let channelsCursor = channelsEdges.map(x => x.cursor)[channelsEdges.length - 1];
    let suggestedRooms = rooms.suggestedRooms || [];
    let communities = rooms.communities || [];

    // TODO: remove when api is ready
    let isNewDiscoverReady = false;

    return (
        <>
            {isNewDiscoverReady && <EditorsChoiceList />}
            <ZListGroup
                header="Top groups"
                headerMarginTop={0}
                actionRight={{
                    title: 'See all', onPress: () => props.router.push('GroupList', {
                        after: chatsCursor,
                        query: chatsQuery,
                        initial: availableChats,
                        title: 'Top groups',
                    })
                }}
            >
                {availableChats.map(v => (
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
                header="Top channels"
                actionRight={{
                    title: 'See all', onPress: () => props.router.push('GroupList', {
                        after: channelsCursor,
                        query: channelsQuery,
                        initial: availableChannels,
                        title: 'Top channels',
                    })
                }}
            >
                {availableChannels.map(v => (
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

            {isNewDiscoverReady && <DiscoverCollectionsList />}

            <ZListGroup
                header="Top communities"
                actionRight={{
                    title: 'See all', onPress: () => props.router.push('CommunityList', {
                        initial: communities.edges.map(e => e.node),
                        title: 'Communities',
                    })
                }}
            >
                {communities.edges.map(e => e.node).map(v => (
                    <ZListItem
                        key={v.id}
                        text={v.name}
                        leftAvatar={{
                            photo: v.photo,
                            id: v.id,
                            title: v.name,
                        }}
                        subTitle={<>{v.membersCount + (v.membersCount === 1 ? ' member' : ' members')}<Text style={{ opacity: 0.5 }}> ∙</Text> {v.roomsCount + (v.roomsCount === 1 ? ' chat' : ' chats')}</>}
                        path="ProfileOrganization"
                        pathParams={{ id: v.id }}
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
                <SScrollView>
                    <SDeferred>
                        <RoomsList router={props.router} isDiscoverDone={discoverDone.betaIsDiscoverDone} />
                    </SDeferred>
                </SScrollView>
            </SSearchControler>
        </>
    );
};

export const Explore = withApp(ExplorePage, { navigationAppearance: 'large' });
