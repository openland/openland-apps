import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TalkWatchComponent } from './TalkWatchComponent';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-web/utils/useClient';
import { css } from 'linaria';
import { debounce } from 'openland-y-utils/timer';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { Conference_conference_peers } from 'openland-api/Types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { MediaStreamManager } from 'openland-engines/media/MediaStreamManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

const FloatContainerClass = css`
    display: none;
    position: absolute;
    top: 0;
    z-index: 2;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background-color: #32bb78;
    flex-direction: row;
    padding: 8px;
    border-radius: 48px;
    transition: max-width 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        opacity 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    overflow: hidden;
    max-width: 48px;
    opacity: 0.56;
    &:hover {
        max-width: 360px;
        opacity: 1;
    }
`;

const TargetClass = css`
    display: flex;
    flex-shrink: 0;
    cursor: move;
`;

const animatedAvatarStyle = css`
    transition: transform 250ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

const useJsDrag = (
    targetRef: React.RefObject<HTMLDivElement>,
    containerRef: React.RefObject<HTMLDivElement>,
    contentRef: React.RefObject<HTMLDivElement>,
) => {
    const saveLastShift = React.useCallback(
        debounce((shift: number[]) => {
            window.localStorage.setItem('call_floating_shift', JSON.stringify(shift));
        }, 500),
        [],
    );

    React.useLayoutEffect(() => {
        const container = containerRef.current;
        const target = targetRef.current;
        const content = contentRef.current;
        let dragging = false;
        let saved = window.localStorage.getItem('call_floating_shift');
        let positionShift = saved
            ? JSON.parse(saved)
            : [window.innerWidth / 2 - 48, window.innerHeight / 2];
        let prev: number[] | undefined;

        const checkPostion = () => {
            // limit shift with screen bounds
            if (Math.abs(positionShift[0]) > window.innerWidth / 2) {
                positionShift[0] = (window.innerWidth / 2) * Math.sign(positionShift[0]);
            }
            positionShift[1] = Math.min(window.innerHeight - 48, Math.max(0, positionShift[1]));

            // swap layout for left/right part of screen
            if (container && content) {
                if (positionShift[0] > 0) {
                    container.style.right = 'calc(50% - 24px)';
                    container.style.left = null;
                    content.style.flexDirection = 'row-reverse';
                } else {
                    container.style.right = null;
                    container.style.left = 'calc(50% - 24px)';
                    content.style.flexDirection = 'row';
                }
            }
        };

        const onDragStart = (ev: MouseEvent | TouchEvent) => {
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

                saveLastShift(positionShift);
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
    }, []);
};

const Avatar = React.memo(
    (props: {
        peers: Conference_conference_peers[];
        mediaSessionManager?: MediaSessionManager;
        fallback: { id: string; title: string; picture?: string | null };
    }) => {
        const avatarRef = React.useRef<HTMLDivElement>(null);
        const [speakingPeerId, setSpeakingPeerId] = React.useState<string>();
        React.useEffect(
            () => {
                let buffer: Uint8Array;
                let running = true;
                let disposeStreamsListener: (() => void) | undefined;
                let streamsManagers: Map<string, MediaStreamManager> = new Map();
                const peerStreamAnalyzers = new Map<
                    string,
                    {
                        analyzer: AnalyserNode;
                        stream: MediaStream;
                        appSrteam: AppMediaStream;
                        isMe?: boolean;
                    }
                >();
                if (props.mediaSessionManager) {
                    disposeStreamsListener = props.mediaSessionManager.listenStreams(
                        s => (streamsManagers = s),
                    );
                } else {
                    return;
                }

                const initStreamsAnalizer = (manager: MediaStreamManager, isMe?: boolean) => {
                    // damn you safari
                    if (!(window as any).AudioContext) {
                        return;
                    }
                    const peerId = isMe ? manager.getPeerId() : manager.getTargetPeerId() || 'none';
                    let ex = peerStreamAnalyzers.get(peerId);
                    let stream = isMe
                        ? ((manager.getStream() as any) as AppUserMediaStreamWeb).getStream()
                        : manager.getInStream()
                            ? ((manager.getInStream() as any) as AppUserMediaStreamWeb).getStream()
                            : undefined;
                    // clean up
                    if (ex && ex.stream !== stream) {
                        ex.analyzer.disconnect();
                    }
                    // create new analyzer
                    if (stream && (!ex || ex.stream !== stream)) {
                        let context = new AudioContext();
                        let source = context.createMediaStreamSource(stream);
                        let analyser = context.createAnalyser();
                        const bufferLength = analyser.frequencyBinCount;
                        if (!buffer) {
                            buffer = new Uint8Array(bufferLength);
                        }
                        source.connect(analyser);
                        peerStreamAnalyzers.set(peerId, {
                            stream,
                            appSrteam: manager.getStream(),
                            analyzer: analyser,
                            isMe,
                        });
                    }
                };
                const initStreamsAnalizers = () => {
                    streamsManagers.forEach(sm => {
                        initStreamsAnalizer(sm);
                    });
                    if (streamsManagers.size) {
                        initStreamsAnalizer(streamsManagers.values().next().value, true);
                    }
                };
                const render = () => {
                    if (!running) {
                        return;
                    }
                    initStreamsAnalizers();
                    let lastVal = 0;
                    let activePeerId: string | undefined;
                    for (let [key, entry] of peerStreamAnalyzers) {
                        entry.analyzer.getByteFrequencyData(buffer);
                        let val = Math.min(
                            1,
                            buffer.reduce((res, x) => {
                                return res + x;
                            }, 0) /
                                buffer.length /
                                10,
                        );
                        if (val < 0.2) {
                            val = 0;
                        }
                        if (entry.isMe && entry.appSrteam.muted) {
                            val = 0;
                        }
                        if (val > lastVal) {
                            lastVal = val;
                            activePeerId = key;
                        }

                        // animate
                        let scale = 1 + lastVal * 0.4;
                        if (avatarRef.current) {
                            avatarRef.current.style.transform = `scale(${scale})`;
                        }
                    }
                    setSpeakingPeerId(activePeerId);
                    requestAnimationFrame(render);
                };

                requestAnimationFrame(render);
                return () => {
                    running = false;
                    if (disposeStreamsListener) {
                        disposeStreamsListener();
                    }
                    peerStreamAnalyzers.forEach(v => v.analyzer.disconnect());

                    if (avatarRef.current) {
                        avatarRef.current.style.transform = '';
                    }
                };
            },
            [props.mediaSessionManager],
        );
        let peer = props.peers.find(p => p.id === speakingPeerId);
        return (
            <div key={'animtateing_wrapper'} className={animatedAvatarStyle} ref={avatarRef}>
                <UAvatar
                    size="small"
                    id={peer ? peer.user.id : props.fallback.id}
                    title={peer ? peer.user.name : props.fallback.title}
                    photo={peer ? peer.user.photo : props.fallback.picture}
                />
            </div>
        );
    },
);

const CallFloatingComponent = React.memo((props: { id: string; private: boolean }) => {
    const isMobile = useIsMobile();
    const [forceOpen, setForceOpen] = React.useState(false);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    useJsDrag(targetRef, containerRef, contentRef);
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();

    let client = useClient();
    let data = client.useWithoutLoaderConference({ id: props.id }, { fetchPolicy: 'network-only' });

    const onClick = React.useCallback(
        () => {
            if (isMobile) {
                if (containerRef.current) {
                    containerRef.current.style.opacity = forceOpen ? '1' : '0.56';
                    containerRef.current.style.maxWidth = forceOpen ? '360px' : '48px';
                }
                setForceOpen(!forceOpen);
            }
        },
        [forceOpen],
    );

    return (
        data && (
            <div className={FloatContainerClass} ref={containerRef} onClick={onClick}>
                <div style={{ display: 'flex', flexDirection: 'row' }} ref={contentRef}>
                    {callState.avatar && (
                        <div className={TargetClass} ref={targetRef}>
                            <Avatar
                                peers={data.conference.peers}
                                mediaSessionManager={calls.getMediaSession()}
                                fallback={{
                                    id: callState.avatar.id,
                                    title: callState.avatar.title,
                                    picture: callState.avatar.picture,
                                }}
                            />
                        </div>
                    )}
                    <UButton
                        flexShrink={0}
                        style="success"
                        text={callState.mute ? 'Unmute' : 'Mute'}
                        onClick={() => calls.setMute(!callState.mute)}
                        marginLeft={4}
                        marginRight={4}
                    />
                    <UButton
                        flexShrink={0}
                        style="success"
                        text={callState.status === 'connecting' ? 'Connecting' : 'Leave'}
                        onClick={() => calls.leaveCall()}
                        marginLeft={4}
                    />
                </div>
            </div>
        )
    );
});

const CallFloatingInner = React.memo((props: { id: string; private: boolean }) => {
    let client = useClient();
    let data = client.useWithoutLoaderConference({ id: props.id }, { fetchPolicy: 'network-only' });
    if (!data) {
        return null;
    }

    let res = (
        <>
            <TalkWatchComponent id={data.conference.id} />
            {data.conference.peers.length !== 0 && (
                <CallFloatingComponent id={props.id} private={props.private} />
            )}
        </>
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
