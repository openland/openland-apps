import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { Platform, Text } from 'react-native';
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
import { getDiscoverSelectedTags } from './Discover';

const RoomsList = (props: { router: SRouter }) => {
    let resp = getClient().useAccountSettings({ fetchPolicy: 'network-only' });
    let isSuper = (resp.me!.primaryOrganization && (resp.me!.primaryOrganization!.id === '61gk9KRrl9ComJkvYnvdcddr4o' || resp.me!.primaryOrganization!.id === 'Y9n1D03kB0umoQ0xK4nQcwjLyQ'));

    let rooms = getClient().useAvailableRooms({ selectedTagsIds: getDiscoverSelectedTags() });
    let availableRooms = rooms.availableRooms || [];
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
                header="Groups and channels"
                divider={false}
                actionRight={{
                    title: 'See all', onPress: () => props.router.push('GroupList', {
                        query: 'available',
                        initial: availableRooms,
                        title: 'Groups and channels',
                    })
                }}
            >
                {availableRooms.map(v => (
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
                header="Communities"
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
