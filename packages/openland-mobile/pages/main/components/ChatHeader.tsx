import * as React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { ZAvatar } from '../../../components/ZAvatar';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { getClient } from '../../../utils/apolloClient';
import { isAndroid } from '../../../utils/isAndroid';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

export class ChatHeader extends React.PureComponent<{ conversationId: string, navigation: NavigationScreenProp<NavigationState, any> }> {
    render() {
        return (
            <YApolloProvider client={getClient()}>
                <YQuery query={ChatInfoQuery} variables={{ conversationId: this.props.conversationId }}>
                    {res => {
                        if (res.loading) {
                            return null;
                        }
                        console.warn(res);
                        if (isAndroid) {
                            return (
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('ConversationInfo', { id: this.props.conversationId })}>
                                    <View flexDirection="row">
                                        <View paddingRight={12} paddingLeft={8}>
                                            <ZAvatar
                                                src={res.data!!.chat.photos.length > 0 ? res.data!!.chat.photos[0] : undefined}
                                                size={40}
                                                placeholderKey={res.data!!.chat.flexibleId}
                                                placeholderTitle={res.data!!.chat.title}
                                            />
                                        </View>
                                        <View flexDirection="column" marginTop={-2}>
                                            <Text style={{ fontWeight: '500', fontSize: 18, height: 21, color: '#fff', letterSpacing: 0.3, marginBottom: 1 }} numberOfLines={1} ellipsizeMode="tail">{res.data!!.chat.title}</Text>
                                            <Text style={{ fontSize: 14, height: 16, color: '#fff', opacity: 0.6, marginTop: 1 }} numberOfLines={1} ellipsizeMode="tail">Online</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            );
                        }

                        return (
                            <View flexDirection="column" alignItems="center">
                                <Text style={{ fontSize: 15, height: 18, color: '#fff', fontWeight: '500' }} numberOfLines={1} ellipsizeMode="tail">{res.data!!.chat.title}</Text>
                                <Text style={{ fontSize: 12, height: 14, color: '#fff', opacity: 0.6 }}>Online</Text>
                            </View>
                        );
                    }}
                </YQuery>
            </YApolloProvider>
        );
    }
}