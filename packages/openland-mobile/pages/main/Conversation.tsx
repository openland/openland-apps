import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, FlatList, Text, Alert } from 'react-native';
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
import { ZRoundedButton } from '../../components/ZRoundedButton';
import { YMutation } from 'openland-y-graphql/YMutation';
import { ChannelJoinMutation } from 'openland-api';
import { stopLoader, startLoader } from '../../components/ZGlobalLoader';

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
                                    if (this.props.router.params.flexibleId) {
                                        return (
                                            <ZQuery query={ChatInfoQuery} variables={{ conversationId: this.props.router.params.flexibleId }}>
                                                {resp => {
                                                    if (resp.data.chat.__typename === 'ChannelConversation' && resp.data.chat.myStatus !== 'member') {
                                                        return (
                                                            <>
                                                                <SHeaderView>
                                                                    <ChatHeader conversationId={resp.data.chat.id} router={this.props.router} />
                                                                </SHeaderView>
                                                                <SHeaderButton>
                                                                    <ChatRight conversationId={resp.data.chat.id} router={this.props.router} />
                                                                </SHeaderButton>
                                                                <View width="100%" height="100%" justifyContent="center">
                                                                    <View alignSelf="center" flexDirection="column">
                                                                        <Text style={{ fontSize: 14, color: '#000', textAlign: 'center', margin: 20 }}>{resp.data.chat.description}</Text>
                                                                    </View>
                                                                    <View alignSelf="center">
                                                                        <YMutation mutation={ChannelJoinMutation} refetchQueriesVars={[{ query: ChatInfoQuery, variables: { conversationId: this.props.router.params.flexibleId } }]}>
                                                                            {(join) => (
                                                                                <ZRoundedButton
                                                                                    title={(resp.data.chat as any).myStatus === 'requested' ? 'Invite requested' : 'Join'}
                                                                                    onPress={async () => {
                                                                                        startLoader();
                                                                                        try {
                                                                                            await join({ variables: { channelId: resp.data.chat.id } });
                                                                                        } catch (e) {
                                                                                            Alert.alert(e.message);
                                                                                        }
                                                                                        stopLoader();

                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </YMutation>
                                                                    </View>

                                                                </View>

                                                            </>
                                                        );
                                                    }
                                                    return <ConversationRoot provider={modal!!} key={resp.data.chat.id} router={this.props.router} engine={messenger!!} conversationId={resp.data.chat.id} />;
                                                }}

                                            </ZQuery>
                                        );
                                    } else {
                                        return (<ConversationRoot provider={modal!!} key={this.props.router.params.id} router={this.props.router} engine={messenger!!} conversationId={this.props.router.params.id} />);
                                    }
                                }}
                            </MessengerContext.Consumer>
                        )
                        }
                    </ZPictureModalContext.Consumer>
                </View>
            </>
        );
    }
}

export const Conversation = withApp(ConversationComponent, { navigationAppearance: 'small' });