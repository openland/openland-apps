import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, FlatList } from 'react-native';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import Picker from 'react-native-image-picker';
import { MessageInputBar } from './components/MessageInputBar';
import { ZPictureModalContext, ZPictureModalProvider } from '../../components/modal/ZPictureModalContext';
import { ConversationView } from './components/ConversationView';
import { UploadManagerInstance, UploadState } from '../../files/UploadManager';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { PageProps } from '../../components/PageProps';
import { ZQuery } from '../../components/ZQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { Deferred } from '../../components/Deferred';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { ChatHeader } from './components/ChatHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ChatRight } from './components/ChatRight';

class ConversationRoot extends React.Component<PageProps & { provider: ZPictureModalProvider, engine: MessengerEngine, conversationId: string }, { text: string, uploadState?: UploadState }> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();
    watchSubscription?: WatchSubscription;

    constructor(props: { provider: ZPictureModalProvider, router: any, engine: MessengerEngine, conversationId: string }) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.conversationId);
        this.state = { text: '' };
    }

    componentWillMount() {
        this.watchSubscription = UploadManagerInstance.watch(this.props.conversationId, (state) => {
            this.setState({ uploadState: state });
        });
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
        });
    }

    render() {
        return (
            <>
                <SHeaderView>
                    <ChatHeader conversationId={this.engine.conversationId} router={this.props.router} />
                </SHeaderView>
                <SHeaderButton>
                    <ChatRight conversationId={this.engine.conversationId} router={this.props.router} />
                </SHeaderButton>
                <Deferred>
                    <View style={{ height: '100%', flexDirection: 'column' }}>
                        <ConversationView engine={this.engine} />
                        <MessageInputBar
                            onAttachPress={this.handleAttach}
                            onSubmitPress={this.handleSubmit}
                            onChangeText={this.handleTextChange}
                            text={this.state.text}
                            uploadState={this.state.uploadState}
                        />
                    </View>
                </Deferred>
            </>
        );
    }
}

class ConversationComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <View flexDirection={'column'} height="100%" width="100%">
                    <ZPictureModalContext.Consumer>
                        {modal => (
                            <MessengerContext.Consumer>
                                {messenger => {
                                    return (
                                        <ZQuery query={ChatInfoQuery} variables={{ conversationId: this.props.router.params.id }}>
                                            {resp => (
                                                <ConversationRoot provider={modal!!} key={resp.data.chat.id} router={this.props.router} engine={messenger!!} conversationId={resp.data.chat.id} />
                                            )}

                                        </ZQuery>
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