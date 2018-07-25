import * as React from 'react';
import { View } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ChatListQuery } from 'openland-api/ChatListQuery';
import { ZLoader } from '../../components/ZLoader';
import { YQuery } from 'openland-y-graphql/YQuery';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogListComponent } from './components/DialogListComponent';

class DialogsComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Messages',
    };

    handleItemClick = (id: string) => {
        this.props.navigation.navigate('Conversation', { id });
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: '#ffffff' }}>
                <YQuery query={ChatListQuery}>
                    {(res) => {
                        if (!res.data || !res.data.chats) {
                            return <ZLoader />;
                        }
                        let conv = res.data.chats.conversations;
                        return (
                            <MessengerContext.Consumer>
                                {(messenger) => (<DialogListComponent engine={messenger!!} dialogs={conv} onPress={this.handleItemClick} />)}
                            </MessengerContext.Consumer>
                        );
                    }}
                </YQuery>
            </View>
        );
    }
}

export const Dialogs = withApp(DialogsComponent);