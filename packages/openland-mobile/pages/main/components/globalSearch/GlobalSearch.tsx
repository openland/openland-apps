import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ASView } from 'react-native-async-view/ASView';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { SRouter } from 'react-native-s/SRouter';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { GlobalSearchItemOrganization, GlobalSearchItemUser, GlobalSearchItemSharedRoom } from './GlobalSearchItems';
import { randomEmptyPlaceholderEmoji } from 'openland-mobile/utils/tolerance';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ASFlex } from 'react-native-async-view/ASFlex';

interface GlobalSearchProps {
    query: string;
    router: SRouter;

    onOrganizationPress?: (id: string) => void;
    onUserPress?: (id: string) => void;
    onGroupPress?: (id: string) => void;
}

export const GlobalSearch = React.memo<GlobalSearchProps>((props) => {
    if (props.query.trim().length === 0) {
        return null;
    }

    let items = getClient().useGlobalSearch({ query: props.query }).items;

    if (items.length === 0) {
        return (
            <KeyboardSafeAreaView>
                <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'Nothing found' + randomEmptyPlaceholderEmoji()}</Text>
                </View>
            </KeyboardSafeAreaView>
        );
    }

    return (
        <SScrollView keyboardDismissMode="on-drag">
            <View style={{ flexDirection: 'column', width: '100%' }}>
                {items.map((item, index) => (
                    <ASView style={{ height: 48 }} key={'search-item-' + index}>
                        {item.__typename === 'Organization' && (
                            <GlobalSearchItemOrganization
                                item={item}
                                onPress={props.onOrganizationPress ? props.onOrganizationPress : () => props.router.push('ProfileOrganization', { id: item.id })}
                            />
                        )}
                        {item.__typename === 'User' && (
                            <GlobalSearchItemUser
                                item={item}
                                onPress={props.onUserPress ? props.onUserPress : () => props.router.push('Conversation', { id: item.id })}
                            />
                        )}
                        {item.__typename === 'SharedRoom' && (
                            <GlobalSearchItemSharedRoom
                                item={item}
                                onPress={props.onGroupPress ? props.onGroupPress : () => props.router.push('Conversation', { id: item.id })}
                            />
                        )}
                    </ASView>
                ))}
            </View>
        </SScrollView>
    );
});