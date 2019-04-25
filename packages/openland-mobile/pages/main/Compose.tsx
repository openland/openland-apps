import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { View, Text, ActivityIndicator } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { UserView } from './components/UserView';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const UserSearchComponent = XMemo<PageProps & { query: string, useScroll: boolean }>((props) => {
    let theme = React.useContext(ThemeContext);
    let search = getClient().useExplorePeople({ query: props.query });

    if (search.items.edges.length === 0) {
        return (
            <KeyboardSafeAreaView>
                <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, textAlignVertical: 'center', color: theme.textColor }}>{'Nothing found' + randomEmptyPlaceholderEmoji()}</Text>
                </View>
            </KeyboardSafeAreaView>
        );

    }

    if (props.useScroll) {
        return (
            <SScrollView keyboardDismissMode="interactive">
                <View style={{ flexDirection: 'column', width: '100%' }}>
                    {search.items.edges.map((item) => (
                        <UserView user={item.node} onPress={() => props.router.pushAndRemove('Conversation', { flexibleId: item.node.id })} />
                    ))}
                </View>
            </SScrollView>
        );
    } else {
        return (
            <View style={{ flexDirection: 'column', width: '100%' }}>
                {search.items.edges.map((item) => (
                    <UserView user={item.node} onPress={() => props.router.pushAndRemove('Conversation', { flexibleId: item.node.id })} />
                ))}
            </View>
        );
    }
});

const ComposeComponent = XMemo<PageProps>((props) => {
    return (
        <>
            <SHeader title="New message" hairline="hidden" />
            <SSearchControler
                searchRender={(p) => (
                    <>
                        {p.query.length > 0 && (
                            <UserSearchComponent query={p.query} router={props.router} useScroll={true} />
                        )}
                    </>
                )}
            >
                <SScrollView keyboardDismissMode="interactive">
                    <ZListItemGroup divider={false}>
                        <ZListItem leftIcon={require('assets/ic-room-24.png')} text="Create group" path="CreateGroupAttrs" />
                        <ZListItem leftIcon={require('assets/ic-cell-channel-24.png')} text="Create channel" path="CreateGroupAttrs" pathParams={{ isChannel: true }} />
                        <ZListItem leftIcon={require('assets/ic-community-24.png')} text="Create community" path="NewOrganization" pathParams={{ isCommunity: true }} />
                    </ZListItemGroup>
                    <View height={15} />
                    <React.Suspense fallback={<ActivityIndicator />}>
                        <UserSearchComponent query="" router={props.router} useScroll={false} />
                    </React.Suspense>
                </SScrollView>
            </SSearchControler>
        </>
    );
});

export const Compose = withApp(ComposeComponent);