import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform, Text, View, Image, TextStyle } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { CenteredHeader } from './components/CenteredHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { SDeferred } from 'react-native-s/SDeferred';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';
import { SRouter } from 'react-native-s/SRouter';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { HeaderConfigRegistrator } from 'react-native-s/navigation/HeaderConfigRegistrator';

const RoomsList = (props: { router: SRouter }) => {
    let resp = getClient().useAccountSettings({ fetchPolicy: 'network-only' });
    let isSuper = (resp.me!.primaryOrganization && (resp.me!.primaryOrganization!.id === '61gk9KRrl9ComJkvYnvdcddr4o' || resp.me!.primaryOrganization!.id === 'Y9n1D03kB0umoQ0xK4nQcwjLyQ'));

    let rooms = getClient().useAvailableRooms();
    let availableChats = rooms.availableChats || [];
    let availableChannels = rooms.availableChannels || [];
    let suggestedRooms = rooms.suggestedRooms || [];
    let communities = rooms.communities || [];
    return (
        <>
            {/* <ZListItem text="Organizations" path="ExploreOrganizations" /> */}
            {isSuper && <ZListItem text="Tasks" path="Apps/Tasks" />}
            <ZListItemGroup
                header="Chats for you"
                divider={false}
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
                        navigationIcon={false}
                        pathParams={{ flexibleId: v.id }}
                    /> : null
                ))}
            </ZListItemGroup>

            <ZListItemGroup
                header="Top chats"
                divider={false}
                actionRight={{
                    title: 'See all', onPress: () => props.router.push('GroupList', {
                        query: 'available',
                        isChannel: false,
                        initial: availableChats,
                        title: 'Top chats',
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
                        navigationIcon={false}
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListItemGroup>

            <ZListItemGroup
                header="Top channels"
                divider={false}
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
                        navigationIcon={false}
                        pathParams={{ flexibleId: v.id }}
                    />
                ))}
            </ZListItemGroup>

            <ZListItemGroup
                header="Top communities"
                divider={false}
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
                        subTitle={<>{v.betaPublicRooms.length + (v.betaPublicRooms.length === 1 ? 'group' : ' groups')}<Text style={{ opacity: 0.5 }}> ∙</Text> {v.membersCount + (v.membersCount === 1 ? 'member' : ' members')}</>}
                        navigationIcon={false}
                        path="ProfileOrganization"
                        pathParams={{ id: v.id }}
                    />
                ))}
            </ZListItemGroup>

        </>
    );
};

const ExplorePage = (props: PageProps) => {
    let discoverDone = getClient().useDiscoverIsDone({ fetchPolicy: 'network-only' });
    let theme = React.useContext(ThemeContext);
    if (!discoverDone.betaIsDiscoverDone) {
        return (
            <>
                <HeaderConfigRegistrator config={{ hairline: 'hidden' }} />
                <ASSafeAreaContext.Consumer>
                    {sa => (
                        <View width="100%" height="100%" justifyContent="space-between" alignItems="center" paddingTop={sa.top} paddingBottom={sa.bottom}>
                            <Image marginTop={theme.blurType === 'light' ? -30 : 0} marginBottom={-25} source={theme.blurType === 'dark' ? require('assets/img-unsupported_dark.png') : require('assets/img-unsupported.png')} />
                            <View alignItems="center" justifyContent="center">
                                <Text style={{ fontSize: 30, color: theme.textColor, marginBottom: 10, fontWeight: TextStyles.weight.bold } as TextStyle}>Discover chats</Text>
                                <Text style={{ fontSize: 18, color: theme.textColor }}>Find the right chats for you</Text>
                            </View>

                            <ZRoundedButton size="large" title="Start" onPress={() => props.router.push("Discover")} />
                            <View />
                        </View>
                    )}
                </ASSafeAreaContext.Consumer>
            </>
        );
    }
    return (
        <>
            {Platform.OS === 'ios' && <SHeader title="Discover" />}
            {Platform.OS === 'android' && <CenteredHeader title="Discover" padding={98} />}
            <SHeaderButton
                title="New"
                icon={
                    Platform.OS === 'ios'
                        ? require('assets/ic-compose-26.png')
                        : require('assets/ic-edit.png')
                }
                onPress={() => props.router.push('Compose')}
            />
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
