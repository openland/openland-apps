import * as React from 'react';
import { View, Text, AsyncStorage, FlatList, TouchableHighlight } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { Query } from '../../../../node_modules/react-apollo';
import { ChatListQuery } from 'openland-api/ChatListQuery';

class DialogComponent extends React.PureComponent<{ item: any }> {
    handlePress = () => {
        //
    }

    render() {
        return (
            <TouchableHighlight onPress={this.handlePress} underlayColor="#f8f8fb">
                <View height={44}>
                    <Text>{(this.props.item as any).title}</Text>
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
                                data={(res.data.chats.conversations as any[]).map((v) => ({ key: v.id, title: v.title }))}
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