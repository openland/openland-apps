import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { ZLoader } from '../../components/ZLoader';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { UserView } from './components/UserView';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { XMemo } from 'openland-y-utils/XMemo';

const UserSearchComponent = XMemo<PageProps & { query: string }>((props) => {
    // if (props.query.trim().length === 0) {
    //     return null;
    // }
    let search = getClient().useExplorePeople({ query: props.query });

    if (search.items.edges.length === 0) {
        return (
            <KeyboardSafeAreaView>
                <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'No people found' + randomEmptyPlaceholderEmoji()}</Text>
                </View>
            </KeyboardSafeAreaView>
        );

    }
    return (
        <View style={{ flexDirection: 'column', width: '100%' }}>
            {search.items.edges.map((item) => (
                <UserView user={item.node} onPress={() => props.router.pushAndRemove('Conversation', { flexibleId: item.node.id })} />
            ))}
        </View>
    );
});

const ComposeComponent = XMemo<PageProps>((props) => {
    return (
        <>
            <SHeader title="New message" hairline="hidden" />
            <SSearchControler
                searchRender={(p) => (
                    <SScrollView keyboardDismissMode="interactive">
                        {p.query.length > 0 && (
                            <UserSearchComponent query={p.query} router={props.router} />
                        )}
                    </SScrollView>
                )}
            >
                <React.Suspense fallback={<ZLoader />}>
                    <SScrollView keyboardDismissMode="interactive">
                        <ZListItemGroup divider={false}>
                            <ZListItem leftIcon={require('assets/ic-room-24.png')} text="Create group" path="CreateGroupAttrs" />
                            {/* <ZListItem leftIcon={require('assets/ic-room-24.png')} text="Create channel" path="CreateGroupAttrs" pathParams={{ isChannel: true }} /> */}
                            <ZListItem leftIcon={require('assets/ic-community-24.png')} text="Create community" path="NewOrganization" pathParams={{ isCommunity: true }} />
                        </ZListItemGroup>
                        <View height={15} />
                        <UserSearchComponent query="" router={props.router} />
                    </SScrollView>
                </React.Suspense>
            </SSearchControler>
        </>
    );
});

export const Compose = withApp(ComposeComponent);