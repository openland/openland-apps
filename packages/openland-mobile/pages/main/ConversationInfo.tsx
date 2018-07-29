import * as React from 'react';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ZQuery } from '../../components/ZQuery';
import { ScrollView, Text } from 'react-native';
import { ChatFullInfoQuery } from 'openland-api/ChatFullInfoQuery';

class ConversationInfoComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Info'
    };
    render() {
        return (
            <ZQuery query={ChatFullInfoQuery} variables={{ conversationId: this.props.navigation.getParam('id') }}>
                {resp => {
                    if (resp.data.chat.__typename === 'PrivateConversation') {
                        return (
                            <ScrollView>
                                <Text>{resp.data.chat.user.name}</Text>
                            </ScrollView>
                        );
                    }
                    return null;
                }}
            </ZQuery>
        );
    }
}

export const ConversationInfo = withApp(ConversationInfoComponent);