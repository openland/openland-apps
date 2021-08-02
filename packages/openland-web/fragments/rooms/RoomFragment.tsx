import * as React from 'react';
import { css, cx } from 'linaria';
import { XView, XViewRouterContext } from 'react-mental';

import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XScrollValues } from 'openland-x/XScrollView3';
import { TextBody, TextLabel1, TextStyles } from 'openland-web/utils/TextStyles';

import IcSpeaker from 'openland-icons/s/ic-mic-24.svg';
import { XLoader } from 'openland-x/XLoader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { useClient } from 'openland-api/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { groupInviteCapabilities } from 'openland-y-utils/InviteCapabilities';
import { useWakeLock } from 'openland-web/utils/useWakeLock';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { VoiceChatT } from 'openland-engines/VoiceChatEngine';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { SharedRoomKind, VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import AlertBlanket from 'openland-x/AlertBlanket';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { debounce } from 'openland-y-utils/timer';

import { useJoinRoom } from './joinRoom';
import { showRaiseHand } from './showRaiseHand';
import { showPinnedMessageModal } from './showPinnedMessageModal';
import { RoomJoinButton } from './RoomJoinButton';
import { RoomHeader } from './RoomHeader';
import { RoomControls } from './RoomControls';
import { RoomSpeakers } from './RoomSpeakers';
import { RoomListenersLoader, RoomListeners } from './RoomListeners';

const headerParentRoomClass = css`
    padding: 12px 0;
    display: flex;
    align-items: center;
    margin-left: -16px;
`;

const parentRoomTitle = css`
    display: flex;
    align-items: center;
    margin-right: auto;
    padding: 0 16px;
    cursor: pointer;
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

interface RoomViewInnerProps {
    roomId: string;
    voiceChatData: VoiceChatT;
    mediaSession: MediaSessionManager;
}

const RoomViewInner = React.memo((props: RoomViewInnerProps) => {
    const client = useClient();
    const tabRouter = useTabRouter().router;
    const toast = useToast();
    const router = React.useContext(XViewRouterContext)!;
    const { voiceChatData, mediaSession } = props;
    const conference = client.useConference({ id: props.roomId }, { suspense: false })?.conference;
    useWakeLock();

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
                toast.show({
                    text: 'The last room admin left, the room will be closed now',
                    duration: 2000,
                });
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
        showRaiseHand(async () => {
            await client.mutateVoiceChatRaiseHand({ id: props.roomId, raised: true });
            await client.refetchVoiceChatControls({ id: props.roomId });
        });
    }, [handRaised, props.roomId]);

    React.useEffect(() => mediaSession?.state.listenValue(setState), [mediaSession]);

    React.useEffect(() => {
        return messenger.voiceChat.onStatusChange((status, prevStatus) => {
            if (
                status === VoiceChatParticipantStatus.SPEAKER &&
                prevStatus === VoiceChatParticipantStatus.LISTENER
            ) {
                toast.show({
                    text: `You're a speaker now`,
                    Icon: () => <IcSpeaker />,
                    duration: 2000,
                });
            }
        });
    }, []);

    const [connecting, setConnecting] = React.useState(false);

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

    const handleScroll = React.useCallback(
        debounce((values: XScrollValues) => {
            let d = values.scrollHeight - (values.clientHeight + values.scrollTop);
            if (d < 200) {
                messenger.voiceChat.loadMoreListeners();
            }
        }, 500),
        [messenger.voiceChat.loadMoreListeners],
    );

    const speakers = (voiceChatData.speakers || []).map((speaker) => {
        let speakerPeers = (conference?.peers || []).filter((p) => p.user.id === speaker.user.id);
        let speakerStates = speakerPeers
            .map((peer) => {
                const isLocal = peer?.id === state?.sender.id;
                const isLoading = isLocal ? false : !state?.receivers[peer.id]?.audioTrack;
                const isMuted = isLocal
                    ? !state?.sender.audioEnabled
                    : !!peer?.mediaState.audioPaused;

                return { isMuted, isLoading };
            })
            .reduce(
                (acc, peerState) => {
                    return {
                        isMuted: acc.isMuted && peerState.isMuted,
                        isLoading: acc.isLoading && peerState.isLoading,
                    };
                },
                { isMuted: true, isLoading: true },
            );

        return {
            isMuted: speakerStates.isMuted,
            isLoading: speakerStates.isLoading,
            peersIds: speakerPeers.map((p) => p.id),
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
                                        id={voiceChatData.parentRoom.id}
                                        photo={voiceChatData.parentRoom.photo}
                                        size="small"
                                        marginRight={12}
                                    />
                                    <div className={TextLabel1}>
                                        {voiceChatData.parentRoom.title}
                                    </div>
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

    return (
        <RoomViewInner
            roomId={props.roomId}
            mediaSession={mediaSession}
            voiceChatData={voiceChat}
        />
    );
});

export const RoomFragment = React.memo(() => {
    const { id } = useUnicorn().query;
    // TODO: Unavailable page for wrong id
    return <RoomView roomId={id} />;
});
