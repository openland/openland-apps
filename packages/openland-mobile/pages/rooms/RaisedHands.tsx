import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useClient } from 'openland-api/useClient';
import { VoiceChatHandRaised_voiceChatHandRaised_items_user } from 'openland-api/spacex.types';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { ZFollowButton } from 'openland-mobile/components/ZFollowButton';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { usePagination } from 'openland-y-utils/usePagination';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { FlatList } from 'react-native-gesture-handler';

interface RaisedHandsProps {
    hide: () => void;
    roomId: string;
}

const EmptyView = React.memo((props: { theme: ThemeGlobal }) => {
    const { theme } = props;
    const imgSrc = theme.type === 'Light' ? require('assets/art-empty.png') : require('assets/art-empty-dark.png');
    return (
        <View
            style={{
                flexGrow: 1,
                paddingHorizontal: 32,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
                source={imgSrc}
                style={{ width: 240, height: 150, marginBottom: 4 }}
            />
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Title2,
                    color: theme.foregroundPrimary,
                    textAlign: 'center',
                    marginBottom: 6,
                }}
            >
                All quiet
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Body,
                    color: theme.foregroundSecondary,
                    textAlign: 'center',
                }}
            >
                Noone raised their hand
            </Text>
        </View>
    );
});

const RaisedHandUserView = React.memo(
    (props: { user: VoiceChatHandRaised_voiceChatHandRaised_items_user; roomId: string; theme: ThemeGlobal }) => {
        const client = useClient();
        const { user, theme } = props;
        const promoteUser = React.useCallback(async () => {
            await client.mutateVoiceChatPromote({ id: props.roomId, uid: user.id });
        }, []);
        return (
            <View style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center' }}>
                <ZAvatar id={user.id} title={user.name} photo={user.photo} size="medium" />
                <View style={{ marginLeft: 16, width: '100%', flexShrink: 1, paddingLeft: 5 }}>
                    <Text
                        style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}
                        numberOfLines={1}
                    >
                        {user.name}
                    </Text>
                    <Text
                        style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}
                        numberOfLines={1}
                    >
                        {user.followersCount} followers
                    </Text>
                </View>
                <ZFollowButton isFollowing={false} onPress={promoteUser} />
            </View>
        );
    },
);

const RaisedHandsContent = React.memo((props: RaisedHandsProps) => {
    const theme = useTheme();
    const client = useClient();
    const initialRaisedHands = client.useVoiceChatHandRaised({ id: props.roomId, first: 10 }, { fetchPolicy: 'network-only' }).voiceChatHandRaised;
    let { items, loading, loadMore } = usePagination({
        fetchItems: async (after) => {
            return (await client.queryVoiceChatHandRaised({ id: props.roomId, after, first: 10 }, { fetchPolicy: 'network-only' })).voiceChatHandRaised;
        },
        initialCursor: initialRaisedHands.cursor,
        initialItems: initialRaisedHands.items,
        initialAllFetched: !initialRaisedHands.haveMore,
    });
    React.useEffect(() => {
        loadMore();
    }, []);

    if (loading && items.length === 0) {
        return (
            <ZLoader />
        );
    }

    if (items.length === 0) {
        return <EmptyView theme={theme} />;
    }

    return (
        <FlatList
            style={{
                paddingHorizontal: 16,
                flexGrow: 1,
            }}
            data={items}
            renderItem={({ item }) => (
                <RaisedHandUserView user={item.user} theme={theme} roomId={props.roomId} />
            )}
            refreshing={loading}
            onEndReached={loadMore}
            ListFooterComponent={
                loading ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 40 }} >
                        <ZLoader size="small" />
                    </View >
                ) : null
            }
        />
    );
});

export const showRaisedHands = (roomId: string) => {
    showBottomSheet({
        title: 'Raised hands',
        cancelable: true,
        view: ({ hide }) => {
            return <RaisedHandsContent hide={hide} roomId={roomId} />;
        },
    });
};
