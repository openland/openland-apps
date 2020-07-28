import * as React from 'react';
import { SRouter } from 'react-native-s/SRouter';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { UserShort } from 'openland-api/spacex.types';
import { SDeferred } from 'react-native-s/SDeferred';
import { SFlatList } from 'react-native-s/SFlatList';
import { SDevice } from 'react-native-s/SDevice';
import { DeviceConfig } from 'react-native-s/navigation/DeviceConfig';
import { InvalidateSync } from '@openland/patterns';
import { Loader } from './GlobalSearch';
import { View, Text } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { UserView } from '../UserView';

export interface MembersSearchProps {
    query: string;
    router: SRouter;
}

const EmptyView = React.memo((props: { theme: ThemeGlobal }) => {
    return (
        <View
            style={{
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    ...TextStyles.Body,
                    color: props.theme.foregroundSecondary,
                }}
            >
                Nobody found
            </Text>
        </View>
    );
});

const MembersSearchInner = (props: MembersSearchProps) => {
    const area = React.useContext(ASSafeAreaContext);
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const { query, router } = props;
    const roomId = router.params.roomId as string;
    const { edges: initialEdges, pageInfo: initialPageInfo } = client.useRoomMembersSearch(
        { cid: roomId, query, first: 15 },
        { fetchPolicy: 'network-only' },
    ).chatMembersSearch;
    const [items, setItems] = React.useState<UserShort[]>(
        initialEdges.map((x) => x.node.user),
    );
    const [after, setAfter] = React.useState<string>(initialEdges[initialEdges.length - 1]?.cursor);
    const [hasNextPage, setHasNextPage] = React.useState(initialPageInfo.hasNextPage);
    const [loading, setLoading] = React.useState(false);
    const [invalidator] = React.useState<InvalidateSync>(
        new InvalidateSync(async () => {
            await client.refetchRoomMembersSearch(
                { cid: roomId, query, first: 15 },
                { fetchPolicy: 'network-only' },
            );
        }),
    );

    const handleLoadMore = React.useCallback(async () => {
        if (!loading && hasNextPage) {
            setLoading(true);
            const { edges, pageInfo } = (
                await client.queryRoomMembersSearch(
                    { cid: roomId, query, first: 10, after },
                    { fetchPolicy: 'network-only' },
                )
            ).chatMembersSearch;
            setItems((prev) => prev.concat(edges.map((x) => x.node.user)));
            setAfter(edges[edges.length - 1]?.cursor);
            setHasNextPage(pageInfo.hasNextPage);
            setLoading(false);
        }
    }, [loading]);

    React.useEffect(() => {
        invalidator.invalidate();
    }, [query]);

    if (!items.length) {
        return <EmptyView theme={theme} />;
    }

    return (
        <SFlatList
            data={items}
            keyExtractor={(item, index) => `${index}-${item.id}`}
            renderItem={({ item }) => (
                <UserView
                    user={item}
                    showOrganization={true}
                    onPress={() => props.router.push('ProfileUser', { id: item.id })}
                />
            )}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            scrollEventThrottle={1}
            legacyImplementation={true}
            onEndReachedThreshold={1}
            refreshing={loading}
            onEndReached={handleLoadMore}
            backgroundColor={theme.backgroundPrimary}
            scrollIndicatorInsets={{
                top: area.top - DeviceConfig.statusBarHeight,
                bottom: area.bottom - SDevice.safeArea.bottom,
            }}
        />
    );
};

export const GlobalSearchMembers = React.memo((props: MembersSearchProps) => {
    const theme = React.useContext(ThemeContext);

    return (
        <React.Suspense fallback={<Loader theme={theme} />}>
            <SDeferred>
                <MembersSearchInner {...props} key={props.query} />
            </SDeferred>
        </React.Suspense>
    );
});
