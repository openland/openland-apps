import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XScrollValues } from 'openland-x/XScrollView3';
import * as React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { css, cx } from 'linaria';
import { TextBody, TextLabel1, TextLabel2, TextStyles, TextTitle1 } from 'openland-web/utils/TextStyles';
import CrownIcon from 'openland-icons/ic-crown-4.svg';
import IcListenerSmall from 'openland-icons/s/ic-listener-16.svg';
import IcSpeakerSmall from 'openland-icons/s/ic-speaker-16.svg';
import IcListener from 'openland-icons/s/ic-listener-24.svg';
import IcSpeaker from 'openland-icons/s/ic-mic-24.svg';
import IcCrown from 'openland-icons/s/ic-pro-24.svg';
import IcCrownOff from 'openland-icons/s/ic-pro-off-24.svg';
import IcAdd from 'openland-icons/s/ic-add-36.svg';
import IcUser from 'openland-icons/s/ic-user-24.svg';
import IcFollow from 'openland-icons/s/ic-invite-24.svg';
import IcMessage from 'openland-icons/s/ic-message-24.svg';
import IcLeave from 'openland-icons/s/ic-leave-24.svg';
import IcEdit from 'openland-icons/s/ic-edit-24.svg';
import IcMuted from 'openland-icons/s/ic-speaker-off-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { SvgLoader, XLoader } from 'openland-x/XLoader';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { RoomControls } from './RoomControls';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { useClient } from 'openland-api/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import {
    Conference_conference_peers,
    SharedRoomKind,
    VoiceChatParticipantStatus,
    VoiceChatSpeaker,
} from 'openland-api/spacex.types';
import AlertBlanket from 'openland-x/AlertBlanket';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { debounce } from 'openland-y-utils/timer';
import { MediaSessionTrackAnalyzerManager } from 'openland-engines/media/MediaSessionTrackAnalyzer';
import { useJoinRoom } from './joinRoom';
import { showRaiseHand } from './showRaiseHand';
import { showRaisedHands } from './showRaisedHands';
import { showInviteToRoom } from './showInviteToRoom';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { showPinnedMessageModal } from './showPinnedMessageModal';
import { RoomJoinButton } from './RoomJoinButton';
import { groupInviteCapabilities } from 'openland-y-utils/InviteCapabilities';
import { useWakeLock } from 'openland-web/utils/useWakeLock';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { VoiceChatT } from 'openland-engines/VoiceChatEngine';

const headerParentRoomClass = css`
  padding: 12px 0;
  display: flex;
  align-items: center;
  margin-left: -16px;
`;

const headerTitleStyle = css`
    color: var(--foregroundPrimary);
    max-height: 64px;
    overflow: hidden;
    display: -webkit-box;
    margin-bottom: 8px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

const speakerIconClass = css`
    margin-left: 4px;
    margin-right: 12px;
`;

const listenerIconClass = css`
    margin-left: 6px;
`;

const userNameStyle = cx(TextLabel2, css`
    /* width: 100%; */
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--foregroundPrimary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`);

const userNameTalkingStyle = css`
    color: #248BF2;
`;

const adminIconStyle = css`
    height: 18px;
    margin-right: 6px;
  
    & svg * {
        fill: var(--tintOrange);
    }
`;

const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const stateIconStyle = css`
  display: flex;
  position: absolute;
  bottom: 4px;
  right: 0px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: var(--backgroundPrimary);
  justify-content: center;
  align-items: center;
`;

const roomUserContainer = css`
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  padding: 8px;
  margin: 0 10px;
  width: 110px;
  
  &:hover {
    background-color: var(--backgroundTertiaryTrans);
    border-radius: 8px;
    cursor: pointer;
    
    .${stateIconStyle} {
      background-color: var(--backgroundPrimaryHover);
    }
  }
`;

const roomUserContainerVisible = css`
  background-color: var(--backgroundTertiaryTrans);
  border-radius: 8px;
`;

const listenerStyle = css`
  width: 100px;
  margin-left: 3px;
  margin-right: 4px;
`;

const parentRoomTitle = css`
  display: flex;
  align-items: center;
  margin-right: auto;
  padding: 0 16px;
  cursor: pointer;
`;

const buttonLabelStyle = cx(TextLabel2, css`
    color: var(--foregroundPrimary);
    text-align: center;
`);

const speakersGridStyle = css`
    margin: 0 -9px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const listenersGridStyle = css`
    margin-left: -5px;
    margin-right: -11px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const speakerName = css`
    display: flex;
    flex-shrink: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 20px;
    color: var(--foregroundSecondary);
    margin-right: 8px;
`;

const pinnedMessageContainerStyle = css`
  cursor: pointer;
  margin: 0 -1200px;
  padding: 12px 1200px;
  background: var(--gradient0to100);
  
  &:hover {
    background-color: var(--backgroundPrimaryHover);
  }
`;

const pinnedMessageTextStyle = css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const loaderClass = css`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`;

const equalizer = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 14px;
    height: 14px;
    flex-shrink: 0;

    & .speaker-bar {
        display: flex;
        flex-shrink: 0;
        width: 1px;
        background-color: var(--tintBlue);
        margin: 0 1px;

        &.out {
            height: 4px;
            animation: equalizeOut linear 0.8s infinite;
        }
        &.middle {
            height: 8px;
            animation: equalizeMiddle linear 0.8s infinite;
        }
        &.center {
            height: 12px;
            animation: equalizeCenter linear 0.8s infinite;
        }
    }
    @keyframes equalizeCenter {
        0% {
            height: 12px;
        }
        20% {
            height: 8px;
        }
        40% {
            height: 6px;
        }
        60% {
            height: 2px;
        }
        80% {
            height: 6px;
        }
        100% {
            height: 12px;
        }
    }
    @keyframes equalizeMiddle {
        0% {
            height: 8px;
        }
        30% {
            height: 4px;
        }
        50% {
            height: 2px;
        }
        70% {
            height: 4px;
        }
        100% {
            height: 8px;
        }
    }
    @keyframes equalizeOut {
        0% {
            height: 4px;
        }
        50% {
            height: 1px;
        }
        100% {
            height: 4px;
        }
    }
`;

const Equalizer = React.memo(() => {
    return (
        <div className={equalizer}>
            <div className="speaker-bar out" />
            <div className="speaker-bar middle" />
            <div className="speaker-bar center" />
            <div className="speaker-bar middle" />
            <div className="speaker-bar out" />
        </div>
    );
});

const RoomHeader = ({
    speakersCount,
    listenersCount,
    analyzer,
    peers,
    title,
}: {
    speakersCount: number,
    listenersCount: number,
    title?: string | null,
    analyzer: MediaSessionTrackAnalyzerManager;
    peers: Conference_conference_peers[];
}) => {
    const currentlySpeaking = analyzer.useSpeakingPeer();
    let currentPeer = currentlySpeaking.speaking ? peers.find(x => x.id === currentlySpeaking.id) : undefined;
    return (
        <XView paddingTop={12} paddingBottom={14} paddingRight={12} width="100%">
            {title && <div className={cx(TextTitle1, headerTitleStyle)}>{title}</div>}
            <XView
                flexDirection="row"
                alignItems="center"
                color="var(--foregroundSecondary)"
                justifyContent="space-between"
            >
                <XView
                    flexDirection="row"
                    alignItems="center"
                    color="var(--foregroundSecondary)"
                    alignSelf="flex-start"
                    marginRight={8}
                >
                    <XView {...TextStyles.Subhead}>{speakersCount}</XView>
                    <UIcon
                        icon={<IcSpeakerSmall />}
                        className={speakerIconClass}
                        color="var(--foregroundTertiary)"
                    />
                    {listenersCount > 0 && (
                        <>
                            <XView {...TextStyles.Subhead}>{listenersCount}</XView>
                            <UIcon
                                icon={<IcListenerSmall />}
                                className={listenerIconClass}
                                color="var(--foregroundTertiary)"
                            />
                        </>
                    )}
                </XView>
                {(speakersCount > 9) && !!currentPeer && !currentPeer.mediaState.audioPaused && (
                    <XView flexDirection="row" alignItems="center" flexShrink={1}>
                        <div className={cx(speakerName, TextBody)}>
                            {currentPeer.user.name}
                        </div>
                        <Equalizer />
                    </XView>
                )}
            </XView>
        </XView>
    );
};

const RaisedHandsButton = ({ raisedHands, roomId }: { raisedHands: number, roomId: string }) => {
    return (
        <XView
            alignItems="center"
            padding={8}
            hoverBackgroundColor="var(--backgroundTertiaryTrans)"
            hoverBorderRadius={8}
            marginHorizontal={4}
            hoverCursor="pointer"
            onClick={() => showRaisedHands({ roomId })}
        >
            <XView
                width={80}
                height={80}
                backgroundColor="#F8F2E1"
                justifyContent="center"
                alignItems="center"
                borderRadius={100}
                marginTop={8}
                marginBottom={10}
            >
                <ImgWithRetry
                    src="//cdn.openland.com/shared/rooms/wave-hand-36.png"
                    srcSet="//cdn.openland.com/shared/rooms/wave-hand-36@2x.png 2x, //cdn.openland.com/shared/rooms/wave-hand-36@3x.png 3x"
                />
                {raisedHands > 0 && (
                    <XView
                        position="absolute"
                        bottom={0}
                        right={0}
                        width={24}
                        height={24}
                        zIndex={2}
                        borderRadius={12}
                        backgroundColor="var(--backgroundPrimary)"
                        justifyContent="center"
                        alignItems="center"
                        color="var(--foregroundPrimary)"
                        {...TextStyles.Detail}
                    >
                        {raisedHands > 9 ? `9+` : raisedHands}
                    </XView>
                )}
            </XView>
            <div className={buttonLabelStyle}>
                Raised hands
            </div>
        </XView>
    );
};

const InviteButton = React.memo((props: { roomId: string }) => (
    <XView
        alignItems="center"
        padding={8}
        marginHorizontal={4}
        hoverBackgroundColor="var(--backgroundTertiaryTrans)"
        hoverBorderRadius={8}
        hoverCursor="pointer"
    >
        <XView
            width={80}
            height={80}
            backgroundColor="var(--backgroundTertiaryTrans)"
            hoverBackgroundColor="var(--backgroundTertiaryHoverTrans)"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            borderRadius={100}
            marginTop={8}
            marginBottom={10}
            onClick={() => showInviteToRoom({ roomId: props.roomId })}
        >
            <UIcon icon={<IcAdd />} size={36} color="var(--foregroundSecondary)" />
        </XView>
        <div className={buttonLabelStyle}>
            Invite
        </div>
    </XView>
));

const speakerAvatarSizes = {
    size: 80,
    placeholder: 36,
    dotSize: 0,
    dotPosition: 0,
    dotBorderWidth: 0,
};

const listenerAvatarSizes = {
    size: 64,
    placeholder: 26,
    dotSize: 0,
    dotPosition: 0,
    dotBorderWidth: 0,
};

const UserMenu = React.memo((props: {
    ctx: UPopperController,
    roomId: string,
    userId: string,
    status: VoiceChatParticipantStatus,
    selfStatus?: VoiceChatParticipantStatus,
    isSelf: boolean,
}) => {
    const router = React.useContext(XViewRouterContext)!;
    const client = useClient();
    const isFollowed = !!client.useVoiceChatUser({ uid: props.userId }, { suspense: false })?.user.followedByMe;
    let popper = new UPopperMenuBuilder();
    const width = 200;

    popper.item({
        title: 'View profile',
        icon: <IcUser />,
        action: () => {
            router.navigate(`/${props.userId}`);
        },
    });

    if (props.isSelf) {
        popper.item({
            title: 'Edit profile',
            icon: <IcEdit />,
            action: () => {
                router.navigate(`/settings/profile`);
            },
        });

        if (props.status === VoiceChatParticipantStatus.SPEAKER) {
            popper.item({
                title: 'Become listener',
                icon: <IcListener />,
                action: async () => {
                    try {
                        await client.mutateVoiceChatDemote({ id: props.roomId, uid: props.userId });
                    } catch (e) {
                        console.error(e);
                    }
                },
            });
        }

        return popper.build(props.ctx, width);
    }

    if (!isFollowed) {
        popper.item({
            title: 'Follow',
            icon: <IcFollow />,
            action: async () => {
                await client.mutateSocialFollow({ uid: props.userId });
                await client.refetchVoiceChatUser({ uid: props.userId });
            },
        });
    }

    if (
        props.selfStatus === VoiceChatParticipantStatus.SPEAKER
        || props.selfStatus === VoiceChatParticipantStatus.LISTENER
    ) {
        popper.item({
            title: 'Message',
            icon: <IcMessage />,
            action: async () => {
                router.navigate(`/mail/${props.userId}`);
            },
        });
    }

    if (props.selfStatus === VoiceChatParticipantStatus.ADMIN) {
        if (props.status === VoiceChatParticipantStatus.LISTENER) {
            popper.item({
                title: 'Make speaker',
                icon: <IcSpeaker />,
                action: async () => {
                    await client.mutateVoiceChatPromote({ id: props.roomId, uid: props.userId });
                },
            });
        }
        if (props.status === VoiceChatParticipantStatus.SPEAKER) {
            popper.item({
                title: 'Make admin',
                icon: <IcCrown />,
                action: async () => {
                    await client.mutateVoiceChatUpdateAdmin({ id: props.roomId, uid: props.userId, admin: true });
                },
            }).item({
                title: 'Make listener',
                icon: <IcListener />,
                action: async () => {
                    await client.mutateVoiceChatDemote({ id: props.roomId, uid: props.userId });
                },
            });
        }

        if (props.status === VoiceChatParticipantStatus.ADMIN) {
            popper.item({
                title: 'Remove admin',
                icon: <IcCrownOff />,
                action: async () => {
                    await client.mutateVoiceChatUpdateAdmin({ id: props.roomId, uid: props.userId, admin: false });
                },
            });
        }

        popper.item({
            title: 'Remove',
            icon: <IcLeave />,
            action: async () => {
                await client.mutateVoiceChatKick({ id: props.roomId, uid: props.userId });
            },
        });
    }

    return popper.build(props.ctx, width);
});

interface RoomUserInfo {
    id: string;
    name: string;
    photo: string | null;
    roomId: string;
    userStatus: VoiceChatParticipantStatus;
    selfStatus?: VoiceChatParticipantStatus;
    selfId?: string;
}

const RoomUser = React.memo(({
    id,
    name,
    photo,
    state,
    roomId,
    userStatus,
    selfStatus,
    selfId,
}: {
    state?: 'talking' | 'loading' | 'muted';
} & RoomUserInfo) => {
    const isSelf = selfId === id;
    const [visible, show, hide] = usePopper(
        {
            placement: 'bottom-start',
            hideOnLeave: false,
            borderRadius: 8,
            scope: 'room-user',
            hideOnChildClick: true,
            hideOnClick: true,
            updatedDeps: userStatus,
        },
        (ctx) => (
            <UserMenu ctx={ctx} roomId={roomId} userId={id} status={userStatus} selfStatus={selfStatus} isSelf={isSelf} />
        ),
    );
    const isAdmin = userStatus === VoiceChatParticipantStatus.ADMIN;
    const isSpeaker = userStatus === VoiceChatParticipantStatus.SPEAKER;
    const isListener = userStatus === VoiceChatParticipantStatus.LISTENER;
    const handleClick = (e: React.MouseEvent) => {
        if (visible) {
            hide();
        } else {
            show(e);
        }
    };
    return (
        <div
            className={cx(
                roomUserContainer,
                visible && roomUserContainerVisible,
                isListener && listenerStyle
            )}
            onClick={handleClick}
        >
            <XView
                borderWidth={2}
                borderColor={state === 'talking' ? '#248BF2' : 'transparent'}
                padding={4}
                borderRadius={100}
                alignItems="center"
                justifyContent="center"
                marginBottom={6}
            >
                <UAvatar
                    customSizes={
                        isSpeaker || isAdmin ? speakerAvatarSizes : listenerAvatarSizes
                    }
                    id={id}
                    title={name}
                    photo={photo}
                />
                {(state === 'muted' || state === 'loading') && (
                    <div className={stateIconStyle}>
                        {state === 'muted' ? (
                            <UIcon
                                size={16}
                                icon={<IcMuted />}
                                color="var(--foregroundTertiary)"
                            />
                        ) : state === 'loading' ? (
                            <SvgLoader size="small" contrast={true} />
                        ) : null}
                    </div>
                )}
            </XView>
            <div className={cx(userNameStyle, state === 'talking' && userNameTalkingStyle)}>
                {isAdmin && (
                    <div className={adminIconStyle}>
                        <CrownIcon />
                    </div>
                )}
                <div className={cx(TextLabel2, ellipsis)}>{name}</div>
            </div>
        </div>
    );
});

const RoomSpeakerUser = React.memo((props: {
    peersIds: string[];
    analyzer: MediaSessionTrackAnalyzerManager;
    isLoading?: boolean,
    isMuted?: boolean,
} & RoomUserInfo) => {
    const { peersIds, analyzer, isLoading, isMuted, ...other } = props;
    const isTalking = analyzer.usePeers(peersIds);
    const state = isLoading
        ? 'loading'
        : isMuted
            ? 'muted'
            : isTalking
                ? 'talking'
                : undefined;

    return (
        <RoomUser
            state={state}
            {...other}
        />
    );
});

const RoomSpeakers = React.memo(({
    room,
    analyzer,
    showInviteButton,
    speakers,
}: {
    room: VoiceChatT,
    analyzer: MediaSessionTrackAnalyzerManager;
    showInviteButton: boolean;
    speakers: {
        isMuted: boolean,
        isLoading: boolean,
        peersIds: string[],
        speaker: VoiceChatSpeaker
    }[];
}) => {
    return (
        <div className={speakersGridStyle}>
            {speakers.map(({ speaker, isMuted, isLoading, peersIds }) => (
                <RoomSpeakerUser
                    key={speaker.id}
                    name={speaker.user.firstName}
                    id={speaker.user.id}
                    isLoading={isLoading}
                    isMuted={isMuted}
                    analyzer={analyzer}
                    photo={speaker.user.photo}
                    roomId={room.id}
                    selfId={room.me?.user.id}
                    peersIds={peersIds}
                    selfStatus={room.me?.status}
                    userStatus={speaker.status}
                />
            ))}
            {speakers.length <= 8 && room.me?.status === VoiceChatParticipantStatus.ADMIN && (
                <>
                    <RaisedHandsButton raisedHands={room.handRaisedCount} roomId={room.id} />
                    {showInviteButton && <InviteButton roomId={room.id} />}
                </>
            )}
        </div>
    );
});

const RoomListeners = React.memo((props: { room: VoiceChatT }) => {
    return (
        <div className={listenersGridStyle}>
            {(props.room.listeners || []).map((listener, i) => (
                <RoomUser
                    key={listener.id}
                    id={listener.user.id}
                    name={listener.user.firstName}
                    photo={listener.user.photo}
                    roomId={props.room.id}
                    selfId={props.room.me?.user.id}
                    userStatus={VoiceChatParticipantStatus.LISTENER}
                    selfStatus={props.room.me?.status}
                />
            ))}
        </div>
    );
});

const RoomListenersLoader = React.memo(() => {
    const messenger = React.useContext(MessengerContext);
    const { loading } = messenger.voiceChat.useListenersMeta();
    return loading ? (
        <div className={loaderClass}>
            <XLoader loading={true} />
        </div>
    ) : null;
});

const RoomViewInner = React.memo((props: { roomId: string, voiceChatData: VoiceChatT, mediaSession: MediaSessionManager }) => {
    const client = useClient();
    const tabRouter = useTabRouter().router;
    const toast = useToast();
    const router = React.useContext(XViewRouterContext)!;
    const { voiceChatData, mediaSession } = props;
    useWakeLock();
    const conference = client.useConference({ id: props.roomId }, { suspense: false })?.conference;

    const messenger = React.useContext(MessengerContext);
    const [state, setState] = React.useState<MediaSessionState | undefined>(
        mediaSession?.state.value,
    );
    const muted = !state?.sender.audioEnabled;
    const handRaised = !!voiceChatData.me?.handRaised;
    const pinnedMessage = voiceChatData.pinnedMessage?.message;
    const showInviteButton =
        !voiceChatData.parentRoom ||
        voiceChatData.parentRoom.kind === SharedRoomKind.PUBLIC ||
        groupInviteCapabilities(voiceChatData.parentRoom).canGetInviteLink;

    const handleMute = React.useCallback(() => {
        mediaSession?.setAudioEnabled(!state?.sender.audioEnabled);
    }, [state, mediaSession]);

    const alreadyLeft = React.useRef(false);

    const closeCall = () => {
        if (alreadyLeft.current) {
            return;
        }
        alreadyLeft.current = true;
        messenger.voiceChat.leave();
    };
    const tabRouterRef = React.useRef(tabRouter);
    tabRouterRef.current = tabRouter;

    React.useEffect(() => {
        return messenger.voiceChat.onLeave(({ roomId, parentRoomId, closedByAdmin }) => {
            const close = () => {
                const routerRef = tabRouterRef.current;
                if (window.location.pathname.startsWith('/room/')) {
                    let currentId = window.location.pathname.split('/')[2];
                    if (routerRef.currentTab === 2 && parentRoomId && currentId === roomId) {
                        routerRef.reset(`/mail/${parentRoomId}`, true);
                    } else if (currentId === roomId) {
                        routerRef.reset('/rooms', true);
                    }
                } else {
                    routerRef.stacks[0]?.reset('/rooms');
                }
            };
            if (closedByAdmin) {
                toast.show({ text: 'The last room admin left, the room will be closed now', duration: 2000 });
                close();
            } else {
                close();
            }

        });
    }, []);

    const handleParentRoomClick = React.useCallback(() => {
        router.navigate(`/${voiceChatData.parentRoom!.id}`);
    }, [voiceChatData.parentRoom]);

    const handleLeave = React.useCallback(async () => {
        let admins = voiceChatData.speakers?.filter(x => x.status === VoiceChatParticipantStatus.ADMIN);
        if (admins && admins.length === 1 && voiceChatData.me?.status === VoiceChatParticipantStatus.ADMIN) {
            let builder = AlertBlanket.builder();
            builder
                .title('End room')
                .message('Leaving as the last admin will end the room. Return and make new admins if you want to keep the room going')
                .action('Leave', () => Promise.resolve(closeCall()), 'danger')
                .show();
        } else {
            closeCall();
        }

    }, [voiceChatData]);

    const handleHandRaise = React.useCallback(async () => {
        if (handRaised) {
            await client.mutateVoiceChatRaiseHand({ id: props.roomId, raised: false });
            await client.refetchVoiceChatControls({ id: props.roomId });
            return;
        }
        showRaiseHand(
            async () => {
                await client.mutateVoiceChatRaiseHand({ id: props.roomId, raised: true });
                await client.refetchVoiceChatControls({ id: props.roomId });
            }
        );
    }, [handRaised, props.roomId]);

    React.useEffect(() => mediaSession?.state.listenValue(setState), [mediaSession]);

    React.useEffect(() => {
        return messenger.voiceChat.onStatusChange((status, prevStatus) => {
            if (status === VoiceChatParticipantStatus.SPEAKER && prevStatus === VoiceChatParticipantStatus.LISTENER) {
                toast.show({ text: `You're a speaker now`, Icon: () => <IcSpeaker />, duration: 2000 });
            }
        });
    }, []);

    const [connecting, setConnecting] = React.useState(false);

    React.useEffect(() => {
        const setConnectingDebounced = debounce(setConnecting, 500);
        let sub: undefined | (() => void);

        setTimeout(() => {
            sub = client.engine.watchStatus(s => {
                setConnectingDebounced(s.status === 'connecting');
            });
        }, 3000);
        return () => {
            if (sub) {
                sub();
            }
        };
    }, []);

    const handleScroll = React.useCallback(
        debounce((values: XScrollValues) => {
            let d = values.scrollHeight - (values.clientHeight + values.scrollTop);
            if (d < 200) {
                messenger.voiceChat.loadMoreListeners();
            }
        }, 500), [messenger.voiceChat.loadMoreListeners]);

    const speakers = (voiceChatData.speakers || [])
        .map((speaker) => {
            let speakerPeers = (conference?.peers || []).filter((p) => p.user.id === speaker.user.id);
            let speakerStates = speakerPeers.map(peer => {
                const isLocal = peer?.id === state?.sender.id;
                const isLoading = isLocal ? false : !state?.receivers[peer.id]?.audioTrack;
                const isMuted = isLocal ? !state?.sender.audioEnabled : !!peer?.mediaState.audioPaused;

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
        <Page onScroll={handleScroll}>
            <UHeader
                titleView={
                    <XView width="100%">
                        {voiceChatData.parentRoom && (
                            <div className={headerParentRoomClass}>
                                <div className={parentRoomTitle} onClick={handleParentRoomClick}>
                                    <UAvatar
                                        title={voiceChatData.parentRoom.title}
                                        id={voiceChatData.parentRoom.id}
                                        photo={voiceChatData.parentRoom.photo}
                                        size="small"
                                        marginRight={12}
                                    />
                                    <div className={TextLabel1}>{voiceChatData.parentRoom.title}</div>
                                </div>
                                <RoomJoinButton parentRoom={voiceChatData.parentRoom} />
                            </div>
                        )}
                        <RoomHeader
                            analyzer={mediaSession.analyzer}
                            peers={conference?.peers || []}
                            title={voiceChatData.title}
                            speakersCount={voiceChatData.speakersCount}
                            listenersCount={voiceChatData.listenersCount}
                        />
                        {pinnedMessage && (
                            <div
                                className={pinnedMessageContainerStyle}
                                onClick={() => showPinnedMessageModal(voiceChatData.id)}
                            >
                                <div className={cx(pinnedMessageTextStyle, TextBody)}>
                                    {pinnedMessage}
                                </div>
                            </div>
                        )}
                    </XView>
                }
                dynamicHeight={true}
            />
            <XView marginTop={20} marginHorizontal={-16} marginBottom={114}>
                <RoomSpeakers
                    speakers={speakers}
                    room={voiceChatData}
                    showInviteButton={showInviteButton}
                    analyzer={mediaSession.analyzer}
                />
                {voiceChatData.listeners && voiceChatData.listeners?.length > 0 && (
                    <>
                        <XView
                            marginTop={24}
                            paddingVertical={12}
                            paddingHorizontal={16}
                            color="var(--foregroundPrimary)"
                            {...TextStyles.Title3}
                        >
                            Listeners
                        </XView>
                        <RoomListeners room={voiceChatData} />
                        <RoomListenersLoader />
                    </>
                )}
            </XView>
            <XView
                position="fixed"
                bottom={0}
                left={0}
                right={0}
                paddingHorizontal={16}
                backgroundColor="var(--backgroundPrimary)"
            >
                <RoomControls
                    roomId={props.roomId}
                    title={voiceChatData.title}
                    isMuted={muted}
                    connecting={!muted && connecting}
                    status={voiceChatData.me?.status}
                    handRaised={handRaised}
                    raisedHands={voiceChatData.handRaisedCount}
                    showInviteButton={showInviteButton}
                    onMute={handleMute}
                    onLeave={handleLeave}
                    onHandRaise={handleHandRaise}
                />
            </XView>
        </Page>
    );
});

const RoomView = React.memo((props: { roomId: string }) => {
    const messenger = React.useContext(MessengerContext)!;
    const voiceChat = messenger.voiceChat.useVoiceChat();
    const joinRoom = useJoinRoom(true);
    const isTabVisible = useVisibleTab();
    const mediaSession = messenger.calls.useCurrentSession();

    React.useEffect(() => {
        if (!mediaSession && !voiceChat && !messenger.voiceChat.isJoining && isTabVisible) {
            joinRoom(props.roomId);
        }
    }, []);

    if (!voiceChat || !mediaSession) {
        return <XLoader loading={true} />;
    }

    return <RoomViewInner roomId={props.roomId} mediaSession={mediaSession} voiceChatData={voiceChat} />;
});

export const RoomFragment = React.memo(() => {
    const { id } = useUnicorn().query;
    // TODO: Unavailable page for wrong id
    return (
        <RoomView roomId={id} />
    );
});
