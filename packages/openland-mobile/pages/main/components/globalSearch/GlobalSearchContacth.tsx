import * as React from 'react';
import { SRouter } from 'react-native-s/SRouter';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { MyContactsSearch_myContactsSearch_edges_node } from 'openland-api/spacex.types';
import { SDeferred } from 'react-native-s/SDeferred';
import { SFlatList } from 'react-native-s/SFlatList';
import { SDevice } from 'react-native-s/SDevice';
import { DeviceConfig } from 'react-native-s/navigation/DeviceConfig';
import { InvalidateSync } from '@openland/patterns';
import { Loader, EmptyView } from './GlobalSearch';
import { ASView } from 'react-native-async-view/ASView';
import { GlobalSearchItemUser } from './GlobalSearchItems';

export interface ContactsSearchProps {
    query: string;
    router: SRouter;
}

const ContactsSearchInner = (props: ContactsSearchProps) => {
    const area = React.useContext(ASSafeAreaContext);
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const { query, router } = props;
    const { edges: initialEdges, pageInfo: initialPageInfo } = client.useMyContactsSearch(
        { query, first: 10, page: 0 },
        { fetchPolicy: 'network-only' },
    ).myContactsSearch;
    const [items, setItems] = React.useState<MyContactsSearch_myContactsSearch_edges_node[]>(
        initialEdges.map((x) => x.node),
    );
    const [page, setPage] = React.useState<number>(initialPageInfo.currentPage);
    const [hasNextPage, setHasNextPage] = React.useState(initialPageInfo.hasNextPage);
    const [loading, setLoading] = React.useState(false);
    const [invalidator] = React.useState<InvalidateSync>(
        new InvalidateSync(async () => {
            await client.refetchMyContactsSearch(
                { query, first: 10, page: 0 },
                { fetchPolicy: 'network-only' },
            );
        }),
    );

    const handleLoadMore = React.useCallback(async () => {
        if (!loading && hasNextPage) {
            setLoading(true);
            const { edges, pageInfo } = (
                await client.queryMyContactsSearch(
                    { query, first: 10, page: page + 1 },
                    { fetchPolicy: 'network-only' },
                )
            ).myContactsSearch;
            setItems((prev) => prev.concat(edges.map((x) => x.node)));
            setPage(pageInfo.currentPage);
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
            renderItem={({ item }) => (
                <ASView style={{ height: 56 }}>
                    <GlobalSearchItemUser
                        key={`search-item-${item.id}`}
                        item={item}
                        onPress={() => router.push('ProfileUser', { id: item.id })}
                    />
                </ASView>
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

export const GlobalSearchContacts = React.memo((props: ContactsSearchProps) => {
    const theme = React.useContext(ThemeContext);

    return (
        <React.Suspense fallback={<Loader theme={theme} />}>
            <SDeferred>
                <ContactsSearchInner {...props} key={props.query} />
            </SDeferred>
        </React.Suspense>
    );
});
