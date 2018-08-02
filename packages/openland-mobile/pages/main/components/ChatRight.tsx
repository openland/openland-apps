import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ZAvatar } from '../../../components/ZAvatar';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { isAndroid } from '../../../utils/isAndroid';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

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
            return null;
        }
        return (
            <YQuery query={ChatInfoQuery} variables={{ conversationId: this.props.conversationId }}>
                {res => {
                    if (res.loading) {
                        return;
                    }

                    if (isAndroid) {
                        return null;
                    }

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
                        <TouchableOpacity disabled={!destPath} onPress={() => this.props.navigation.navigate(destPath!!, destPathArgs)}>
                            <View paddingRight={15} paddingLeft={15}>
                                <ZAvatar
                                    src={res.data!!.chat.photos.length > 0 ? res.data!!.chat.photos[0] : undefined}
                                    size={30}
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