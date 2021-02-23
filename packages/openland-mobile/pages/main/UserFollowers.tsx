import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SFlatList } from 'react-native-s/SFlatList';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { withApp } from 'openland-mobile/components/withApp';
import { useClient } from 'openland-api/useClient';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZTab } from 'openland-mobile/components/ZTab';
import { getCounterValue } from 'openland-y-utils/getCounterValue';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import {
    SocialUserFollowing_socialUserFollowing_items,
    SocialUserFollowers_socialUserFollowers_items,
} from 'openland-api/spacex.types';

import { UserFollowersItem } from './components/UserFollowersItem';

export enum Tabs {
    FOLLOWING = 'FOLLOWING',
    FOLLOWERS = 'FOLLOWERS'
}

const UserFollowersComponent = React.memo<PageProps>((props) => {
    const { uid, initialTab } = props.router.params;
    const client = useClient();
    const theme = React.useContext(ThemeContext);
    const [selectedTab, setSelectedTab] = React.useState<Tabs>(initialTab || Tabs.FOLLOWING);
    const [following, setFollowing] = React.useState<SocialUserFollowing_socialUserFollowing_items[] | null>(null);
    const [followingCursor, setFollowingCursor] = React.useState<string | null>(null);
    const [followersCursor, setFollowersCursor] = React.useState<string | null>(null);
    const [followers, setFollowers] = React.useState<SocialUserFollowers_socialUserFollowers_items[] | null>(null);
    const { followersCount, followingCount, name } = client.useUserFollowers({ id: uid }, { fetchPolicy: 'network-only' }).user;

    React.useEffect(() => {
        (async () => {
            const [initialFollowing, initialFollowers] = await Promise.all([
                client.querySocialUserFollowing({ uid, first: 15 }, { fetchPolicy: 'network-only' }),
                client.querySocialUserFollowers({ uid, first: 15 }, { fetchPolicy: 'network-only' })
            ]);
            setFollowing(initialFollowing.socialUserFollowing.items);
            setFollowingCursor(initialFollowing.socialUserFollowing.cursor);
            setFollowers(initialFollowers.socialUserFollowers.items);
            setFollowersCursor(initialFollowers.socialUserFollowers.cursor);
        })();
    }, [uid]);

    const handleLoadMoreFollowing = React.useCallback(async () => {
        if (followingCursor && following) {
            const followingBatch = (await client.querySocialUserFollowing({ uid, after: followingCursor, first: 15 }, { fetchPolicy: 'network-only' })).socialUserFollowing;
            setFollowing(following.concat(followingBatch.items));
            setFollowingCursor(followingBatch.cursor);
        }
    }, [following, followingCursor, uid]);

    const handleLoadMoreFollowers = React.useCallback(async () => {
        if (followersCursor && followers) {
            const followersBatch = (await client.querySocialUserFollowers({ uid, after: followersCursor, first: 15 }, { fetchPolicy: 'network-only' })).socialUserFollowers;
            setFollowers(followers.concat(followersBatch.items));
            setFollowersCursor(followersBatch.cursor);
        }
    }, [followers, followersCursor, uid]);

    return (
        <>
            <SHeader title={name} />
            <ASSafeAreaView style={{ paddingHorizontal: 16, height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 8, marginBottom: 12 }}>
                    <ZTab
                        selected={selectedTab === Tabs.FOLLOWING}
                        onPress={() => setSelectedTab(Tabs.FOLLOWING)}
                    >
                        <Text>Following </Text>
                        <Text style={{ color: theme.foregroundTertiary }}>
                            {getCounterValue(followingCount, 10000)}
                        </Text>
                    </ZTab>
                    <ZTab
                        selected={selectedTab === Tabs.FOLLOWERS}
                        onPress={() => setSelectedTab(Tabs.FOLLOWERS)}
                    >
                        <Text>Followers </Text>
                        <Text style={{ color: theme.foregroundTertiary }}>
                            {getCounterValue(followersCount, 10000)}
                        </Text>
                    </ZTab>
                </View>
                {selectedTab === Tabs.FOLLOWING && following && following.length === 0 && (
                    <View style={{  justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Image source={require('assets/art-empty.png')} />
                        <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary, textAlign: 'center' }}>No following yet</Text>
                    </View>
                )}
                {selectedTab === Tabs.FOLLOWERS && followers && followers.length === 0 && (
                    <View style={{  justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Image source={require('assets/art-empty.png')} />
                        <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary, textAlign: 'center' }}>No followers yet</Text>
                    </View>
                )}
                {selectedTab === Tabs.FOLLOWING && following && following.length > 0 && (
                    <SFlatList
                        data={following}
                        renderItem={(item) => <UserFollowersItem {...item.item} hideButton={true}/>}
                        contentContainerStyle={{ paddingTop: 0, paddingBottom: 0 }}
                        onEndReached={handleLoadMoreFollowing}
                    />
                )}
                {selectedTab === Tabs.FOLLOWERS && (
                    <SFlatList
                        data={followers}
                        renderItem={(item) => <UserFollowersItem {...item.item}/>}
                        contentContainerStyle={{ paddingTop: 0, paddingBottom: 0 }}
                        onEndReached={handleLoadMoreFollowers}
                    />
                )}
            </ASSafeAreaView>
        </>
    );
});

export const UserFollowers = withApp(UserFollowersComponent, { navigationAppearance: 'small' });