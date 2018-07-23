import * as React from 'react';
import { NavigationInjectedProps, SafeAreaView } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, FlatList, Text, TextInput } from 'react-native';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { ZAvatar } from '../../components/ZAvatar';

class MessageComponent extends React.PureComponent<{ message: ModelMessage, engine: ConversationEngine }> {
    render() {
        let sender = isServerMessage(this.props.message) ? this.props.message.sender : this.props.engine.engine.user;
        return (
            <View flexDirection="row">
                <ZAvatar src={sender.picture} size={32} />
                <View>
                    <Text>{sender.name}</Text>
                    <Text>{this.props.message.message}</Text>
                </View>
            </View>
        );
    }
}

class ConversationRoot extends React.Component<{ engine: MessengerEngine, conversationId: string }, { state: ConversationState, messages: ModelMessage[], text: string }> implements ConversationStateHandler {
    unmount: (() => void) | null = null;
    unmount2: (() => void) | null = null;
    engine: ConversationEngine;

    constructor(props: { engine: MessengerEngine, conversationId: string }) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.conversationId);
        this.unmount2 = this.engine.subscribe(this);
        let msg = [...this.engine.getState().messages];
        msg.reverse();
        this.state = { state: this.engine.getState(), messages: msg, text: '' };
    }

    componentWillMount() {
        this.unmount = this.props.engine.mountConversation(this.props.conversationId);
    }

    onConversationUpdated(state: ConversationState) {
        let msg = [...this.engine.getState().messages];
        msg.reverse();
        this.setState({ state, messages: msg });
    }

    onMessageSend() {
        //
    }

    handleTextChange = (src: string) => {
        this.setState({ text: src });
    }

    handleSubmit = () => {
        let tx = this.state.text.trim();
        if (tx.length > 0) {
            this.setState({ text: '' });
            this.engine.sendMessage(tx);
        }
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
            this.unmount = null;
        }
    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#grey', height: '100%' }} flexDirection="column">
                <FlatList
                    data={this.state.messages}
                    renderItem={(itm) => <MessageComponent message={itm.item} engine={this.engine} />}
                    keyExtractor={(itm) => isServerMessage(itm) ? itm.id : itm.key}
                    inverted={true}
                    flexBasis={0}
                    flexGrow={1}
                    style={{ backgroundColor: '#fff' }}
                />
                <View alignSelf="stretch" alignItems="stretch" style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10 }}>
                    <TextInput
                        onChangeText={this.handleTextChange}
                        value={this.state.text}
                        onSubmitEditing={() => this.handleSubmit()}
                        style={{ backgroundColor: '#fff', borderRadius: 8, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2 }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

class ConversationComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Conversation',
    };
    render() {
        console.log(this.props.navigation);
        return (
            <MessengerContext.Consumer>
                {messenger => {
                    return (
                        <ConversationRoot engine={messenger!!} conversationId={this.props.navigation.getParam('id')} />
                    );
                }}
            </MessengerContext.Consumer>
        );
    }
}

export const Conversation = withApp(ConversationComponent);