import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { FeedChannelsSearch } from '../main/components/FeedChannelsSearch';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { useClient } from 'openland-api/useClient';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SFlatList } from 'react-native-s/SFlatList';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { ChannelView } from '../main/components/ChannelView';

const FeedChannelsComponent = React.memo((props: PageProps) => {
    const client = useClient();

    const initialFollowing = client.useFeedSubscriptions({ first: 15 }, { fetchPolicy: 'network-only' }).channels;
    const [following, setFollowing] = React.useState(initialFollowing.items);
    const [loading, setLoading] = React.useState(false);
    const [cursor, setCursor] = React.useState(initialFollowing.cursor);

    const suggested = client.useFeedRecommendedChannels({ first: 10 }, { fetchPolicy: 'cache-and-network' }).search.edges;

    const handleLoadMore = React.useCallback(async () => {
        if (cursor && !loading) {
            setLoading(true);

            const loaded = (await client.queryFeedSubscriptions({
                first: 15,
                after: cursor,
            }, { fetchPolicy: 'network-only' })).channels;

            setFollowing(current => [...current, ...loaded.items.filter(m => !current.find(m2 => m2.id === m.id))]);
            setLoading(false);
            setCursor(loaded.cursor);
        }
    }, [cursor, loading]);

    const header = (
        <>
            {following.length > 0 && <ZListHeader text="Following" marginTop={0} />}
        </>
    );

    const footer = (
        <>
            <ZListGroup header="Suggested" headerMarginTop={following.length <= 0 ? 0 : undefined}>
                {!cursor && suggested.map(s => <ChannelView key={s.node.id} channel={s.node} />)}
            </ZListGroup>
        </>
    );

    return (
        <>
            <SHeader title="Channels" />
            <SHeaderButton title="Create" icon={require('assets/ic-add-24.png')} onPress={() => props.router.push('FeedChannelCreate')} />

            <SSearchControler
                searchRender={(p) => (
                    <FeedChannelsSearch
                        query={p.query}
                        router={props.router}
                    />
                )}
            >
                <SFlatList
                    data={following}
                    renderItem={({ item }) => <ChannelView key={item.id} channel={item} />}
                    keyExtractor={(item, index) => `${index}-${item.id}`}
                    onEndReached={() => handleLoadMore()}
                    ListHeaderComponent={header}
                    ListFooterComponent={footer}
                    refreshing={loading}
                />
            </SSearchControler>
        </>
    );
});

export const FeedChannels = withApp(FeedChannelsComponent, { navigationAppearance: 'large' });
