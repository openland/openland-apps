import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useClient } from 'openland-mobile/utils/useClient';
import { SFlatList } from 'react-native-s/SFlatList';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { CheckListBoxWraper } from '../main/modals/UserMultiplePicker';
import { View } from 'react-native';
import { FeedChannelFull } from 'openland-api/Types';

const FeedPublishToComponent = React.memo((props: PageProps) => {
    const { router } = props;
    const { channel, action } = router.params as { channel?: FeedChannelFull, action: (selectedId: string) => void };
    const client = useClient();

    const initialChannels = client.useFeedWritableChannels({ first: 15 }, { fetchPolicy: 'network-only' }).channels;
    const [channels, setChannels] = React.useState(channel ? [channel, ...initialChannels.items.filter(i => i.id !== channel.id)] : initialChannels.items);
    const [loading, setLoading] = React.useState(false);
    const [cursor, setCursor] = React.useState(initialChannels.cursor);
    const [selected, setSelected] = React.useState(channel ? channel.id : (initialChannels.items.length ? initialChannels.items[0].id : undefined));

    const handleLoadMore = React.useCallback(async () => {
        if (cursor && !loading) {
            setLoading(true);

            const loaded = (await client.queryFeedWritableChannels({
                first: 15,
                after: cursor,
            }, { fetchPolicy: 'network-only' })).channels;

            setChannels(current => [...current, ...loaded.items.filter(m => !current.find(m2 => m2.id === m.id))]);
            setLoading(false);
            setCursor(loaded.cursor);
        }
    }, [cursor, loading]);

    const handleCreateChannel = React.useCallback(async () => {
        router.present('FeedChannelCreate', {
            action: (created: FeedChannelFull) => {
                setChannels(current => [created, ...current]);
                setSelected(created.id);
            }
        });
    }, []);

    const content = (
        <>
            <View height={8} />
            <ZListItem
                text="Create channel"
                leftIcon={require('assets/ic-channel-glyph-24.png')}
                onPress={handleCreateChannel}
            />
        </>
    );

    const canPost = !!selected;

    return (
        <>
            <SHeader title="Publish" />
            <SHeaderButton key={'btn-' + canPost} title="Done" onPress={() => action(selected!)} disabled={!canPost} />
            <SFlatList
                data={channels}
                renderItem={({ item }) =>
                    <CheckListBoxWraper checked={selected === item.id} isRadio={true}>
                        <ZListItem
                            text={item.title}
                            leftAvatar={{
                                photo: item.photo,
                                key: item.id,
                                title: item.title,
                            }}
                            onPress={() => setSelected(item.id)}
                        />
                    </CheckListBoxWraper>
                }
                keyExtractor={(item, index) => `${index}-${item.id}`}
                onEndReached={() => handleLoadMore()}
                ListHeaderComponent={content}
                refreshing={loading}
            />
        </>
    );
});

export const FeedPublishTo = withApp(FeedPublishToComponent, { navigationAppearance: 'small' });
