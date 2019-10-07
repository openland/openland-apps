import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useClient } from 'openland-mobile/utils/useClient';
import { SFlatList } from 'react-native-s/SFlatList';
import { UserView } from './components/UserView';
import { SHeader } from 'react-native-s/SHeader';

const FeedChannelWritersComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { id } = router.params;
    const client = useClient();

    const initialWriters = client.useFeedChannelAdmins({ id, first: 15 }, { fetchPolicy: 'network-only' }).admins;
    const [writers, setWriters] = React.useState(initialWriters.items);
    const [loading, setLoading] = React.useState(false);
    const [cursor, setCursor] = React.useState(initialWriters.cursor);

    const handleLoadMore = React.useCallback(async () => {
        if (cursor && !loading) {
            setLoading(true);

            const loaded = (await client.queryFeedChannelAdmins({
                id,
                first: 15,
                after: cursor,
            }, { fetchPolicy: 'network-only' })).admins;

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