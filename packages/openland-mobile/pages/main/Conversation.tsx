import * as React from 'react';
import { NavigationInjectedProps, SafeAreaView } from 'react-navigation';
import { withApp } from '../../components/withApp';
import {
    View, FlatList,
    TextInput,
    StyleSheet,
    ViewStyle,
    Image,
    TouchableOpacity,
} from 'react-native';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessagesListComponent } from './components/MessagesListComponent';
import { KeyboardHider } from './components/KeyboardHider';
import { YKeyboardAvoidingView } from '../../components/YKeyboardAvoidingView';

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

const icon = require('assets/ic-send.png');
const iconActive = require('assets/ic-send-active.png');

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
        let hasText = this.state.text.trim().length > 0;
        return (
            <YKeyboardAvoidingView>
                <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }} flexDirection="column">
                    <View style={{ height: '100%' }} flexDirection="column">
                        <MessagesListComponent engine={this.engine} />
                        <View alignSelf="stretch" alignItems="stretch" style={{ paddingLeft: 15, paddingTop: 10, paddingBottom: 10 }} flexDirection="row">
                            <TextInput
                                flexGrow={1}
                                flexBasis={0}
                                placeholder="Message"
                                placeholderTextColor="#aaaaaa"
                                onChangeText={this.handleTextChange}
                                value={this.state.text}
                                onSubmitEditing={this.handleSubmit}
                                style={styles.textInput}
                            />
                            <TouchableOpacity disabled={!hasText} onPress={this.handleSubmit}>
                                <View alignContent="center" justifyContent="center" width={54} height={33} paddingLeft={12}>
                                    <Image source={hasText ? iconActive : icon} style={{ width: 24, height: 24 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </YKeyboardAvoidingView>
        );
    }
}

class ConversationComponent extends React.Component<NavigationInjectedProps> {

    static navigationOptions = (args: any) => {
        return {
            title: args.navigation.getParam('title', 'Conversation'),
        };
    }

    render() {
        return (
            <>
                <MessengerContext.Consumer>
                    {messenger => {
                        return (
                            <ConversationRoot engine={messenger!!} conversationId={this.props.navigation.getParam('id')} />
                        );
                    }}
                </MessengerContext.Consumer>
                <KeyboardHider navigation={this.props.navigation} />
            </>
        );
    }
}

export const Conversation = withApp(ConversationComponent);