import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useClient } from 'openland-mobile/utils/useClient';
import { ZListHero } from 'openland-mobile/components/ZListHero';
import { plural } from 'openland-y-utils/plural';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { SHeader } from 'react-native-s/SHeader';
import { Platform } from 'react-native';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';
import { UserView } from '../main/components/UserView';
import { FeedChannelSubscribers_subscribers } from 'openland-api/Types';
import { SFlatList } from 'react-native-s/SFlatList';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { FeedChannelWritersView } from './FeedChannelWritersView';

const getCursor = (q: FeedChannelSubscribers_subscribers) => q.edges.length ? q.edges[q.edges.length - 1].cursor : undefined;

const FeedChannelProfileComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();

    const channel = client.useFeedChannel({ id }, { fetchPolicy: 'cache-and-network' }).channel;
    const { title, about, photo, subscribersCount, subscribed } = channel;

    const initialFollowers = client.useFeedChannelSubscribers({ channelId: id, first: 15 }, { fetchPolicy: 'network-only' }).subscribers;

    const [followers, setFollowers] = React.useState(initialFollowers.edges);
    const [loading, setLoading] = React.useState(false);
    const [cursor, setCursor] = React.useState(getCursor(initialFollowers));

    const handleLoadMore = React.useCallback(async () => {
        if (cursor && !loading) {
            setLoading(true);

            const loaded = (await client.queryFeedChannelSubscribers({
                channelId: id,
                first: 15,
                after: cursor,
            }, { fetchPolicy: 'network-only' })).subscribers;

            setFollowers(current => [...current, ...loaded.edges.filter(m => !current.find(m2 => m2.node.user.id === m.node.user.id))]);
            setLoading(false);
            setCursor(getCursor(loaded));
        }
    }, [id, cursor, loading]);

    const content = (
        <>
            <ZListHero
                photo={photo}
                id={id}
                title={title}
                subtitle={plural(subscribersCount, ['follower', 'followers'])}
                action={!subscribed ? {
                    title: 'Follow',
                    onPress: () => FeedHandlers.ChannelSubscribe(id)
                } : undefined}
            />

            <ZListGroup header="About" headerMarginTop={0}>
                {about && (
                    <ZListItem multiline={true} text={about} copy={true} />
                )}
            </ZListGroup>

            {subscribed && <FeedChannelWritersView channel={channel} router={router} />}

            <ZListHeader text="Followers" counter={subscribersCount} />
        </>
    );

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? 'Info' : title} />
            <ZManageButton onPress={() => FeedHandlers.ChannelManage(channel)} />

            <SFlatList
                data={followers}
                renderItem={({ item }) => (
                    <UserView
                        user={item.node.user}
                        channelRole={item.node.role}
                        onPress={() => router.push('ProfileUser', { id: item.node.user.id })}
                    />
                )}
                keyExtractor={(item, index) => `${index}-${item.node.user.id}`}
                ListHeaderComponent={content}
                onEndReached={() => handleLoadMore()}
                refreshing={loading}
            />
        </>
    );
});

export const FeedChannelProfile = withApp(FeedChannelProfileComponent, { navigationAppearance: 'small-hidden' });
