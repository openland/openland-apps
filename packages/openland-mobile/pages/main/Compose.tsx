import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { ZQuery } from '../../components/ZQuery';
import { ZLoader } from '../../components/ZLoader';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ExplorePeopleQuery } from 'openland-api';
import { UserView } from './components/UserView';

const UserSearchComponent = React.memo<PageProps & { query: string }>((props) => {
    return props.query.trim().length > 0 ? (
        <ZQuery query={ExplorePeopleQuery} variables={{ query: props.query }}>
            {resp => {

                if (resp.loading) {
                    return <ZLoader />;
                }

                if (resp.data.items.edges.length === 0) {
                    return (
                        <KeyboardSafeAreaView><View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 22, textAlignVertical: 'center', color: '#000' }}>{'No people found' + randomEmptyPlaceholderEmoji()}</Text>
                        </View></KeyboardSafeAreaView>
                    );

                }
                return (
                    <SScrollView keyboardDismissMode="on-drag">
                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            {resp.data.items.edges.map((item) => (
                                <UserView user={item.node} onPress={() => props.router.pushAndRemove('Conversation', { flexibleId: item.node.id })} />
                            ))}
                        </View>

                    </SScrollView>

                );
            }}
        </ZQuery>
    ) : null;
});

class ComposeComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <>
                <SHeader title="New message" />
                <SSearchControler searchRender={(props) => (<UserSearchComponent query={props.query} router={this.props.router} />)}>
                    <ZQuery query={ExplorePeopleQuery} variables={{ query: '' }}>
                        {resp => {

                            if (resp.loading) {
                                return <ZLoader />;
                            }

                            if (resp.data.items.edges.length === 0) {
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
                                    <ZListItemGroup divider={false}>
                                        <ZListItem leftIcon={require('assets/ic-group-24.png')} text="Create room" path="CreateChannel" pathRemove={true} />
                                        <ZListItem leftIcon={require('assets/ic-lock-24.png')} text="Create private group" path="CreateGroupAttrs" pathRemove={true} />
                                        {resp.data.items.edges.map((item) => (
                                            <UserView key={item.node.id} user={item.node} onPress={() => this.props.router.pushAndRemove('Conversation', { flexibleId: item.node.id })} />
                                        ))}
                                    </ZListItemGroup>

                                </SScrollView>
                            );
                        }}
                    </ZQuery>
                </SSearchControler>
            </>
        );
    }
}

export const Compose = withApp(ComposeComponent);