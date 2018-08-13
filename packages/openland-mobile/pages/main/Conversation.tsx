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
    Platform,
    UIManager,
} from 'react-native';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { MessagesListComponent } from './components/MessagesListComponent';
import { ChatHeader } from './components/ChatHeader';
import { ChatRight } from './components/ChatRight';
import Picker from 'react-native-image-picker';
import { UploadCareDirectUploading } from '../../utils/UploadCareDirectUploading';
import { ZHeaderButton } from '../../components/ZHeaderButton';
import { MessageFullFragment } from 'openland-api/Types';
import { MessageInputBar } from './components/MessageInputBar';
import { ZHeaderView } from '../../components/ZHeaderView';
import { Modals } from './modals/Modals';
import { ZPictureModalContext, ZPictureModalProvider } from '../../components/modal/ZPictureModalContext';

class ConversationRoot extends React.Component<{ provider: ZPictureModalProvider, navigator: any, engine: MessengerEngine, conversationId: string }, { text: string, render: boolean }> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();

    constructor(props: { provider: ZPictureModalProvider, navigator: any, engine: MessengerEngine, conversationId: string }) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.conversationId);
        this.state = { text: '', render: false };
    }

    componentDidMount() {
        setTimeout(() => { this.setState({ render: true }); }, 10);
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
            if (response.didCancel) {
                return;
            }
            this.engine.sendFile(new UploadCareDirectUploading(response.fileName || 'image.jpg', response.uri));
        });
    }

    handleAvatarPress = (userId: string) => {
        this.props.navigator.navigate('ProfileUser', { 'id': userId });
    }

    handlePhotoPress = (message: MessageFullFragment, view?: View) => {
        view!!.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            this.props.provider.showModal({
                uuid: message.file!!,
                width: message.fileMetadata!!.imageWidth!!,
                height: message.fileMetadata!!.imageHeight!!,
                animate: { x: pageX, y: pageY, width, height, view: view!! }
            });
            // console.log({ x, y, width, height, pageX, pageY });
            // Modals.showPicturePreview(
            //     this.props.navigator,
            //     message.file!!,
            //     message.fileMetadata!!.imageWidth!!,
            //     message.fileMetadata!!.imageHeight!!,
            //     { x: pageX, y: pageY, width, height }
            // );
        });

    }

    render() {
        if (!this.state.render) {
            return <View />;
        }
        return (
            <>
                <ZHeaderView>
                    <ChatHeader conversationId={this.engine.conversationId} navigation={this.props.navigator} />
                </ZHeaderView>
                <ZHeaderButton>
                    <ChatRight conversationId={this.engine.conversationId} navigation={this.props.navigator} />
                </ZHeaderButton>
                <View style={{ height: '100%', flexDirection: 'column' }}>
                    <MessagesListComponent
                        onPhotoPress={this.handlePhotoPress}
                        onAvatarPress={this.handleAvatarPress}
                        engine={this.engine}
                    />
                    <MessageInputBar
                        onAttachPress={this.handleAttach}
                        onSubmitPress={this.handleSubmit}
                        onChangeText={this.handleTextChange}
                        text={this.state.text}
                    />
                </View>
            </>
        );
    }
}

class ConversationComponent extends React.Component<NavigationInjectedProps> {
    render() {
        return (
            <>
                <View backgroundColor="#fff" flexDirection={'column'} height="100%" width="100%">
                    <ZPictureModalContext.Consumer>
                        {modal => (
                            <MessengerContext.Consumer>
                                {messenger => {
                                    return (
                                        <ConversationRoot provider={modal!!} key={this.props.navigation.getParam('id')} navigator={this.props.navigation} engine={messenger!!} conversationId={this.props.navigation.getParam('id')} />
                                    );
                                }}
                            </MessengerContext.Consumer>
                        )}
                    </ZPictureModalContext.Consumer>
                </View>
            </>
        );
    }
}

export const Conversation = withApp(ConversationComponent, { navigationAppearance: 'small' });