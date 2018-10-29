import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, FlatList, Text, Alert, AsyncStorage, Platform, TouchableOpacity, Dimensions, Image } from 'react-native';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import Picker from 'react-native-image-picker';
import { MessageInputBar } from './components/MessageInputBar';
import { ZPictureModalContext, ZPictureModalProvider } from '../../components/modal/ZPictureModalContext';
import { ConversationView } from './components/ConversationView';
import { WatchSubscription } from 'openland-y-utils/Watcher';
import { PageProps } from '../../components/PageProps';
import { ZQuery } from '../../components/ZQuery';
import { ChatInfoQuery } from 'openland-api/ChatInfoQuery';
import { Deferred } from '../../components/Deferred';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { ChatHeader } from './components/ChatHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ChatHeaderAvatar, resolveConversationProfilePath } from './components/ChatHeaderAvatar';
import { ZRoundedButton } from '../../components/ZRoundedButton';
import { YMutation } from 'openland-y-graphql/YMutation';
import { ChannelJoinMutation, SetTypingMutation } from 'openland-api';
import { stopLoader, startLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { UploadManagerInstance } from '../../files/UploadManager';
import { ChatInfo_chat } from 'openland-api/Types';
import { KeyboardSafeAreaView, ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { XPAvatar } from 'openland-xp/XPAvatar';

class ConversationRoot extends React.Component<PageProps & { provider: ZPictureModalProvider, engine: MessengerEngine, chat: ChatInfo_chat }, { text: string }> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();

    constructor(props: { provider: ZPictureModalProvider, router: any, engine: MessengerEngine, chat: ChatInfo_chat }) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.chat.id);
        AsyncStorage.getItem('compose_draft_' + this.props.chat.id).then(s => this.setState({ text: s || '' }));
        this.state = { text: '' };
    }

    handleTextChange = (src: string) => {
        getMessenger().engine.client.client.mutate({ mutation: SetTypingMutation.document, variables: { conversationId: this.props.chat.id } });
        this.setState({ text: src });
        AsyncStorage.setItem('compose_draft_' + this.props.chat.id, src);
    }

    handleSubmit = () => {
        let tx = this.state.text.trim();
        if (tx.length > 0) {
            this.setState({ text: '' });
            this.engine.sendMessage(tx);
        }
        AsyncStorage.removeItem('compose_draft_' + this.props.chat.id);

    }

    handleAttach = () => {
        Picker.showImagePicker({ title: 'Send file' }, (response) => {
            if (response.didCancel) {
                return;
            }

            UploadManagerInstance.registerUpload(this.props.chat.id, response.fileName || 'image.jpg', response.uri, response.fileSize);
        });
    }

    render() {
        let path = resolveConversationProfilePath(this.props.chat);
        let header = (
            <TouchableOpacity disabled={!path.path} onPress={() => this.props.router.push(path.path!, path.pathArgs)}>
                <View flexDirection="row">
                    <ChatHeaderAvatar conversationId={this.engine.conversationId} router={this.props.router} />
                    <ChatHeader conversationId={this.engine.conversationId} router={this.props.router} />
                </View>
            </TouchableOpacity>
        );
        if (Platform.OS === 'ios') {
            header = <ChatHeader conversationId={this.engine.conversationId} router={this.props.router} />;
        }
        let button = null;
        if (Platform.OS === 'ios') {
            button = (
                <SHeaderButton>
                    <ChatHeaderAvatar conversationId={this.engine.conversationId} router={this.props.router} />
                </SHeaderButton>
            );
        }
        return (
            <>
                <SHeaderView>
                    {header}
                </SHeaderView>
                {button}
                <Deferred>
                    <KeyboardSafeAreaView>
                        <View style={{ height: '100%', flexDirection: 'column' }}>
                            <ConversationView engine={this.engine} />
                            <MessageInputBar
                                onAttachPress={this.handleAttach}
                                onSubmitPress={this.handleSubmit}
                                onChangeText={this.handleTextChange}
                                text={this.state.text}
                            />
                        </View>
                    </KeyboardSafeAreaView>
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
                                {messenger => (
                                    <ZQuery query={ChatInfoQuery} variables={{ conversationId: this.props.router.params.flexibleId || this.props.router.params.id }}>
                                        {resp => {
                                            if (resp.data.chat.__typename === 'ChannelConversation' && resp.data.chat.myStatus !== 'member') {
                                                return (
                                                    <>
                                                        <SHeaderView>
                                                            <ChatHeader conversationId={resp.data.chat.id} router={this.props.router} />
                                                        </SHeaderView>
                                                        <ASView
                                                            style={{ position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                                                        >
                                                            <ASFlex
                                                                width={Dimensions.get('window').width}
                                                                height={Dimensions.get('window').height}
                                                            >
                                                                <ASImage
                                                                    source={require('assets/img-chat-3.jpg')}
                                                                    width={Dimensions.get('window').width}
                                                                    height={Dimensions.get('window').height}
                                                                />
                                                            </ASFlex>
                                                        </ASView>
                                                        <ASSafeAreaView width="100%" height="100%" justifyContent="center" >

                                                            <View alignSelf="center" alignItems="center" justifyContent="center" flexDirection="column" flexGrow={1}>
                                                                <XPAvatar
                                                                
                                                                    src={(resp.data!!.chat as any).photo || (resp.data!!.chat.photos.length > 0 ? resp.data!!.chat.photos[0] : undefined)}
                                                                    size={100}
                                                                    placeholderKey={resp.data!!.chat.flexibleId}
                                                                    placeholderTitle={resp.data!!.chat.title}
                                                                    userId={resp.data!!.chat.__typename === 'PrivateConversation' ? resp.data.chat.flexibleId : undefined}
                                                                />
                                                                <View flexDirection="column" zIndex={-1}>
                                                                    <Image source={require('assets/back.png')}  resizeMode="stretch" style={{ position: 'absolute', width: '250%', height: '300%', top: '-75%', left: '-75%' }} />
                                                                    <Text style={{ fontSize: 20, fontWeight: '500', color: '#000', textAlign: 'center', marginTop: 22, marginLeft: 32, marginRight: 32 }} >{resp.data.chat.title}</Text>
                                                                    <Text style={{ fontSize: 15, color: '#8a8a8f', textAlign: 'center', marginTop: 7, marginLeft: 32, marginRight: 32, lineHeight: 22 }} >{resp.data.chat.description}</Text>
                                                                    <Text style={{ fontSize: 14, color: '#8a8a8f', textAlign: 'center', marginTop: 10, marginLeft: 32, marginRight: 32, lineHeight: 18 }} >{resp.data.chat.membersCount + ' members'}</Text>
                                                                </View>
                                                            </View>
                                                            <View alignSelf="center" marginBottom={46}>
                                                                <YMutation mutation={ChannelJoinMutation} refetchQueriesVars={[{ query: ChatInfoQuery, variables: { conversationId: this.props.router.params.flexibleId } }]}>
                                                                    {(join) => (
                                                                        <ZRoundedButton
                                                                            style="big"
                                                                            uppercase={false}
                                                                            title={(resp.data.chat as any).myStatus === 'requested' ? 'Invite requested' : 'Request invite'}
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

                                                        </ASSafeAreaView>

                                                    </>
                                                );
                                            }
                                            return <ConversationRoot provider={modal!!} key={resp.data.chat.id} router={this.props.router} engine={messenger!!} chat={resp.data.chat} />;
                                        }}

                                    </ZQuery>
                                )}
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