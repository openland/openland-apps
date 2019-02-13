import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, FlatList, Text, AsyncStorage, Platform, TouchableOpacity, Dimensions, Image } from 'react-native';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import Picker from 'react-native-image-picker';
import { MessageInputBar } from './components/MessageInputBar';
import { ConversationView } from './components/ConversationView';
import { PageProps } from '../../components/PageProps';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { ChatHeader } from './components/ChatHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ChatHeaderAvatar, resolveConversationProfilePath } from './components/ChatHeaderAvatar';
import { ZRoundedButton } from '../../components/ZRoundedButton';
import { stopLoader, startLoader } from '../../components/ZGlobalLoader';
import { getMessenger } from '../../utils/messenger';
import { UploadManagerInstance } from '../../files/UploadManager';
import { KeyboardSafeAreaView, ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { Room_room, Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { SDeferred } from 'react-native-s/SDeferred';
import { CallBarComponent } from 'openland-mobile/calls/CallBar';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ConversationTheme, getDefaultConversationTheme, ConversationThemeResolver } from './themes/ConversationThemeResolver';
import { XMemo } from 'openland-y-utils/XMemo';

class ConversationRoot extends React.Component<PageProps & { engine: MessengerEngine, chat: Room_room }, { text: string, theme: ConversationTheme }> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();
    private themeSub?: () => void;

    constructor(props: { router: any, engine: MessengerEngine, chat: Room_room }) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.chat.id);
        AsyncStorage.getItem('compose_draft_' + this.props.chat.id).then(s => this.setState({ text: s || '' }));
        this.state = { text: '', theme: getDefaultConversationTheme(this.props.chat.id) };
    }

    componentWillUnmount() {
        if (this.themeSub) {
            this.themeSub();
        }
    }

    componentWillMount() {
        ConversationThemeResolver.subscribe(this.props.chat.id, t => this.setState({ theme: t })).then(s => this.themeSub = s);
    }

    handleTextChange = (src: string) => {
        getMessenger().engine.client.mutateSetTyping({ conversationId: this.props.chat.id });
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
        builder.action(Platform.select({ ios: 'Photo & Video Library', android: 'Photo Gallery' }), () => {
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
                <SHeaderView accentColor={this.state.theme.mainColor}>
                    {header}
                </SHeaderView>
                {button}
                <SDeferred>
                    <KeyboardSafeAreaView>
                        <View style={{ height: '100%', flexDirection: 'column' }}>
                            {/* <ASView
                                style={{ position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                            >
                                <ASFlex
                                    width={Dimensions.get('window').width}
                                    height={Dimensions.get('window').height}
                                    backgroundColor="green"
                                >
                                 
                                </ASFlex>
                            </ASView> */}
                            <ConversationView engine={this.engine} theme={this.state.theme} />
                            <MessageInputBar
                                onAttachPress={this.handleAttach}
                                onSubmitPress={this.handleSubmit}
                                onChangeText={this.handleTextChange}
                                text={this.state.text}
                                theme={this.state.theme}
                            />
                        </View>
                    </KeyboardSafeAreaView>
                </SDeferred>
            </>
        );
    }
}

const ConversationComponent = XMemo<PageProps>((props) => {

    let room = getClient().useRoomTiny({ id: props.router.params.flexibleId || props.router.params.id });
    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room! as Room_room_SharedRoom : null;
    let privateRoom = room.room!.__typename === 'PrivateRoom' ? room.room! as Room_room_PrivateRoom : null;
    let invite = props.router.params.invite;

    if (sharedRoom && sharedRoom.membership !== 'MEMBER' && sharedRoom.kind !== 'INTERNAL') {
        // not a member - show preview with join/request access button
        if (sharedRoom.kind === 'PUBLIC' || invite) {
            return (
                <View flexDirection={'column'} height="100%" width="100%">
                    <SHeaderView>
                        <ChatHeader conversationId={sharedRoom.id} router={props.router} />
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
                            <ZAvatar
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
                            {!invite &&
                                <ZRoundedButton
                                    size="big"
                                    uppercase={false}
                                    title={sharedRoom!.membership === 'REQUESTED' ? 'Join requested' : 'Join'}
                                    onPress={async () => {
                                        startLoader();
                                        try {
                                            await getClient().mutateRoomJoin({ roomId: sharedRoom!.id });
                                        } catch (e) {
                                            Alert.alert(e.message);
                                        }
                                        stopLoader();

                                    }}
                                />}
                            {invite &&
                                <ZRoundedButton
                                    size="big"
                                    uppercase={false}
                                    title={'Accept invitation'}
                                    onPress={async () => {
                                        startLoader();
                                        try {
                                            let client = getClient();
                                            await client.mutateRoomJoinInviteLink({ invite });
                                        } catch (e) {
                                            Alert.alert(e.message);
                                        }
                                        stopLoader();

                                    }}
                                />
                            }
                        </View>

                    </ASSafeAreaView>
                </View>
            );
        } else {
            return null;
        }
    }

    let messenger = React.useContext(MessengerContext);

    return (
        <View flexDirection={'column'} height="100%" width="100%">
            <ConversationRoot key={(sharedRoom || privateRoom)!.id} router={props.router} engine={messenger!!} chat={(sharedRoom || privateRoom)!} />
            <ASSafeAreaContext.Consumer>
                {safe => <View position="absolute" top={safe.top} right={0} left={0}><CallBarComponent id={(sharedRoom || privateRoom)!.id} /></View>}
            </ASSafeAreaContext.Consumer>
        </View>
    );
});

export const Conversation = withApp(ConversationComponent, { navigationAppearance: 'small' });