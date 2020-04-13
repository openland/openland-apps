import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UAvatar, getPlaceholderColorById } from 'openland-web/components/unicorn/UAvatar';
import { useTalkWatch } from './useTalkWatch';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { css, cx } from 'linaria';
import { debounce } from 'openland-y-utils/timer';
import { Conference_conference_peers, RoomTiny_room } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { VideoComponent } from './ScreenShareModal';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { plural } from 'openland-y-utils/plural';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import EndIcon from 'openland-icons/s/ic-call-end-glyph-24.svg';
import MuteIcon from 'openland-icons/s/ic-mute-glyph-24.svg';
import { CallsEngine, CallState } from 'openland-engines/CallsEngine';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';

const VIDEO_WIDTH = 240;
const VIDEO_HEIGHT = 160;

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
    width: 280px;
    transition: opacity 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        box-shadow 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);

    &:hover {
        box-shadow: 0px 0px 96px rgba(0, 0, 0, 0.08), 0px 8px 48px rgba(0, 0, 0, 0.16);
    }
`;

const VideoOnClass = css`
    width: 240px;
`;

const VideoRadius = css`
    border-radius: 8px;
`;

const PeerVideoClass = css`
    border-radius: 0 0 8px 8px;
`;

const TargetClass = css`
    display: flex;
    flex-shrink: 0;
    flex-grow: 1;
    // cursor: move;
    cursor: pointer;
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
    filter: blur(5px);
    transform: scale(1.1);
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
    targetRef: React.RefObject<HTMLDivElement>,
    containerRef: React.RefObject<HTMLDivElement> | undefined,
    onMove: (coords: number[]) => void,
    savedCallback: (() => number[] | undefined) | number[] | undefined,
    limitToScreen?: boolean,
    depth?: any[]
) => {

    React.useLayoutEffect(() => {
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
        };
        const onDragStop = (ev: MouseEvent) => {
            if (ev instanceof MouseEvent) {
                ev.preventDefault();
            }
            ev.stopPropagation();
            dragging = false;
            prev = undefined;
        };
        const onDrag = (ev: MouseEvent | TouchEvent) => {
            if (!dragging) {
                return;
            }
            ev.stopPropagation();
            ev.preventDefault();
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

                onMove(positionShift);
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
            target.addEventListener('mouseup', onDragStop);
            window.document.addEventListener('mouseup', onDragStop);
            window.document.addEventListener('mousemove', onDrag);

            target.addEventListener('touchstart', onDragStart);
            target.addEventListener('touchend', onDragStop);
            target.addEventListener('touchcancel', onDragStop);
            target.addEventListener('touchmove', ev => ev.preventDefault());
            window.document.addEventListener('touchmove', onDrag);

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
    }, [depth]);
};

const VideoMediaView = React.memo((props: {
    mediaSessionManager: MediaSessionManager;
    peer?: Conference_conference_peers,
    avatarRef: React.RefObject<HTMLDivElement>,
    fallback: { id: string; title: string; picture?: string | null }
    calls: CallsEngine,
    callState: CallState,
}) => {
    const bgSrc = props.peer && props.peer.user.photo ? props.peer.user.photo : undefined;
    const bgColor = !(props.peer && props.peer.user.photo) ? props.peer && getPlaceholderColorById(props.peer.user.id) : undefined;
    const [stream, setStream] = React.useState<AppMediaStream>();
    React.useEffect(() => {
        let d: (() => void) | undefined;
        if (props.peer?.id) {
            d = props.mediaSessionManager.peerVideoVM.listen(props.peer.id, (streams) => {
                setStream([...streams.values()].find(s => s.source === 'camera'));
            });
        }
        return d;
    }, [props.peer?.id]);

    return (
        <XView width={VIDEO_WIDTH} height={VIDEO_HEIGHT} overflow="hidden" backgroundColor="var(--overlayHeavy)" alignItems="center" justifyContent="center">
            {stream ? (
                <VideoComponent 
                    stream={(stream as AppUserMediaStreamWeb)._stream}
                    cover={true} 
                    videoClass={PeerVideoClass}
                    switching={true} 
                />
            ) : props.peer && (
                <>
                <div className={bgAvatar}>
                    {bgSrc ? (
                        <ImgWithRetry src={bgSrc} className={bgAvatarImg} />
                    ) : (
                            <div className={bgAvatarImg} style={{ background: bgColor }} />
                        )}

                    <div className={bgAvatarOverlay} />
                </div>
                <XView position="absolute" zIndex={2}>
                    <UAvatar
                        size="large"
                        id={props.peer.user.id}
                        title={props.peer.user.name}
                        photo={props.peer.user.photo}
                    />
                </XView>
                </>
            )}
        </XView>
    );
});

const activeAvatarStyle = css`
    ::after{
        content: '';
        top: 6px;
        right: 6px;
        position: absolute;
        width: 32px;
        height: 32px;
        border: 2px solid white;
        border-radius: 32px;
    }
`;

const MediaViewAvatar = css`
    flex-shrink: 0;
    margin-right: 12px;
`;

const MediaView = React.memo((props: {
    peers: Conference_conference_peers[];
    fallback: { id: string; title: string; picture?: string | null };
    mediaSessionManager: MediaSessionManager;
    videoEnabled?: boolean;
    calls: CallsEngine;
    callState: CallState;
}) => {
    let peerId = props.mediaSessionManager.analizer.useSpeakingPeer();
    const avatarRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        let d: (() => void) | undefined;
        if (peerId) {
            d = props.mediaSessionManager.analizer.subscribePeer(peerId, v => {
                // animate
                if (avatarRef.current) {
                    avatarRef.current.className = cx(v && activeAvatarStyle);
                }
            });
        }
        return d;
    }, [peerId]);
    let peer = props.peers.find(p => p.id === peerId) || props.peers[0];

    return (props.videoEnabled ? (
        <VideoMediaView
            peer={peer}
            mediaSessionManager={props.mediaSessionManager}
            avatarRef={avatarRef}
            fallback={props.fallback}
            calls={props.calls}
            callState={props.callState}
        />
    ) : (
        <div key={'animating_wrapper'} className={MediaViewAvatar} ref={avatarRef}>
            <UAvatar
                size="small"
                id={peer ? peer.user.id : props.fallback.id}
                title={peer ? peer.user.name : props.fallback.title}
                photo={peer ? peer.user.photo : props.fallback.picture}
            />
        </div>
    ));
});

const CallFloatingComponent = React.memo((props: { id: string; private: boolean, room: RoomTiny_room }) => {
    // const isMobile = useIsMobile();
    // const [forceOpen, setForceOpen] = React.useState(false);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const moveCallBack = React.useCallback(debounce((shift: number[]) => {
        window.localStorage.setItem('call_floating_shift', JSON.stringify(shift));
    }, 500), []);
    useJsDrag(targetRef, containerRef, moveCallBack, JSON.parse(window.localStorage.getItem('call_floating_shift') || '[]'), true);
    let messenger = React.useContext(MessengerContext);
    let calls = messenger.calls;
    let callState = calls.useState();

    let client = useClient();
    let data = client.useConference({ id: props.id }, { fetchPolicy: 'network-only', suspense: false });

    // const onClick = React.useCallback(
    //     () => {
    //         if (isMobile) {
    //             if (containerRef.current) {
    //                 containerRef.current.style.opacity = forceOpen ? '1' : '0.56';
    //                 containerRef.current.style.maxWidth = forceOpen ? '360px' : `${AVATAR_SIZE}px`;
    //             }
    //             setForceOpen(!forceOpen);
    //         }
    //     },
    //     [forceOpen],
    // );

    let ms = calls.getMediaSession();
    const avatar = data && callState.avatar && ms && (
        <MediaView
            peers={data.conference.peers}
            mediaSessionManager={ms}
            fallback={{
                id: callState.avatar.id,
                title: callState.avatar.title,
                picture: callState.avatar.picture,
            }}
            videoEnabled={callState.videoEnabled}
            calls={calls}
            callState={callState}
        />
    );

    const buttons = (
        <XView flexDirection="row">
            <UIconButton
                size="small"
                marginRight={12}
                icon={<MuteIcon />}
                color="var(--foregroundContrast)"
                rippleColor="var(--tintOrange)"
                defaultRippleColor="rgba(255, 255, 255, 0.16)"
                active={callState.mute}
                onClick={() => calls.setMute(!callState.mute)}
            />
            <UIconButton
                size="small"
                icon={<EndIcon />}
                active={true}
                color="var(--foregroundContrast)"
                rippleColor="var(--accentNegative)"
                onClick={() => calls.leaveCall()}
            />
        </XView>
    );

    const title = props.room.__typename === 'PrivateRoom' ? props.room.user.name : props.room.title;
    const subtitle = callState.status === 'connecting' ? 'Connecting...'
                : props.room.__typename === 'SharedRoom' && data ? plural(data.conference.peers.length, ['member', 'members'])
                : '';

    return (
        data && (
            <div className={cx(FloatContainerClass, callState.videoEnabled && VideoOnClass)} ref={containerRef}>
                <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }} ref={contentRef}>
                    <div className={TargetClass} ref={targetRef}>
                        <XView 
                            flexDirection="row"
                            paddingVertical={8}
                            paddingHorizontal={12}
                            width="100%"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            {!callState.videoEnabled && avatar}
                            <XView flexShrink={1} marginRight={14}>
                                <XView 
                                    {...TextStyles.Label1}
                                    color="var(--foregroundContrast)"
                                    flexShrink={1}
                                    overflow="hidden"
                                >
                                    {title}
                                </XView>
                                {subtitle && (
                                    <XView 
                                        {...TextStyles.Subhead}
                                        color="var(--foregroundContrast)"
                                        opacity={0.56}
                                        marginTop={-4}
                                        flexShrink={1}
                                    >
                                        {subtitle}
                                    </XView>
                                )}
                            </XView>
                            {buttons}
                        </XView>
                        {callState.videoEnabled && (
                            <XView width={VIDEO_WIDTH} height={VIDEO_HEIGHT} overflow="hidden" backgroundColor="var(--overlayHeavy)">
                                {avatar}
                                <XView 
                                    width={72}
                                    height={48}
                                    borderRadius={8}
                                    overflow="hidden"
                                    position="absolute"
                                    bottom={12}
                                    right={12}
                                >
                                    {callState.video && <VideoComponent stream={(callState.video as AppUserMediaStreamWeb)._stream} cover={true} videoClass={VideoRadius} />}
                                </XView>
                            </XView>
                        )}
                    </div>
                </div>
            </div>
        )
    );
});

const CallFloatingInner = React.memo((props: { id: string; private: boolean }) => {
    let client = useClient();
    let data = client.useConference({ id: props.id }, { fetchPolicy: 'network-only', suspense: false });
    // TODO: move room title to conference query
    let room = client.useRoomTiny({ id: props.id }, { fetchPolicy: 'network-only', suspense: false });
    useTalkWatch(data && data.conference.id);

    if (!data || !(room && room.room)) {
        return null;
    }

    let res = data.conference.peers.length !== 0 && (
        <CallFloatingComponent id={props.id} private={props.private} room={room.room} />
    );
    return ReactDOM.createPortal(res, document.body);
});

export const CallFloating = React.memo(() => {
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();
    if (!callState.conversationId) {
        return null;
    }
    return <CallFloatingInner id={callState.conversationId} private={!!callState.private} />;
});
