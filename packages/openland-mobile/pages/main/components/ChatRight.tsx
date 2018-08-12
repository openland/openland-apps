import * as React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { XPAvatar } from 'openland-xp/XPAvatar';

export class ChatRight extends React.PureComponent<{ conversationId: string, navigation: NavigationScreenProp<NavigationState, any> }, { loading: boolean }> {

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
            return <View width={30} />;
        }
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
                    } else if (res.data!!.chat.__typename === 'GroupConversation') {
                        destPath = 'ProfileGroup';
                        destPathArgs = { id: res.data!!.chat.id };
                    }

                    return (
                        <TouchableOpacity disabled={!destPath} onPress={() => this.props.navigation.navigate(destPath!!, destPathArgs)} style={{ marginRight: Platform.OS === 'ios' ? -5 : 0 }}>
                            <View height={Platform.OS === 'android' ? 56 : 44} alignItems="center" justifyContent="center">
                                <XPAvatar
                                    src={res.data!!.chat.photos.length > 0 ? res.data!!.chat.photos[0] : undefined}
                                    size={Platform.OS === 'android' ? 40 : 36}
                                    placeholderKey={res.data!!.chat.flexibleId}
                                    placeholderTitle={res.data!!.chat.title}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                }}
            </YQuery>
        );
    }
}