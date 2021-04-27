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
import {
    VoiceChatParticipant,
    SharedRoomKind,
    SharedRoomMembershipStatus,
    VoiceChatParticipantStatus,
    VoiceChatUser_conversation_PrivateRoom,
    VoiceChatParticipant_user,
    VoiceChatUser_user,
} from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { TintBlue } from 'openland-y-utils/themes/tints';
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
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';
import { MediaSessionTrackAnalyzerManager } from 'openland-engines/media/MediaSessionTrackAnalyzer';
import { debounce } from 'openland-y-utils/timer';
import { showSheetModal } from 'openland-mobile/components/showSheetModal';
import { useVoiceChatErrorNotifier } from 'openland-mobile/utils/voiceChatErrorNotifier';
import { Equalizer } from './Equalizer';

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
    user: VoiceChatParticipant_user;
    userStatus: VoiceChatParticipantStatus;
    theme: ThemeGlobal;
    selfStatus?: VoiceChatParticipantStatus;
    isSelf: boolean;
    router: SRouter;
    state?: 'muted' | 'talking' | 'loading';
    modalCtx: { hide: () => void };
}

interface UserAvatarProps {
    user: VoiceChatUser_user;
    hide: () => void;
    theme: ThemeGlobal;
    router: SRouter;
    modalCtx: { hide: () => void };
    handleUserView: () => void;
}

const UserAvatar = React.memo((props: UserAvatarProps) => {
    const { user, theme } = props;
    const { id, name, photo, followersCount, followedByMe } = user;
    const avatarSize = isPad ? 350 : SDevice.wWidth - 16;

    const hasPhoto = !!(photo && !photo.startsWith('ph://'));
    const placeholder = hasPhoto
        ? undefined
        : {
            fallbackColor: getPlaceholderColors(id || '').placeholderColor,
            topColor: getPlaceholderColors(id || '').placeholderColorStart,
            bottomColor: getPlaceholderColors(id || '').placeholderColorEnd,
        };

    return (
        <TouchableOpacity onPress={props.handleUserView}>
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
                    {hasPhoto ? (
                        <ZImage
                            highPriority={true}
                            imageSize={{ width: avatarSize * 2, height: avatarSize * 2 }}
                            source={photo}
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
                            fallbackColor={placeholder!.fallbackColor}
                            colors={[placeholder!.topColor, placeholder!.bottomColor]}
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
                                    {extractPlaceholder(name)}
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
                            {name}
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
    );
});

const UserModalContent = React.memo((props: RoomUserViewProps & { hide: () => void }) => {
    const { user, theme, isSelf } = props;
    const { id } = user;

    const client = useClient();
    const data = client.useVoiceChatUser(
        {
            uid: id,
        },
        { fetchPolicy: 'cache-and-network' },
    );

    const { about, followedByMe } = data.user;
    const conversationId = (data.conversation as VoiceChatUser_conversation_PrivateRoom).id;

    const isSelfAdmin = props.selfStatus === VoiceChatParticipantStatus.ADMIN;

    const removeAdmin = async () => {
        await Promise.all([
            client.mutateVoiceChatUpdateAdmin({ id: props.roomId, uid: id, admin: false }),
            client.refetchVoiceChat({ id: props.roomId }),
        ]);
        props.hide();
    };
    const makeAdmin = async () => {
        await Promise.all([
            client.mutateVoiceChatUpdateAdmin({ id: props.roomId, uid: id, admin: true }),
            client.refetchVoiceChat({ id: props.roomId }),
        ]);
        props.hide();
    };
    const removeUser = async () => {
        await client.mutateVoiceChatKick({ id: props.roomId, uid: id });
        await client.refetchVoiceChat({ id: props.roomId });
        props.hide();
    };
    const demoteUser = async () => {
        await client.mutateVoiceChatDemote({ id: props.roomId, uid: id });
        await client.refetchVoiceChat({ id: props.roomId });
        props.hide();
    };
    const promoteUser = async () => {
        await client.mutateVoiceChatPromote({ id: props.roomId, uid: id });
        await client.refetchVoiceChat({ id: props.roomId });
        props.hide();
    };
    const followUser = async () => {
        await client.mutateSocialFollow({ uid: id });
        await client.refetchVoiceChatUser({ uid: id });
        props.hide();
    };
    const handleUserMessage = () => {
        props.router.pushAndReset('Conversation', { id: conversationId });
        props.hide();
        props.modalCtx.hide();
    };

    const handleUserView = () => {
        props.router.pushAndReset('ProfileUser', { id: id });
        props.hide();
        props.modalCtx.hide();
    };

    const handleHashTagClick = (hs: string) => {
        props.router.push('HomeDialogs', { searchValue: hs, title: hs });
        props.hide();
        props.modalCtx.hide();
    };

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'center',
            }}
        >
            <UserAvatar
                user={data.user}
                theme={theme}
                router={props.router}
                hide={props.hide}
                modalCtx={props.modalCtx}
                handleUserView={handleUserView}
            />
            {about && (
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                    <ZText
                        linkify={false}
                        style={{ ...TextStyles.Body, color: theme.foregroundPrimary }}
                        text={about}
                        numberOfLines={3}
                        onHashTagClick={handleHashTagClick}
                    />
                </View>
            )}
            <View
                style={{
                    marginTop: isSelfAdmin ? 16 : undefined,
                    flexGrow: 1,
                    alignItems: 'stretch',
                }}
            >
                {isSelfAdmin && !isSelf && (
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
                {isSelf && props.userStatus === VoiceChatParticipantStatus.SPEAKER && (
                    <ZListItem
                        leftIcon={require('assets/ic-listener-24.png')}
                        small={true}
                        text="Become listener"
                        onPress={demoteUser}
                    />
                )}
                <View style={{ marginTop: 16, paddingHorizontal: 16, flexDirection: 'row' }}>
                    {isSelf ? (
                        <View style={{ flex: 1 }}>
                            <ZButton size="large" title="View profile" onPress={handleUserView} />
                        </View>
                    ) : !followedByMe ? (
                        <>
                            <View style={{ flex: 1 }}>
                                <ZButton size="large" title="Follow" action={followUser} />
                            </View>
                            <View style={{ width: 16 }} />
                            <View style={{ flex: 1 }}>
                                <ZButton
                                    size="large"
                                    title="Message"
                                    style="secondary"
                                    onPress={handleUserMessage}
                                />
                            </View>
                        </>
                    ) : (
                        <View style={{ flex: 1 }}>
                            <ZButton size="large" title="Message" onPress={handleUserMessage} />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
});

const showUserInfo = (props: RoomUserViewProps) => {
    if (isPad) {
        showSheetModal((ctx) => <UserModalContent {...props} hide={ctx.hide} />, undefined, {
            paddingTop: 0,
            paddingBottom: 20,
        });
        return;
    }
    showBottomSheet({
        view: (ctx) => <UserModalContent {...props} hide={ctx.hide} />,
        cancelable: true,
        cancelBtnContrast: true,
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
            router: SRouter;
            onLayout: (e: LayoutChangeEvent) => void;
            analyzer: MediaSessionTrackAnalyzerManager;
            speakers: {
                isMuted: boolean,
                isLoading: boolean,
                peersIds: string[],
                speaker: VoiceChatParticipant
            }[];
        },
    ) => {
        const { room, hide, router, theme, analyzer, speakers } = props;
        const peerIds = speakers.filter(i => !i.isLoading && !i.isMuted).map(i => i.peersIds).flat();
        const currentlySpeaking = analyzer.useCurrentlySpeaking(peerIds);
        let currentSpeaker: VoiceChatParticipant | undefined = speakers.find(s => s.peersIds.includes(currentlySpeaking[0]))?.speaker;
        const { parentRoom } = room;
        const [joinState, setJoinState] = React.useState<
            'initial' | 'loading' | 'success' | 'joined'
        >(parentRoom?.membership === SharedRoomMembershipStatus.MEMBER ? 'joined' : 'initial');
        const client = useClient();

        const topSpacing = isPad
            ? SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top
            : 0;
        return (
            <View
                style={{
                    paddingHorizontal: 16,
                    paddingLeft: 16,
                    paddingTop: isPad ? topSpacing + 16 : 16,
                    paddingBottom: 24,
                }}
                onLayout={props.onLayout}
            >
                {parentRoom && (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 12,
                            marginRight: 48,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                hide();
                                router.push('Conversation', { id: parentRoom.id });
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <ZAvatar
                                    size="x-small"
                                    id={parentRoom.id}
                                    title={parentRoom.title}
                                    photo={parentRoom.photo}
                                />
                                <Text
                                    style={{
                                        ...TextStyles.Label2,
                                        color: theme.foregroundPrimary,
                                        marginLeft: 12,
                                    }}
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    allowFontScaling={false}
                                >
                                    {parentRoom.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {parentRoom.kind === SharedRoomKind.PUBLIC && joinState !== 'joined' && (
                            <TouchableOpacity
                                style={{
                                    marginLeft: 16,
                                    position: 'relative',
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                }}
                                onPress={async () => {
                                    if (joinState !== 'initial') {
                                        return;
                                    }
                                    setJoinState('loading');
                                    try {
                                        await client.mutateRoomJoin({ roomId: parentRoom.id });
                                        client.refetchRoomChat({ id: parentRoom.id });
                                        setJoinState('success');
                                        setTimeout(() => {
                                            setJoinState('joined');
                                        }, 1000);
                                    } catch (e) {
                                        Toast.failure({
                                            text: e.message || `Couldn't join ${parentRoom.isChannel ? 'channel' : 'group'
                                                }`,
                                            duration: 4000,
                                        }).show();
                                        setJoinState('initial');
                                    }
                                }}
                            >
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        opacity: 0.16,
                                        borderRadius: 100,
                                        backgroundColor: theme.accentPrimary,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...TextStyles.Detail,
                                        color: theme.accentPrimary,
                                        opacity: joinState === 'initial' ? 1 : 0,
                                    }}
                                    allowFontScaling={false}
                                >
                                    JOIN {parentRoom.isChannel ? 'CHANNEL' : 'GROUP'}
                                </Text>
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <>
                                        {joinState === 'loading' && (
                                            <LoaderSpinner
                                                size="small"
                                                color={theme.accentPrimary}
                                            />
                                        )}
                                        {joinState === 'success' && (
                                            <Image
                                                source={require('assets/ic-done-16.png')}
                                                style={{ tintColor: theme.accentPrimary }}
                                            />
                                        )}
                                    </>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                {props.room.title ? (
                    <Text
                        style={{
                            ...TextStyles.Title2,
                            color: theme.foregroundPrimary,
                            paddingRight: parentRoom ? undefined : 48,
                        }}
                        numberOfLines={2}
                        allowFontScaling={false}
                    >
                        {props.room.title}
                    </Text>
                ) : null}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: room.title ? 10 : 14,
                        overflow: 'hidden',
                        flexShrink: 1,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 8,
                            flexShrink: 0,
                        }}
                    >
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }} allowFontScaling={false}>
                            {room.speakersCount}
                        </Text>
                        <Image
                            source={require('assets/ic-speaker-16.png')}
                            style={{
                                width: 16,
                                height: 16,
                                marginLeft: 3,
                                tintColor: theme.foregroundQuaternary,
                                flexShrink: 0,
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
                                    allowFontScaling={false}
                                >
                                    {room.listenersCount}
                                </Text>
                                <Image
                                    source={require('assets/ic-listener-16.png')}
                                    style={{
                                        width: 16,
                                        height: 16,
                                        marginLeft: 6,
                                        tintColor: theme.foregroundQuaternary,
                                        flexShrink: 0,
                                    }}
                                />
                            </>
                        )}
                    </View>
                    {((speakers.length > 9) && !!currentSpeaker) && (
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexShrink: 1,
                            }}
                        >
                            <Text
                                style={{
                                    ...TextStyles.Subhead,
                                    color: theme.foregroundSecondary,
                                    marginRight: 8,
                                    flexShrink: 1,
                                }}
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                allowFontScaling={false}
                            >
                                {currentSpeaker.user.name}
                            </Text>
                            <Equalizer theme={theme} />
                        </View>
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
    const isAdmin = userStatus === VoiceChatParticipantStatus.ADMIN;
    const isListener = userStatus === VoiceChatParticipantStatus.LISTENER;

    return (
        <View
            style={{
                width: isListener ? undefined : '33.33%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isListener ? 14 : 20,
                flex: isListener ? 1 : undefined,
                maxWidth: isListener ? '25%' : undefined,
            }}
        >
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
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
                                    source={require('assets/ic-speaker-off-16.png')}
                                    style={{
                                        width: 16,
                                        height: 16,
                                        tintColor: theme.foregroundTertiary,
                                    }}
                                />
                            ) : state === 'loading' ? (
                                <LoaderSpinner size="small" color={theme.foregroundTertiary} />
                            ) : null}
                        </View>
                    )}
                </View>
                <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
                    {isAdmin && (
                        <Image
                            source={require('assets/ic-crown-16.png')}
                            style={{ tintColor: '#e8ac3c', marginRight: 6, marginBottom: 1 }}
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
    peersIds: string[];
    analyzer: MediaSessionTrackAnalyzerManager;
    isLoading: boolean;
    isMuted: boolean;
    reportUserLoading: (moreData: { userId: string, peersIds: string[] }) => any;
}

const RoomSpeakingUserView = React.memo((props: RoomSpeakingUserViewProps) => {
    const { peersIds, analyzer, isLoading, reportUserLoading, isMuted, ...other } = props;
    const isTalking = analyzer.usePeers(peersIds);
    const state = isLoading
        ? 'loading'
        : isMuted
            ? 'muted'
            : isTalking
                ? 'talking'
                : undefined;
    const loadingRef = React.useRef(isLoading);
    loadingRef.current = isLoading;
    React.useEffect(() => {
        let timerId = setTimeout(() => {
            if (loadingRef.current === true) {
                reportUserLoading({ userId: other.user.id, peersIds });
            }
        }, 5000);
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return <RoomUserView {...other} state={state} />;
});

interface RoomUsersListProps extends RoomViewProps {
    theme: ThemeGlobal;
    headerHeight: number;
    controlsHeight: number;
    router: SRouter;
    modalCtx: { hide: () => void };
    analyzer: MediaSessionTrackAnalyzerManager;
    reportUserLoading: (moreData: { userId: string, peersIds: string[] }) => any;
    speakers: {
        isMuted: boolean,
        isLoading: boolean,
        peersIds: string[],
        speaker: VoiceChatParticipant
    }[];
}

const RoomUsersList = React.memo((props: RoomUsersListProps) => {
    const {
        headerHeight,
        controlsHeight,
        analyzer,
        theme,
        room,
        router,
        reportUserLoading,
        modalCtx,
        speakers
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
                    style={{ marginBottom: 16 }}
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
                {speakers.map(({ speaker, isMuted, isLoading, peersIds }) => {
                    return (
                        <RoomSpeakingUserView
                            key={speaker.id}
                            roomId={room.id}
                            user={speaker.user}
                            userStatus={speaker.status}
                            selfStatus={room.me?.status}
                            isSelf={room.me?.user.id === speaker.user.id}
                            peersIds={peersIds}
                            theme={theme}
                            router={router}
                            modalCtx={modalCtx}
                            analyzer={analyzer}
                            isLoading={isLoading}
                            isMuted={isMuted}
                            reportUserLoading={reportUserLoading}
                        />
                    );
                })}
            </View>
            {listeners.length > 0 ? (
                <Text
                    style={{
                        ...TextStyles.Label1,
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
                        isSelf={item.user.id === room.me?.user.id}
                        theme={theme}
                        router={router}
                        modalCtx={modalCtx}
                    />
                )}
                keyExtractor={(item, index) => index.toString() + item.id}
                numColumns={4}
                style={{ flex: 1 }}
            />
        </View>
    );
});

interface RoomViewInnerProps {
    roomId: string;
    ctx: ModalProps;
    router: SRouter;
}

const RoomView = React.memo((props: RoomViewInnerProps) => {
    const voiceChatData = useVoiceChat();
    const theme = useTheme();
    const client = useClient();
    const conference = client.useConference({ id: props.roomId }, { suspense: false })?.conference;
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const [controlsHeight, setControlsHeight] = React.useState(0);

    const inviteEntity = voiceChatData.parentRoom || voiceChatData.me?.user;
    const inviteEntityLink = inviteEntity
        ? `https://openland.com/${inviteEntity.shortname || inviteEntity.id}`
        : 'Try again';
    const inviteLink = voiceChatData.parentRoom && voiceChatData.parentRoom.kind !== SharedRoomKind.PUBLIC
        ? undefined
        : inviteEntityLink;

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

    const { reportUserError, reportUserLoading } = useVoiceChatErrorNotifier({
        callState: state,
        peers: conference?.peers,
        voiceChat: voiceChatData,
        appConnecting: connecting,
    });

    if (!mediaSession) {
        return null;
    }

    const speakers = (voiceChatData.speakers || [])
        .map((speaker) => {
            let speakerPeers = (conference?.peers || []).filter((p) => p.user.id === speaker.user.id);
            let speakerStates = speakerPeers.map(peer => {
                let isLocal = peer?.id === state?.sender.id;
                let isLoading = false;
                let isMuted = !!peer?.mediaState.audioPaused;
                if (!isLocal) {
                    let hasAudioTrack = !!state?.receivers[peer.id]?.audioTrack;
                    isLoading = !connecting && !hasAudioTrack;
                }
                return { isMuted, isLoading };
            }).reduce((acc, peerState) => {
                return {
                    isMuted: acc.isMuted && peerState.isMuted,
                    isLoading: acc.isLoading && peerState.isLoading
                };
            }, { isMuted: true, isLoading: true });

            return {
                isMuted: speakerStates.isMuted,
                isLoading: speakerStates.isLoading,
                peersIds: speakerPeers.map(p => p.id),
                speaker,
            };
        });

    return (
        <View>
            <RoomHeader
                room={voiceChatData}
                theme={theme}
                router={props.router}
                onLayout={onHeaderLayout}
                hide={props.ctx.hide}
                analyzer={mediaSession.analyzer}
                speakers={speakers}
            />
            {mediaSession && (
                <>
                    <RoomUsersList
                        room={voiceChatData}
                        speakers={speakers}
                        theme={theme}
                        headerHeight={headerHeight}
                        controlsHeight={controlsHeight}
                        router={props.router}
                        modalCtx={props.ctx}
                        analyzer={mediaSession.analyzer}
                        reportUserLoading={reportUserLoading}
                    />
                    <RoomControls
                        id={props.roomId}
                        title={voiceChatData.title}
                        message={
                            voiceChatData.pinnedMessage ? voiceChatData.pinnedMessage.message : null
                        }
                        handRaised={!!voiceChatData.me?.handRaised}
                        selfStatus={voiceChatData.me?.status}
                        inviteLink={inviteLink}
                        theme={theme}
                        muted={muted}
                        connecting={connecting}
                        onLayout={onControlsLayout}
                        onLeave={handleLeave}
                        onMutePress={handleMute}
                        reportUserError={reportUserError}
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
            scrollViewProps: {
                scrollEnabled: false,
            },
            disableMargins: true,
            disableBottomSafeArea: true,
            cancelable: false,
            onHide,
        });
    }
};
