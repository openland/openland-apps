import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
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
import { ZSafeAreaView } from '../../components/ZSaveAreaView';
import { ChatHeader } from './components/ChatHeader';
import { ChatRight } from './components/ChatRight';
import Picker from 'react-native-image-picker';
import { UploadCareDirectUploading } from '../../utils/UploadCareDirectUploading';

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
const iconAttach = require('assets/ic-attachment.png');

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

    handleAttach = () => {
        Picker.showImagePicker({ title: 'Send file' }, (response) => {
            this.engine.sendFile(new UploadCareDirectUploading(response.fileName || 'image.jpg', response.uri));
        });
    }

    render() {
        let hasText = this.state.text.trim().length > 0;
        return (
            <ZSafeAreaView>
                <View style={{ height: '100%' }} flexDirection="column">
                    <MessagesListComponent engine={this.engine} />
                    <View alignSelf="stretch" alignItems="stretch" style={{ paddingLeft: 15, paddingTop: 10, paddingBottom: 10 }} flexDirection="row">
                        <TouchableOpacity onPress={this.handleAttach}>
                            <View alignContent="center" justifyContent="center" width={54} height={33} paddingLeft={12}>
                                <Image source={iconAttach} style={{ width: 24, height: 24 }} />
                            </View>
                        </TouchableOpacity>
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
            </ZSafeAreaView>
        );
    }
}

class ConversationComponent extends React.Component<NavigationInjectedProps> {

    static navigationOptions = (args: any) => {
        return {
            headerTitle: <ChatHeader conversationId={args.navigation.getParam('id', 'Conversation')} />,
            headerRight: <ChatRight conversationId={args.navigation.getParam('id', 'Conversation')} />
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