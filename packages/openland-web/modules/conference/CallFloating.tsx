import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useTalkWatch } from './useTalkWatch';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { css, cx } from 'linaria';
import { debounce } from 'openland-y-utils/timer';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { VideoComponent } from './ScreenShareModal';
import { XView } from 'react-mental';
import { showVideoCallModal } from './CallModal';

const AVATAR_SIZE = 48;
const VIDEO_SIZE = 200;
const OPEN_WIDTH = 460;

const FloatContainerClass = css`
    display: none;
    position: absolute;
    top: 0;
    z-index: 2;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background-color: var(--accentPay);
    flex-direction: row;
    padding: 8px 4px;
    border-radius: ${AVATAR_SIZE / 2}px;
    transition: max-width 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        opacity 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    overflow: hidden;
    max-width: ${AVATAR_SIZE}px;
    opacity: 0.56;
    &:hover {
        max-width: ${OPEN_WIDTH}px;
        opacity: 1;
    }
`;

const VideoOnClass = css`
    max-width: ${VIDEO_SIZE + 16}px;
    &:hover {
        max-width: ${OPEN_WIDTH + VIDEO_SIZE}px;
        opacity: 1;
    }
`;

const VideoRadius = css`
    border-radius: ${(AVATAR_SIZE / 2) - 6}px;
`;

const TargetClass = css`
    display: flex;
    flex-shrink: 0;
    cursor: move;

    margin: 0 4px;
`;

export const useJsDrag = (
    targetRef: React.RefObject<HTMLDivElement>,
    containerRef: React.RefObject<HTMLDivElement>,
    onMove: (coords: number[]) => void,
    saved?: number[],
    initialTargetWidth?: number,
    targetMargin?: number,
    contentRef?: React.RefObject<HTMLDivElement>,
    limitToScreen?: boolean,
    deps?: any[]
) => {

    React.useLayoutEffect(() => {
        const container = containerRef.current;
        const target = targetRef.current;
        const content = contentRef?.current;
        let dragging = false;
        let targetWidth = (target?.clientWidth || initialTargetWidth || 0) + (targetMargin || 0) * 2;
        let positionShift = saved?.length ? saved : [window.innerWidth / 2 - (targetWidth), window.innerHeight / 2];
        let prev: number[] | undefined;

        const checkPostion = () => {
            let newTargetWidth = (target?.clientWidth || initialTargetWidth || 0) + (targetMargin || 0) * 2;
            positionShift[0] += (targetWidth - newTargetWidth) / 2;
            targetWidth = newTargetWidth;
            // limit shift with screen bounds
            if (limitToScreen) {
                if (Math.abs(positionShift[0]) > window.innerWidth / 2 - (targetWidth / 2)) {
                    positionShift[0] = (window.innerWidth / 2 - (targetWidth / 2)) * Math.sign(positionShift[0]);
                }
                positionShift[1] = Math.min(window.innerHeight - (targetWidth), Math.max(0, positionShift[1]));
            }

            // swap layout for left/right part of screen
            if (container && content) {
                if (positionShift[0] > 0) {
                    container.style.right = `calc(50% - ${targetWidth / 2}px)`;
                    container.style.left = 'initial';
                    content.style.flexDirection = 'row-reverse';
                } else {
                    container.style.right = 'initial';
                    container.style.left = `calc(50% - ${targetWidth / 2}px)`;
                    content.style.flexDirection = 'row';
                }
            }
        };

        const onDragStart = (ev: MouseEvent | TouchEvent) => {
            console.warn(ev);
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
        if (container && target) {
            target.addEventListener('mousedown', onDragStart);
            target.addEventListener('mouseup', onDragStop);
            window.document.addEventListener('mouseup', onDragStop);
            window.document.addEventListener('mousemove', onDrag);

            target.addEventListener('touchstart', onDragStart);
            target.addEventListener('touchend', onDragStop);
            target.addEventListener('touchcancel', onDragStop);
            target.addEventListener('touchmove', ev => ev.preventDefault());
            window.document.addEventListener('touchmove', onDrag);

            container.style.display = 'flex';
            container.style.transform = `translate(${positionShift[0]}px, ${positionShift[1]}px)`;
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
    }, [deps]);
};

const VideoMediaView = React.memo((props: {
    mediaSessionManager: MediaSessionManager;
    peer?: Conference_conference_peers,
    avatarRef: React.RefObject<HTMLDivElement>,
    fallback: { id: string; title: string; picture?: string | null }
}) => {
    const [stream, setStream] = React.useState<AppMediaStream>();
    React.useEffect(() => {
        let d: (() => void) | undefined;
        if (props.peer?.id) {
            d = props.mediaSessionManager.listenPeerVideo(props.peer.id, (streams) => {
                setStream(streams.find(s => s.source === 'camera'));
            });
        }
        return d;
    }, [props.peer?.id]);
    return (
        <XView width={VIDEO_SIZE} height={VIDEO_SIZE} borderRadius={(AVATAR_SIZE / 2) - 6} overflow="hidden" backgroundColor="gray" alignItems="center" justifyContent="center">
            {stream ?
                <VideoComponent stream={(stream as AppUserMediaStreamWeb)._stream} cover={true} videoClass={VideoRadius} switching={true} /> :
                <div key={'animtateing_wrapper'} ref={props.avatarRef}>
                    <UAvatar
                        size="large"
                        id={props.peer ? props.peer.user.id : props.fallback.id}
                        title={props.peer ? props.peer.user.name : props.fallback.title}
                        photo={props.peer ? props.peer.user.photo : props.fallback.picture}
                    />
                </div>
            }
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

const MediaView = React.memo((props: {
    peers: Conference_conference_peers[];
    fallback: { id: string; title: string; picture?: string | null };
    mediaSessionManager: MediaSessionManager;
    videoEnabled?: boolean;
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
    let peer = props.peers.find(p => p.id === peerId);

    return (props.videoEnabled ?
        <VideoMediaView peer={peer} mediaSessionManager={props.mediaSessionManager} avatarRef={avatarRef} fallback={props.fallback} /> :
        <div key={'animtateing_wrapper'} ref={avatarRef}>
            <UAvatar
                size="small"
                id={peer ? peer.user.id : props.fallback.id}
                title={peer ? peer.user.name : props.fallback.title}
                photo={peer ? peer.user.photo : props.fallback.picture}
            />
        </div>

    );
});

const CallFloatingComponent = React.memo((props: { id: string; private: boolean }) => {
    const isMobile = useIsMobile();
    const [forceOpen, setForceOpen] = React.useState(false);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const moveCallBack = React.useCallback(debounce((shift: number[]) => {
        window.localStorage.setItem('call_floating_shift', JSON.stringify(shift));
    }, 500), []);
    useJsDrag(targetRef, containerRef, moveCallBack, JSON.parse(window.localStorage.getItem('call_floating_shift') || '{}'), AVATAR_SIZE - 16, 8, contentRef, true);
    let messenger = React.useContext(MessengerContext);
    let calls = messenger.calls;
    let callState = calls.useState();

    let client = useClient();
    let data = client.useConference({ id: props.id }, { fetchPolicy: 'network-only', suspense: false });

    const onClick = React.useCallback(
        () => {
            if (isMobile) {
                if (containerRef.current) {
                    containerRef.current.style.opacity = forceOpen ? '1' : '0.56';
                    containerRef.current.style.maxWidth = forceOpen ? '360px' : `${AVATAR_SIZE}px`;
                }
                setForceOpen(!forceOpen);
            }
        },
        [forceOpen],
    );

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
        />
    );

    const buttons = (
        <XView flexDirection={callState.videoEnabled ? 'column' : 'row'}>
            <UButton
                flexShrink={0}
                style='secondary'
                text={'Fullscreen'}
                onClick={() => {
                    showVideoCallModal({ calls, chatId: props.id, client, messenger });
                }}
                marginHorizontal={4}
            />
            <UButton
                flexShrink={0}
                style={callState.outVideo ? 'primary' : 'secondary'}
                text={callState.outVideo ? 'Video on' : 'Video off'}
                onClick={() => calls.switchVideo()}
                marginHorizontal={4}
                marginTop={callState.videoEnabled ? 8 : 0}
            />
            <UButton
                flexShrink={0}
                style={callState.mute ? 'secondary' : 'primary'}
                text={callState.mute ? 'Mic off' : 'Mic on'}
                onClick={() => calls.setMute(!callState.mute)}
                marginHorizontal={4}
                marginTop={callState.videoEnabled ? 8 : 0}
            />

            <UButton
                flexShrink={0}
                style="danger"
                text={callState.status === 'connecting' ? 'Connecting' : 'Leave'}
                onClick={() => calls.leaveCall()}
                marginHorizontal={4}
                marginTop={callState.videoEnabled ? 8 : 0}
            />
        </XView>
    );

    return (
        data && (
            <div className={cx(FloatContainerClass, callState.videoEnabled && VideoOnClass)} ref={containerRef} onClick={onClick}>
                <div style={{ display: 'flex', flexDirection: 'row' }} ref={contentRef}>

                    <div className={TargetClass} ref={targetRef}>
                        {callState.videoEnabled && (
                            <XView width={VIDEO_SIZE} height={VIDEO_SIZE} borderRadius={(AVATAR_SIZE / 2) - 6} overflow="hidden" backgroundColor="gray">
                                {avatar}
                                <XView width={VIDEO_SIZE / 3} height={VIDEO_SIZE / 3} borderRadius={(AVATAR_SIZE / 2) - 6} overflow="hidden" position="absolute" top={0} right={0}>
                                    {callState.outVideo && <VideoComponent stream={(callState.outVideo.stream as AppUserMediaStreamWeb)._stream} cover={true} videoClass={VideoRadius} />}
                                </XView>
                            </XView>
                        )}
                        {!callState.videoEnabled && avatar}
                    </div>
                    {buttons}
                </div>
            </div>
        )
    );
});

const CallFloatingInner = React.memo((props: { id: string; private: boolean }) => {
    let client = useClient();
    let data = client.useConference({ id: props.id }, { fetchPolicy: 'network-only', suspense: false });
    useTalkWatch(data && data.conference.id);

    if (!data) {
        return null;
    }

    let res = data.conference.peers.length !== 0 && (
        <CallFloatingComponent id={props.id} private={props.private} />
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
