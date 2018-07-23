import * as React from 'react';
import { View, Text, AsyncStorage, FlatList, TouchableHighlight } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { Query } from '../../../../node_modules/react-apollo';
import { ChatListQuery } from 'openland-api/ChatListQuery';
import { ZAvatar } from '../../components/ZAvatar';

class DialogComponent extends React.PureComponent<{ item: { id: string, title: string, photos: string[] } }> {
    handlePress = () => {
        //
    }

    render() {
        return (
            <TouchableHighlight onPress={this.handlePress} underlayColor="#f8f8fb">
                <View height={66} flexDirection="row">
                    <View paddingTop={5} paddingBottom={5} paddingLeft={8} paddingRight={6}>
                        <ZAvatar src={this.props.item.photos.length > 0 ? this.props.item.photos[0] : undefined} size={56} />
                    </View>
                    <View flexGrow={1} paddingTop={5} paddingBottom={5} paddingRight={8}>
                        <Text style={{ fontSize: 16, fontWeight: '500', height: 22, textAlignVertical: 'center' }}>{(this.props.item as any).title}</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', height: 22, textAlignVertical: 'center' }}>Message line 1</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', height: 22, textAlignVertical: 'center' }}>Message line 2</Text>
                    </View>
                </View>
            </TouchableHighlight>
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
                <Query query={ChatListQuery.document}>
                    {(res) => {
                        if (!res.data || !res.data.chats) {
                            return null;
                        }
                        return (
                            <FlatList
                                data={(res.data.chats.conversations as any[]).map((v) => ({ key: v.id, title: v.title, photos: v.photos }))}
                                renderItem={(item) => (<DialogComponent item={item.item as any} />)}
                            />
                        );
                    }}
                </Query>
            </View>
        );
    }
}

export const Messages = withApp(MessagesComponent);