import * as React from 'react';
import { View } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ChatListQuery } from 'openland-api/ChatListQuery';
import { ZLoader } from '../../components/ZLoader';
import { YQuery } from 'openland-y-graphql/YQuery';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogListComponent } from './components/DialogListComponent';
import { ConversationShortFragment } from 'openland-api/Types';
import { ConversationsEngine } from 'openland-engines/messenger/ConversationsEngine';

class ConversationsListener extends React.PureComponent<{ engine: MessengerEngine, onItemClick: (item: ConversationShortFragment) => void }, { conversations?: ConversationShortFragment[] }> {
    private destructor?: () => void;
    constructor(props: { engine: MessengerEngine, onItemClick: (item: ConversationShortFragment) => void }) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.destructor = this.props.engine.conversations.subcribe(this.handleConversations);
    }

    handleConversations = (conversations: ConversationShortFragment[]) => {
        this.setState({ conversations: conversations });
    }

    componentWillUnmount() {
        if (this.destructor) {
            this.destructor();
        }
    }

    render() {
        return (
            this.state.conversations ? <DialogListComponent engine={this.props.engine} dialogs={this.state.conversations || []} onPress={this.props.onItemClick} /> : <ZLoader />
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

export const Dialogs = withApp(DialogsComponent, { noSafeWrapper: true, isInTab: true });