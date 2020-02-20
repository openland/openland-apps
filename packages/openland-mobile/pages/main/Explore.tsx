import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Text, View, Image, Dimensions, Platform } from 'react-native';
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
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';

export const RoomsList = (props: { router: SRouter }) => {
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

    return (
        <>
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

            <ZListGroup
                header="Chats for you"
                actionRight={{
                    title: 'See all', onPress: () => props.router.push('GroupList', {
                        initial: suggestedRooms,
                        title: 'Chats for you',
                    })
                }}
            >
                {suggestedRooms.filter((s, i) => i < 3).map(v => (
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
    );
};

const ExplorePage = (props: PageProps) => {
    let discoverDone = getClient().useDiscoverIsDone({ fetchPolicy: 'network-only' });
    let theme = React.useContext(ThemeContext);
    let small = Dimensions.get('window').height < 800;

    if (!discoverDone.betaIsDiscoverDone) {
        return (
            <>
                {small && <SHeader title="Discover chats" />}
                <HeaderConfigRegistrator config={{ hairline: 'hidden' }} />
                <ASSafeAreaContext.Consumer>
                    {sa => (
                        <View width="100%" height="100%" justifyContent="space-between" alignItems="center" paddingTop={sa.top} paddingBottom={sa.bottom + (small ? 0 : 50)}>
                            <Image marginTop={(theme.type === 'Light' ? -30 : 0) - (small ? 25 : 0)} marginBottom={-25} source={theme.type === 'Light' ? require('assets/img-unsupported.png') : require('assets/img-unsupported_dark.png')} />
                            <View alignItems="center" justifyContent="center">
                                {!small && <Text numberOfLines={1} style={{ fontSize: 30, color: theme.foregroundPrimary, marginBottom: 10, fontWeight: FontStyles.Weight.Bold }}>Discover chats</Text>}
                                {<Text numberOfLines={1} style={{ fontSize: 18, color: theme.foregroundPrimary }}>Find the right chats for you</Text>}
                            </View>
                            <View marginBottom={(small && Platform.OS === 'ios') ? 32 : undefined}>
                                <ZButton size={small ? 'default' : 'large'} title="Start" onPress={() => props.router.push("Discover")} />
                            </View>
                        </View>
                    )}
                </ASSafeAreaContext.Consumer>
            </>
        );
    }
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
                        <RoomsList router={props.router} />
                    </SDeferred>
                </SScrollView>
            </SSearchControler>
        </>
    );
};

export const Explore = withApp(ExplorePage, { navigationAppearance: 'large' });
