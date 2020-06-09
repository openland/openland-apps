import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { SRouter } from 'react-native-s/SRouter';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { GlobalSearchItem } from './GlobalSearchItems';
import { randomEmptyPlaceholderEmoji } from 'openland-mobile/utils/tolerance';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SNativeConfig } from 'react-native-s/SNativeConfig';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { GlobalSearchEntryKind, MessagesSearch_messagesSearch } from 'openland-api/spacex.types';
import { SDeferred } from 'react-native-s/SDeferred';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASView } from 'react-native-async-view/ASView';
import { DialogItemViewAsync } from 'openland-mobile/messenger/components/DialogItemViewAsync';
import { SFlatList } from 'react-native-s/SFlatList';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { NON_PRODUCTION } from 'openland-mobile/pages/Init';

export interface GlobalSearchProps {
    query: string;
    router: SRouter;
    kinds?: GlobalSearchEntryKind[];

    onOrganizationPress?: (id: string, title: string) => void;
    onUserPress?: (id: string, title: string) => void;
    onGroupPress?: (id: string, title: string) => void;
    onMessagePress?: (id: string) => void;
}

const EmptyView = React.memo((props: { theme: ThemeGlobal }) => (
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
                fontSize: 22,
                textAlignVertical: 'center',
                color: props.theme.foregroundPrimary,
            }}
        >
            {'Nothing found' + randomEmptyPlaceholderEmoji()}
        </Text>
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
    const messenger = getMessenger();
    const client = getClient();
    const items = client.useGlobalSearch({ query: props.query, kinds: props.kinds }).items;
    const initialData = client.useMessagesSearch(constructVariables(props.query), { fetchPolicy: 'network-only' }).messagesSearch;

    const initialCursor = getCursor(initialData);

    const [loadingMore, setLoadingMore] = React.useState(false);
    const [after, setAfter] = React.useState<string | null>(initialCursor);
    const [messages, setMessages] = React.useState(initialData.edges);

    const handleNeedMore = React.useCallback(async () => {
        if (!NON_PRODUCTION) {
            return;
        }

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
            renderItem={({ item }) => {
                const { message, chat } = item.node;
                const title = chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title;
                const photo = chat.__typename === 'PrivateRoom' ? chat.user.photo : chat.photo;

                return (
                    <ASView key={'msg' + message.id} style={{ height: 80 }}>
                        <DialogItemViewAsync
                            item={{
                                message: message.message || undefined,
                                title,
                                key: chat.id,
                                flexibleId: chat.id,
                                kind: chat.__typename === 'PrivateRoom' ? 'PRIVATE' : chat.kind,
                                unread: 0,
                                fallback: message.fallback,
                                date: parseInt(message.date, 10),
                                photo: photo || undefined,
                                isService: false,
                                isOut: message.sender.id === messenger.engine.user.id,
                                isMuted: !!chat.settings.mute,
                                sender: message.sender.id === messenger.engine.user.id ? 'You' : message.sender.name,
                                membership: chat.__typename === 'SharedRoom' ? chat.membership : 'NONE',
                                showSenderName: true
                            }}
                            showDiscover={() => false}
                            onPress={() => props.onMessagePress(message.id)}
                        />
                    </ASView>
                );
            }}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            scrollEventThrottle={1}
            legacyImplementation={true}
            onEndReachedThreshold={1}
            backgroundColor={theme.backgroundPrimary}
            ListHeaderComponent={content}
            onEndReached={handleNeedMore}
            refreshing={loadingMore}
            ListFooterComponent={loadingMore ? (
                <View height={56} alignItems="center" justifyContent="center">
                    <LoaderSpinner />
                </View>
            ) : undefined}
        />
    );
};

const Loader = React.memo((props: { theme: ThemeGlobal }) => {
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

export const GlobalSearch = XMemo<GlobalSearchProps>(props => {
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
