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
                    <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'No chats found' + randomEmptyPlaceholderEmoji()}</Text>
                </View>
            </KeyboardSafeAreaView>
        );
    }

    let itemsList: JSX.Element[] = [];
    let prevGroupType = '';

    items.map((item, index) => {
        if (prevGroupType !== item.__typename) {
            prevGroupType = item.__typename;

            let groupName = '';

            switch (prevGroupType) {
                case 'Organization':
                    groupName = 'Organizations'; break;
                case 'User':
                    groupName = 'Users'; break;
                case 'SharedRoom':
                    groupName = 'Groups'; break;
                default:
                    groupName = prevGroupType;
            }

            itemsList.push(
                <ASView
                    key={'search-group-' + index}
                    style={{ height: 58 }}
                >
                    <ASFlex>
                        <ASText
                            flexGrow={1}
                            color={Platform.OS === 'android' ? '#000' : '#99a2b0'}
                            fontSize={16}
                            fontWeight={TextStyles.weight.medium}
                            lineHeight={20}
                            height={Platform.OS === 'android' ? 21 : 20}
                            opacity={Platform.OS === 'android' ? 0.7 : 1.0}
                            marginLeft={16}
                            marginTop={30}
                            marginBottom={8}
                        >
                            {groupName}
                        </ASText>
                    </ASFlex>
                </ASView>
            );
        }

        itemsList.push(
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
        );
    })

    return (
        <SScrollView keyboardDismissMode="on-drag">
            <View style={{ flexDirection: 'column', width: '100%' }}>
                {itemsList}
            </View>
        </SScrollView>
    );
});