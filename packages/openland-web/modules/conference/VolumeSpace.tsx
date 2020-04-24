import * as React from 'react';
import { useJsDrag } from './CallFloating';
import { css, cx } from 'linaria';
import { Conference_conference_peers, MediaStreamVideoSource } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { VideoComponent } from './ScreenShareModal';
import { UAvatar, getPlaceholderColorRawById } from 'openland-web/components/unicorn/UAvatar';
import { bezierPath } from './smooth';
import { Path, MediaSessionVolumeSpace, SpaceObject, SimpleText } from 'openland-engines/media/MediaSessionVolumeSpace';
import { uploadcareOptions } from 'openland-y-utils/MediaLayout';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { makeStars } from './stars';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { VMMapMap } from 'openland-y-utils/mvvm/vm';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

let VolumeSpaceContainerStyle = css`
    width: 100%;
    height: 100vh;
    overflow: scroll;
`;

let VolumeSpaceInnerContainerStyle = css`
    position: relative;
    width: 3000px;
    height: 3000px;

    --bluePrint-bgColor: #1C1F29;
    --bluePrint-dotColor: #313545;
    --bluePrint-dot-size: 1px;
    --bluePrint-dot-space: 56px;

    // background-color: var(--bluePrint-bgColor);
    // background-size: var(--bluePrint-dot-space) var(--bluePrint-dot-space);
    // background-image: radial-gradient(circle, var(--bluePrint-dotColor) var(--bluePrint-dot-size), rgba(0, 0, 0, 0) var(--bluePrint-dot-size));

    background: radial-gradient(100% 100% at 50% 100%, #1C1F29 0%, #0D111A 100%),
        radial-gradient(100% 100% at 50% 100%, #181D29 0%, #090D14 100%), #1C2029;
`;
let VolumeSpaceDrawContainerStyle = css`
    transform: translate3d(0, 0, 0);
    position: absolute;
    width: 3000px;
    height: 3000px;
    top: 0;
    left: 0;
    pointer-events: none;
`;

let VolumeSpaceDrawListener = css`
    position: absolute;
    width: 3000px;
    height: 3000px;
    top: 0;
    left: 0;
`;
let AvatarItemStyle = css`
    will-change: transform;
   
    position: absolute;
    pointer-events: none;
`;
let AvatarMovableStyle = css`
    cursor: move;
    pointer-events: inherit;
    transition: none;
`;
let NoPointerEvents = css`
    pointer-events: none;
`;

let VolumeSpaceVideoStyle = css`
    position: relative;
    width: 72px;
    height: 72px;
    border-radius: 72px;
    background-color: var(--foregroundSecondary);
`;
let DrawControlsContainerStyle = css`
    will-change: transform;
   
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 0;
    top: 0;
    border-radius: 8px;
    background-color: var(--backgroundTertiary);
    opacity: 1;
    transition: opacity 200ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

let DrawControlsHidden = css`
    opacity: 0;
    pointer-events: none;
`;

let PeerImageContainer = css`
    will-change: transform;

    display: flex;
    overflow: visible;
    position: absolute;
    background-color: var(--backgroundTertiaryTrans);
`;

let ImageStyle = css`
    pointer-events: none;
    width: 100%;
    height: 100%;
`;
let ResizerAnchorStyle = css`
    pointer-events: inherit;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    cursor: se-resize;
    ::after{
        pointer-events: none;
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        bottom: 4px;
        right: 4px;
        background-color: var(--foregroundTertiary);
        border-radius: 4px;
        border: 2px solid  var(--backgroundTertiary)
    }
`;

let MoveAnchorStyle = css`
    pointer-events: inherit;
    position: absolute;
    width: 100%;
    height: 30px;
    top: 0;
    cursor: move;

    ::after{
        pointer-events: none;
        content: '';
        position: absolute;
        height: 4px;
        width: 16px;
        top: 4px;
       
        left: 0;
        right: 0;
        margin: auto;

        background-color: var(--foregroundTertiary);
        border-radius: 4px;
        border: 2px solid  var(--backgroundTertiary)
    }
`;

let PeerTextContainer = css`
    will-change: transform;

    border-radius: 8px;

    pointer-events: none;
    display: flex;
    overflow: visible;
    position: absolute;
`;

let PeerTextContainerEditable = css`
    pointer-events: inherit;
    background-color: var(--backgroundTertiaryTrans);
`;

let TextAreaStyle = css`
    padding: 8px;
    width: 100%;
    height: 100%;
    resize: none;
`;

let MenuEraseStyle = css`
    position: relative;
    overflow: hidden;
    border: solid 2px #ccc;
    border-radius: 24px;
    width: 24px;
    height: 24px;
    margin: 8px;
    :before, :after {
        position: absolute;
        content: ' ';
        left: 9px;
        top: -2px;
        height: 24px;
        width: 2px;
        background-color: red;
    }
    :before {
        transform: rotate(45deg);
    }
    :after {
        transform: rotate(-45deg);
    }
`;

let MenuEraseSelectedStyle = css`
  border: solid 2px black;
`;

let PointerStyle = css`
    width: 24px;
    height: 24px;
    border-radius: 24px;
    border: 2px solid #fff;
`;

let PointerContainerStyle = css`
    position: absolute;
    will-change: transform;

    color: #fff;
    pointer-events: none;
    text-align: center;
`;

let TransitionTransform = css`
    transition: transform linear 50ms;
`;
let isSafari = canUseDOM && ((window as any).safari !== undefined);

const VolumeSpaceAvatar = React.memo((props: Conference_conference_peers & { mediaSession: MediaSessionManager, selfRef?: React.RefObject<HTMLDivElement> }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    let [stream, setStream] = React.useState<AppMediaStream>();
    const [videoPaused, setVideoPaused] = React.useState<boolean | null>(true);
    const isLocal = props.id === props.mediaSession.getPeerId();
    React.useEffect(() => {
        if (isLocal) {
            return props.mediaSession.outVideoVM.listen(streams => {
                let st = streams.find(s => s?.source === 'camera');
                setStream(st);
                setVideoPaused(!!st?.blinded);
            });
        } else {

            // listen obj updates
            let d1 = props.mediaSession.volumeSpace.peersVM.listenId(props.id, `peer_${props.id}`, peer => {
                if (containerRef.current) {
                    let scale = peer.coords[2] / 2 + 0.5;
                    containerRef.current.style.transform = `translate(${peer.coords[0]}px, ${peer.coords[1]}px) scale3d(${scale}, ${scale}, ${scale})`;
                }
            });

            let d2 = props.mediaSession.peerVideoVM.listen(props.id, streams => {
                let st = [...streams.values()].find(s => s?.source === 'camera');
                setStream(st);
            });
            let d3 = props.mediaSession.peerStreamMediaStateVM.listen(props.id, s => {
                let camState = [...s.values()].find(c => c.videoSource === MediaStreamVideoSource.camera);
                if (camState) {
                    setVideoPaused(camState.videoPaused);
                }
            });
            return () => {
                d1();
                d2();
                d3();
            };
        }

    });
    let str = !videoPaused && (stream as AppUserMediaStreamWeb | undefined)?._stream;
    return (
        <div className={cx(AvatarItemStyle, !isSafari && !isLocal && TransitionTransform, isLocal && AvatarMovableStyle)} ref={props.selfRef || containerRef}>
            {!str &&
                <div className={NoPointerEvents}>
                    <UAvatar
                        size='x-large'
                        id={props.user.id}
                        title={props.user.name}
                        photo={props.user.photo}
                    />
                </div>
            }
            {str && <VideoComponent stream={str} cover={true} mirror={isLocal} videoClass={VolumeSpaceVideoStyle} borderRadius={72} />}
        </div>
    );
});

////
// IMAGES
////

const PeerImage = React.memo((props: { peerId: string, peer?: Conference_conference_peers, imageId: string, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const resizeRef = React.useRef<HTMLDivElement>(null);
    const moveRef = React.useRef<HTMLDivElement>(null);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const onImageMove = React.useCallback((coords: number[]) => {
        let img = props.space.imagesVM.getById(props.imageId);
        if (img) {
            props.space.update(img.id, { coords, type: 'image' });
        }
    }, []);

    const onImageResize = React.useCallback((coords: number[]) => {
        let img = props.space.imagesVM.getById(props.imageId);
        if (img) {
            let containerWH = [Math.max(50, coords[0] - img.coords[0]), Math.max(50, coords[1] - img.coords[1])];
            props.space.update(img.id, { containerWH, type: 'image' });
        }
    }, []);

    // worse access mgmt ever
    let canMove = (props.peer?.user.isYou || !props.peersRef.current.find(peer => peer.id === props.peerId));
    if (canMove) {
        useJsDrag(moveRef, ref, onImageMove, () => {
            let img = props.space.imagesVM.getById(props.imageId);
            return img?.coords;
        });
        useJsDrag(resizeRef, undefined, onImageResize, () => {
            let img = props.space.imagesVM.getById(props.imageId);
            if (img) {
                return [img.coords[0] + img.containerWH[0], img.coords[1] + img.containerWH[1]];
            }
            return undefined;
        });
    }
    React.useEffect(() => {

        return props.space.imagesVM.listenId(props.peerId, props.imageId, image => {
            if (ref.current && imgRef.current) {
                ref.current.style.transform = `translate(${image.coords[0]}px, ${image.coords[1]}px)`;

                const url = `https://ucarecdn.com/${image.fileId}/-/format/auto/-/`;

                const srcOps = uploadcareOptions({ width: image.imageWH[0], height: image.imageWH[1] });
                imgRef.current.style.background = `url("${url + srcOps[0]}")`;
                imgRef.current.style.backgroundSize = 'cover';
                imgRef.current.style.backgroundRepeat = 'no-repeat';
                imgRef.current.style.backgroundPosition = '50% 50%';
                // imgRef.current.src = url + srcOps[0];
                // imgRef.current.srcset = url + srcOps[1];

                ref.current.style.width = `${image.containerWH[0]}px`;
                ref.current.style.height = `${image.containerWH[1]}px`;
            }
        });
    }, []);
    const del = React.useCallback(() => {
        props.space.delete(props.imageId);
    }, []);
    return (
        <div ref={ref} onDoubleClick={del} className={PeerImageContainer}>
            <div className={ImageStyle} ref={imgRef} />
            {canMove && <div ref={resizeRef} className={ResizerAnchorStyle} />}
            {canMove && <div ref={moveRef} className={MoveAnchorStyle} />}
        </div>
    );
});

const PeerText = React.memo((props: { peerId: string, peer?: Conference_conference_peers, textId: string, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const moveRef = React.useRef<HTMLDivElement>(null);
    const textRef = React.useRef<HTMLTextAreaElement>(null);
    const resizeRef = React.useRef<HTMLDivElement>(null);
    const onMove = React.useCallback((coords: number[]) => {
        let t = props.space.simpleTextsVM.getById(props.textId);
        if (t) {
            props.space.update(t.id, { coords, type: 'simple_text' });
        }
    }, []);

    const onResize = React.useCallback((coords: number[]) => {
        let t = props.space.simpleTextsVM.getById(props.textId);
        if (t) {
            let containerWH = [Math.max(50, coords[0] - t.coords[0]), Math.max(50, coords[1] - t.coords[1])];
            props.space.update(t.id, { containerWH, type: 'simple_text' });
        }
    }, []);

    const onTextChanged = React.useCallback((ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        let t = props.space.simpleTextsVM.getById(props.textId);
        if (t) {
            props.space.update(t.id, { text: ev.target.value, type: 'simple_text' });
        }
    }, []);

    // worse access mgmt ever
    let canEdit = (props.peer?.user.isYou || !props.peersRef.current.find(peer => peer.id === props.peerId));
    if (canEdit) {
        useJsDrag(moveRef, ref, onMove, () => {
            let text = props.space.simpleTextsVM.getById(props.textId);
            return text?.coords;
        });
        useJsDrag(resizeRef, undefined, onResize, () => {
            let text = props.space.simpleTextsVM.getById(props.textId);
            if (text) {
                return [text.coords[0] + text.containerWH[0], text.coords[1] + text.containerWH[1]];
            }
            return undefined;
        });
    }
    React.useEffect(() => {
        return props.space.simpleTextsVM.listenId(props.peerId, props.textId, text => {
            if (ref.current && textRef.current) {
                textRef.current.value = text.text;
                ref.current.style.transform = `translate(${text.coords[0]}px, ${text.coords[1]}px)`;
                textRef.current.style.color = text.color;
                textRef.current.style.fontSize = `${text.fontSize}px`;

                ref.current.style.width = `${text.containerWH[0]}px`;
                ref.current.style.height = `${text.containerWH[1]}px`;
            }
        });
    }, []);
    const del = React.useCallback(() => {
        props.space.delete(props.textId);
    }, []);
    return (
        <div ref={ref} onDoubleClick={del} className={cx(PeerTextContainer, canEdit && PeerTextContainerEditable)}>
            <textarea className={TextAreaStyle} ref={textRef} onChange={onTextChanged} />
            {canEdit && <div ref={moveRef} className={MoveAnchorStyle} />}
            {canEdit && <div ref={resizeRef} className={ResizerAnchorStyle} />}
        </div>
    );
});

const PeerObjects = React.memo((props: { peerId: string, peer?: Conference_conference_peers, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [imageIds, setImageIds] = React.useState<string[]>([]);
    let [textIds, setTextsIds] = React.useState<string[]>([]);
    React.useEffect(() => {
        let d1 = props.space.imagesVM.listen(props.peerId, i => {
            setImageIds([...i.keys()]);
        });
        let d2 = props.space.simpleTextsVM.listen(props.peerId, i => {
            setTextsIds([...i.keys()]);
        });
        return () => {
            d1();
            d2();
        };
    }, []);
    useShortcuts({
        keys: ['Control', 't'], callback: () => {
            let text = new SimpleText(props.space.selfPointer?.coords || props.space.selfPeer.coords, [300, 100], props.space.colorVM.get() || '#fff', 40);
            props.space.addSpaceObject(text);
        }
    });
    return (
        <>
            {imageIds.map(e => <PeerImage key={`image_${e}`} peerId={props.peerId} peer={props.peer} imageId={e} space={props.space} peersRef={props.peersRef} />)}
            {textIds.map(e => <PeerText key={`text_${e}`} peerId={props.peerId} peer={props.peer} textId={e} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

const Objects = React.memo((props: { peers: Conference_conference_peers[], space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [peers, setPeers] = React.useState(new Map<string, Conference_conference_peers | undefined>());
    React.useEffect(() => {
        let ds: (() => void)[] = [];
        for (let k of Object.keys(props.space.storages)) {
            ds.push((props.space.storages[k] as VMMapMap<string, string, SpaceObject>).listenAllShallow((prs) => {
                setPeers(current => {
                    for (let pk of prs.keys()) {
                        current.set(pk, props.peers.find(p => p.id === pk));
                    }
                    return new Map(current);
                });
            }));
        }
        return (() => {
            ds.map(d => d());
        });
    }, []);
    return (
        <>
            {[...peers.entries()].map(([k, p]) => <PeerObjects key={k} peerId={k} peer={p} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

////
// DRAWINGS
////

const eraseDisatance = 80;
const PeerPath = React.memo((props: { peerId: string, peer?: Conference_conference_peers, pathId: string, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [strPath, setPath] = React.useState<string>();
    let [color, setColor] = React.useState<string>('white');
    React.useEffect(() => {
        let path: Path | undefined;
        // worse access mgmt ever
        let d1 = (props.peer?.user.isYou || !props.peersRef.current.find(p => p.id === props.peerId)) && props.space.eraseVM.listen(coords => {
            if (path?.path.find(p => Math.pow(Math.pow(coords[0] - p[0], 2) + Math.pow(coords[1] - p[1], 2), 0.5) < eraseDisatance)) {
                console.warn('del!!');
                props.space.delete(path.id);
            }
        });

        let d2 = props.space.pathsVM.listenId(props.peerId, props.pathId, p => {
            path = p;
            // TODO: smoth process only new points
            setPath(bezierPath(p.path));
            setColor(p.color);
        });
        return () => {
            if (d1) {
                d1();
            }
            d2();
        };
    }, []);
    return (
        <path key={props.pathId} d={strPath} strokeWidth={2} stroke={color} fill="transparent" />
    );
});

const PeerDrawing = React.memo((props: { peerId: string, peer?: Conference_conference_peers, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [pathIds, setPathIds] = React.useState<string[]>([]);
    React.useEffect(() => {
        return props.space.pathsVM.listen(props.peerId, p => {
            setPathIds([...p.keys()]);
        });
    }, []);
    return (
        <>
            {pathIds.map(e => <PeerPath key={e} peerId={props.peerId} peer={props.peer} pathId={e} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

const Drawings = React.memo((props: { peers: Conference_conference_peers[], space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [peers, setPeers] = React.useState(new Map<string, Conference_conference_peers | undefined>());
    React.useEffect(() => {
        return props.space.pathsVM.listenAllShallow(spacePeers => {
            let prs = new Map<string, Conference_conference_peers | undefined>();
            for (let k of spacePeers.keys()) {
                prs.set(k, props.peers.find(p => p.id === k));
            }
            setPeers(prs);
        });
    }, []);
    return (
        <>
            {[...peers.entries()].map(([k, p]) => <PeerDrawing key={k} peerId={k} peer={p} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

const Pointer = React.memo((props: { peer: Conference_conference_peers, space: MediaSessionVolumeSpace }) => {
    let ref = React.useRef<HTMLDivElement>(null);
    let pointerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        return props.space.pointerVM.listenId(props.peer.id, `pointer_${props.peer.id}`, p => {
            if (ref.current && pointerRef.current) {
                ref.current.style.position = 'absolute';
                ref.current.style.transform = `translate3d(${p.coords[0] - 12}px, ${p.coords[1] - 12}px, 0)`;

                pointerRef.current.style.backgroundColor = p.color || getPlaceholderColorRawById(props.peer.user.id).end;
            }
        });
    });
    return <div className={cx(PointerContainerStyle, !isSafari && TransitionTransform)} ref={ref}>
        <XView position="absolute" left={-200} right={-200} top={-24}  {...TextStyles.Detail} alignItems="center" justifyContent="center"><XView borderRadius={4} paddingHorizontal={3} paddingTop={2} paddingBottom={3} backgroundColor="var(--backgroundTertiaryTrans)">{props.peer.user.shortname || props.peer.user.name}</XView></XView>
        <div ref={pointerRef} className={PointerStyle} />
    </div>;
});

const colors = [
    ['#FF7919', '#3AA64C', '#3695D9'],
    ['#000', '#fff', 'erase'],
    ['#2458F2', '#4624F2', '#D9366C']
];
export const VolumeSpace = React.memo((props: { mediaSession: MediaSessionManager, peers: Conference_conference_peers[] }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    let innerContainerRef = React.useRef<HTMLDivElement>(null);
    let drawListenerRef = React.useRef<HTMLDivElement>(null);
    let selfRef = React.useRef<HTMLDivElement>(null);
    let eraseCircleRef = React.useRef<SVGCircleElement>(null);
    let nonDrawContentRef = React.useRef<HTMLDivElement>(null);
    let [action, setAction] = React.useState<'erase' | string>(getPlaceholderColorRawById(props.mediaSession.messenger.user.id).end);
    let [menu, setMenu] = React.useState(false);
    let menuRef = React.useRef<HTMLDivElement>(null);
    let peersRef = React.useRef(props.peers);
    peersRef.current = props.peers;

    useJsDrag(selfRef, selfRef, props.mediaSession.volumeSpace.moveSelf, props.mediaSession.volumeSpace.selfPeer.coords, undefined, [props.peers]);
    React.useLayoutEffect(() => {
        // scroll to center
        if (containerRef.current) {
            let centerx = (3000 - containerRef.current.clientWidth) / 2;
            let centery = (3000 - containerRef.current.clientHeight) / 2;
            console.warn(containerRef.current.clientWidth, containerRef.current.clientHeight);
            console.warn(centerx, centery);
            containerRef.current.scrollBy(centerx, centery);
        }

        // create stars
        if (innerContainerRef.current) {
            makeStars(innerContainerRef.current);
        }

    }, []);

    React.useEffect(() => {
        let onContext = (ev: any) => {
            ev.stopPropagation();
            ev.preventDefault();
            if (menuRef.current) {
                menuRef.current.style.transform = `translate(${ev.offsetX - menuRef.current.clientWidth / 2}px, ${ev.offsetY - menuRef.current.clientHeight / 2}px)`;
            }
            setMenu(true);
        };
        if (drawListenerRef.current) {
            drawListenerRef.current.oncontextmenu = onContext;
        }
    }, []);

    React.useEffect(() => {
        if ((action === 'erase') && drawListenerRef.current) {
            drawListenerRef.current.style.cursor = 'none';
        }
        let down = false;
        let path = new Path([], action);

        let lastScroll: number[] | undefined;
        let onScroll = () => {
            if (containerRef.current) {
                let currentScroll = [containerRef.current.scrollLeft, containerRef.current.scrollTop];
                let pointer = props.mediaSession.volumeSpace.selfPointer;
                if (lastScroll && pointer) {
                    let d = [currentScroll[0] - lastScroll[0], currentScroll[1] - lastScroll[1]];
                    props.mediaSession.volumeSpace.movePointer([pointer.coords[0] + d[0], pointer.coords[1] + d[1]]);
                }
                lastScroll = currentScroll;
            }
        };
        let onMove = (ev: any) => {
            let coords: number[] = [ev.offsetX, ev.offsetY];
            props.mediaSession.volumeSpace.movePointer(coords);
            if (action === 'erase') {
                // erase
                if (down) {
                    props.mediaSession.volumeSpace.erase(coords);
                }
                // move erase cursor
                if (eraseCircleRef.current) {
                    eraseCircleRef.current.style.transform = `translate(${ev.offsetX}px, ${ev.offsetY}px)`;
                }
            } else if (down) {
                // draw
                props.mediaSession.volumeSpace.incrementPath(path, [coords]);
            }
        };
        let onStart = (ev: any) => {
            // rpevent actions on right click
            if (ev.button !== 0) {
                return;
            }
            setMenu(false);

            down = true;
            path = new Path([], action);
            props.mediaSession.volumeSpace.addSpaceObject(path);
            // disable other object while drawing
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'none';
            }
        };

        let onStop = () => {
            if (path.path.length < 4) {
                props.mediaSession.volumeSpace.delete(path.id);
            }
            down = false;
            // enable other object after drawing
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'auto';
            }
        };
        if (drawListenerRef.current) {
            drawListenerRef.current.addEventListener('mousedown', onStart, { passive: true });
            drawListenerRef.current!.addEventListener('mousemove', onMove, { passive: true });
            drawListenerRef.current.addEventListener('mouseup', onStop, { passive: true });

        }
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', onScroll, { passive: true });
        }

        // disable other object while drawing
        if (action === 'erase') {
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'none';
            }
        }
        return () => {
            if (drawListenerRef.current) {
                drawListenerRef.current.removeEventListener('mousedown', onStart);
                drawListenerRef.current.removeEventListener('mousemove', onMove);
                drawListenerRef.current.removeEventListener('mouseup', onStop);
                drawListenerRef.current.style.cursor = 'auto';
            }
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', onScroll);
            }

            // enable other object after drawing
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'auto';
            }
        };

    }, [action]);

    let selectAction = React.useCallback((a: string) => {
        setAction(a);
        if (a !== 'erase') {
            props.mediaSession.volumeSpace.setColor(a);
        }
        setMenu(false);
    }, []);

    return (
        <div className={VolumeSpaceContainerStyle} ref={containerRef}>

            <div className={VolumeSpaceInnerContainerStyle} ref={innerContainerRef}>

                <div className={VolumeSpaceDrawListener} ref={drawListenerRef} />
                <div ref={nonDrawContentRef}>
                    <Objects peers={props.peers} space={props.mediaSession.volumeSpace} peersRef={peersRef} />
                    <svg viewBox={'0 0 3000 3000'} className={VolumeSpaceDrawContainerStyle}>
                        <Drawings peers={props.peers} space={props.mediaSession.volumeSpace} peersRef={peersRef} />
                        {action === 'erase' && <circle cx={0} cy={0} r={eraseDisatance} stroke="white" strokeWidth={3} ref={eraseCircleRef} fill="transparent" />}
                    </svg>

                    {props.peers.map(p => <VolumeSpaceAvatar key={p.id} {...p} mediaSession={props.mediaSession} selfRef={p.id === props.mediaSession.getPeerId() ? selfRef : undefined} />)}
                    {props.peers.filter(p => p.id !== props.mediaSession.getPeerId()).map(p => <Pointer key={'pointer_' + p.id} space={props.mediaSession.volumeSpace} peer={p} />)}
                </div>
                <div className={cx(DrawControlsContainerStyle, !menu && DrawControlsHidden)} ref={menuRef}>
                    {colors.map((pack, i) =>
                        <XView key={i} flexDirection="row">
                            {pack.map(c =>
                                c === 'erase' ?
                                    <div className={cx(MenuEraseStyle, action === 'erase' && MenuEraseSelectedStyle)} onClick={() => selectAction(c)} /> :
                                    <XView key={c} backgroundColor={c} width={24} height={24} borderRadius={24} borderColor={c === action ? 'black' : '#ccc'} borderWidth={2} margin={8} onClick={() => selectAction(c)} />)}
                        </XView>
                    )}
                </div>
            </div>

        </div >
    );
});