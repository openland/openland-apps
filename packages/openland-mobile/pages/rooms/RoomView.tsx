import * as React from 'react';
import { ModalProps } from 'react-native-fast-modal';
import {
    View,
    Text,
    Image,
    FlatList,
    LayoutChangeEvent,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { SDevice } from 'react-native-s/SDevice';
import { SRouter } from 'react-native-s/SRouter';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { HighlightAlpha, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar, getPlaceholderColors, styles } from 'openland-mobile/components/ZAvatar';
import { ZImage } from 'openland-mobile/components/ZImage';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { ZText } from 'openland-mobile/components/ZText';
import { useSafeArea } from 'react-native-safe-area-context';
import { RoomControls } from './RoomControls';
import { showEditPinnedMessage } from './RoomSettings';
import { Conference_conference_peers, VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { TintBlue } from 'openland-y-utils/themes/tints';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { getMessenger } from 'openland-mobile/utils/messenger';
import InCallManager from 'react-native-incall-manager';
import { ZLinearGradient } from 'openland-mobile/components/visual/ZLinearGradient.native';
import {
    VoiceChatProvider,
    useVoiceChat,
    VoiceChatT,
} from 'openland-y-utils/voiceChat/voiceChatWatcher';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import { withApp } from 'openland-mobile/components/withApp';
import { isPad } from '../Root';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';
import { MediaSessionTrackAnalyzerManager } from 'openland-engines/media/MediaSessionTrackAnalyzer';
import { debounce } from 'openland-y-utils/timer';

interface PinnedMessageViewProps {
    theme: ThemeGlobal;
    ctx: ModalProps;
    message: string;
    roomId: string;
    isAdmin: boolean;
}

const PinnedMessageView = React.memo((props: PinnedMessageViewProps) => {
    const { message, roomId, isAdmin, theme, ctx } = props;
    return (
        <>
            <View style={{ paddingHorizontal: 16 }}>
                <ZText
                    linkify={true}
                    style={{ ...TextStyles.Body, color: theme.foregroundPrimary }}
                    text={message}
                />
            </View>
            {isAdmin && (
                <View style={{ marginTop: 16 }}>
                    <ZListItem
                        leftIcon={require('assets/ic-edit-24.png')}
                        small={true}
                        text="Edit message"
                        onPress={() => {
                            ctx.hide();
                            showEditPinnedMessage({ id: roomId, message });
                        }}
                    />
                </View>
            )}
        </>
    );
});

const showPinnedMessage = (
    message: string,
    roomId: string,
    isAdmin: boolean,
    theme: ThemeGlobal,
) => {
    showBottomSheet({
        title: 'Pinned message',
        cancelable: true,
        view: (ctx) => (
            <PinnedMessageView
                message={message}
                roomId={roomId}
                isAdmin={isAdmin}
                theme={theme}
                ctx={ctx}
            />
        ),
    });
};

interface RoomUserViewProps {
    roomId: string;
    user: {
        name: string;
        firstName: string;
        photo: string | null;
        id: string;
        about: string | null;
    };
    userStatus: VoiceChatParticipantStatus;
    theme: ThemeGlobal;
    selfStatus?: VoiceChatParticipantStatus;
    router: SRouter;
    state?: 'muted' | 'talking' | 'loading';
    modalCtx: { hide: () => void };
}

interface PeerMedia {
    videoTrack: AppMediaStreamTrack | null;
    audioTrack: AppMediaStreamTrack | null;
    screencastTrack: AppMediaStreamTrack | null;
}

const UserModalContent = React.memo((props: RoomUserViewProps & { hide: () => void }) => {
    const { user, theme } = props;
    const [avatarSize, setAvatarSize] = React.useState<null | number>(null);

    const client = useClient();
    const { followedByMe, followersCount } = client.useVoiceChatUser(
        {
            uid: user.id,
        },
        { fetchPolicy: 'network-only' },
    ).user;

    const onLayout = React.useCallback(
        (e: LayoutChangeEvent) => {
            if (!avatarSize) {
                setAvatarSize(e.nativeEvent.layout.width);
            }
        },
        [avatarSize],
    );

    const isSelfAdmin = props.selfStatus === VoiceChatParticipantStatus.ADMIN;

    const removeAdmin = async () => {
        await Promise.all([
            client.mutateVoiceChatUpdateAdmin({ id: props.roomId, uid: user.id, admin: false }),
            client.refetchVoiceChat({ id: props.roomId }),
        ]);
        props.hide();
    };
    const makeAdmin = async () => {
        await Promise.all([
            client.mutateVoiceChatUpdateAdmin({ id: props.roomId, uid: user.id, admin: true }),
            client.refetchVoiceChat({ id: props.roomId }),
        ]);
        props.hide();
    };
    const removeUser = async () => {
        await client.mutateVoiceChatKick({ id: props.roomId, uid: user.id });
        await client.refetchVoiceChat({ id: props.roomId });
        props.hide();
    };
    const demoteUser = async () => {
        await client.mutateVoiceChatDemote({ id: props.roomId, uid: user.id });
        await client.refetchVoiceChat({ id: props.roomId });
        props.hide();
    };
    const promoteUser = async () => {
        await client.mutateVoiceChatPromote({ id: props.roomId, uid: user.id });
        await client.refetchVoiceChat({ id: props.roomId });
        props.hide();
    };
    const followUser = async () => {
        await client.mutateSocialFollow({ uid: user.id });
        await client.refetchVoiceChatUser({ uid: user.id });
        props.hide();
    };
    const handleViewUser = () => {
        props.router.push('ProfileUser', { id: user.id });
        props.hide();
        props.modalCtx.hide();
    };

    return (
        <React.Suspense
            fallback={
                <View
                    style={{
                        flexGrow: 1,
                        minHeight: 156,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ZLoader />
                </View>
            }
        >
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'center',
                }}
                onLayout={onLayout}
            >
                {!!avatarSize && (
                    <TouchableOpacity onPress={handleViewUser}>
                        <View
                            style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end',
                                width: avatarSize,
                                height: avatarSize,
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    width: avatarSize,
                                    height: avatarSize,
                                }}
                            >
                                {!!(user.photo && !user.photo.startsWith('ph://')) ? (
                                    <ZImage
                                        highPriority={true}
                                        imageSize={{ width: avatarSize, height: avatarSize }}
                                        source={user.photo}
                                        borderTopLeftRadius={18}
                                        borderTopRightRadius={18}
                                        width={avatarSize}
                                        height={avatarSize}
                                    />
                                ) : (
                                    <ZLinearGradient
                                        width={avatarSize}
                                        height={avatarSize}
                                        borderTopLeftRadius={18}
                                        borderTopRightRadius={18}
                                        fallbackColor={
                                            getPlaceholderColors(user.id || '').placeholderColor
                                        }
                                        colors={[
                                            getPlaceholderColors(user.id || '').placeholderColorStart,
                                            getPlaceholderColors(user.id || '').placeholderColorEnd,
                                        ]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: avatarSize,
                                                height: avatarSize,
                                            }}
                                        >
                                            <Text
                                                style={[styles.placeholderText, { fontSize: 128 }]}
                                                allowFontScaling={false}
                                            >
                                                {extractPlaceholder(user.name)}
                                            </Text>
                                        </View>
                                    </ZLinearGradient>
                                )}
                            </View>
                            <ZLinearGradient
                                width={avatarSize}
                                height={88}
                                fallbackColor={'#00000000'}
                                colors={['#00000000', '#000000b8']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-end',
                                        height: '100%',
                                        padding: 16,
                                    }}
                                >
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            ...TextStyles.Title1,
                                            color: theme.foregroundContrast,
                                            marginBottom: 4,
                                        }}
                                        allowFontScaling={false}
                                    >
                                        {user.name}
                                    </Text>
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                ...TextStyles.Subhead,
                                                color: theme.foregroundContrast,
                                                opacity: 0.72,
                                            }}
                                        >
                                            {followersCount} followers
                                        </Text>
                                        {followedByMe && (
                                            <Image
                                                source={require('assets/ic-done-16.png')}
                                                style={{
                                                    tintColor: theme.foregroundContrast,
                                                    opacity: 0.72,
                                                    marginLeft: 2,
                                                }}
                                            />
                                        )}
                                    </View>
                                </View>
                            </ZLinearGradient>
                        </View>
                    </TouchableOpacity>
                )}
                {user.about && (
                    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                        <ZText
                            linkify={false}
                            style={{ ...TextStyles.Body, color: theme.foregroundPrimary }}
                            text={user.about}
                            numberOfLines={3}
                        />
                    </View>
                )}
                <View style={{ marginTop: isSelfAdmin ? 16 : undefined, flexGrow: 1, alignItems: 'stretch' }}>
                    {isSelfAdmin && (
                        <>
                            {props.userStatus === VoiceChatParticipantStatus.SPEAKER && (
                                <ZListItem
                                    leftIcon={require('assets/ic-listener-24.png')}
                                    small={true}
                                    text="Make listener"
                                    onPress={demoteUser}
                                />
                            )}
                            {props.userStatus === VoiceChatParticipantStatus.LISTENER && (
                                <ZListItem
                                    leftIcon={require('assets/ic-mic-24.png')}
                                    small={true}
                                    text="Make speaker"
                                    onPress={promoteUser}
                                />
                            )}
                            {props.userStatus === VoiceChatParticipantStatus.ADMIN ? (
                                <ZListItem
                                    leftIcon={require('assets/ic-pro-off-24.png')}
                                    small={true}
                                    text="Remove admin"
                                    onPress={removeAdmin}
                                />
                            ) : props.userStatus === VoiceChatParticipantStatus.SPEAKER ? (
                                <ZListItem
                                    leftIcon={require('assets/ic-pro-24.png')}
                                    small={true}
                                    text="Make admin"
                                    onPress={makeAdmin}
                                />
                            ) : null}
                            {props.userStatus !== VoiceChatParticipantStatus.ADMIN && (
                                <ZListItem
                                    leftIcon={require('assets/ic-leave-24.png')}
                                    small={true}
                                    text="Remove"
                                    onPress={removeUser}
                                />
                            )}
                        </>
                    )}
                    <View style={{ marginTop: 16, paddingHorizontal: 16, flexDirection: 'row' }}>
                        {!followedByMe ? (
                            <>
                                <View style={{ flex: 1 }}>
                                    <ZButton size="large" title="Follow" action={followUser} />
                                </View>
                                <View style={{ width: 16 }} />
                                <View style={{ flex: 1 }}>
                                    <ZButton
                                        size="large"
                                        title="View profile"
                                        style="secondary"
                                        onPress={handleViewUser}
                                    />
                                </View>
                            </>
                        ) : (
                            <View style={{ flex: 1 }}>
                                <ZButton
                                    size="large"
                                    title="View profile"
                                    onPress={handleViewUser}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </React.Suspense>
    );
});

const showUserInfo = (props: RoomUserViewProps) => {
    showBottomSheet({
        view: (ctx) => <UserModalContent {...props} hide={ctx.hide} />,
        cancelable: true,
        containerStyle: {},
    });
};

interface RoomViewProps {
    room: VoiceChatT;
}

const RoomHeader = React.memo(
    (
        props: RoomViewProps & {
            theme: ThemeGlobal;
            hide: () => void;
            onLayout: (e: LayoutChangeEvent) => void;
        },
    ) => {
        const { room, hide, theme } = props;
        const isAdmin = room.me?.status === VoiceChatParticipantStatus.ADMIN;
        const topSpacing = isPad
            ? SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top
            : 0;
        return (
            <View
                style={{
                    paddingLeft: 16,
                    paddingRight: isAdmin ? 112 : 56,
                    paddingTop: isPad ? topSpacing + 15 : 15,
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
                    <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }}>
                        {room.speakersCount}
                    </Text>
                    <Image
                        source={require('assets/ic-microphone-16.png')}
                        style={{
                            width: 16,
                            height: 16,
                            marginLeft: 2,
                            tintColor: theme.foregroundTertiary,
                        }}
                    />
                    {room.listenersCount > 0 && (
                        <>
                            <Text
                                style={{
                                    ...TextStyles.Subhead,
                                    color: theme.foregroundSecondary,
                                    marginLeft: 12,
                                }}
                            >
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
                        </>
                    )}
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: topSpacing,
                        right: 0,
                        zIndex: 5,
                        flexDirection: 'row',
                    }}
                >
                    {!isPad && (
                        <TouchableOpacity
                            activeOpacity={HighlightAlpha}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 56,
                                height: 56,
                            }}
                            onPress={hide}
                        >
                            <Image
                                style={{
                                    width: 24,
                                    height: 24,
                                    tintColor: theme.foregroundTertiary,
                                }}
                                source={require('assets/ic-minimize-room-24.png')}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    },
);

const RoomUserView = React.memo((props: RoomUserViewProps) => {
    const { state, userStatus, theme, user } = props;
    const messenger = getMessenger().engine;
    const isAdmin = userStatus === VoiceChatParticipantStatus.ADMIN;
    const isListener = userStatus === VoiceChatParticipantStatus.LISTENER;

    return (
        <View
            style={{
                width: '33.33%',
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
                        borderColor: state === 'talking' ? TintBlue.primary : 'transparent',
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
                    {(state === 'muted' || state === 'loading') && (
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
                                alignItems: 'center',
                            }}
                        >
                            {state === 'muted' ? (
                                <Image
                                    source={require('assets/ic-mute-glyph-16.png')}
                                    style={{
                                        width: 16,
                                        height: 16,
                                        tintColor: theme.foregroundSecondary,
                                    }}
                                />
                            ) : state === 'loading' ? (
                                <LoaderSpinner size="small" color={theme.foregroundSecondary} />
                            ) : null}
                        </View>
                    )}
                </View>
                <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
                    {isAdmin && (
                        <Image
                            source={require('assets/ic-crown-16.png')}
                            style={{ tintColor: '#e8ac3c', marginRight: 6 }}
                        />
                    )}
                    <Text
                        numberOfLines={1}
                        style={{
                            ...(isListener ? TextStyles.Label3 : TextStyles.Label2),
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
    peer: Conference_conference_peers | undefined;
    analyzer: MediaSessionTrackAnalyzerManager;
    isLoading: boolean;
}

const RoomSpeakingUserView = React.memo((props: RoomSpeakingUserViewProps) => {
    const { peer, analyzer, isLoading, ...other } = props;
    const isTalking = analyzer.usePeer(peer?.id);
    const state = isLoading
        ? 'loading'
        : peer?.mediaState.audioPaused
        ? 'muted'
        : isTalking
        ? 'talking'
        : undefined;

    return <RoomUserView {...other} state={state} />;
});

interface RoomUsersListProps extends RoomViewProps {
    theme: ThemeGlobal;
    headerHeight: number;
    controlsHeight: number;
    router: SRouter;
    peers: Conference_conference_peers[];
    callState: MediaSessionState | undefined;
    modalCtx: { hide: () => void };
    analyzer: MediaSessionTrackAnalyzerManager;
    connecting: boolean;
}

const RoomUsersList = React.memo((props: RoomUsersListProps) => {
    const {
        headerHeight,
        controlsHeight,
        peers,
        connecting,
        analyzer,
        callState,
        theme,
        room,
        router,
        modalCtx,
    } = props;
    const sa = useSafeArea();
    const currentHeight = isPad ? Dimensions.get('window').height : SDevice.wHeight;
    const sHeight = currentHeight - (sa.top + sa.bottom + headerHeight + controlsHeight + 16);
    const listeners = room.listeners || [];
    // const client = useClient();
    // const initialListeners = client.useVoiceChatListeners({ id: room.id, first: 12 }).voiceChatListeners;

    // let listenersState = useListReducer({
    //     fetchItems: async (after) => {
    //         return (await client.queryVoiceChatListeners({ id: room.id, after, first: 12 }, { fetchPolicy: 'network-only' })).voiceChatListeners;
    //     },
    //     initialCursor: initialListeners.cursor,
    //     initialItems: initialListeners.items,
    // });
    // let listenersState = { items: [] as VoiceChatListeners_voiceChatListeners_items[], loading: false, loadMore: () => { } };
    const speakers = (room.speakers || []).map((speaker) => {
        let peer = peers.find((p) => p.user.id === speaker.user.id);
        let media: PeerMedia = { videoTrack: null, audioTrack: null, screencastTrack: null };
        let isLocal = peer?.id === callState?.sender.id;
        if (isLocal) {
            media = {
                videoTrack: callState?.sender.videoEnabled ? callState?.sender.videoTrack : null,
                audioTrack: callState?.sender.audioEnabled ? callState?.sender.audioTrack : null,
                screencastTrack: callState?.sender.screencastEnabled
                    ? callState?.sender.screencastTrack
                    : null,
            };
        } else {
            media = { ...media, ...(peer ? callState?.receivers[peer.id] : {}) };
        }
        return {
            peer,
            media,
            isLocal,
            speaker,
        };
    });

    const speakersElement = (
        <>
            {!!props.room.pinnedMessage && (
                <TouchableOpacity
                    onPress={() =>
                        showPinnedMessage(
                            props.room.pinnedMessage!.message!,
                            props.room.id,
                            room.me?.status === VoiceChatParticipantStatus.ADMIN,
                            theme,
                        )
                    }
                >
                    <View
                        style={{
                            paddingHorizontal: 16,
                            paddingVertical: 12,
                            backgroundColor: theme.backgroundTertiaryTrans,
                        }}
                    >
                        <Text
                            style={{ ...TextStyles.Subhead, color: theme.foregroundPrimary }}
                            numberOfLines={2}
                            allowFontScaling={false}
                        >
                            {props.room.pinnedMessage.message}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {speakers.map(({ peer, media, isLocal, speaker }) => {
                    return (
                        <RoomSpeakingUserView
                            key={speaker.id}
                            roomId={room.id}
                            user={speaker.user}
                            userStatus={speaker.status}
                            selfStatus={room.me?.status}
                            peer={peer}
                            theme={theme}
                            router={router}
                            modalCtx={modalCtx}
                            analyzer={analyzer}
                            isLoading={connecting || !peer ? false : !isLocal && !media.audioTrack}
                        />
                    );
                })}
            </View>
            {listeners.length > 0 ? (
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
                data={listeners}
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
                // refreshing={listenersState.loading}
                // onEndReached={listenersState.loadMore}
            />
        </View>
    );
});

const RoomView = React.memo((props: { roomId: string; ctx: ModalProps; router: SRouter }) => {
    const voiceChatData = useVoiceChat();
    const theme = useTheme();
    const client = useClient();
    const conference = client.useConference({ id: props.roomId }, { suspense: false })?.conference;
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const [controlsHeight, setControlsHeight] = React.useState(0);

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
    const [state, setState] = React.useState<MediaSessionState | undefined>(
        mediaSession?.state.value,
    );
    const muted = !state?.sender.audioEnabled;

    const handleMute = React.useCallback(() => {
        mediaSession?.setAudioEnabled(!state?.sender.audioEnabled);
    }, [state, mediaSession]);

    const closeCall = () => {
        props.ctx.hide();
        InCallManager.stop({ busytone: '_BUNDLE_' });
        calls.leaveCall();
        client.mutateVoiceChatLeave({ id: props.roomId });
    };

    const handleLeave = React.useCallback(async () => {
        let admins = voiceChatData.speakers?.filter(
            (x) => x.status === VoiceChatParticipantStatus.ADMIN,
        );
        if (
            admins &&
            admins.length === 1 &&
            voiceChatData.me?.status === VoiceChatParticipantStatus.ADMIN
        ) {
            let builder = AlertBlanket.builder();
            builder
                .title('End room')
                .message(
                    'Leaving as the last admin will end the room. Return and make new admins if you want to keep the room going',
                )
                .action('Leave', 'destructive', () => closeCall())
                .show();
        } else {
            closeCall();
        }
    }, [voiceChatData]);

    React.useEffect(() => mediaSession?.state.listenValue(setState), [mediaSession]);

    React.useLayoutEffect(() => {
        // Don't change: 'video' has the correct default behaviour
        InCallManager.start({ media: 'video' });
        InCallManager.setKeepScreenOn(true);
    }, []);

    const prevVoiceChat = React.useRef<VoiceChatT>(voiceChatData);

    // Handle room state changes
    React.useEffect(() => {
        let hasPrevAdmins = prevVoiceChat.current.speakers?.some(
            (x) => x.status === VoiceChatParticipantStatus.ADMIN,
        );
        let isPrevAdmin = prevVoiceChat.current.me?.status === VoiceChatParticipantStatus.ADMIN;
        let hasAdmins = voiceChatData.speakers?.some(
            (x) => x.status === VoiceChatParticipantStatus.ADMIN,
        );
        let isPrevListener =
            prevVoiceChat.current.me?.status === VoiceChatParticipantStatus.LISTENER;
        let isPrevSpeaker =
            prevVoiceChat.current.me?.status === VoiceChatParticipantStatus.SPEAKER ||
            prevVoiceChat.current.me?.status === VoiceChatParticipantStatus.ADMIN;
        let isSpeaker = voiceChatData.me?.status === VoiceChatParticipantStatus.SPEAKER;
        let isListener = voiceChatData.me?.status === VoiceChatParticipantStatus.LISTENER;

        if (isPrevListener && isSpeaker) {
            mediaSession?.setAudioEnabled(true);
        }
        if (isPrevSpeaker && isListener) {
            mediaSession?.setAudioEnabled(false);
        }
        if (hasPrevAdmins && !hasAdmins && !isPrevAdmin) {
            Toast.build({
                text: 'The last room admin left, the room will be closed now',
                duration: 2000,
            }).show();
            setTimeout(() => {
                closeCall();
            }, 2500);
        } else {
            let isLeft =
                prevVoiceChat.current.me?.status !== VoiceChatParticipantStatus.LEFT &&
                voiceChatData.me?.status === VoiceChatParticipantStatus.LEFT;
            let isKicked =
                prevVoiceChat.current.me?.status !== VoiceChatParticipantStatus.KICKED &&
                voiceChatData.me?.status === VoiceChatParticipantStatus.KICKED;
            if (isLeft || isKicked) {
                closeCall();
            }
        }
        prevVoiceChat.current = voiceChatData;
    }, [voiceChatData]);

    const [connecting, setConnecting] = React.useState(!state?.sender.audioTrack);

    const prevState = React.useRef(state);
    React.useEffect(() => {
        if (prevState.current?.sender.audioTrack && state?.sender.audioTrack && connecting) {
            setConnecting(false);
        }
        prevState.current = state;
    }, [state]);

    React.useEffect(() => {
        const setConnectingDebounced = debounce(setConnecting, 500);
        let sub: undefined | (() => void);

        setTimeout(() => {
            sub = client.engine.watchStatus((s) => {
                setConnectingDebounced(s.status === 'connecting');
            });
        }, 3000);
        return () => {
            if (sub) {
                sub();
            }
        };
    }, []);

    if (!mediaSession) {
        return null;
    }

    return (
        <View>
            <RoomHeader
                room={voiceChatData}
                theme={theme}
                onLayout={onHeaderLayout}
                hide={props.ctx.hide}
            />
            {mediaSession && (
                <>
                    <RoomUsersList
                        room={voiceChatData}
                        theme={theme}
                        headerHeight={headerHeight}
                        controlsHeight={controlsHeight}
                        router={props.router}
                        modalCtx={props.ctx}
                        peers={conference?.peers || []}
                        callState={state}
                        analyzer={mediaSession.analyzer}
                        connecting={connecting}
                    />
                    <RoomControls
                        id={props.roomId}
                        title={voiceChatData.title}
                        message={
                            voiceChatData.pinnedMessage ? voiceChatData.pinnedMessage.message : null
                        }
                        theme={theme}
                        muted={muted}
                        connecting={connecting}
                        onLayout={onControlsLayout}
                        onLeave={handleLeave}
                        onMutePress={handleMute}
                        raisedHandUsers={voiceChatData.raisedHands?.map((i) => i.user) || []}
                    />
                </>
            )}
        </View>
    );
});

export const RoomViewPage = withApp(
    ({ router }: { router: SRouter }) => (
        <VoiceChatProvider roomId={router.params.roomId}>
            <RoomView
                roomId={router.params.roomId}
                router={router}
                ctx={{ hide: () => router.back() }}
            />
        </VoiceChatProvider>
    ),
    { navigationAppearance: 'small-hidden' },
);

export const showRoomView = (roomId: string, router: SRouter, onHide?: () => void) => {
    if (isPad) {
        router.push('RoomViewPage', { roomId });
    } else {
        showBottomSheet({
            view: (ctx) => (
                <VoiceChatProvider roomId={roomId}>
                    <RoomView roomId={roomId} ctx={ctx} router={router} />
                </VoiceChatProvider>
            ),
            containerStyle: {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
            },
            dismissOffset: 10000,
            disableMargins: true,
            disableBottomSafeArea: true,
            cancelable: false,
            onHide,
        });
    }
};
