import * as React from 'react';
import { ModalProps } from 'react-native-fast-modal';
import { View, Text, Image, FlatList, LayoutChangeEvent, TouchableOpacity, Keyboard, LayoutAnimation, Platform, DeviceEventEmitter } from 'react-native';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { SDevice } from 'react-native-s/SDevice';
import { SRouter } from 'react-native-s/SRouter';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { HighlightAlpha, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { useSafeArea } from 'react-native-safe-area-context';
import { RoomControls } from './RoomControls';
import { Conference_conference_peers, VoiceChatParticipantStatus, VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { SUPER_ADMIN } from '../Init';
import { TintBlue } from 'openland-y-utils/themes/tints';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZInput } from 'openland-mobile/components/ZInput';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { ZShaker } from 'openland-mobile/components/ZShaker';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { useListReducer } from 'openland-mobile/utils/listReducer';
import InCallManager from 'react-native-incall-manager';
import { SStatusBar } from 'react-native-s/SStatusBar';
import {
    VoiceChatProvider,
    // useVoiceChat
} from 'openland-y-utils/voiceChat/voiceChatWatcher';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import { MediaSessionTrackAnalyzerManager } from 'openland-engines/media/MediaSessionTrackAnalyzer';

interface RoomUserViewProps {
    roomId: string;
    user: {
        name: string;
        firstName: string;
        photo: string | null;
        id: string,
    };
    userStatus: VoiceChatParticipantStatus;
    theme: ThemeGlobal;
    selfStatus?: VoiceChatParticipantStatus;
    router: SRouter;
    isMuted?: boolean;
    isTalking?: boolean;
    modalCtx: { hide: () => void };
}

const UserModalBody = React.memo(({
    selfStatus,
    user,
    roomId,
    hide,
    // userStatus,
    theme,
    router,
    modalCtx,
}: RoomUserViewProps & { hide: () => void }) => {
    const client = useClient();
    const { followingCount, followedByMe, followersCount } = client.useVoiceChatUser({ uid: user.id }, { fetchPolicy: 'network-only' }).user;
    const isSelfAdmin = selfStatus === VoiceChatParticipantStatus.ADMIN || SUPER_ADMIN;

    // const removeAdmin = React.useCallback(() => {
    //     (async () => {
    //         await client.mutateVoiceChatUpdateAdmin({ id: roomId, uid: user.id, admin: false });
    //         client.refetchVoiceChat({ id: roomId });
    //     })();
    //     hide();
    // }, [roomId, user.id]);
    // const makeAdmin = React.useCallback(() => {
    //     (async () => {
    //         await client.mutateVoiceChatUpdateAdmin({ id: roomId, uid: user.id, admin: true });
    //         client.refetchVoiceChat({ id: roomId });
    //     })();
    //     hide();
    // }, [roomId, user.id]);
    const removeUser = React.useCallback(() => {
        (async () => {
            await client.mutateVoiceChatKick({ id: roomId, uid: user.id });
            client.refetchVoiceChat({ id: roomId });
        })();
        hide();
    }, [roomId, user.id]);
    // const demoteUser = React.useCallback(() => {
    //     (async () => {
    //         await client.mutateVoiceChatDemote({ id: roomId, uid: user.id });
    //         client.refetchVoiceChat({ id: roomId });
    //     })();
    //     hide();
    // }, [roomId, user.id]);
    // const promoteUser = React.useCallback(() => {
    //     (async () => {
    //         await client.mutateVoiceChatPromote({ id: roomId, uid: user.id });
    //         client.refetchVoiceChat({ id: roomId });
    //     })();
    //     hide();
    // }, [roomId, user.id]);
    const followUser = React.useCallback(() => {
        client.mutateSocialFollow({ uid: user.id });
        hide();
    }, [roomId, user.id]);
    const unfollowUser = React.useCallback(async () => {
        client.mutateSocialUnfollow({ uid: user.id });
        hide();
    }, [roomId, user.id]);
    const handleViewUser = React.useCallback(() => {
        router.push('ProfileUser', { id: user.id });
        hide();
        modalCtx.hide();
    }, [router]);

    return (
        <>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                    marginBottom: 16,
                }}
            >
                <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>
                    {followingCount} following
                </Text>
                <View
                    style={{
                        width: 3,
                        height: 3,
                        borderRadius: 3,
                        backgroundColor: theme.foregroundTertiary,
                        marginHorizontal: 8,
                    }}
                />
                <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>
                    {followersCount} followers
                </Text>
            </View>
            <View style={{ flexGrow: 1, alignItems: 'stretch' }}>
                {followedByMe ? (
                    <ZListItem
                        leftIcon={require('assets/ic-user-remove-24.png')}
                        small={true}
                        text="Unfollow"
                        onPress={unfollowUser}
                    />
                ) : (
                        <ZListItem
                            leftIcon={require('assets/ic-user-add-24.png')}
                            small={true}
                            text="Follow"
                            onPress={followUser}
                        />
                    )}
                {isSelfAdmin && (
                    <>
                        {/* {userStatus === VoiceChatParticipantStatus.SPEAKER && (
                            <ZListItem
                                leftIcon={require('assets/ic-listener-24.png')}
                                small={true}
                                text="Make listener"
                                onPress={demoteUser}
                            />
                        )}
                        {userStatus === VoiceChatParticipantStatus.LISTENER && (
                            <ZListItem
                                leftIcon={require('assets/ic-mic-24.png')}
                                small={true}
                                text="Make speaker"
                                onPress={promoteUser}
                            />
                        )}
                        {userStatus === VoiceChatParticipantStatus.ADMIN ? (
                            <ZListItem
                                leftIcon={require('assets/ic-pro-off-24.png')}
                                small={true}
                                text="Remove admin"
                                onPress={removeAdmin}
                            />
                        ) : (
                                <ZListItem
                                    leftIcon={require('assets/ic-pro-24.png')}
                                    small={true}
                                    text="Make admin"
                                    onPress={makeAdmin}
                                />
                            )} */}
                        <ZListItem
                            leftIcon={require('assets/ic-leave-24.png')}
                            small={true}
                            text="Remove"
                            onPress={removeUser}
                        />
                    </>
                )}
                <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
                    <ZButton size="large" title="View profile" style="secondary" onPress={handleViewUser} />
                </View>
            </View>
        </>
    );
});

const UserModalContent = React.memo((props: RoomUserViewProps & { hide: () => void }) => {
    const { user, theme } = props;

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'center',
                paddingTop: 8,
            }}
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ZAvatar
                    size="xx-large"
                    photo={user.photo}
                    title={user.name}
                    id={user.id}
                />
                <Text
                    numberOfLines={1}
                    style={{
                        ...TextStyles.Label2,
                        color: theme.foregroundPrimary,
                        marginTop: 16,
                    }}
                >
                    {user.name}
                </Text>
            </View>
            <React.Suspense fallback={<View style={{ flexGrow: 1, minHeight: 204, justifyContent: 'center', alignItems: 'center' }}><ZLoader /></View>}>
                <UserModalBody
                    {...props}
                />
            </React.Suspense>
        </View>
    );
});

const showUserInfo = (props: RoomUserViewProps) => {
    showBottomSheet({
        view: (ctx) => <UserModalContent {...props} hide={ctx.hide} />,
        cancelable: true,
    });
};

type EditRoomModalProps = {
    id: string,
    title: string | null,
};

const EditRoomModal = React.memo(({ id, title, hide }: EditRoomModalProps & { hide: () => void }) => {
    const shakerRef = React.useRef<{ shake: () => void }>(null);
    const client = useClient();
    const form = useForm();
    const titleField = useField('room.title', title || '', form);

    const onCancel = () => {
        hide();
    };
    const onConfirm = async () => {
        let titleValue = titleField.value.trim();
        if (titleValue.length <= 0) {
            shakerRef.current?.shake();
            return;
        }
        await client.mutateVoiceChatUpdate({ id, input: { title: titleValue } });
        await client.refetchVoiceChat({ id });
        hide();
    };

    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const isIos = Platform.OS === 'ios';

    const keyboardWillShow = (e: any) => {
        if (e.duration > 0) {
            LayoutAnimation.configureNext(LayoutAnimation.create(
                e.duration,
                LayoutAnimation.Types[e.easing]
            ));
        }
        setKeyboardHeight(e?.endCoordinates?.height);
    };

    const keyboardWillHide = (e: any) => {
        if (e.duration > 0) {
            LayoutAnimation.configureNext(LayoutAnimation.create(
                e.duration,
                LayoutAnimation.Types[e.easing]
            ));
        }
        setKeyboardHeight(0);
    };

    const keyboardHeightChange = (e: any) => {
        setKeyboardHeight(e?.height ? Math.ceil(e.height) : 0);
    };

    React.useEffect(
        () => {
            if (isIos) {
                Keyboard.addListener('keyboardWillShow', keyboardWillShow);
                Keyboard.addListener('keyboardWillHide', keyboardWillHide);
            } else {
                DeviceEventEmitter.addListener('async_keyboard_height', keyboardHeightChange);
            }
            return () => {
                if (isIos) {
                    Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
                    Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
                } else {
                    DeviceEventEmitter.removeListener('async_keyboard_height', keyboardHeightChange);
                }
            };
        },
        [],
    );

    return (
        <View
            style={{
                marginTop: 15,
                marginBottom: keyboardHeight,
            }}
        >
            <ZShaker ref={shakerRef}>
                <ZInput placeholder="Room name" field={titleField} multiline={true} style={{ height: 100 }} />
            </ZShaker>
            <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 16, }}>
                <View style={{ flex: 1, marginRight: 16 }}>
                    <ZButton style="secondary" size="large" title="Cancel" onPress={onCancel} />
                </View>
                <View style={{ flex: 1 }}>
                    <ZButton size="large" title="Save" action={onConfirm} />
                </View>
            </View>
        </View>
    );
});

const showEditRoom = (props: EditRoomModalProps) => {
    showBottomSheet({
        title: 'Edit room',
        cancelable: true,
        view: (ctx) => <EditRoomModal {...props} hide={ctx.hide} />,
    });
};

interface RoomViewProps {
    room: VoiceChatWithSpeakers;
}

const RoomHeader = React.memo(
    (props: RoomViewProps & { theme: ThemeGlobal; onLayout: (e: LayoutChangeEvent) => void }) => {
        const { room, theme } = props;
        const isAdmin = room.me?.status === VoiceChatParticipantStatus.ADMIN;
        const handleMorePress = React.useCallback(() => {
            showEditRoom({ id: room.id, title: room.title });
        }, [room.id, room.title]);
        return (
            <View
                style={{
                    paddingLeft: 16,
                    paddingRight: isAdmin ? 56 : 16,
                    paddingTop: 15,
                    paddingBottom: 24,
                }}
                onLayout={props.onLayout}
            >
                <Text
                    style={{
                        ...TextStyles.Title2,
                        color: theme.foregroundPrimary,
                        marginBottom: 8,
                    }}
                    numberOfLines={2}
                >
                    {props.room.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>
                        {room.speakersCount}
                    </Text>
                    <Image
                        source={require('assets/ic-microphone-16.png')}
                        style={{
                            width: 16,
                            height: 16,
                            marginLeft: 4,
                            tintColor: theme.foregroundTertiary,
                        }}
                    />
                    <View
                        style={{
                            width: 3,
                            height: 3,
                            borderRadius: 3,
                            backgroundColor: theme.foregroundTertiary,
                            marginHorizontal: 8,
                        }}
                    />
                    <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>
                        {room.listenersCount}
                    </Text>
                    <Image
                        source={require('assets/ic-headphones-16.png')}
                        style={{
                            width: 16,
                            height: 16,
                            marginLeft: 4,
                            tintColor: theme.foregroundTertiary,
                        }}
                    />
                </View>
                {isAdmin && (
                    <TouchableOpacity
                        activeOpacity={HighlightAlpha}
                        style={{ position: 'absolute', top: 0, right: 0, zIndex: 5, justifyContent: 'center', alignItems: 'center', width: 56, height: 56 }}
                        onPress={handleMorePress}
                    >
                        <Image style={{ width: 24, height: 24, tintColor: theme.foregroundTertiary }} source={require('assets/ic-more-h-24.png')} />
                    </TouchableOpacity>
                )}
            </View>
        );
    },
);

const RoomUserView = React.memo((props: RoomUserViewProps) => {
    const { isMuted, isTalking, userStatus, theme, user } = props;
    const messenger = getMessenger().engine;
    const isAdmin = userStatus === VoiceChatParticipantStatus.ADMIN;
    const isListener = userStatus === VoiceChatParticipantStatus.LISTENER;

    return (
        <View
            style={{
                maxWidth: '34%',
                flexGrow: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isListener ? 14 : 20,
            }}
        >
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                disabled={messenger.user.id === user.id}
                onPress={() => showUserInfo(props)}
            >
                <View
                    style={{
                        padding: 4,
                        borderColor: isTalking ? TintBlue.primary : 'transparent',
                        borderWidth: 2,
                        borderRadius: 100,
                    }}
                >
                    <ZAvatar
                        size={isListener ? 'x-large' : 'xx-large'}
                        photo={user.photo}
                        title={user.name}
                        id={user.id}
                    />
                    {isMuted && (
                        <View
                            style={{
                                position: 'absolute',
                                right: 8,
                                bottom: 8,
                                width: 24,
                                height: 24,
                                borderRadius: 100,
                                backgroundColor: theme.backgroundSecondary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image source={require('assets/ic-mute-glyph-16.png')} style={{ width: 16, height: 16, tintColor: theme.foregroundSecondary }} />
                        </View>
                    )}
                </View>
                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                    {isAdmin && (
                        <Image source={require('assets/ic-crown-16.png')} style={{ tintColor: '#e8ac3c', marginRight: 6 }} />
                    )}
                    <Text
                        numberOfLines={1}
                        style={{
                            ...isListener ? TextStyles.Label3 : TextStyles.Label2,
                            color: theme.foregroundPrimary,
                        }}
                    >
                        {user.firstName}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
});

interface RoomSpeakingUserViewProps extends RoomUserViewProps {
    peer: Conference_conference_peers;
    analyzer: MediaSessionTrackAnalyzerManager;
}

const RoomSpeakingUserView = React.memo((props: RoomSpeakingUserViewProps) => {
    const { analyzer, peer, ...other } = props;
    // const isTalking = !!analyzer.usePeer(peer.id);
    const isTalking = false;
    const isMuted = peer?.mediaState.audioPaused;

    return <RoomUserView {...other} isMuted={isMuted} isTalking={isTalking} />;
});

interface RoomUsersListProps extends RoomViewProps {
    theme: ThemeGlobal;
    headerHeight: number;
    controlsHeight: number;
    router: SRouter;
    peers: Conference_conference_peers[];
    analyzer: MediaSessionTrackAnalyzerManager;
    modalCtx: { hide: () => void };
}

const RoomUsersList = React.memo((props: RoomUsersListProps) => {
    const { headerHeight, controlsHeight, peers, analyzer, theme, room, router, modalCtx } = props;
    const sa = useSafeArea();
    const sHeight = SDevice.wHeight - (sa.top + sa.bottom + headerHeight + controlsHeight + 16);
    const client = useClient();
    const initialListeners = client.useVoiceChatListeners({ id: room.id, first: 12 }).voiceChatListeners;

    let listenersState = useListReducer({
        fetchItems: async (after) => {
            return (await client.queryVoiceChatListeners({ id: room.id, after, first: 12 }, { fetchPolicy: 'network-only' })).voiceChatListeners;
        },
        initialCursor: initialListeners.cursor,
        initialItems: initialListeners.items,
    });
    // let listenersState = { items: [] as VoiceChatListeners_voiceChatListeners_items[], loading: false, loadMore: () => { } };
    const peersWithSpeakers = peers
        .map(peer => ({ peer, speaker: room.speakers.find(s => s.user.id === peer.user.id)! }))
        .filter((x) => !!x.speaker);

    const speakersElement = (
        <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {peersWithSpeakers.map(({ peer, speaker }) => {
                    return (
                        <RoomSpeakingUserView
                            key={speaker.id}
                            roomId={room.id}
                            user={speaker.user}
                            userStatus={speaker.status}
                            selfStatus={room.me?.status}
                            peer={peer}
                            analyzer={analyzer}
                            theme={theme}
                            router={router}
                            modalCtx={modalCtx}
                        />
                    );
                })}
            </View>
            {listenersState.items.length > 0 ? (
                <Text
                    style={{
                        ...TextStyles.Title2,
                        color: theme.foregroundPrimary,
                        paddingHorizontal: 16,
                        marginBottom: 16,
                        flexShrink: 1,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    allowFontScaling={false}
                >
                    Listeners
                </Text>
            ) : null}
        </>
    );

    return (
        <View style={{ flexGrow: 1, height: sHeight }}>
            <FlatList
                ListHeaderComponent={speakersElement}
                data={listenersState.items}
                renderItem={({ item }) => (
                    <RoomUserView
                        roomId={room.id}
                        user={item.user}
                        userStatus={item.status}
                        selfStatus={room.me?.status}
                        theme={theme}
                        router={router}
                        modalCtx={modalCtx}
                    />
                )}
                keyExtractor={(item, index) => index.toString() + item.id}
                numColumns={4}
                style={{ flex: 1 }}
                refreshing={listenersState.loading}
                onEndReached={listenersState.loadMore}
            />
        </View>
    );
});

const RoomView = React.memo((props: RoomViewProps & { ctx: ModalProps; router: SRouter }) => {
    // const voiceChat = useVoiceChat();
    // console.log('voiceChat---------', voiceChat);
    const theme = useTheme();
    const client = useClient();
    const room = client.useVoiceChat({ id: props.room.id }, { fetchPolicy: 'network-only' }).voiceChat;
    const conference = client.useConference({ id: props.room.id }, { suspense: false })?.conference;
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const [controlsHeight, setControlsHeight] = React.useState(0);
    const voiceChatData = room;
    const canMeSpeak = voiceChatData.me?.status === VoiceChatParticipantStatus.ADMIN || voiceChatData.me?.status === VoiceChatParticipantStatus.SPEAKER;
    const onHeaderLayout = React.useCallback(
        (e: LayoutChangeEvent) => {
            setHeaderHeight(e.nativeEvent.layout.height);
        },
        [headerHeight],
    );

    const onControlsLayout = React.useCallback(
        (e: LayoutChangeEvent) => {
            setControlsHeight(e.nativeEvent.layout.height);
        },
        [controlsHeight],
    );

    const calls = getMessenger().engine.calls;
    const mediaSession = calls.useCurrentSession();
    const [state, setState] = React.useState<MediaSessionState | undefined>(mediaSession?.state.value);
    const muted = !state?.sender.audioEnabled;

    const handleMute = React.useCallback(() => {
        mediaSession?.setAudioEnabled(!state?.sender.audioEnabled);
    }, [state, mediaSession]);

    const handleLeave = React.useCallback(async () => {
        let admins = voiceChatData.speakers.filter(x => x.status === VoiceChatParticipantStatus.ADMIN);
        if (admins.length <= 1 && canMeSpeak) {
            await client.mutateVoiceChatEnd({ id: room.id });
        } else {
            await client.mutateVoiceChatLeave({ id: room.id });
        }
        InCallManager.stop({ busytone: '_BUNDLE_' });
        calls.leaveCall();

        SStatusBar.setBarStyle(theme.statusBar);
    }, [voiceChatData]);

    React.useEffect(() => mediaSession?.state.listenValue(setState), [mediaSession]);

    React.useEffect(() => {
        if (mediaSession && !muted && !canMeSpeak) {
            mediaSession.setAudioEnabled(false);
        }
    }, [mediaSession, muted]);

    React.useLayoutEffect(() => {
        SStatusBar.setBarStyle('light-content');
        InCallManager.start({ media: 'audio' });
        // InCallManager.setForceSpeakerphoneOn(true);
        return () => {
            SStatusBar.setBarStyle(theme.statusBar);
        };
    }, []);

    if (!mediaSession) {
        return null;
    }

    return (
        <View>
            <RoomHeader room={voiceChatData} theme={theme} onLayout={onHeaderLayout} />
            <RoomUsersList
                room={voiceChatData}
                theme={theme}
                headerHeight={headerHeight}
                controlsHeight={controlsHeight}
                router={props.router}
                modalCtx={props.ctx}
                peers={conference?.peers || []}
                analyzer={mediaSession.analyzer}
            />
            <RoomControls
                id={room.id}
                theme={theme}
                muted={muted}
                onLayout={onControlsLayout}
                onLeave={handleLeave}
                onMutePress={handleMute}
                router={props.router}
                modalCtx={props.ctx}
            />
        </View>
    );
});

export const showRoomView = (room: VoiceChatWithSpeakers, router: SRouter) => {
    showBottomSheet({
        view: (ctx) => (
            <VoiceChatProvider room={{chat: room, speakers: room.speakers}}>
                <RoomView room={room} ctx={ctx} router={router} />
            </VoiceChatProvider>
        ),
        containerStyle: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
        },
        disableMargins: true,
        disableBottomSafeArea: true,
        cancelable: false,
    });
};
