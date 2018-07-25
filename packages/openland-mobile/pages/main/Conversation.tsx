import * as React from 'react';
import { NavigationInjectedProps, SafeAreaView } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, FlatList, TextInput, KeyboardAvoidingView, Platform, Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessagesListComponent } from './components/MessagesListComponent';

let keyboardVerticalOffset = 0;
const isIPhoneX = Dimensions.get('window').height === 812;
if (isIPhoneX) {
    keyboardVerticalOffset = 55;
} else if (Platform.OS === 'ios') {
    keyboardVerticalOffset = 65;
}

let styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'stretch',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10
    } as ViewStyle,

    textInput: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 2,
        paddingBottom: 2,
        height: 34,
        fontSize: 14,
        borderColor: '#e6e6e6',
        borderWidth: 1
    } as ViewStyle
});

class ConversationRoot extends React.Component<{ engine: MessengerEngine, conversationId: string }, { text: string }> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();

    constructor(props: { engine: MessengerEngine, conversationId: string }) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.conversationId);
        this.state = { text: '' };
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

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
                <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }} flexDirection="column">
                    <View style={{ height: '100%' }} flexDirection="column">
                        <MessagesListComponent engine={this.engine} />
                        <View alignSelf="stretch" alignItems="stretch" style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10 }}>
                            <TextInput
                                placeholder="Message"
                                placeholderTextColor="#aaaaaa"
                                onChangeText={this.handleTextChange}
                                value={this.state.text}
                                onSubmitEditing={() => this.handleSubmit()}
                                style={styles.textInput}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

class ConversationComponent extends React.Component<NavigationInjectedProps> {
    // static navigationOptions = {
    //     title: 'Conversation',
    // };
    static navigationOptions = (args: any) => {
        return {
            title: args.navigation.getParam('title', 'Conversation'),
        };
    }

    render() {
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