import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useClient } from 'openland-api/useClient';
import { SFlatList } from 'react-native-s/SFlatList';
import { UserView } from '../main/components/UserView';
import { SHeader } from 'react-native-s/SHeader';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';

const FeedChannelWritersComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();

    const channel = client.useFeedChannel({ id }, { fetchPolicy: 'cache-and-network' }).channel;
    const initialWriters = client.useFeedChannelWriters({ id, first: 15 }, { fetchPolicy: 'network-only' }).writers;
    const [writers, setWriters] = React.useState(initialWriters.items);
    const [loading, setLoading] = React.useState(false);
    const [cursor, setCursor] = React.useState(initialWriters.cursor);

    const handleLoadMore = React.useCallback(async () => {
        if (cursor && !loading) {
            setLoading(true);

            const loaded = (await client.queryFeedChannelWriters({
                id,
                first: 15,
                after: cursor,
            }, { fetchPolicy: 'network-only' })).writers;

            setWriters(current => [...current, ...loaded.items.filter(m => !current.find(m2 => m2.user.id === m.user.id))]);
            setLoading(false);
            setCursor(loaded.cursor);
        }
    }, [id, cursor, loading]);

    return (
        <>
            <SHeader title="Writers" />
            <SFlatList
                data={writers}
                renderItem={({ item }) =>
                    <UserView
                        user={item.user}
                        channelRole={item.role}
                        onPress={() => router.push('ProfileUser', { id: item.user.id })}
                        onLongPress={() => FeedHandlers.ChannelFollowerManage(channel, item)}
                    />
                }
                keyExtractor={(item, index) => `${index}-${item.user.id}`}
                onEndReached={() => handleLoadMore()}
                refreshing={loading}
            />
        </>
    );
});

export const FeedChannelWriters = withApp(FeedChannelWritersComponent, { navigationAppearance: 'small' });
