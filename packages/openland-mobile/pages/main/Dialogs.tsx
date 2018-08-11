import * as React from 'react';
import { View } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ZLoader } from '../../components/ZLoader';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogListComponent } from './components/DialogListComponent';
import { ConversationShortFragment } from 'openland-api/Types';
import { ZQuery } from '../../components/ZQuery';
import { ChatListQuery } from 'openland-api';

class ConversationsListener extends React.PureComponent<{ engine: MessengerEngine, onItemClick: (item: ConversationShortFragment) => void }> {

    render() {
        return (
            <ZQuery query={ChatListQuery}>
                {r => (
                    <DialogListComponent
                        dialogs={r.data.chats.conversations}
                        engine={this.props.engine}
                        onPress={this.props.onItemClick}
                        loadingMore={r.data.chats.next !== null}
                    />
                )}
            </ZQuery>
        );
    }
}
class DialogsComponent extends React.Component<NavigationInjectedProps> {

    static navigationOptions = {
        title: 'Messages'
    };

    handleItemClick = (item: ConversationShortFragment) => {
        this.props.navigation.navigate('Conversation', { id: item.id, title: item.title });
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: '#ffffff' }}>
                <MessengerContext.Consumer>
                    {(messenger) => <ConversationsListener engine={messenger!!} onItemClick={this.handleItemClick} />}
                </MessengerContext.Consumer>
            </View>
        );
    }
}

export const Dialogs = withApp(DialogsComponent, { noSafeWrapper: true, isInTab: true, navigationStyle: 'large' });