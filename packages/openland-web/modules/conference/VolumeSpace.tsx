import * as React from 'react';
import { useJsDrag } from './CallFloating';
import { css, cx } from 'linaria';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { getPlaceholderColorRawById } from 'openland-web/components/unicorn/UAvatar';
import { bezierPath, pointsDistance, pointNearLine } from './space-utils';
import { Path, MediaSessionVolumeSpace, SpaceObject, SimpleText, Image } from 'openland-engines/legacy/MediaSessionVolumeSpace';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { makeStars } from './stars';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { VMMapMap } from 'openland-y-utils/mvvm/vm';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { SpaceControls } from './SpaceControls';
import { showAttachConfirm } from 'openland-web/fragments/chat/components/AttachConfirm';
import { CONTROLS_WIDTH } from './CallControls';
import { UploadingFile, LocalImage } from 'openland-engines/messenger/types';
import { VolumeSpaceAvatar } from './VolumeSpaceAvatar';
import { PeerObjects, TEXT_MIN_HEIGHT } from './PeerObjects';
import IconCursor from 'openland-icons/s/ic-cursor-space-24.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

let VolumeSpaceContainerStyle = css`
    width: 100%;
    height: 100vh;
    overflow: scroll;
`;

let VolumeSpaceInnerContainerStyle = css`
    position: relative;
    width: 3000px;
    height: 3000px;
    z-index: 1;

    --bluePrint-bgColor: #1C1F29;
    --bluePrint-dotColor: #313545;
    --bluePrint-dot-size: 1px;
    --bluePrint-dot-space: 56px;

    // background-color: var(--bluePrint-bgColor);
    // background-size: var(--bluePrint-dot-space) var(--bluePrint-dot-space);
    // background-image: radial-gradient(circle, var(--bluePrint-dotColor) var(--bluePrint-dot-size), rgba(0, 0, 0, 0) var(--bluePrint-dot-size));
`;
let VolumeSpaceInnerContainerBackground = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: var(--spaceBackgroundPrimary);
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

let PointerStyle = css`
    position: absolute;
    top: -2px;
    left: -2px;
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

type CursorState = {
    action: 'none' | 'draw' | 'erase',
    color?: string,
};

////
// IMAGES
////

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

const PeerPath = React.memo((props: { peerId: string, peer?: Conference_conference_peers, pathId: string, eraseDistance: number, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [strPath, setPath] = React.useState<string>();
    let [color, setColor] = React.useState<string>('white');
    let [size, setSize] = React.useState<number>(2);
    let eraseDistanceRef = React.useRef(props.eraseDistance);
    // let [points, setPoints] = React.useState<number[][]>([]);

    React.useEffect(() => {
        eraseDistanceRef.current = props.eraseDistance;
    }, [props.eraseDistance]);

    React.useEffect(() => {
        let path: Path | undefined;
        // worse access mgmt ever
        let d1 = (props.peer?.user.isYou || !props.peersRef.current.find(p => p.id === props.peerId)) && props.space.eraseVM.listen(coords => {
            if (path?.path.find((p, i, points) => {
                const nextP = points[i + 1];
                if (i === 0 && pointsDistance(p, coords) < eraseDistanceRef.current) {
                    return true;
                }
                if (nextP) {
                    return pointNearLine(coords, [p, nextP], eraseDistanceRef.current);
                } else {
                    return pointsDistance(p, coords) < eraseDistanceRef.current;
                }
            })) {
                console.warn('del!!');
                props.space.delete(path.id);
            }
        });

        let d2 = props.space.pathsVM.listenId(props.peerId, props.pathId, p => {
            path = p;
            // TODO: smoth process only new points
            setPath(bezierPath(p.path));
            // setPoints(p.path);
            setColor(p.color);
            setSize(p.size);
        });
        return () => {
            if (d1) {
                d1();
            }
            d2();
        };
    }, []);
    return (
        <>
            <path key={props.pathId} d={strPath} strokeWidth={size} stroke={color} stroke-linecap="round" fill="transparent" />
            {/* {points.map(x => <circle key={x[0] + x[1]} cx={x[0]} cy={x[1]} r={2} fill="red" />)} */}
        </>
    );
});

const PeerDrawing = React.memo((props: { peerId: string, peer?: Conference_conference_peers, eraseDistance: number, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [pathIds, setPathIds] = React.useState<string[]>([]);
    React.useEffect(() => {
        return props.space.pathsVM.listen(props.peerId, p => {
            setPathIds([...p.keys()]);
        });
    }, []);
    return (
        <>
            {pathIds.map(e => <PeerPath key={e} peerId={props.peerId} peer={props.peer} pathId={e} eraseDistance={props.eraseDistance} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

const Drawings = React.memo((props: { peers: Conference_conference_peers[], space: MediaSessionVolumeSpace, eraseDistance: number, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
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
            {[...peers.entries()].map(([k, p]) => <PeerDrawing key={k} peerId={k} peer={p} eraseDistance={props.eraseDistance} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

const Pointer = React.memo((props: { peer: Conference_conference_peers, space: MediaSessionVolumeSpace }) => {
    let ref = React.useRef<HTMLDivElement>(null);
    let [pointerColor, setPointerColor] = React.useState<string | null>(null);
    React.useEffect(() => {
        return props.space.pointerVM.listenId(props.peer.id, `pointer_${props.peer.id}`, p => {
            if (ref.current) {
                ref.current.style.position = 'absolute';
                ref.current.style.transform = `translate3d(${p.coords[0]}px, ${p.coords[1]}px, 0)`;

                setPointerColor(p.color || getPlaceholderColorRawById(props.peer.user.id).end);
            }
        });
    }, []);

    return (
        <div className={cx(PointerContainerStyle, !isSafari && TransitionTransform)} ref={ref}>
            {pointerColor && (
                <>
                    <XView
                        position="absolute"
                        top={22}
                        left={22}
                        borderRadius={8}
                        paddingHorizontal={8}
                        paddingVertical={2}
                        backgroundColor={pointerColor}
                        {...TextStyles.Label1}
                        color="var(--foregroundContrast)"
                    >
                        {props.peer.user.firstName}
                    </XView>
                    <UIcon icon={<IconCursor />} color={pointerColor} className={PointerStyle} />
                </>
            )}
        </div>
    );
});

export const VolumeSpace = React.memo((props: { mediaSession: MediaSessionManager, peers: Conference_conference_peers[] }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    let innerContainerRef = React.useRef<HTMLDivElement>(null);
    let drawListenerRef = React.useRef<HTMLDivElement>(null);
    let selfRef = React.useRef<HTMLDivElement>(null);
    let eraseCircleRef = React.useRef<SVGCircleElement>(null);
    let nonDrawContentRef = React.useRef<HTMLDivElement>(null);
    let [penSize, setPenSize] = React.useState(2);
    let penSizeRef = React.useRef<number>(2);
    let eraseDistance = penSize * 5;
    let peersRef = React.useRef(props.peers);
    peersRef.current = props.peers;
    let state = props.mediaSession.state.useValue();
    let [cursorState, setCursorState] = React.useState<CursorState>({ action: 'none' });

    let onMoveSelfStart = React.useCallback(() => {
        if (nonDrawContentRef.current) {
            nonDrawContentRef.current.style.pointerEvents = 'none';
        }
    }, []);

    let onMoveSelfStop = React.useCallback(() => {
        if (nonDrawContentRef.current) {
            nonDrawContentRef.current.style.pointerEvents = 'auto';
        }
    }, []);

    React.useEffect(() => {
        penSizeRef.current = penSize;
    }, [penSize]);

    useJsDrag(selfRef, { containerRef: selfRef, onMove: props.mediaSession.space.moveSelf, onStart: onMoveSelfStart, onStop: onMoveSelfStop, savedCallback: props.mediaSession.space.selfPeer?.coords }, [props.peers, state.sender.id]);
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
        let down = false;
        let path = new Path([], cursorState.action, penSizeRef.current);

        let lastScroll: number[] | undefined;
        let onScroll = () => {
            if (containerRef.current) {
                let currentScroll = [containerRef.current.scrollLeft, containerRef.current.scrollTop];
                let pointer = props.mediaSession.space.selfPointer;
                if (lastScroll && pointer) {
                    let d = [currentScroll[0] - lastScroll[0], currentScroll[1] - lastScroll[1]];
                    props.mediaSession.space.movePointer([pointer.coords[0] + d[0], pointer.coords[1] + d[1]]);
                }
                lastScroll = currentScroll;
            }
        };
        let onMove = (ev: MouseEvent) => {
            let coords: number[] = [ev.offsetX, ev.offsetY];
            props.mediaSession.space.movePointer(coords);
            if (cursorState.action === 'erase') {
                // erase
                if (down) {
                    props.mediaSession.space.erase(coords);
                }
                // move erase cursor
                if (eraseCircleRef.current) {
                    eraseCircleRef.current.style.transform = `translate(${ev.offsetX}px, ${ev.offsetY}px)`;
                }
            } else if (down && cursorState.action === 'draw') {
                // draw
                props.mediaSession.space.incrementPath(path, [coords]);
            }
        };
        let onStart = (ev: MouseEvent) => {
            // pevent actions on right click
            if (ev.button !== 0) {
                return;
            }

            down = true;
            if (cursorState.action === 'draw' && cursorState.color) {
                path = new Path([], cursorState.color, penSizeRef.current);
                props.mediaSession.space.addSpaceObject(path);
                // disable other object while drawing
                if (nonDrawContentRef.current) {
                    nonDrawContentRef.current.style.pointerEvents = 'none';
                }
            }
        };

        let onStop = () => {
            if (path.path.length < 4) {
                props.mediaSession.space.delete(path.id);
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
        if (cursorState.action === 'erase') {
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

    }, [cursorState]);

    let selectColor = React.useCallback((color: string) => {
        setCursorState({ action: 'draw', color });
        props.mediaSession.space.setColor(color);
    }, [props.mediaSession.space]);
    let selectPen = React.useCallback(() => {
        let color = props.mediaSession.space.colorVM.get();
        setCursorState({ action: 'draw', color });
    }, [props.mediaSession.space.colorVM.get()]);
    let closePen = React.useCallback(() => {
        setCursorState({ action: 'none' });
    }, []);
    let selectErase = React.useCallback(() => {
        setCursorState({ action: 'erase' });
    }, []);

    const addedObjectsRef = React.useRef<number[][]>([]);
    let getObjCoords = ({ width, height }: { width: number, height: number }): [number, number] => {
        if (!containerRef.current) {
            return [1500, 1500];
        }
        const bottomControlsHeight = 56;
        const { scrollTop, scrollLeft, clientWidth, clientHeight } = containerRef.current;
        let x = scrollLeft + (clientWidth - CONTROLS_WIDTH) / 2 - width / 2 + 9;
        let y = scrollTop + (clientHeight - bottomControlsHeight) / 2 - height / 2;
        while (addedObjectsRef.current.some(o => o[0] === x && o[1] === y)) {
            x += height / 2;
            y += height / 2;
        }
        return [x, y];
    };
    let addText = React.useCallback(() => {
        const width = 240;
        const height = TEXT_MIN_HEIGHT;
        let coords = getObjCoords({ width, height });
        let text = new SimpleText(coords, [width, height], '#fff', 20);
        props.mediaSession.space.addSpaceObject(text);
        addedObjectsRef.current.push(coords);
    }, []);

    let addImage = React.useCallback(({ file, localImage }: { file: UploadingFile | undefined, localImage?: LocalImage | undefined }) => {
        if (!localImage || !containerRef.current) {
            return;
        }
        let { width, height } = layoutMedia(localImage.width, localImage.height, 800, 800, 100, 100);
        let coords = getObjCoords({ width, height });
        let image = new Image(undefined, coords, [width, height], [width, height]);
        props.mediaSession.space.addImage(file, image);
    }, []);

    let addImages = React.useCallback((files: File[]) => {
        showAttachConfirm(files, res => res.map(addImage));
    }, []);

    useShortcuts({ keys: ['Control', 't'], callback: addText });

    return (
        <div className={VolumeSpaceContainerStyle} ref={containerRef}>

            <div className={VolumeSpaceInnerContainerStyle} ref={innerContainerRef}>
                <div className={VolumeSpaceInnerContainerBackground} />
                <div className={VolumeSpaceDrawListener} ref={drawListenerRef} />
                <div ref={nonDrawContentRef}>
                    <Objects peers={props.peers} space={props.mediaSession.space} peersRef={peersRef} />
                    <svg viewBox={'0 0 3000 3000'} className={VolumeSpaceDrawContainerStyle}>
                        <Drawings peers={props.peers} space={props.mediaSession.space} peersRef={peersRef} eraseDistance={eraseDistance} />
                        {cursorState.action === 'erase' && <circle cx={0} cy={0} r={eraseDistance} stroke="white" strokeWidth={1} ref={eraseCircleRef} fill="transparent" />}
                    </svg>

                    {props.peers.map(p => {
                        let videoTrack: AppMediaStreamTrack | null = null;
                        if (p.id === state.sender.id) {
                            videoTrack = state.sender.videoEnabled ? state.sender.videoTrack : null;
                        } else {
                            videoTrack = state.receivers[p.id]?.videoTrack || null;
                        }
                        return <VolumeSpaceAvatar
                            key={p.id}
                            {...p}
                            videoTrack={videoTrack}
                            space={props.mediaSession.space}
                            selfRef={p.id === state.sender.id ? selfRef : undefined}
                            peersCount={props.peers.length}
                        />;
                    })}
                    {props.peers.filter(p => p.id !== state.sender.id).map(p => <Pointer key={'pointer_' + p.id} space={props.mediaSession.space} peer={p} />)}
                </div>
                <SpaceControls
                    isErasing={cursorState.action === 'erase'}
                    color={cursorState.color}
                    initialPenSize={penSize}
                    onPenSelect={selectPen}
                    onPenClose={closePen}
                    onColorChange={selectColor}
                    onEraseClick={selectErase}
                    onTextClick={addText}
                    onImageClick={addImages}
                    onPenSizeChange={setPenSize}
                />
            </div>

        </div >
    );
});