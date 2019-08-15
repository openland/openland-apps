import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Text, View, Image, Dimensions } from 'react-native';
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
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';
import { NON_PRODUCTION } from '../Init';

const RoomsList = (props: { router: SRouter }) => {
    let rooms = getClient().useAvailableRooms({ fetchPolicy: 'network-only' });

    let availableChats = rooms.availableChats || [];
    let availableChannels = rooms.availableChannels || [];
    let suggestedRooms = rooms.suggestedRooms || [];
    let communities = rooms.communities || [];

    return (
        <>
            {NON_PRODUCTION && <ZListItem text="Feed" path="Feed" />}

            <ZListGroup
                header="Top groups"
                headerMarginTop={0}
                actionRight={{
                    title: 'See all', onPress: () => props.router.push('GroupList', {
                        query: 'available',
                        isChannel: false,
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
                            key: v.id,
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
                        query: 'available',
                        isChannel: true,
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
                            key: v.id,
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
                            key: v.id,
                            title: v.name,
                        }}
                        subTitle={<>{v.membersCount + (v.membersCount === 1 ? ' member' : ' members')}<Text style={{ opacity: 0.5 }}> ∙</Text> {v.betaPublicRooms.length + (v.betaPublicRooms.length === 1 ? ' chat' : ' chats')}</>}
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
                            key: v.id,
                            title: v.title,
                        }}
                        subTitle={v.membersCount + (v.membersCount === 1 ? ' member' : ' members')}
                        path="Conversation"
                        pathParams={{ flexibleId: v.id }}
                    /> : null
                ))}
            </ZListGroup>
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
                            <Image marginTop={(theme.blurType === 'light' ? -30 : 0) - (small ? 25 : 0)} marginBottom={-25} source={theme.blurType === 'dark' ? require('assets/img-unsupported_dark.png') : require('assets/img-unsupported.png')} />
                            <View alignItems="center" justifyContent="center">
                                {!small && <Text numberOfLines={1} style={{ fontSize: 30, color: theme.foregroundPrimary, marginBottom: 10, fontWeight: FontStyles.Weight.Bold }}>Discover chats</Text>}
                                {<Text numberOfLines={1} style={{ fontSize: 18, color: theme.foregroundPrimary }}>Find the right chats for you</Text>}
                            </View>
                            <ZRoundedButton size={small ? 'default' : 'large'} title="Start" onPress={() => props.router.push("Discover")} />
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
