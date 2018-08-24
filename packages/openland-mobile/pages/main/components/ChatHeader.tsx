import * as React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { isAndroid } from '../../../utils/isAndroid';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ZAppConfig } from '../../../components/ZAppConfig';
import { FastRouter } from 'react-native-fast-navigation/FastRouter';

export class ChatHeader extends React.PureComponent<{ conversationId: string, router: FastRouter }, { loading: boolean }> {
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

                    const chat = res.data!!.chat;

                    let title = res.data!!.chat.title;
                    let subtitle = '';
                    if (chat.__typename === 'PrivateConversation') {
                        if (chat.user.primaryOrganization) {
                            subtitle = chat.user.primaryOrganization.name;
                        } else {
                            subtitle = 'Person';
                        }
                    } else if (chat.__typename === 'SharedConversation') {
                        subtitle = 'Organization';
                    } else if (chat.__typename === 'GroupConversation') {
                        subtitle = chat.membersCount + ' members';
                    }

                    if (isAndroid) {
                        return (
                            <TouchableHighlight onPress={() => this.props.router.push('ConversationInfo', { id: this.props.conversationId })}>
                                <View flexDirection="row" alignSelf="flex-start" height={56} alignItems="center">
                                    <View flexDirection="column" marginTop={-6}>
                                        <Text style={{ fontWeight: '500', fontSize: 18, height: 24, color: ZAppConfig.titleColor, letterSpacing: 0.3, marginBottom: 1 }} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                                        <Text style={{ fontSize: 14, height: 16, color: ZAppConfig.subtitleColor, opacity: 0.6, marginTop: -4 }} numberOfLines={1} ellipsizeMode="tail">{subtitle}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        );
                    }

                    return (
                        <View flexDirection="column" alignItems="center" justifyContent="center" alignSelf="center" pointerEvents="box-none" height={44}>
                            <Text style={{ fontSize: 15, height: 18, color: ZAppConfig.titleColor, fontWeight: '500' }} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                            <Text style={{ fontSize: 12, height: 14, color: ZAppConfig.subtitleColor, opacity: 0.6 }}>{subtitle}</Text>
                        </View>
                    );
                }}
            </YQuery>
        );
    }
}