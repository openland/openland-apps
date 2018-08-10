import * as React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { isAndroid } from '../../../utils/isAndroid';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ZAppConfig } from '../../../components/ZAppConfig';

export class ChatHeader extends React.PureComponent<{ conversationId: string, navigation: NavigationScreenProp<NavigationState, any> }, { loading: boolean }> {
    state = {
        loading: false
    };

    componentDidMount() {
        window.setTimeout(() => {
            this.setState({ loading: true });
        });
    }

    render() {
        if (!this.state.loading) {
            return null;
        }
        return (
            <YQuery query={ChatInfoQuery} variables={{ conversationId: this.props.conversationId }}>
                {res => {
                    if (res.loading) {
                        return null;
                    }
                    if (isAndroid) {
                        return (
                            <TouchableHighlight onPress={() => this.props.navigation.navigate('ConversationInfo', { id: this.props.conversationId })}>
                                <View flexDirection="row" alignSelf="flex-start" height={56} alignItems="center">
                                    <View flexDirection="column" marginTop={-6}>
                                        <Text style={{ fontWeight: '500', fontSize: 18, height: 24, color: ZAppConfig.titleColor, letterSpacing: 0.3, marginBottom: 1 }} numberOfLines={1} ellipsizeMode="tail">{res.data!!.chat.title}</Text>
                                        <Text style={{ fontSize: 14, height: 16, color: ZAppConfig.subtitleColor, opacity: 0.6, marginTop: -4 }} numberOfLines={1} ellipsizeMode="tail">Online</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        );
                    }

                    return (
                        <View flexDirection="column" alignItems="center" justifyContent="center" alignSelf="center" pointerEvents="box-none" height={44}>
                            <Text style={{ fontSize: 15, height: 18, color: ZAppConfig.titleColor, fontWeight: '500' }} numberOfLines={1} ellipsizeMode="tail">{res.data!!.chat.title}</Text>
                            <Text style={{ fontSize: 12, height: 14, color: ZAppConfig.subtitleColor, opacity: 0.6 }}>Online</Text>
                        </View>
                    );
                }}
            </YQuery>
        );
    }
}