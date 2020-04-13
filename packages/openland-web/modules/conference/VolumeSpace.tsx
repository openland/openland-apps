import * as React from 'react';
import { useJsDrag } from './CallFloating';
import { css, cx } from 'linaria';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { VideoComponent } from './ScreenShareModal';
import { UAvatar, getPlaceholderColorRawById } from 'openland-web/components/unicorn/UAvatar';
import { bezierPath } from './smooth';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { Path, MediaSessionVolumeSpace } from 'openland-engines/media/MediaSessionVolumeSpace';
import { uploadcareOptions } from 'openland-y-utils/MediaLayout';

let VolumeSpaceContainerStyle = css`
    width: 100%;
    height: 100vh;
    overflow: scroll;
`;

let VolumeSpaceInnerContainerStyle = css`
    position: relative;
    width: 3000px;
    height: 3000px;
`;
let VolumeSpaceDrawContainerStyle = css`
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
let VolumeSpaceItemStyle = css`
    position: absolute;
`;
let VolumeSpaceVideoStyle = css`
    position: relative;
    width: 72px;
    height: 72px;
    border-radius: 72px;
    background-color: var(--foregroundSecondary);
`;
let DrawControlsContainerStyle = css`
    position: absolute;
    bottom: 16px;
    right: 16px;
    width: 160px;
    border-radius: 8px;
    background-color: var(--backgroundTertiary);
    transition: bottom 200ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

let DrawControlsHidden = css`
    bottom: -200px;
`;

let PeerImageContainer = css`
    display: flex;
    overflow: visible;
    position: absolute;
`;

let NoPinterEvents = css`
    pointer-events: none;
`;

let MovableImageContainerStyle = css`
    cursor: move;
    background-color: var(--backgroundTertiaryTrans);
`;

let ImageStyle = css`
    /* object-fit: contain; */
    width: 100%;
    height: 100%;

`;
// style={{ position: 'absolute', width: 20, height: 20, bottom: 0, right: 0,  }}
let ResizerAnchorStyle = css`
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    cursor: se-resize;
`;

const VolumeSpaceAvatar = React.memo((props: Conference_conference_peers & { mediaSession: MediaSessionManager, selfRef?: React.RefObject<HTMLDivElement> }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    let [stream, setStream] = React.useState<MediaStream>();
    const isLocal = props.id === props.mediaSession.getPeerId();
    React.useEffect(() => {
        if (isLocal) {
            return props.mediaSession.outVideoVM.listen(streams => {
                let st = streams.find(s => s?.source === 'camera');
                setStream((st as AppUserMediaStreamWeb)?._stream);
            });
        } else {

            // listen obj updates
            let d1 = props.mediaSession.volumeSpace.peersVM.listen(props.id, peer => {
                if (containerRef.current) {
                    let scale = peer.coords[2] / 2 + 0.5;
                    containerRef.current.style.transform = `translate(${peer.coords[0]}px, ${peer.coords[1]}px) scale(${scale}, ${scale})`;
                }
            });

            let d2 = props.mediaSession.peerVideoVM.listen(props.id, streams => {
                let st = [...streams.values()].find(s => s?.source === 'camera');
                setStream((st as AppUserMediaStreamWeb)?._stream);
            });
            return () => {
                d1();
                d2();
            };
        }

    });
    return (
        <div className={VolumeSpaceItemStyle} ref={props.selfRef || containerRef}>
            {!stream &&
                <UAvatar
                    size={stream ? 'large' : 'x-large'}
                    id={props.user.id}
                    title={props.user.name}
                    photo={props.user.photo}
                />
            }
            {stream && <VideoComponent stream={stream} cover={true} mirror={isLocal} videoClass={VolumeSpaceVideoStyle} borderRadius={72} />}
        </div>
    );
});

const PeerPath = React.memo((props: { peer: Conference_conference_peers, pathId: string, space: MediaSessionVolumeSpace }) => {
    let [path, setPath] = React.useState<string>();
    let color = React.useMemo(() => getPlaceholderColorRawById(props.peer.user.id), []);
    React.useEffect(() => {
        return props.space.pathsVM.listenId(props.peer.id, props.pathId, p => setPath(p.path));
    }, []);
    return (
        <path key={props.pathId} d={path} strokeWidth={2} stroke={color.end} fill="transparent" />
    );
});

const PeerImage = React.memo((props: { peer: Conference_conference_peers, imageId: string, space: MediaSessionVolumeSpace }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const resizeRef = React.useRef<HTMLDivElement>(null);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const onImageMove = React.useCallback((coords: number[]) => {
        let img = props.space.selfImagesVM.get(props.imageId);
        if (img) {
            img.coords = coords;
            props.space.updateImage(img);
        }
    }, []);

    const onImageResize = React.useCallback((coords: number[]) => {
        let img = props.space.selfImagesVM.get(props.imageId);
        if (img) {
            let targetWh = [Math.max(50, coords[0] - img.coords[0]), Math.max(50, coords[1] - img.coords[1])];
            img.containerWH = targetWh;
            props.space.updateImage(img);
        }
    }, []);

    let canMove = props.space.selfImagesVM.get(props.imageId);
    if (canMove) {
        let img = props.space.selfImagesVM.get(props.imageId);
        let coords = img?.coords;
        useJsDrag(ref, ref, onImageMove, coords);
        useJsDrag(resizeRef, undefined, onImageResize, () => {
            if (img) {
                return [img.coords[0] + img.containerWH[0], img.coords[1] + img.containerWH[1]];
            }
            return undefined;
        });
    }
    React.useEffect(() => {

        return props.space.imagesVM.listenId(props.peer.id, props.imageId, image => {
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
        props.space.imagesVM.deleteVal(props.peer.id, props.imageId);
        props.space.selfImagesVM.delete(props.imageId);
    }, []);
    return (
        <div ref={ref} onDoubleClick={del} className={cx(PeerImageContainer, canMove ? MovableImageContainerStyle : NoPinterEvents)}>
            <div className={ImageStyle} ref={imgRef} />
            <div ref={resizeRef} className={ResizerAnchorStyle} />
        </div>
    );
});

const PeerDraw = React.memo((props: { peer: Conference_conference_peers, space: MediaSessionVolumeSpace }) => {
    let [pathIds, setPathIds] = React.useState<string[]>([]);
    React.useEffect(() => {
        return props.space.pathsVM.listen(props.peer.id, p => {
            setPathIds([...p.keys()]);
        });
    }, []);
    return (
        <>
            {pathIds.map(e => <PeerPath key={e} peer={props.peer} pathId={e} space={props.space} />)}
        </>
    );
});

const PeerObjects = React.memo((props: { peer: Conference_conference_peers, space: MediaSessionVolumeSpace }) => {
    let [imageIds, setImageIds] = React.useState<string[]>([]);
    React.useEffect(() => {
        return props.space.imagesVM.listen(props.peer.id, i => {
            setImageIds([...i.keys()]);
        });
    }, []);
    return (
        <>
            {imageIds.map(e => <PeerImage key={e} peer={props.peer} imageId={e} space={props.space} />)}
        </>
    );
});
const eraseDisatance = 10;
export const VolumeSpace = React.memo((props: { mediaSession: MediaSessionManager, peers: Conference_conference_peers[] }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    let innerContainerRef = React.useRef<HTMLDivElement>(null);
    let drawListenerRef = React.useRef<HTMLDivElement>(null);
    let selfRef = React.useRef<HTMLDivElement>(null);
    let eraseCircleRef = React.useRef<SVGCircleElement>(null);
    let nonDrawContentRef = React.useRef<HTMLDivElement>(null);
    let [controls, setControls] = React.useState(false);
    let [erase, setErase] = React.useState(false);

    useJsDrag(selfRef, selfRef, props.mediaSession.volumeSpace.moveSelf, props.mediaSession.volumeSpace.selfPeer.coords, undefined, undefined, undefined, undefined, undefined, [props.peers]);
    React.useEffect(() => {
        // scroll to center
        if (containerRef.current) {
            let centerx = (3000 - containerRef.current.clientWidth) / 2;
            let centery = (3000 - containerRef.current.clientHeight) / 2;
            console.warn(containerRef.current.clientWidth, containerRef.current.clientHeight);
            console.warn(centerx, centery);
            containerRef.current.scrollBy(centerx, centery);
        }
    }, []);

    React.useEffect(() => {
        // draw

        let down = false;
        let path: number[][] = [];
        let pathObj = new Path();
        let onMove = (ev: any) => {

            let coords = [ev.offsetX, ev.offsetY];
            if (erase) {
                // erase
                if (down) {
                    for (let pth of props.mediaSession.volumeSpace.selfPathsVM.values()) {
                        if (pth.rawPath && (pth.rawPath.find(p => Math.pow(Math.pow(coords[0] - p[0], 2) + Math.pow(coords[1] - p[1], 2), 0.5) < eraseDisatance))) {
                            props.mediaSession.volumeSpace.selfPathsVM.delete(pth.id);
                            props.mediaSession.volumeSpace.pathsVM.deleteVal(props.mediaSession.getPeerId(), pth.id);
                        }
                    }
                }
                // move erase cursor
                if (eraseCircleRef.current) {
                    eraseCircleRef.current.style.transform = `translate(${ev.offsetX}px, ${ev.offsetY}px)`;
                }
            } else if (down) {
                // draw
                path.push(coords);
                let strPath = bezierPath(path);
                pathObj.path = strPath;
                pathObj.rawPath = path;
                props.mediaSession.volumeSpace.updatePath(pathObj);
            }
            return true;
        };
        let onStart = () => {
            if (!erase) {
                drawListenerRef.current!.addEventListener('mousemove', onMove);
            }
            pathObj = new Path();
            path = [];
            down = true;
            // disable other object while drawing
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'none';
            }
        };

        let onStop = () => {
            if (!erase) {
                drawListenerRef.current!.removeEventListener('mousemove', onMove);
            } else {
                setErase(false);
            }
            down = false;
            // enable other object after drawing
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'auto';
            }
        };
        if (drawListenerRef.current) {
            drawListenerRef.current.addEventListener('mousedown', onStart);
            if (erase) {
                drawListenerRef.current!.addEventListener('mousemove', onMove);
            }
            // drawListenerRef.current.addEventListener('mouseout', onStop);
            // drawListenerRef.current.addEventListener('mouseleave', onStop);
            drawListenerRef.current.addEventListener('mouseup', onStop);
        }

        // listen local drawings
        let d1 = props.mediaSession.volumeSpace.selfPathsVM.listenAll(all => setControls(!!all.size));

        // disable other object while drawing
        if (erase) {
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'none';
            }
        }
        return () => {
            drawListenerRef.current!.removeEventListener('mousedown', onStart);
            drawListenerRef.current!.removeEventListener('mousemove', onMove);
            drawListenerRef.current!.removeEventListener('mouseup', onStop);
            d1();
            // enable other object after drawing
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'auto';
            }
        };

    }, [erase]);
    return (
        <div className={VolumeSpaceContainerStyle} ref={containerRef}>

            <div className={VolumeSpaceInnerContainerStyle} ref={innerContainerRef}>

                <div className={VolumeSpaceDrawListener} ref={drawListenerRef} />
                <div ref={nonDrawContentRef}>
                    {props.peers.map(p => <PeerObjects key={p.id} peer={p} space={props.mediaSession.volumeSpace} />)}
                    <svg viewBox={'0 0 3000 3000'} className={VolumeSpaceDrawContainerStyle}>
                        {props.peers.map(p => <PeerDraw key={p.id} peer={p} space={props.mediaSession.volumeSpace} />)}
                        {erase && <circle cx={0} cy={0} r={eraseDisatance} stroke="black" strokeWidth={3} ref={eraseCircleRef} fill="transparent" />}
                    </svg>

                    {props.peers.map(p => <VolumeSpaceAvatar key={p.id} {...p} mediaSession={props.mediaSession} selfRef={p.id === props.mediaSession.getPeerId() ? selfRef : undefined} />)}
                </div>
            </div>
            <div className={cx(DrawControlsContainerStyle, !controls && DrawControlsHidden)}>
                <UCheckbox onChange={setErase} label="Erase" checked={erase} asSwitcher={true} />
            </div>
        </div >
    );
});