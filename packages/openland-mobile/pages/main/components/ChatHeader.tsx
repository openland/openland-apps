import * as React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TextStyle } from 'react-native';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { isAndroid } from '../../../utils/isAndroid';
import { SRouter } from 'react-native-s/SRouter';
import { getMessenger } from '../../../utils/messenger';
import { OnlineQuery } from 'openland-api';
import * as humanize from 'humanize';
import { formatDate } from '../../../utils/formatDate';

const styles = StyleSheet.create({
    androidTitle: {
        fontWeight: '500',
        fontSize: 18,
        height: 26,
        color: '#000',
        letterSpacing: 0.3,
        marginBottom: 1
    } as TextStyle,
    androidSubTitle: {
        fontSize: 14,
        height: 18,
        color: '#000',
        opacity: 0.6,
        marginTop: -4
    } as TextStyle,

    iosTitle: {
        fontSize: 15,
        height: 18,
        color: '#000',
        fontWeight: '500'
    } as TextStyle,
    iosSubTitle: {
        fontSize: 12,
        height: 14,
        color: '#000',
        opacity: 0.6
    } as TextStyle,

    subTitleAccent: {
        color: '#4747ec',
        opacity: 1
    } as TextStyle,

});

export class ChatHeader extends React.PureComponent<{ conversationId: string, router: SRouter }, { typing?: string }> {
    disposeSubscription?: () => any;
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.disposeSubscription = getMessenger().engine.getTypings(this.props.conversationId).subcribe(t => this.setState({ typing: t }));
    }

    componentWillUnmount() {
        if (this.disposeSubscription) {
            this.disposeSubscription();
        }
    }

    render() {
        return (
            <YQuery query={ChatInfoQuery} variables={{ conversationId: this.props.conversationId }}>
                {res => {
                    if (res.loading) {
                        return null;
                    }

                    const chat = res.data!!.chat;

                    let accent = false;

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
                    } else if (chat.__typename === 'GroupConversation' || chat.__typename === 'ChannelConversation') {
                        subtitle = chat.membersCount + ' members';
                    }

                    let typingString = this.state.typing;
                    if (typingString && chat.__typename === 'PrivateConversation') {
                        typingString = 'typing...';
                    }
                    subtitle = (typingString) || subtitle;

                    if (this.state.typing) {
                        accent = true;
                    }

                    return (
                        <View flexDirection="column" alignItems={isAndroid ? 'flex-start' : 'center'} marginTop={isAndroid ? -6 : undefined} justifyContent="center" alignSelf="center" pointerEvents="box-none" height={44}>
                            <Text style={isAndroid ? styles.androidTitle : styles.iosTitle} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                            <YQuery query={OnlineQuery} variables={{ userId: chat.flexibleId }}>
                                {online => {
                                    let sub = subtitle;
                                    if (online.data && online.data.user && !online.data.user.online && online.data.user.lastSeen) {
                                        let time = new Date(parseInt(online.data.user.lastSeen, 10)).getTime();
                                        if (new Date().getTime() - time < 1000 * 60 * 60 * 24) {
                                            sub = 'last seen ' + humanize.relativeTime(time / 1000);
                                        } else if (new Date().getTime() - time < 1000 * 60) {
                                            sub = 'just now';
                                        } else {
                                            sub = 'last seen ' + formatDate(time);
                                        }
                                        // 
                                    }
                                    return (
                                        <Text style={[isAndroid ? styles.androidSubTitle : styles.iosSubTitle, accent ? styles.subTitleAccent : {}]}>{sub}</Text>
                                    );
                                }}
                            </YQuery>
                        </View>
                    );
                }}
            </YQuery>
        );
    }
}