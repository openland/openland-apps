import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useClient } from 'openland-mobile/utils/useClient';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { EntityHeader } from './components/EntityHeader';
import { plural } from 'openland-y-utils/plural';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';
import { FeedChannelAdminRole } from 'openland-api/Types';
import { SFlatList } from 'react-native-s/SFlatList';
import { DataSourceFeedItem } from 'openland-engines/feed/types';
import { FeedPostView } from 'openland-mobile/feed/FeedPostView';
import { FeedDateView } from 'openland-mobile/feed/FeedDateView';
import { View } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { convertItems } from 'openland-engines/feed/convert';
import { FeedEmptyView } from './components/FeedEmptyView';

const FeedChannelComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();
    const messenger = getMessenger();

    const channel = client.useFeedChannel({ id }, { fetchPolicy: 'cache-and-network' }).channel;
    const { title, photo, subscribersCount, subscribed, myRole } = channel;
    const canPost = myRole === FeedChannelAdminRole.Creator || myRole === FeedChannelAdminRole.Editor;

    const initialContent = client.useFeedChannelContent({ id, first: 15 }, { fetchPolicy: 'network-only' }).content;
    const [posts, setPosts] = React.useState(convertItems(initialContent.items, messenger.engine));
    const [loading, setLoading] = React.useState(false);
    const [cursor, setCursor] = React.useState(initialContent.cursor);

    const renderItem = React.useCallback((data: { item: DataSourceFeedItem }) => {
        if (data.item.type === 'post') {
            return <FeedPostView item={data.item} />;
        }

        if (data.item.type === 'date') {
            return <FeedDateView item={data.item} />;
        }

        return <View />;
    }, []);

    const renderEmpty = React.useCallback(() => (
        <FeedEmptyView
            title="Post something"
            subtitle="Create the first post in the channel"
            action="Create post"
            onPress={() => FeedHandlers.Create(channel)}
        />
    ), []);

    const handleLoadMore = React.useCallback(async () => {
        if (cursor && !loading) {
            setLoading(true);

            const loaded = (await client.queryFeedChannelContent({
                id,
                first: 15,
                after: cursor,
            }, { fetchPolicy: 'network-only' })).content;

            setPosts(current => [...current, ...convertItems(loaded.items.filter(m => !current.find(m2 => m2.key === m.id)), messenger.engine)]);
            setLoading(false);
            setCursor(loaded.cursor);
        }
    }, [id, cursor, loading]);

    return (
        <>
            <SHeaderView>
                <EntityHeader
                    avatar={{ photo, title, id }}
                    title={title}
                    subtitle={plural(subscribersCount, ['follower', 'followers'])}
                    onPress={() => router.push('FeedChannelProfile', { id })}
                />
            </SHeaderView>

            {!subscribed && <SHeaderButton key="btn-follow" title="Follow" onPress={() => FeedHandlers.ChannelSubscribe(id)} />}
            {subscribed && canPost && <SHeaderButton key="btn-create" title="Create" icon={require('assets/ic-add-24.png')} onPress={() => FeedHandlers.Create(channel)} />}
            {subscribed && !canPost && <SHeaderButton key="btn-empty" />}

            <SFlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}-${item.key}`}
                onEndReached={() => handleLoadMore()}
                ListEmptyComponent={renderEmpty}
                refreshing={loading}
            />
        </>
    );
});

export const FeedChannel = withApp(FeedChannelComponent, { navigationAppearance: 'small' });
