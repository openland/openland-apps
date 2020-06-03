import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { SRouter } from 'react-native-s/SRouter';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import {
    GlobalSearchItem,
} from './GlobalSearchItems';
import { randomEmptyPlaceholderEmoji } from 'openland-mobile/utils/tolerance';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SNativeConfig } from 'react-native-s/SNativeConfig';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { GlobalSearchEntryKind } from 'openland-api/spacex.types';
import { SDeferred } from 'react-native-s/SDeferred';
import { NON_PRODUCTION } from 'openland-mobile/pages/Init';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ASView } from 'react-native-async-view/ASView';
import { DialogItemViewAsync } from 'openland-mobile/messenger/components/DialogItemViewAsync';

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
        <>
            {items.length === 0 && <EmptyView theme={theme} />}
            {items.map((item, index) => (
                <GlobalSearchItem key={`search-item-${index}-${item.id}`} item={item} {...props} />
            ))}
        </>
    );
};

const GlobalSearchWithMessagesInner = (props: GlobalSearchProps & { onMessagePress: (id: string) => void; }) => {
    const theme = React.useContext(ThemeContext);
    const messenger = getMessenger();
    const client = getClient();
    const items = client.useGlobalSearch({ query: props.query, kinds: props.kinds }).items;
    const messages = client.useMessagesSearch(
        {
            query: JSON.stringify({
                $and: [{ text: props.query }, { isService: false }],
            }),
            sort: JSON.stringify([{ createdAt: { order: 'desc' } }]),
            first: 30,
        },
        {
            fetchPolicy: 'network-only',
        },
    ).messagesSearch.edges;

    return (
        <>
            {(items.length === 0) && (messages.length === 0) && <EmptyView theme={theme} />}
            {items.map((item, index) => (
                <GlobalSearchItem key={`search-item-${index}-${item.id}`} item={item} {...props} />
            ))}

            <ZListGroup header="Messages" headerMarginTop={items.length === 0 ? 0 : undefined}>
                {messages.map(i => {
                    const { message, chat } = i.node;
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
                                    kind: chat.__typename === 'PrivateRoom' ? 'PRIVATE' : 'GROUP',
                                    unread: 0,
                                    fallback: message.fallback,
                                    date: parseInt(message.date, 10),
                                    photo: photo || undefined,
                                    isService: false,
                                    isOut: message.sender.id === messenger.engine.user.id,
                                    isMuted: !!chat.settings.mute,
                                    sender: message.sender.name,
                                    membership: chat.__typename === 'SharedRoom' ? chat.membership : 'NONE'
                                }}
                                showDiscover={() => false}
                                onPress={() => props.onMessagePress(message.id)}
                            />
                        </ASView>
                    );
                })}
            </ZListGroup>
        </>
    );
};

export const GlobalSearch = XMemo<GlobalSearchProps>(props => {
    const theme = React.useContext(ThemeContext);
    const showMessagesSearch = props.onMessagePress && NON_PRODUCTION;

    return (
        <SScrollView keyboardDismissMode="on-drag">
            <ASSafeAreaContext.Consumer>
                {area => (
                    <View
                        minHeight={Dimensions.get('screen').height - area.top - area.bottom}
                        backgroundColor={theme.backgroundPrimary}
                    >
                        <React.Suspense fallback={SNativeConfig.loader}>
                            <SDeferred>
                                {showMessagesSearch && <GlobalSearchWithMessagesInner {...props} onMessagePress={props.onMessagePress!} />}
                                {!showMessagesSearch && <GlobalSearchInner {...props} />}
                            </SDeferred>
                        </React.Suspense>
                    </View>
                )}
            </ASSafeAreaContext.Consumer>
        </SScrollView>
    );
});
