import * as React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { SRouter } from 'react-native-s/SRouter';
import { ChatInfo_chat } from 'openland-api/Types';

export let resolveConversationProfilePath = (chat: ChatInfo_chat) => {
    let path: string | undefined = undefined;
    let pathArgs: any = {};
    if (chat.__typename === 'PrivateConversation') {
        path = 'ProfileUser';
        pathArgs = { id: chat.flexibleId };
    } else if (chat.__typename === 'SharedConversation') {
        path = 'ProfileOrganization';
        pathArgs = { id: chat.flexibleId, conversationId: chat.id };
    } else if (chat.__typename === 'GroupConversation' || chat.__typename === 'ChannelConversation') {
        path = 'ProfileGroup';
        pathArgs = { id: chat.id };
    }

    return { path, pathArgs };
};

export class ChatHeaderAvatar extends React.PureComponent<{ conversationId: string, router: SRouter }> {

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

                    let path = resolveConversationProfilePath(res.data!!.chat);

                    return (
                        <TouchableOpacity disabled={!path.path} onPress={() => this.props.router.push(path.path!!, path.pathArgs)} style={{ marginRight: Platform.OS === 'ios' ? -5 : 10, marginLeft: Platform.OS === 'ios' ? 10 : 0 }}>
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