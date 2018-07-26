import * as React from 'react';
import { View } from 'react-native';
import { ZAvatar } from '../../../components/ZAvatar';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { YApolloProvider } from 'openland-y-graphql/YApolloProvider';
import { getClient } from '../../../utils/apolloClient';
import { isAndroid } from '../../../utils/isAndroid';

export class ChatRight extends React.PureComponent<{ conversationId: string }> {
    render() {
        return (
            <YApolloProvider client={getClient()}>
                <YQuery query={ChatInfoQuery} variables={{ conversationId: this.props.conversationId }}>
                    {res => {
                        if (isAndroid) {
                            return null;
                        }

                        return (
                            <View paddingRight={15} paddingLeft={15}>
                                <ZAvatar
                                    src={res.data!!.chat.photos.length > 0 ? res.data!!.chat.photos[0] : undefined}
                                    size={30}
                                    placeholderKey={res.data!!.chat.flexibleId}
                                    placeholderTitle={res.data!!.chat.title}
                                />
                            </View>
                        );
                    }}
                </YQuery>
            </YApolloProvider>
        );
    }
}