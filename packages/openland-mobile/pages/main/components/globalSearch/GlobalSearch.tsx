import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { SRouter } from 'react-native-s/SRouter';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { GlobalSearchItem } from './GlobalSearchItems';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SNativeConfig } from 'react-native-s/SNativeConfig';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { GlobalSearchEntryKind, MessagesSearch_messagesSearch } from 'openland-api/spacex.types';
import { SDeferred } from 'react-native-s/SDeferred';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { SFlatList } from 'react-native-s/SFlatList';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { GlobalSearchMessage } from './GlobalSearchMessage';
import { SDevice } from 'react-native-s/SDevice';
import { DeviceConfig } from 'react-native-s/navigation/DeviceConfig';
import { InvalidateSync } from '@openland/patterns';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { handleGlobalInvitePress } from '../../Settings';

export interface GlobalSearchProps {
    query: string;
    router: SRouter;
    kinds?: GlobalSearchEntryKind[];

    onOrganizationPress?: (id: string, title: string) => void;
    onUserPress?: (id: string, title: string) => void;
    onGroupPress?: (id: string, title: string) => void;
    onMessagePress?: (id: string) => void;
}

export const EmptyView = React.memo((props: { theme: ThemeGlobal }) => (
    <View
        style={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            flexGrow: 1,
            justifyContent: 'center',
            padding: 32
        }}
    >
        <Text
            style={{
                ...TextStyles.Title2,
                textAlign: 'center',
                color: props.theme.foregroundPrimary,
                marginBottom: 4
            }}
            allowFontScaling={false}
        >
            Nothing found
        </Text>
        <Text
            style={{
                ...TextStyles.Body,
                textAlign: 'center',
                color: props.theme.foregroundSecondary,
                marginBottom: 16
            }}
            allowFontScaling={false}
        >
            Didn’t find your friends at Openland? Let’s invite them to stay in touch
        </Text>
        <View alignItems="center">
            <ZButton title="Invite friends" onPress={handleGlobalInvitePress} />
        </View>
    </View>
));

const GlobalSearchInner = (props: GlobalSearchProps) => {
    const theme = React.useContext(ThemeContext);
    const items = getClient().useGlobalSearch({ query: props.query, kinds: props.kinds }).items;

    return (
        <SScrollView keyboardDismissMode="on-drag" backgroundColor={theme.backgroundPrimary}>
            {items.length === 0 && <EmptyView theme={theme} />}
            {items.map((item, index) => (
                <GlobalSearchItem key={`search-item-${index}-${item.id}`} item={item} {...props} />
            ))}
        </SScrollView>
    );
};

const getCursor = (data: MessagesSearch_messagesSearch) => {
    if (data.pageInfo.hasNextPage && data.edges.length) {
        return data.edges[data.edges.length - 1].cursor;
    }

    return null;
};

const constructVariables = (query: string, after?: string | null) => ({
    query: JSON.stringify({
        $and: [{ text: query }, { isService: false }],
    }),
    sort: JSON.stringify([{ createdAt: { order: 'desc' } }]),
    first: 20,
    after
});

const GlobalSearchWithMessagesInner = (props: GlobalSearchProps & { onMessagePress: (id: string) => void; }) => {
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const area = React.useContext(ASSafeAreaContext);

    const [messagesInvalidator] = React.useState<InvalidateSync>(new InvalidateSync(async () => {
        await client.refetchMessagesSearch(constructVariables(props.query), { fetchPolicy: 'network-only' });
        await client.refetchGlobalSearch({ query: props.query }, { fetchPolicy: 'network-only' });
    }));

    const items = client.useGlobalSearch({ query: props.query, kinds: props.kinds }).items;
    const initialData = client.useMessagesSearch(constructVariables(props.query), { fetchPolicy: 'cache-and-network' }).messagesSearch;

    const initialCursor = getCursor(initialData);

    const [loadingMore, setLoadingMore] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [messages, setMessages] = React.useState(initialData.edges);

    React.useEffect(() => {
        messagesInvalidator.invalidate();
    }, [props.query]);

    const handleNeedMore = React.useCallback(async () => {
        if (loadingMore || !after) {
            return;
        }

        setLoadingMore(true);

        const loaded = (await client.queryMessagesSearch(constructVariables(props.query, after))).messagesSearch;
        const cursor = getCursor(loaded);

        setAfter(cursor);
        setMessages(prev => prev.concat(loaded.edges));
        setLoadingMore(false);
    }, [after, loadingMore]);

    if ((items.length === 0) && (messages.length === 0)) {
        return <EmptyView theme={theme} />;
    }

    const content = (
        <>
            {items.map((item, index) => (
                <GlobalSearchItem key={`search-item-${index}-${item.id}`} item={item} {...props} />
            ))}
            {messages.length > 0 && <ZListHeader text="Messages" marginTop={items.length === 0 ? 0 : undefined} />}
        </>
    );

    return (
        <SFlatList
            data={messages}
            renderItem={({ item }) => <GlobalSearchMessage item={item.node} key={item.node.message.id} onPress={() => props.onMessagePress(item.node.message.id)} />}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            scrollEventThrottle={1}
            legacyImplementation={true}
            onEndReachedThreshold={1}
            backgroundColor={theme.backgroundPrimary}
            ListHeaderComponent={content}
            onEndReached={handleNeedMore}
            refreshing={loadingMore}
            scrollIndicatorInsets={{ top: area.top - DeviceConfig.statusBarHeight, bottom: area.bottom - SDevice.safeArea.bottom }}
            ListFooterComponent={loadingMore ? (
                <View height={56} alignItems="center" justifyContent="center">
                    <LoaderSpinner />
                </View>
            ) : undefined}
        />
    );
};

export const Loader = React.memo((props: { theme: ThemeGlobal }) => {
    return (
        <ASSafeAreaContext.Consumer>
            {area => (
                <View
                    minHeight={Dimensions.get('screen').height}
                    paddingTop={area.top}
                    paddingBottom={area.bottom}
                    backgroundColor={props.theme.backgroundPrimary}
                >
                    {SNativeConfig.loader}
                </View>
            )}
        </ASSafeAreaContext.Consumer>
    );
});

export const GlobalSearch = React.memo((props: GlobalSearchProps) => {
    const theme = React.useContext(ThemeContext);

    return (
        <React.Suspense fallback={<Loader theme={theme} />}>
            <SDeferred>
                {props.onMessagePress && <GlobalSearchWithMessagesInner {...props} onMessagePress={props.onMessagePress} key={props.query} />}
                {!props.onMessagePress && <GlobalSearchInner {...props} />}
            </SDeferred>
        </React.Suspense>
    );
});
