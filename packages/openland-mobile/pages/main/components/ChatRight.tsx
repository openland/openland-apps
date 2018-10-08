import * as React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { SRouter } from 'react-native-s/SRouter';
import { OnlineQuery } from 'openland-api';

export class ChatRight extends React.PureComponent<{ conversationId: string, router: SRouter }> {

    render() {
        return (
            <YQuery query={ChatInfoQuery} variables={{ conversationId: this.props.conversationId }}>
                {res => {
                    if (res.loading) {
                        return null;
                    }
                    if (!res.data) {
                        return null;
                    }

                    // if (isAndroid) {
                    //     return null;
                    // }

                    let destPath: string | undefined = undefined;
                    let destPathArgs: any = {};
                    if (res.data!!.chat.__typename === 'PrivateConversation') {
                        destPath = 'ProfileUser';
                        destPathArgs = { id: res.data!!.chat.flexibleId };
                    } else if (res.data!!.chat.__typename === 'SharedConversation') {
                        destPath = 'ProfileOrganization';
                        destPathArgs = { id: res.data!!.chat.flexibleId };
                    } else if (res.data!!.chat.__typename === 'GroupConversation' || res.data!!.chat.__typename === 'ChannelConversation') {
                        destPath = 'ProfileGroup';
                        destPathArgs = { id: res.data!!.chat.id };
                    }

                    return (
                        <TouchableOpacity disabled={!destPath} onPress={() => this.props.router.push(destPath!!, destPathArgs)} style={{ marginRight: Platform.OS === 'ios' ? -5 : 0, marginLeft: 10 }}>
                            <View height={Platform.OS === 'android' ? 56 : 44} alignItems="center" justifyContent="center">
                                <XPAvatar
                                    src={(res.data!!.chat as any).photo || (res.data!!.chat.photos.length > 0 ? res.data!!.chat.photos[0] : undefined)}
                                    size={Platform.OS === 'android' ? 40 : 36}
                                    placeholderKey={res.data!!.chat.flexibleId}
                                    placeholderTitle={res.data!!.chat.title}
                                    userId={res.data!!.chat.__typename === 'PrivateConversation' ? res.data.chat.flexibleId : undefined}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                }}
            </YQuery>
        );
    }
}