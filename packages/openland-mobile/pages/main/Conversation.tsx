import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, FlatList, Text } from 'react-native';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ChatHeader } from './components/ChatHeader';
import { ChatRight } from './components/ChatRight';
import Picker from 'react-native-image-picker';
import { UploadCareDirectUploading } from '../../utils/UploadCareDirectUploading';
import { ZHeaderButton } from '../../components/ZHeaderButton';
import { MessageFullFragment } from 'openland-api/Types';
import { MessageInputBar } from './components/MessageInputBar';
import { ZHeaderView } from '../../components/ZHeaderView';
import { ZPictureModalContext, ZPictureModalProvider } from '../../components/modal/ZPictureModalContext';
import { ConversationView } from './components/ConversationView';
import { UploadManagerInstance, UploadState } from '../../files/UploadManager';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { ZSafeAreaView } from '../../components/layout/ZSafeAreaView';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';
import { DownloadManagerInstance } from '../../files/DownloadManager';

class ConversationRoot extends React.Component<{ provider: ZPictureModalProvider, navigator: any, engine: MessengerEngine, conversationId: string }, { text: string, render: boolean, uploadState?: UploadState }> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();
    watchSubscription?: WatchSubscription;

    constructor(props: { provider: ZPictureModalProvider, navigator: any, engine: MessengerEngine, conversationId: string }) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.conversationId);
        this.state = { text: '', render: false };
    }

    componentWillMount() {
        this.watchSubscription = UploadManagerInstance.watch(this.props.conversationId, (state) => {
            this.setState({ uploadState: state });
        });
    }

    componentDidMount() {
        setTimeout(() => { this.setState({ render: true }); }, 10);
    }

    componentWillUnmount() {
        this.watchSubscription!!();
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
            UploadManagerInstance.registerUpload(this.props.conversationId, response.fileName || 'image.jpg', response.uri);
            // this.engine.sendFile(new UploadCareDirectUploading(response.fileName || 'image.jpg', response.uri));
        });
    }

    handleAvatarPress = (userId: string) => {
        this.props.navigator.navigate('ProfileUser', { 'id': userId });
    }

    handlePhotoPress = (message: MessageFullFragment, view?: View) => {
        const optimalSize = layoutMedia(message.fileMetadata!!.imageWidth!!, message.fileMetadata!!.imageHeight!!, 1024, 1024);
        view!!.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            this.props.provider.showModal({
                url: DownloadManagerInstance.resolvePath(message.file!!, optimalSize),
                width: message.fileMetadata!!.imageWidth!!,
                height: message.fileMetadata!!.imageHeight!!,
                animate: { x: pageX, y: pageY, width, height, view: view!! },
                onBegin: () => {
                    view!!.setNativeProps({ 'opacity': 0 });
                },
                onEnd: () => {
                    view!!.setNativeProps({ 'opacity': 1 });
                },
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
        // if (!this.state.render) {
        //     return <View />;
        // }
        return (
            <>
                <ZHeaderView>
                    <ChatHeader conversationId={this.engine.conversationId} navigation={this.props.navigator} />
                </ZHeaderView>
                <ZHeaderButton>
                    <ChatRight conversationId={this.engine.conversationId} navigation={this.props.navigator} />
                </ZHeaderButton>
                <View style={{ height: '100%', flexDirection: 'column' }}>
                    <ConversationView
                        onPhotoPress={this.handlePhotoPress}
                        onAvatarPress={this.handleAvatarPress}
                        engine={this.engine}
                    />
                    <MessageInputBar
                        onAttachPress={this.handleAttach}
                        onSubmitPress={this.handleSubmit}
                        onChangeText={this.handleTextChange}
                        text={this.state.text}
                        uploadState={this.state.uploadState}
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