import * as React from 'react';
import { View, Text, AsyncStorage, FlatList } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ChatListQuery } from 'openland-api/ChatListQuery';
import { ZAvatar } from '../../components/ZAvatar';
import { ZLoader } from '../../components/ZLoader';
import { ZListItem } from '../../components/ZListItem';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ZCounter } from '../../components/ZCounter';

class DialogComponent extends React.PureComponent<{ item: { key: string, title: string, photos: string[], counter: number }, onPress: (id: string) => void }> {

    handlePress = () => {
        this.props.onPress(this.props.item.key);
    }

    render() {
        return (
            <ZListItem onPress={this.handlePress} height={80} separatorPaddingStart={80}>
                <View width={80} height={80} alignItems="center" justifyContent="center">
                    <ZAvatar src={this.props.item.photos.length > 0 ? this.props.item.photos[0] : undefined} size={60} />
                </View>
                <View flexGrow={1} paddingTop={5} paddingBottom={5} paddingRight={8} alignItems="stretch">
                    <View flexDirection="row">
                        <Text style={{ fontSize: 15, fontWeight: '500', height: 18, textAlignVertical: 'center' }}>{(this.props.item as any).title}</Text>
                        {this.props.item.counter > 0 && <ZCounter value={this.props.item.counter} />}
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: '400', height: 22, textAlignVertical: 'center' }}>Message line 1</Text>
                    <Text style={{ fontSize: 16, fontWeight: '400', height: 22, textAlignVertical: 'center' }}>Message line 2</Text>
                </View>
            </ZListItem>
        );
    }
}

class MessagesComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Messages',
    };

    handleLogout = () => {
        AsyncStorage.clear();
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: '#ffffff' }}>
                <YQuery query={ChatListQuery}>
                    {(res) => {
                        if (!res.data || !res.data.chats) {
                            return <ZLoader />;
                        }
                        return (
                            <FlatList
                                data={res.data.chats.conversations.map((v) => ({ key: v.id, title: v.title, photos: v.photos, counter: v.unreadCount }))}
                                renderItem={(item) => (<DialogComponent item={item.item as any} onPress={(id) => this.props.navigation.navigate('Conversation', { id })} />)}
                            />
                        );
                    }}
                </YQuery>
            </View>
        );
    }
}

export const Messages = withApp(MessagesComponent);