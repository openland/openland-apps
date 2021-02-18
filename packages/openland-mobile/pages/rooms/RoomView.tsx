import * as React from 'react';
import { ModalProps } from 'react-native-fast-modal';
import { View, Text, Image, FlatList, LayoutChangeEvent, TouchableOpacity } from 'react-native';
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
import { VoiceChatParticipantStatus, VoiceChatWithSpeakers } from 'openland-api/spacex.types';
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
    selfStatus: VoiceChatParticipantStatus;
    router: SRouter;
    modalCtx: { hide: () => void };
}

const UserModalBody = React.memo(({
    selfStatus,
    user,
    roomId,
    hide,
    userStatus,
    theme,
    router,
    modalCtx,
}: RoomUserViewProps & { hide: () => void }) => {
    const client = useClient();
    const { followingCount, followedByMe, followersCount } = client.useVoiceChatUser({ uid: user.id }, { fetchPolicy: 'cache-and-network' }).user;
    const isSelfAdmin = selfStatus === VoiceChatParticipantStatus.ADMIN || SUPER_ADMIN;

    const removeAdmin = React.useCallback(() => {
        (async () => {
            await client.mutateVoiceChatUpdateAdmin({ id: roomId, uid: user.id, admin: false });
            client.refetchVoiceChat({ id: roomId });
        })();
        hide();
    }, [roomId, user.id]);
    const makeAdmin = React.useCallback(() => {
        (async () => {
            await client.mutateVoiceChatUpdateAdmin({ id: roomId, uid: user.id, admin: true });
            client.refetchVoiceChat({ id: roomId });
        })();
        hide();
    }, [roomId, user.id]);
    const removeUser = React.useCallback(() => {
        (async () => {
            await client.mutateVoiceChatKick({ id: roomId, uid: user.id });
            client.refetchVoiceChat({ id: roomId });
        })();
        hide();
    }, [roomId, user.id]);
    const demoteUser = React.useCallback(() => {
        (async () => {
            await client.mutateVoiceChatDemote({ id: roomId, uid: user.id });
            client.refetchVoiceChat({ id: roomId });
        })();
        hide();
    }, [roomId, user.id]);
    const promoteUser = React.useCallback(() => {
        (async () => {
            await client.mutateVoiceChatPromote({ id: roomId, uid: user.id });
            client.refetchVoiceChat({ id: roomId });
        })();
        hide();
    }, [roomId, user.id]);
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
                        {userStatus === VoiceChatParticipantStatus.SPEAKER && (
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
                            )}
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
    return (
        <View
            style={{
                marginTop: 15,
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
        const isAdmin = true;
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
    const messenger = getMessenger();
    const isListener = props.userStatus === VoiceChatParticipantStatus.LISTENER;
    const isTalking = false;
    const isMuted = false;
    const isAdmin = false;

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
                disabled={messenger.engine.user.id === props.user.id}
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
                        photo={props.user.photo}
                        title={props.user.name}
                        id={props.user.id}
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
                                backgroundColor: props.theme.backgroundSecondary,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image source={require('assets/ic-mute-glyph-16.png')} style={{ width: 16, height: 16, tintColor: props.theme.foregroundSecondary }} />
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
                            color: props.theme.foregroundPrimary,
                        }}
                    >
                        {props.user.firstName}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
});

interface RoomUsersListProps extends RoomViewProps {
    theme: ThemeGlobal;
    headerHeight: number;
    controlsHeight: number;
    router: SRouter;
    modalCtx: { hide: () => void };
}

const RoomUsersList = React.memo((props: RoomUsersListProps) => {
    const { headerHeight, controlsHeight, theme, room, router, modalCtx } = props;
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

    const speakersElement = (
        <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {room.speakers.map(item => (
                    <RoomUserView
                        roomId={room.id}
                        user={item.user}
                        userStatus={item.status}
                        selfStatus={VoiceChatParticipantStatus.ADMIN}
                        theme={theme}
                        router={router}
                        modalCtx={modalCtx}
                    />
                ))}
            </View>
            {listenersState.items.length > 0 && (
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
            )}
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
                        selfStatus={VoiceChatParticipantStatus.LISTENER}
                        theme={theme}
                        router={router}
                        modalCtx={modalCtx}
                    />
                )}
                keyExtractor={(item, index) => index.toString() + item.id}
                numColumns={3}
                style={{ flex: 1 }}
                refreshing={listenersState.loading}
                onEndReached={listenersState.loadMore}
            />
        </View>
    );
});

const RoomView = React.memo((props: RoomViewProps & { ctx: ModalProps; router: SRouter }) => {
    const theme = useTheme();
    const client = useClient();
    // TODO: fetch room with all speakers
    const fetchedRoom = client.useVoiceChat({ id: props.room.id }, { suspense: false, fetchPolicy: 'cache-and-network' })?.voiceChat;
    const room = fetchedRoom || props.room;
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

    const handleLeave = React.useCallback(() => {
        let admins = room.speakers.filter(x => x.status === VoiceChatParticipantStatus.ADMIN);
        if (admins.length <= 1) {
            client.mutateVoiceChatEnd({ id: room.id });
        } else {
            client.mutateVoiceChatLeave({ id: room.id });
        }
    }, [room]);

    return (
        <View>
            <RoomHeader room={room} theme={theme} onLayout={onHeaderLayout} />
            <RoomUsersList
                room={room}
                theme={theme}
                headerHeight={headerHeight}
                controlsHeight={controlsHeight}
                router={props.router}
                modalCtx={props.ctx}
            />
            <RoomControls
                id={room.id}
                theme={theme}
                role={VoiceChatParticipantStatus.ADMIN}
                onLayout={onControlsLayout}
                onLeave={handleLeave}
                router={props.router}
                modalCtx={props.ctx}
            />
        </View>
    );
});

export const showRoomView = (room: VoiceChatWithSpeakers, router: SRouter) => {
    showBottomSheet({
        view: (ctx) => <RoomView room={room} ctx={ctx} router={router} />,
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
