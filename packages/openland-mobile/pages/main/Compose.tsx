import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { ZLoader } from '../../components/ZLoader';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { UserView } from './components/UserView';
import { getClient } from 'openland-mobile/utils/apolloClient';

const UserSearchComponent = React.memo<PageProps & { query: string }>((props) => {
    if (props.query.trim().length == null) {
        return null;
    }
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
        <SScrollView keyboardDismissMode="on-drag">
            <View style={{ flexDirection: 'column', width: '100%' }}>
                {search.items.edges.map((item) => (
                    <UserView user={item.node} onPress={() => props.router.pushAndRemove('Conversation', { flexibleId: item.node.id })} />
                ))}
            </View>

        </SScrollView>

    );
});

const ComposeComponent = React.memo<PageProps>((props) => {

    let search = getClient().useExplorePeople({ query: '' });

    return (
        <>
            <SHeader title="New message" />
            <SSearchControler
                searchRender={(p) => (
                    <React.Suspense fallback={<ZLoader />}>
                        <UserSearchComponent query={p.query} router={props.router} />
                    </React.Suspense>
                )}
            >
                {search.items.edges.length === 0 && (
                    <KeyboardSafeAreaView>
                        <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'No people found' + randomEmptyPlaceholderEmoji()}</Text>
                        </View>
                    </KeyboardSafeAreaView>
                )}
                {search.items.edges.length > 0 && (
                    <SScrollView keyboardDismissMode="on-drag">
                        <ZListItemGroup divider={false}>
                            <ZListItem leftIcon={require('assets/ic-group-24.png')} text="Create room" path="CreateChannel" pathRemove={true} />
                            <ZListItem leftIcon={require('assets/ic-lock-24.png')} text="Create private group" path="CreateGroupAttrs" pathRemove={true} />
                            {search.items.edges.map((item) => (
                                <UserView key={item.node.id} user={item.node} onPress={() => props.router.pushAndRemove('Conversation', { flexibleId: item.node.id })} />
                            ))}
                        </ZListItemGroup>

                    </SScrollView>
                )}
            </SSearchControler>
        </>
    );
});

export const Compose = withApp(ComposeComponent);