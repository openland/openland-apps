import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UAvatar, getPlaceholderColorById } from 'openland-web/components/unicorn/UAvatar';
import { useTalkWatch } from './useTalkWatch';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { css, cx } from 'linaria';
import { debounce } from 'openland-y-utils/timer';
import { Conference_conference_room, Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { VideoComponent } from './ScreenShareModal';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
// import { plural } from 'openland-y-utils/plural';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import EndIcon from 'openland-icons/s/ic-call-end-glyph-24.svg';
import MuteIcon from 'openland-icons/s/ic-mute-glyph-24.svg';
import FullscreenIcon from 'openland-icons/s/ic-size-up-glyph-24.svg';
import { CallsEngine } from 'openland-engines/CallsEngine';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { useEffects } from './Effects';
import { useVideoCallModal } from './CallModal';
import { AppUserMediaTrackWeb } from 'openland-y-runtime-web/AppUserMedia';
import { plural } from 'openland-y-utils/plural';
import { MediaSessionState } from 'openland-engines/media/MediaSessionState';

const VIDEO_WIDTH = 320;
const VIDEO_HEIGHT = 213;

const FloatContainerClass = css`
    display: none;
    position: absolute;
    top: 0;
    z-index: 2;
    flex-shrink: 0;
    align-items: center;
    background-color: var(--overlayHeavy);
    flex-direction: row;
    border-radius: 12px;
    overflow: hidden;
    width: 320px;
    transition: opacity 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        box-shadow 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);

    /* &:hover {
        box-shadow: 0px 0px 96px rgba(0, 0, 0, 0.08), 0px 8px 48px rgba(0, 0, 0, 0.16);
    } */
`;

const VideoOnClass = css`
    width: ${VIDEO_WIDTH}px;
`;

const MiniFloatingVideo = css`
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
`;

const PeerVideoClass = css`
    border-radius: 0 0 8px 8px;
`;

const TargetClass = css`
    display: flex;
    flex-shrink: 0;
    flex-grow: 1;
    cursor: move;
    width: 100%;
    flex-direction: column;
    align-items: center;
`;

const bgAvatar = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    overflow: hidden;
`;

const bgAvatarImg = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(24px);
    transform: scale(1.3);
`;

const bgAvatarGradient = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const bgAvatarOverlay = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--overlayMedium);
`;

export const useJsDrag = (
    targetRef: React.MutableRefObject<HTMLDivElement | undefined> | React.RefObject<HTMLDivElement>,
    options?:
        {
            containerRef?: React.RefObject<HTMLDivElement>,
            onStart?: () => void;
            onMove?: (coords: number[]) => void,
            onStop?: () => void;
            savedCallback?: (() => number[] | undefined) | number[],
            limitToScreen?: boolean,

        },
    depth?: any[]
) => {

    let { containerRef, onMove, savedCallback, limitToScreen, onStart, onStop } = options || {};
    React.useEffect(() => {
        console.warn('jsdrag useEffect', targetRef);
        const container = containerRef?.current;
        const target = targetRef.current;
        let dragging = false;
        let saved = Array.isArray(savedCallback) ? savedCallback : undefined;
        let positionShift = saved?.length ? saved : [window.innerWidth / 2 - (target?.clientWidth || 0), window.innerHeight / 2];
        let prev: number[] | undefined;

        const checkPostion = () => {
            if (limitToScreen) {
                positionShift[0] = Math.min(window.innerWidth - (target?.clientWidth || 0), Math.max(0, positionShift[0]));
                positionShift[1] = Math.min(window.innerHeight - (target?.clientHeight || 0), Math.max(0, positionShift[1]));
            }
        };

        const onDragStart = (ev: MouseEvent | TouchEvent) => {
            if (savedCallback && !Array.isArray(savedCallback)) {
                positionShift = savedCallback() || positionShift;
            }
            if (ev instanceof MouseEvent) {
                ev.preventDefault();
            }
            ev.stopPropagation();
            dragging = true;
            if (onStart) {
                onStart();
            }
        };
        const onDragStop = (ev: MouseEvent) => {
            dragging = false;
            prev = undefined;
            if (onStop) {
                onStop();
            }
        };
        const onDrag = (ev: MouseEvent | TouchEvent) => {
            if (!dragging) {
                return;
            }
            let current: number[] = [];
            if (ev instanceof MouseEvent) {
                current = [ev.x, ev.y];
            } else {
                let touch = ev.touches.item(0);
                if (touch) {
                    current = [touch.clientX, touch.clientY];
                }
            }
            if (prev) {
                let moveDelta = [current[0] - prev[0], current[1] - prev[1]];
                positionShift = [positionShift[0] + moveDelta[0], positionShift[1] + moveDelta[1]];
                checkPostion();

                if (onMove) {
                    onMove(positionShift);
                }
                if (container) {
                    container.style.transform = `translate(${positionShift[0]}px, ${
                        positionShift[1]
                        }px)`;
                }
            }
            prev = current;
        };

        checkPostion();
        if (target) {
            target.addEventListener('mousedown', onDragStart);
            target.addEventListener('mouseup', onDragStop, { passive: true });
            window.document.addEventListener('mouseup', onDragStop, { passive: true });
            window.document.addEventListener('mousemove', onDrag, { passive: true });

            target.addEventListener('touchstart', onDragStart, { passive: true });
            target.addEventListener('touchend', onDragStop, { passive: true });
            target.addEventListener('touchcancel', onDragStop, { passive: true });
            target.addEventListener('touchmove', ev => ev.preventDefault());
            window.document.addEventListener('touchmove', onDrag, { passive: true });

            if (container) {
                container.style.display = 'flex';
                container.style.transform = `translate(${positionShift[0]}px, ${positionShift[1]}px)`;
            }
        }

        return () => {
            if (target) {
                target.removeEventListener('mousedown', onDragStart);
                target.removeEventListener('mouseup', onDragStop);
                window.document.removeEventListener('mouseup', onDragStop);
                window.document.removeEventListener('mousemove', onDrag);

                target.removeEventListener('touchstart', onDragStart);
                target.removeEventListener('touchend', onDragStop);
                target.removeEventListener('touchcancel', onDragStop);
                target.removeEventListener('touchmove', ev => ev.preventDefault());
                window.document.removeEventListener('touchmove', onDrag);
            }
        };
    }, depth);
};

const AvatarCover = React.memo((props: { photo?: string | null, id: string, title: string }) => {
    const bgColor = props.id && getPlaceholderColorById(props.id);
    return (
        <>
            <div className={bgAvatar}>
                {props.photo && !props.photo.startsWith('ph://') ? (
                    <ImgWithRetry src={props.photo} className={bgAvatarImg} />
                ) : (
                        <div className={bgAvatarGradient} style={{ background: bgColor }} />
                    )}

                <div className={bgAvatarOverlay} />
            </div>
            <XView position="absolute" zIndex={2}>
                <UAvatar
                    size="large"
                    id={props.id}
                    title={props.title}
                    photo={props.photo}
                />
            </XView>
        </>
    );
});

const VideoMediaView = React.memo((props: {
    state: MediaSessionState;
    peer?: Conference_conference_peers,
    fallback: { id: string; title: string; photo?: string | null }
    calls: CallsEngine
}) => {
    const receiver = props.state.receivers[props.peer?.id || ''];
    const track = receiver?.screencastTrack || receiver?.videoTrack;
    return (
        <XView width={VIDEO_WIDTH} height={VIDEO_HEIGHT} overflow="hidden" backgroundColor="var(--overlayHeavy)" alignItems="center" justifyContent="center">
            {track ? (
                <VideoComponent
                    track={(track as AppUserMediaTrackWeb).track}
                    cover={true}
                    videoClass={PeerVideoClass}
                    switching={true}
                />
            ) : (
                    <AvatarCover
                        id={props.peer ? props.peer.user.id : props.fallback.id}
                        title={props.peer ? props.peer.user.name : props.fallback.title}
                        photo={props.peer ? props.peer.user.photo : props.fallback.photo}
                    />
                )}
        </XView>
    );
});

const MediaView = React.memo((props: {
    peers: Conference_conference_peers[];
    fallback: { id: string; title: string; photo?: string | null };
    mediaSessionManager: MediaSessionManager;
    state: MediaSessionState;
    calls: CallsEngine;
}) => {
    let peerId = props.mediaSessionManager.analyzer.useSpeakingPeer();
    let peer = props.peers.find(p => p.id === peerId);

    return <VideoMediaView
        peer={peer}
        state={props.state}
        fallback={props.fallback}
        calls={props.calls}
    // callState={props.callState}
    />;
});

const CallFloatingComponent = React.memo((props: { id: string; room: Conference_conference_room, mediaSession: MediaSessionManager }) => {
    const targetRef = React.useRef<HTMLDivElement>();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const onMove = React.useCallback(debounce((shift: number[]) => {
        window.localStorage.setItem('call_floating_shift', JSON.stringify(shift));
    }, 500), []);
    const [targetState, setTargetState] = React.useState<HTMLDivElement>();
    useJsDrag(targetRef, { containerRef, onMove, savedCallback: JSON.parse(window.localStorage.getItem('call_floating_shift') || '[]'), limitToScreen: true }, [targetState]);
    let messenger = React.useContext(MessengerContext);
    let calls = messenger.calls;
    let state = props.mediaSession.state.useValue();

    useEffects(props.id);

    let client = useClient();
    let data = client.useConference({ id: props.id }, { fetchPolicy: 'network-only', suspense: false });

    const title = props.room.__typename === 'PrivateRoom' ? props.room.user.name : props.room.title;
    const subtitle = props.room.__typename === 'SharedRoom' && data ? plural(data.conference.peers.length, ['member', 'members'])
        : 'Call';

    const avatar = props.mediaSession && (
        <MediaView
            peers={data?.conference.peers || []}
            mediaSessionManager={props.mediaSession}
            state={state}
            fallback={props.room.__typename === 'PrivateRoom' ? {
                id: props.room.user.id,
                title: props.room.user.name,
                photo: props.room.user.photo,
            } : {
                    id: props.room.id,
                    title: props.room.title,
                    photo: props.room.photo,
                }}
            calls={calls}
        />
    );
    const showVideoCallModal = useVideoCallModal({ calls, chatId: props.id, client, messenger });

    const buttons = (
        <XView flexDirection="row" justifyContent="flex-end" marginLeft={'auto' as any}>
            <UIconButton
                size="small"
                marginRight={12}
                icon={<FullscreenIcon />}
                color="var(--foregroundContrast)"
                defaultRippleColor="rgba(255, 255, 255, 0.16)"
                hoverRippleColor="rgba(255, 255, 255, 0.32)"
                onClick={showVideoCallModal}
            />
            <UIconButton
                size="small"
                marginRight={12}
                icon={<MuteIcon />}
                color="var(--foregroundContrast)"
                rippleColor="var(--tintOrange)"
                defaultRippleColor="rgba(255, 255, 255, 0.16)"
                hoverRippleColor="rgba(255, 255, 255, 0.32)"
                hoverActiveRippleColor="var(--tintOrangeHover)"
                active={!state.sender.audioEnabled}
                onClick={() => props.mediaSession.setAudioEnabled(!state.sender.audioEnabled)}
            />
            <UIconButton
                size="small"
                icon={<EndIcon />}
                active={true}
                color="var(--foregroundContrast)"
                rippleColor="var(--tintRed)"
                hoverActiveRippleColor="var(--tintRedHover)"
                onClick={() => calls.leaveCall()}
            />
        </XView>
    );

    const targetRefCallback = React.useCallback((e: HTMLDivElement) => {
        if (!targetState) {
            targetRef.current = e;
            setTargetState(e);
        }
    }, []);

    return (
        data && (
            <div className={cx(FloatContainerClass, VideoOnClass)} ref={containerRef}>
                <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }} ref={contentRef}>
                    <div className={TargetClass} ref={targetRefCallback}>
                        <XView
                            flexDirection="row"
                            paddingVertical={7}
                            paddingHorizontal={12}
                            width="100%"
                            alignItems="center"
                        >
                            <XView flexShrink={1} marginRight={14}>
                                <XView
                                    {...TextStyles.Label1}
                                    color="var(--foregroundContrast)"
                                    flexShrink={1}
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                >
                                    {title}
                                </XView>
                                {subtitle && (
                                    <XView
                                        {...TextStyles.Subhead}
                                        color="var(--foregroundContrast)"
                                        opacity={0.56}
                                        marginTop={-2}
                                        flexShrink={1}
                                    >
                                        {subtitle}
                                    </XView>
                                )}
                            </XView>
                            {buttons}
                        </XView>
                        <XView
                            width={VIDEO_WIDTH}
                            height={VIDEO_HEIGHT}
                            overflow="hidden"
                            backgroundColor="var(--overlayHeavy)"
                            justifyContent="center"
                            alignItems="center"
                        >
                            {avatar}
                            <XView
                                width={72}
                                height={48}
                                borderRadius={8}
                                position="absolute"
                                bottom={12}
                                right={12}
                            >
                                {(state.sender.videoTrack && state.sender.videoEnabled) && <VideoComponent track={(state.sender.videoTrack as AppUserMediaTrackWeb)?.track} cover={true} videoClass={MiniFloatingVideo} mirror={true} />}
                            </XView>
                        </XView>
                    </div>
                </div>
            </div>
        )
    );
    return null;
});

const CallFloatingInner = React.memo((props: { id: string }) => {
    let client = useClient();
    let data = client.useConference({ id: props.id }, { fetchPolicy: 'network-only', suspense: false });
    useTalkWatch(data && data.conference.id);

    let messenger = React.useContext(MessengerContext);
    let ms = messenger.calls.useCurrentSession();

    let res = ms && data && data.conference.peers.length !== 0 && (
        <CallFloatingComponent id={props.id} room={data.conference.room!} mediaSession={ms} />
    );
    return ReactDOM.createPortal(res, document.body);
});

export const CallFloating = React.memo(() => {
    let calls = React.useContext(MessengerContext).calls;
    let currentMediaSession = calls.useCurrentSession();
    if (!currentMediaSession) {
        return null;
    }
    return <CallFloatingInner id={currentMediaSession.conversationId} />;
});
