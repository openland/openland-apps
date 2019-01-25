import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, FlatList, Text, AsyncStorage, Platform, TouchableOpacity, Dimensions, Image } from 'react-native';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import Picker from 'react-native-image-picker';
import { MessageInputBar } from './components/MessageInputBar';
import { ConversationView } from './components/ConversationView';
import { PageProps } from '../../components/PageProps';
import { ZQuery } from '../../components/ZQuery';
import { Deferred } from '../../components/Deferred';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { ChatHeader } from './components/ChatHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ChatHeaderAvatar, resolveConversationProfilePath } from './components/ChatHeaderAvatar';
import { ZRoundedButton } from '../../components/ZRoundedButton';
import { YMutation } from 'openland-y-graphql/YMutation';
import { SetTypingMutation, RoomQuery, RoomJoinMutation, RoomJoinInviteLinkMutation } from 'openland-api';
import { stopLoader, startLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { UploadManagerInstance } from '../../files/UploadManager';
import { KeyboardSafeAreaView, ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { Room_room, Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Alert } from 'openland-mobile/components/AlertBlanket';

class ConversationRoot extends React.Component<PageProps & { engine: MessengerEngine, chat: Room_room }, { text: string }> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();

    constructor(props: { router: any, engine: MessengerEngine, chat: Room_room }) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.chat.id);
        AsyncStorage.getItem('compose_draft_' + this.props.chat.id).then(s => this.setState({ text: s || '' }));
        this.state = { text: '' };
    }

    handleTextChange = (src: string) => {
        getMessenger().engine.client.mutate(SetTypingMutation, { conversationId: this.props.chat.id });
        this.setState({ text: src });
        AsyncStorage.setItem('compose_draft_' + this.props.chat.id, src);
    }

    handleSubmit = () => {
        let tx = this.state.text.trim();
        if (tx.length > 0) {
            this.setState({ text: '' });
            this.engine.sendMessage(tx, null);
        }
        AsyncStorage.removeItem('compose_draft_' + this.props.chat.id);

    }

    handleAttach = () => {
        let builder = new ActionSheetBuilder();
        builder.action('Take Photo', () => {
            Picker.launchCamera({ title: 'Take Photo' }, (response) => {
                if (response.didCancel) {
                    return;
                }
                // only photos has this field: https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Reference.md
                let isPhoto = !!response.type;
                UploadManagerInstance.registerUpload(this.props.chat.id, isPhoto ? 'image.jpg' : 'video.mp4', response.uri, response.fileSize);
            });
        });
        builder.action(Platform.select({ ios: 'Photo or Video', android: 'Photo' }), () => {
            Picker.launchImageLibrary({ mediaType: Platform.select({ ios: 'mixed', android: 'photo', default: 'photo' }) as 'photo' | 'mixed' }, (response) => {
                if (response.didCancel) {
                    return;
                }

                // only photos has this field: https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Reference.md
                let isPhoto = !!response.type;
                UploadManagerInstance.registerUpload(this.props.chat.id, isPhoto ? 'image.jpg' : 'video.mp4', response.uri, response.fileSize);
            });
        });
        if (Platform.OS === 'android') {
            builder.action('Video', () => {
                Picker.launchImageLibrary({ mediaType: 'video' }, (response) => {
                    if (response.didCancel) {
                        return;
                    }
                    UploadManagerInstance.registerUpload(this.props.chat.id, 'video.mp4', response.uri, response.fileSize);
                });
            });
        }

        builder.show();
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
                    <ZQuery query={RoomQuery} variables={{ id: this.props.router.params.flexibleId || this.props.router.params.id }}>
                        {resp => {
                            let sharedRoom = resp.data.room!.__typename === 'SharedRoom' ? resp.data.room! as Room_room_SharedRoom : null;
                            let privateRoom = resp.data.room!.__typename === 'PrivateRoom' ? resp.data.room! as Room_room_PrivateRoom : null;
                            let invite = this.props.router.params.invite;

                            if (sharedRoom && sharedRoom.membership !== 'MEMBER' && sharedRoom.kind !== 'INTERNAL') {
                                // not a member - show preview with join/request access button
                                if (sharedRoom.kind === 'PUBLIC' || invite) {
                                    return (
                                        <>
                                            <SHeaderView>
                                                <ChatHeader conversationId={sharedRoom.id} router={this.props.router} />
                                            </SHeaderView>
                                            <ASView
                                                style={{ position: 'absolute', zIndex: -1, left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
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
                                                        src={sharedRoom.photo}
                                                        size={100}
                                                        placeholderKey={sharedRoom.id}
                                                        placeholderTitle={sharedRoom.title}

                                                    />
                                                    <View flexDirection="column" zIndex={- 1}>
                                                        <Image source={require('assets/back.png')} resizeMode="stretch" style={{ position: 'absolute', width: '250%', height: '300%', top: '-75%', left: '-75%' }} />
                                                        <Text style={{ fontSize: 20, fontWeight: '500', color: '#000', textAlign: 'center', marginTop: 22, marginLeft: 32, marginRight: 32 }} >{sharedRoom.title}</Text>
                                                        <Text style={{ fontSize: 15, color: '#8a8a8f', textAlign: 'center', marginTop: 7, marginLeft: 32, marginRight: 32, lineHeight: 22 }} >{sharedRoom.description}</Text>
                                                        <Text style={{ fontSize: 14, color: '#8a8a8f', textAlign: 'center', marginTop: 10, marginLeft: 32, marginRight: 32, lineHeight: 18 }} >{sharedRoom.membersCount + ' members'}</Text>
                                                    </View>
                                                </View>
                                                <View alignSelf="center" marginBottom={46}>
                                                    {!invite && <YMutation mutation={RoomJoinMutation} refetchQueriesVars={[{ query: RoomQuery, variables: { conversationId: this.props.router.params.flexibleId } }]}>
                                                        {(join) => (
                                                            <ZRoundedButton
                                                                size="big"
                                                                uppercase={false}
                                                                title={sharedRoom!.membership === 'REQUESTED' ? 'Invite requested' : 'Request invite'}
                                                                onPress={async () => {
                                                                    startLoader();
                                                                    try {
                                                                        await join({ variables: { roomId: sharedRoom!.id } });
                                                                    } catch (e) {
                                                                        Alert.alert(e.message);
                                                                    }
                                                                    stopLoader();

                                                                }}
                                                            />
                                                        )}
                                                    </YMutation>}
                                                    {invite && <YMutation mutation={RoomJoinInviteLinkMutation} refetchQueriesVars={[{ query: RoomQuery, variables: { conversationId: this.props.router.params.flexibleId } }]}>
                                                        {(join) => (
                                                            <ZRoundedButton
                                                                size="big"
                                                                uppercase={false}
                                                                title={'Accept invitation'}
                                                                onPress={async () => {
                                                                    startLoader();
                                                                    try {
                                                                        await join({ variables: { invite: invite } });
                                                                    } catch (e) {
                                                                        Alert.alert(e.message);
                                                                    }
                                                                    stopLoader();

                                                                }}
                                                            />
                                                        )}
                                                    </YMutation>}
                                                </View>

                                            </ASSafeAreaView>

                                        </>
                                    );
                                } else {
                                    return null;
                                }

                            } else {
                                // member - show chat
                                return (
                                    <MessengerContext.Consumer>
                                        {messenger => (
                                            <ConversationRoot key={(sharedRoom || privateRoom)!.id} router={this.props.router} engine={messenger!!} chat={(sharedRoom || privateRoom)!} />
                                        )}
                                    </MessengerContext.Consumer>
                                );
                            }
                        }}

                    </ZQuery>

                </View>
            </>
        );
    }
}

export const Conversation = withApp(ConversationComponent, { navigationAppearance: 'small' });