import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XScrollView3 } from 'openland-x/XScrollView3';
import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { TextLabel2, TextStyles, TextTitle1 } from 'openland-web/utils/TextStyles';
import CrownIcon from 'openland-icons/ic-crown-4.svg';
import IcListener from 'openland-icons/s/ic-listener-16.svg';
import IcSpeaker from 'openland-icons/s/ic-speaker-16.svg';
import IcAdd from 'openland-icons/s/ic-add-36.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { SvgLoader } from 'openland-x/XLoader';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { RoomControls } from './RoomControls';
import { useVoiceChat, VoiceChatProvider, VoiceChatT } from 'openland-y-utils/voiceChat/voiceChatWatcher';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { useClient } from 'openland-api/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useStackRouter } from 'openland-unicorn/components/StackRouter';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import { Conference_conference_peers, VoiceChatParticipant, VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import AlertBlanket from 'openland-x/AlertBlanket';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { debounce } from 'openland-y-utils/timer';
import { MediaSessionTrackAnalyzerManager } from 'openland-engines/media/MediaSessionTrackAnalyzer';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { useJoinRoom } from './joinRoom';
import { showRaiseHand } from './showRaiseHand';
import { showRaisedHands } from './showRaisedHands';

interface PeerMedia {
    videoTrack: AppMediaStreamTrack | null;
    audioTrack: AppMediaStreamTrack | null;
    screencastTrack: AppMediaStreamTrack | null;
}

const headerTitleStyle = css`
    color: var(--foregroundPrimary);
    max-height: 64px;
    overflow: hidden;
    display: -webkit-box;
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
    width: 100%;
    text-align: center;
    color: var(--foregroundPrimary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`);

const userNameTalkingStyle = css`
    color: #248BF2;
`;

const adminIconStyle = css`
    display: inline-block;

    & * {
        fill: var(--tintOrange);
    }
`;

const buttonLabelStyle = cx(TextLabel2, css`
    color: var(--foregroundPrimary);
    text-align: center;
`);

const speakersGridStyle = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 32px;
    row-gap: 24px;

    @media (min-width: 750px) and (max-width: 1030px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 590px) {
        grid-template-columns: repeat(4, 1fr);
        column-gap: 24px;
    }

    @media (max-width: 467px) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 24px;
    }
`;

const listenersGridStyle = css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 35px;
    row-gap: 16px;

    @media (min-width: 750px) and (max-width: 1030px) {
        grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: 590px) {
        grid-template-columns: repeat(5, 1fr);
        column-gap: 24px;
    }

    @media (max-width: 467px) {
        grid-template-columns: repeat(4, 1fr);
        column-gap: 24px;
    }

    @media (max-width: 360px) {
        grid-template-columns: repeat(4, 1fr);
        column-gap: 12px;
    }
`;

const RoomHeader = ({
    speakersCount,
    listenersCount,
    title,
}: {
    speakersCount: number,
    listenersCount: number,
    title: string | null,
}) => {
    return (
        <XView paddingTop={12} paddingBottom={14} paddingRight={12} width="100%">
            <div className={cx(TextTitle1, headerTitleStyle)}>
                {title}
            </div>
            <XView
                flexDirection="row"
                marginTop={8}
                alignItems="center"
                color="var(--foregroundSecondary)"
                alignSelf="flex-start"
            >
                <XView {...TextStyles.Subhead}>
                    {speakersCount}
                </XView>
                <UIcon
                    icon={<IcSpeaker />}
                    className={speakerIconClass}
                    color="var(--foregroundTertiary)"
                />
                {listenersCount > 0 && (
                    <>
                        <XView {...TextStyles.Subhead}>
                            {listenersCount}
                        </XView>
                        <UIcon
                            icon={<IcListener />}
                            className={listenerIconClass}
                            color="var(--foregroundTertiary)"
                        />
                    </>
                )}
            </XView>
        </XView >
    );
};

const RaisedHandsButton = ({ raisedHands, roomId }: { raisedHands: VoiceChatParticipant[], roomId: string }) => {
    return (
        <XView alignItems="center">
            <XView
                width={80}
                height={80}
                backgroundColor="#F8F2E1"
                hoverOpacity={0.8}
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                borderRadius={100}
                marginTop={4}
                marginBottom={16}
                onClick={() => showRaisedHands({ raisedHands, roomId })}
            >
                <ImgWithRetry
                    src="//cdn.openland.com/shared/rooms/wave-hand-36.png"
                    srcSet="//cdn.openland.com/shared/rooms/wave-hand-36@2x.png 2x, //cdn.openland.com/shared/rooms/wave-hand-36@3x.png 3x"
                />
                {raisedHands.length > 0 && (
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
                        {raisedHands.length > 9 ? `9+` : raisedHands.length}
                    </XView>
                )}
            </XView>
            <div className={buttonLabelStyle}>
                Raised hands
            </div>
        </XView>
    );
};

const InviteButton = React.memo(() => {
    return (
        <XView justifyContent="center" alignItems="center">
            <XView
                width={80}
                height={80}
                backgroundColor="var(--backgroundTertiaryTrans)"
                hoverBackgroundColor="var(--backgroundTertiaryHoverTrans)"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                borderRadius={100}
                marginTop={4}
                marginBottom={16}
            >
                <UIcon icon={<IcAdd />} size={36} color="var(--foregroundSecondary)" />
            </XView>
            <div className={buttonLabelStyle}>
                Invite speaker
            </div>
        </XView>
    );
});

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

interface RoomUserInfo {
    id: string;
    name: string;
    photo: string | null;
    isAdmin?: boolean;
}

const RoomUser = React.memo(({
    isSpeaker,
    isAdmin,
    id,
    name,
    photo,
    state,
}: {
    isSpeaker: boolean;
    state?: 'talking' | 'loading' | 'muted';
} & RoomUserInfo) => {
    return (
        <XView alignItems="center" justifyContent="center">
            <XView
                width={88}
                height={88}
                borderWidth={2}
                borderColor={state === 'talking' ? '#248BF2' : 'transparent'}
                padding={4}
                borderRadius={100}
                alignItems="center"
                justifyContent="center"
                marginBottom={8}
            >
                <UAvatar
                    customSizes={isSpeaker ? speakerAvatarSizes : listenerAvatarSizes}
                    id={id}
                    title={name}
                    photo={photo}
                />
                {(state === 'muted' || state === 'loading') && (
                    <XView
                        position="absolute"
                        bottom={0}
                        right={0}
                        width={24}
                        height={24}
                        borderRadius={12}
                        backgroundColor="var(--backgroundPrimary)"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {state === 'muted' ? (
                            <UIcon size={16} icon={<IcSpeaker />} color="var(--foregroundTertiary)" />
                        ) : state === 'loading' ? (
                            <SvgLoader size="small" contrast={true} />
                        ) : null}
                    </XView>
                )}
            </XView>
            <div className={cx(userNameStyle, state === 'talking' && userNameTalkingStyle)}>
                {isAdmin && <CrownIcon className={adminIconStyle} />} {name}
            </div>
        </XView>
    );
});

const RoomSpeakerUser = React.memo((props: {
    peerId?: string;
    analyzer: MediaSessionTrackAnalyzerManager;
    isLoading?: boolean,
    isMuted?: boolean,
} & RoomUserInfo) => {
    const { peerId, analyzer, isLoading, isMuted, ...other } = props;
    const isTalking = analyzer.usePeer(peerId);
    const state = isLoading
        ? 'loading'
        : isMuted
            ? 'muted'
            : isTalking
                ? 'talking' : undefined;

    return (
        <RoomUser
            isSpeaker={true}
            state={state}
            {...other}
        />
    );
});

const RoomSpeakers = React.memo(({
    room,
    peers,
    callState,
    connecting,
    analyzer,
}: {
    room: VoiceChatT,
    peers?: Conference_conference_peers[];
    callState: MediaSessionState | undefined;
    analyzer: MediaSessionTrackAnalyzerManager;
    connecting: boolean;
}) => {
    const speakers = (room.speakers || [])
        .map((speaker) => {
            let peer = (peers || []).find((p) => p.user.id === speaker.user.id);
            let media: PeerMedia = { videoTrack: null, audioTrack: null, screencastTrack: null };
            let isLocal = peer?.id === callState?.sender.id;
            if (isLocal) {
                media = {
                    videoTrack: callState?.sender.videoEnabled ? callState?.sender.videoTrack : null,
                    audioTrack: callState?.sender.audioEnabled ? callState?.sender.audioTrack : null,
                    screencastTrack: callState?.sender.screencastEnabled ? callState?.sender.screencastTrack : null,
                };
            } else {
                media = { ...media, ...peer ? callState?.receivers[peer.id] : {} };
            }
            return {
                peer,
                media,
                isLocal,
                speaker,
            };
        });

    return (
        <div className={speakersGridStyle}>
            {speakers.map(({ speaker, peer, media, isLocal }) => (
                <RoomSpeakerUser
                    key={speaker.id}
                    name={speaker.user.firstName}
                    id={speaker.user.id}
                    isLoading={connecting || !peer ? false : !isLocal && !media.audioTrack}
                    isMuted={peer?.mediaState.audioPaused}
                    analyzer={analyzer}
                    photo={speaker.user.photo}
                />
            ))}
            {speakers.length <= 8 && room.me?.status === VoiceChatParticipantStatus.ADMIN && (
                <>
                    <RaisedHandsButton raisedHands={room.raisedHands || []} roomId={room.id} />
                    <InviteButton />
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
                    isSpeaker={false}
                    key={listener.id}
                    id={listener.user.id}
                    name={listener.user.firstName}
                    photo={listener.user.photo}
                />
            ))}
        </div>
    );
});

const RoomView = React.memo((props: { roomId: string }) => {
    const client = useClient();
    const router = useStackRouter();
    const messenger = React.useContext(MessengerContext);

    const voiceChatData = useVoiceChat();
    const conference = client.useConference({ id: props.roomId }, { suspense: false })?.conference;

    const calls = messenger.calls;
    const mediaSession = calls.useCurrentSession();
    const [state, setState] = React.useState<MediaSessionState | undefined>(
        mediaSession?.state.value,
    );
    const muted = !state?.sender.audioEnabled;
    const handRaised = !!voiceChatData.me?.handRaised;

    const handleMute = React.useCallback(() => {
        mediaSession?.setAudioEnabled(!state?.sender.audioEnabled);
    }, [state, mediaSession]);

    const closeCall = () => {
        router.pop();
        calls.leaveCall();
        client.mutateVoiceChatLeave({ id: props.roomId });
    };

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

    const prevVoiceChat = React.useRef<VoiceChatT>(
        voiceChatData,
    );
    const toast = useToast();

    // Handle room state changes
    React.useEffect(() => {
        let hasPrevAdmins = prevVoiceChat.current.speakers?.some(x => x.status === VoiceChatParticipantStatus.ADMIN);
        let isPrevAdmin = prevVoiceChat.current.me?.status === VoiceChatParticipantStatus.ADMIN;
        let hasAdmins = voiceChatData.speakers?.some(x => x.status === VoiceChatParticipantStatus.ADMIN);
        let isPrevListener = prevVoiceChat.current.me?.status === VoiceChatParticipantStatus.LISTENER;
        let isPrevSpeaker = prevVoiceChat.current.me?.status === VoiceChatParticipantStatus.SPEAKER || prevVoiceChat.current.me?.status === VoiceChatParticipantStatus.ADMIN;
        let isSpeaker = voiceChatData.me?.status === VoiceChatParticipantStatus.SPEAKER;
        let isListener = voiceChatData.me?.status === VoiceChatParticipantStatus.LISTENER;

        if (isPrevListener && isSpeaker) {
            mediaSession?.setAudioEnabled(true);
        }
        if (isPrevSpeaker && isListener) {
            mediaSession?.setAudioEnabled(false);
        }
        if (hasPrevAdmins && !hasAdmins && !isPrevAdmin) {
            toast.show({ text: 'The last room admin left, the room will be closed now', duration: 2000 });
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

    if (!mediaSession) {
        return null;
    }

    return (
        <Page>
            <UHeader
                titleView={(
                    <RoomHeader
                        title={voiceChatData.title}
                        speakersCount={voiceChatData.speakersCount}
                        listenersCount={voiceChatData.listenersCount}
                    />
                )}
                dynamicHeight={true}
            />
            <XScrollView3 marginTop={20} marginBottom={114}>
                <RoomSpeakers
                    room={voiceChatData}
                    analyzer={mediaSession.analyzer}
                    callState={state}
                    peers={conference?.peers}
                    connecting={connecting}
                />
                {voiceChatData.listeners && voiceChatData.listeners?.length > 0 && (
                    <>
                        <XView
                            marginTop={24}
                            paddingVertical={12}
                            color="var(--foregroundPrimary)"
                            {...TextStyles.Title3}
                        >
                            Listeners
                        </XView>
                        <RoomListeners room={voiceChatData} />
                    </>
                )}
            </XScrollView3>
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
                    connecting={connecting}
                    status={voiceChatData.me?.status}
                    handRaised={handRaised}
                    raisedHands={voiceChatData.raisedHands || []}
                    onMute={handleMute}
                    onLeave={handleLeave}
                    onHandRaise={handleHandRaise}
                />
            </XView>
        </Page>
    );
});

export const RoomFragment = React.memo(() => {
    const { id } = useUnicorn().query;
    const joinRoom = useJoinRoom();
    React.useEffect(() => {
        joinRoom(id);
    }, []);
    // TODO: Unavailable page for wrong id
    return (
        <VoiceChatProvider roomId={id}>
            <RoomView roomId={id} />
        </VoiceChatProvider>
    );
});
