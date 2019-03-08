import * as React from 'react';
import { withApp } from '../../components/withApp';
import { View, FlatList, Text, AsyncStorage, Platform, TouchableOpacity, Image, NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
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
import { Room_room, Room_room_SharedRoom, Room_room_PrivateRoom, RoomMembers_members_user, MessageFull_mentions } from 'openland-api/Types';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { SDeferred } from 'react-native-s/SDeferred';
import { CallBarComponent } from 'openland-mobile/calls/CallBar';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ConversationTheme, ConversationThemeResolver, DefaultConversationTheme } from './themes/ConversationThemeResolver';
import { XMemo } from 'openland-y-utils/XMemo';
import { checkFileIsPhoto } from 'openland-y-utils/checkFileIsPhoto';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { MentionsRender } from './components/MentionsRender';
import { findActiveWord } from 'openland-y-utils/findActiveWord';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { showCallModal } from './Call';
import { handlePermissionDismiss } from 'openland-y-utils/PermissionManager/handlePermissionDismiss';

interface ConversationRootProps extends PageProps {
    engine: MessengerEngine;
    chat: Room_room;
}

interface ConversationRootState {
    text: string;
    theme: ConversationTheme;
    mentionedUsers: MessageFull_mentions[];
    inputFocused: boolean;
    selection: {
        start: number,
        end: number
    }
}

class ConversationRoot extends React.Component<ConversationRootProps, ConversationRootState> {
    engine: ConversationEngine;
    listRef = React.createRef<FlatList<any>>();
    private themeSub?: () => void;

    constructor(props: ConversationRootProps) {
        super(props);
        this.engine = this.props.engine.getConversation(this.props.chat.id);
        this.state = {
            text: '',
            theme: DefaultConversationTheme,
            selection: {
                start: 0,
                end: 0.
            },
            mentionedUsers: [],
            inputFocused: false
        };

        AsyncStorage.getItem('compose_draft_' + this.props.chat.id).then(s => this.setState({ text: s || '' }));
        AsyncStorage.getItem('compose_draft_mentions_' + this.props.chat.id).then(s => this.setState({ mentionedUsers: JSON.parse(s) || [] }));
    }

    componentWillUnmount() {
        if (this.themeSub) {
            this.themeSub();
        }
    }

    componentWillMount() {
        ConversationThemeResolver.subscribe(this.props.chat.id, t => this.setState({ theme: t })).then(s => this.themeSub = s);
    }

    saveDraft = () => {
        AsyncStorage.multiSet([
            ['compose_draft_' + this.props.chat.id, this.state.text],
            ['compose_draft_mentions_' + this.props.chat.id, JSON.stringify(this.state.mentionedUsers)],
        ]);
    }

    removeDraft = () => {
        AsyncStorage.multiRemove([
            'compose_draft_' + this.props.chat.id,
            'compose_draft_mentions_' + this.props.chat.id
        ]);
    }

    handleTextChange = (src: string) => {
        getMessenger().engine.client.mutateSetTyping({ conversationId: this.props.chat.id });

        this.setState({ text: src }, () => {
            this.saveDraft();
        });
    }

    handleSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        this.setState({
            selection: {
                start: e.nativeEvent.selection.start,
                end: e.nativeEvent.selection.end
            }
        });
    }

    handleFocus = () => {
        this.setState({
            inputFocused: true
        });
    }

    handleBlur = () => {
        this.setState({
            inputFocused: false
        });
    }

    handleSubmit = () => {
        let tx = this.state.text.trim();
        if (tx.length > 0) {
            let mentions: MessageFull_mentions[] = [];

            if (this.state.mentionedUsers.length > 0) {
                this.state.mentionedUsers.map(user => {
                    if (tx.indexOf(user.name) >= 0) {
                        mentions.push(user);
                    }
                })
            }

            this.engine.sendMessage(tx, mentions);
        }

        this.setState({
            text: '',
            mentionedUsers: [],
        });

        this.removeDraft();
    }

    handleAttach = () => {
        let builder = new ActionSheetBuilder();
        builder.action(Platform.OS === 'android' ? 'Take Photo' : 'Camera', () => {
            Picker.launchCamera({ title: 'Camera', mediaType: 'mixed' }, (response) => {
                if (response.error) {
                    handlePermissionDismiss('camera');
                    return;
                }

                if (response.didCancel) {
                    return;
                }

                let isPhoto = checkFileIsPhoto(response.uri);

                UploadManagerInstance.registerUpload(this.props.chat.id, isPhoto ? 'image.jpg' : 'video.mp4', response.path ? 'file://' + response.path : response.uri, response.fileSize);
            });
        }, false, Platform.OS === 'android' ? require('assets/ic-camera-24.png') : undefined);
        if (Platform.OS === 'android') {
            builder.action('Record Video', () => {
                Picker.launchCamera({
                    mediaType: 'video',
                }, (response) => {
                    if (response.error) {
                        handlePermissionDismiss('camera');
                        return;
                    }

                    if (response.didCancel) {
                        return;
                    }
                    UploadManagerInstance.registerUpload(this.props.chat.id, 'video.mp4', response.uri, response.fileSize);
                });
            }, false, Platform.OS === 'android' ? require('assets/ic-video-24.png') : undefined);
        }
        builder.action(Platform.select({ ios: 'Photo & Video Library', android: 'Photo Gallery' }), () => {
            Picker.launchImageLibrary(
                {
                    maxWidth: 1024,
                    maxHeight: 1024,
                    quality: 1,
                    videoQuality: Platform.OS === 'ios' ? 'medium' : undefined,
                    mediaType: Platform.select({ ios: 'mixed', android: 'photo', default: 'photo' }) as 'photo' | 'mixed'
                },
                (response) => {
                    if (response.error) {
                        handlePermissionDismiss('gallery');
                        return;
                    }

                    if (response.didCancel) {
                        return;
                    }

                    let isPhoto = checkFileIsPhoto(response.uri);

                    UploadManagerInstance.registerUpload(this.props.chat.id, isPhoto ? 'image.jpg' : 'video.mp4', response.uri, response.fileSize);
                }
            );
        }, false, Platform.OS === 'android' ? require('assets/ic-gallery-24.png') : undefined);
        if (Platform.OS === 'android') {
            builder.action('Video Gallery', () => {
                Picker.launchImageLibrary({
                    mediaType: 'video',
                }, (response) => {
                    if (response.error) {
                        handlePermissionDismiss('gallery');
                        return;
                    }

                    if (response.didCancel) {
                        return;
                    }
                    UploadManagerInstance.registerUpload(this.props.chat.id, 'video.mp4', response.uri, response.fileSize);
                });
            }, false, Platform.OS === 'android' ? require('assets/ic-gallery-video-24.png') : undefined);
        }

        builder.action('Document', () => {
            DocumentPicker.show({ filetype: [DocumentPickerUtil.allFiles()] },
                (error, res) => {
                    if (!res) {
                        return;
                    }

                    UploadManagerInstance.registerUpload(this.props.chat.id, res.fileName, res.uri, res.fileSize);
                }
            );
        }, false, Platform.OS === 'android' ? require('assets/ic-document-24.png') : undefined);

        builder.show();
    }

    handleMentionPress = (word: string | undefined, user: RoomMembers_members_user) => {
        if (typeof word !== 'string') {
            return;
        }

        let { text, selection } = this.state;

        let newText = text.substring(0, selection.start - word.length) + '@' + user.name + ' ' + text.substring(selection.start, text.length);
        let mentionedUsers = this.state.mentionedUsers;

        mentionedUsers.push(user);

        this.setState({
            text: newText,
            mentionedUsers: mentionedUsers
        }, () => {
            this.saveDraft();
        });
    }

    render() {
        let path = resolveConversationProfilePath(this.props.chat);
        let header = (
            <TouchableOpacity disabled={!path.path} onPress={() => this.props.router.push(path.path!, path.pathArgs)}>
                <View flexDirection="row" flexShrink={1} marginLeft={Platform.OS === 'android' ? -12 : 0}>
                    <ChatHeaderAvatar conversationId={this.engine.conversationId} router={this.props.router} />
                    <ChatHeader conversationId={this.engine.conversationId} router={this.props.router} />
                </View>
            </TouchableOpacity>
        );
        // if (Platform.OS === 'ios') {
        //     header = <ChatHeader conversationId={this.engine.conversationId} router={this.props.router} />;
        // }
        // let button = null;
        // if (Platform.OS === 'ios') {
        //     button = (
        //         <SHeaderButton>
        //             <ChatHeaderAvatar conversationId={this.engine.conversationId} router={this.props.router} />
        //         </SHeaderButton>
        //     );
        // }

        let mentions = null;
        let activeWord = findActiveWord(this.state.text, this.state.selection);
        if (this.props.chat.__typename === 'SharedRoom' && this.state.inputFocused && activeWord && activeWord.startsWith('@')) {
            mentions = (
                <MentionsRender
                    activeWord={activeWord}
                    onMentionPress={this.handleMentionPress}
                    groupId={this.props.chat.id}
                />
            );
        }

        return (
            <>
                <SHeaderView>
                    {header}
                </SHeaderView>
                <SHeaderButton
                    title="Call"
                    icon={require('assets/ic-call-20.png')}
                    onPress={async () => { showCallModal(this.props.chat.id); }}
                />
                {/* {button} */}
                <SDeferred>
                    <KeyboardSafeAreaView>
                        <View style={{ height: '100%', flexDirection: 'column' }}>
                            <ConversationView engine={this.engine} theme={this.state.theme} />
                            <MessageInputBar
                                onAttachPress={this.handleAttach}
                                onSubmitPress={this.handleSubmit}
                                onChangeText={this.handleTextChange}
                                onSelectionChange={this.handleSelectionChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                text={this.state.text}
                                theme={this.state.theme}
                                topContent={mentions}
                            />
                        </View>
                    </KeyboardSafeAreaView>
                </SDeferred>
            </>
        );
    }
}

const ConversationComponent = XMemo<PageProps>((props) => {
    let theme = React.useContext(ThemeContext);
    let messenger = getMessenger();
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
                    {/* <ASView
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
                    </ASView> */}
                    <ASSafeAreaView width="100%" height="100%" justifyContent="center" >

                        <View alignSelf="center" alignItems="center" justifyContent="center" flexDirection="column" flexGrow={1}>
                            <ZAvatar
                                src={sharedRoom.photo}
                                size={100}
                                placeholderKey={sharedRoom.id}
                                placeholderTitle={sharedRoom.title}

                            />
                            <View flexDirection="column" zIndex={- 1}>
                                {/* <Image source={require('assets/back.png')} resizeMode="stretch" style={{ position: 'absolute', width: '250%', height: '300%', top: '-75%', left: '-75%' }} /> */}
                                <Text style={{ fontSize: 20, fontWeight: '500', color: theme.textColor, textAlign: 'center', marginTop: 22, marginLeft: 32, marginRight: 32 }} >{sharedRoom.title}</Text>
                                <Text style={{ fontSize: 15, color: theme.textLabelColor, textAlign: 'center', marginTop: 7, marginLeft: 32, marginRight: 32, lineHeight: 22 }} >{sharedRoom.description}</Text>
                                <Text style={{ fontSize: 14, color: theme.textLabelColor, textAlign: 'center', marginTop: 10, marginLeft: 32, marginRight: 32, lineHeight: 18 }} >{sharedRoom.membersCount + ' members'}</Text>
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

    return (
        <View flexDirection={'column'} height="100%" width="100%">
            <ConversationRoot key={(sharedRoom || privateRoom)!.id} router={props.router} engine={messenger.engine} chat={(sharedRoom || privateRoom)!} />
            <ASSafeAreaContext.Consumer>
                {safe => <View position="absolute" top={safe.top} right={0} left={0}><CallBarComponent id={(sharedRoom || privateRoom)!.id} /></View>}
            </ASSafeAreaContext.Consumer>
        </View>
    );
});

export const Conversation = withApp(ConversationComponent, { navigationAppearance: 'small', hideBackText: true, hideHairline: true });