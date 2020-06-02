import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ASView } from 'react-native-async-view/ASView';
import { SRouter } from 'react-native-s/SRouter';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import {
    GlobalSearchItemOrganization,
    GlobalSearchItemUser,
    GlobalSearchItemSharedRoom,
} from './GlobalSearchItems';
import { randomEmptyPlaceholderEmoji } from 'openland-mobile/utils/tolerance';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SNativeConfig } from 'react-native-s/SNativeConfig';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { GlobalSearchEntryKind } from 'openland-api/spacex.types';
import { SDeferred } from 'react-native-s/SDeferred';
import { GlobalSearchMessages } from './GlobalSearchMessages';
import { LoaderSpinnerWrapped } from 'openland-mobile/components/LoaderSpinner';
import { NON_PRODUCTION } from 'openland-mobile/pages/Init';

interface GlobalSearchProps {
    query: string;
    router: SRouter;
    kinds?: GlobalSearchEntryKind[];

    onOrganizationPress?: (id: string, title: string) => void;
    onUserPress?: (id: string, title: string) => void;
    onGroupPress?: (id: string, title: string) => void;
    onMessagePress?: (id: string) => void;
}

const GlobalSearchInner = (props: GlobalSearchProps) => {
    let theme = React.useContext(ThemeContext);
    let items = getClient().useGlobalSearch({ query: props.query, kinds: props.kinds }).items;

    return (
        <>
            {items.length === 0 && (
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
                            color: theme.foregroundPrimary,
                        }}
                    >
                        {'Nothing found' + randomEmptyPlaceholderEmoji()}
                    </Text>
                </View>
            )}
            {items.map((item, index) => (
                <ASView style={{ height: 56 }} key={`search-item-${index}-${item.id}`}>
                    {item.__typename === 'Organization' && (
                        <GlobalSearchItemOrganization
                            item={item}
                            onPress={
                                props.onOrganizationPress
                                    ? props.onOrganizationPress
                                    : () =>
                                        props.router.push('ProfileOrganization', { id: item.id })
                            }
                        />
                    )}
                    {item.__typename === 'User' && (
                        <GlobalSearchItemUser
                            item={item}
                            onPress={
                                props.onUserPress
                                    ? props.onUserPress
                                    : () => props.router.push('Conversation', { id: item.id })
                            }
                        />
                    )}
                    {item.__typename === 'SharedRoom' && (
                        <GlobalSearchItemSharedRoom
                            item={item}
                            onPress={
                                props.onGroupPress
                                    ? props.onGroupPress
                                    : () => props.router.push('Conversation', { id: item.id })
                            }
                        />
                    )}
                </ASView>
            ))}
        </>
    );
};

export const GlobalSearch = XMemo<GlobalSearchProps>(props => {
    const theme = React.useContext(ThemeContext);

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
                                <GlobalSearchInner {...props} />

                                {props.onMessagePress && NON_PRODUCTION && (
                                    <React.Suspense fallback={<LoaderSpinnerWrapped />}>
                                        <GlobalSearchMessages
                                            query={props.query}
                                            onPress={props.onMessagePress}
                                        />
                                    </React.Suspense>
                                )}
                            </SDeferred>
                        </React.Suspense>
                    </View>
                )}
            </ASSafeAreaContext.Consumer>
        </SScrollView>
    );
});
