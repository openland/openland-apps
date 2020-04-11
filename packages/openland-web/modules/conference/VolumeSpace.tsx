import * as React from 'react';
import { useJsDrag } from './CallFloating';
import { css } from 'linaria';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { VideoComponent } from './ScreenShareModal';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import uuid from 'uuid';
import { bezierPath } from './smooth';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';

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
`;

const VolumeSpaceAvatar = React.memo((props: Conference_conference_peers & { mediaSession: MediaSessionManager }) => {
    let [stream, setStream] = React.useState<MediaStream>();
    const isLocal = props.id === props.mediaSession.getPeerId();
    React.useEffect(() => {
        if (isLocal) {
            return props.mediaSession.outVideoVM.listen(streams => {
                let st = streams.find(s => s?.source === 'camera');
                setStream((st as AppUserMediaStreamWeb)?._stream);
            });
        } else {
            return props.mediaSession.peerVideoVM.listen(props.id, streams => {
                let st = [...streams.values()].find(s => s?.source === 'camera');
                setStream((st as AppUserMediaStreamWeb)?._stream);
            });
        }

    });
    return (
        <>
            {stream && <VideoComponent stream={stream} cover={true} mirror={isLocal} videoClass={VolumeSpaceVideoStyle} borderRadius={72} />}
            {!stream &&
                <UAvatar
                    size={stream ? 'large' : 'x-large'}
                    id={props.user.id}
                    title={props.user.name}
                    photo={props.user.photo}
                />
            }
        </>
    );
});
export const VolumeSpace = React.memo((props: { mediaSession: MediaSessionManager, peers: Conference_conference_peers[] }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    let innerContainerRef = React.useRef<HTMLDivElement>(null);
    let drawListenerRef = React.useRef<HTMLDivElement>(null);
    let selfRef = React.useRef<HTMLDivElement>(null);
    let [selfPaths, setSelfPaths] = React.useState<Map<string, string>>(new Map());
    let [erase, setEraseInner] = React.useState(false);
    let eraseRef = React.useRef(false);
    let setErase = React.useCallback((er: boolean) => {
        eraseRef.current = er;
        setEraseInner(er);
    }, []);
    useJsDrag(selfRef, selfRef, props.mediaSession.volumeSpace.onSelfMoved, props.mediaSession.volumeSpace.getSelfCoords(), undefined, undefined, undefined, undefined, [props.peers]);
    React.useEffect(() => {
        // scroll to center
        if (containerRef.current) {
            let centerx = (3000 - containerRef.current.clientWidth) / 2;
            let centery = (3000 - containerRef.current.clientHeight) / 2;
            console.warn(containerRef.current.clientWidth, containerRef.current.clientHeight);
            console.warn(centerx, centery);
            containerRef.current.scrollBy(centerx, centery);
        }
        // listen obj updates
        return props.mediaSession.volumeSpace.listenPeers(peers => {
            if (innerContainerRef.current) {
                for (let i = 0; i < innerContainerRef.current.childElementCount; i++) {
                    let c = innerContainerRef.current.children.item(i);
                    let peer = peers[c?.id || -1];
                    if (c && peer) {
                        let scale = peer[2] / 2 + 0.5;
                        (c as any).style.transform = `translate(${peer[0]}px, ${peer[1]}px) scale(${scale}, ${scale})`;
                    }
                }
            }
        });
    }, []);

    React.useEffect(() => {
        // draw
        let drawObjs = new Map<string, string>();
        let drawPaths = new Map<string, number[][]>();

        let down = false;
        let path: number[][] = [];
        let id = '';
        const eraseDisatance = 10;
        let onMove = (ev: any) => {
            if (!down) {
                return;
            }
            let coords = [ev.offsetX, ev.offsetY];
            if (eraseRef.current) {
                let deleted = false;
                for (let [key, pth] of drawPaths) {
                    if (pth.find(p => Math.pow(Math.pow(coords[0] - p[0], 2) + Math.pow(coords[1] - p[1], 2), 0.5) < eraseDisatance)) {
                        drawPaths.delete(key);
                        drawObjs.delete(key);
                        deleted = true;
                    }
                }
                setSelfPaths(new Map(drawObjs));
            } else {
                path.push(coords);
                drawObjs.set(id, bezierPath(path));
                drawPaths.set(id, path);
                setSelfPaths(new Map(drawObjs));
            }

        };
        let onStart = () => {
            drawListenerRef.current!.addEventListener('mousemove', onMove);
            id = `${props.mediaSession.getPeerId()}_path_${uuid()}`;
            path = [];
            down = true;
        };

        let onStop = () => {
            drawListenerRef.current!.removeEventListener('mousemove', onMove);
            down = false;
        };
        if (drawListenerRef.current) {
            drawListenerRef.current.addEventListener('mousedown', onStart);

            // drawListenerRef.current.addEventListener('mouseout', onStop);
            // drawListenerRef.current.addEventListener('mouseleave', onStop);
            drawListenerRef.current.addEventListener('mouseup', onStop);
        }

    }, []);
    return (
        <div className={VolumeSpaceContainerStyle} ref={containerRef}>

            <div className={VolumeSpaceInnerContainerStyle} ref={innerContainerRef}>

                <div className={VolumeSpaceDrawListener} ref={drawListenerRef} />
                {props.peers.map(p =>
                    <div className={VolumeSpaceItemStyle} key={p.id} id={p.id} ref={p.id === props.mediaSession.getPeerId() ? selfRef : undefined}>
                        <VolumeSpaceAvatar {...p} mediaSession={props.mediaSession} />
                    </div>
                )}
                {/* <div style={{ width: 20, height: 20, backgroundColor: 'red', position: 'absolute', left: 1490, top: 1490 }} /> */}
                <svg viewBox={'0 0 3000 3000'} className={VolumeSpaceDrawContainerStyle}>
                    {[...selfPaths.entries()].map(e => <path key={e[0]} d={e[1]} stroke="black" fill="transparent" />)}
                </svg>
            </div>
            <div className={DrawControlsContainerStyle}>
                <UCheckbox onChange={setErase} label="Erase" checked={erase} asSwitcher={true} />
            </div>
        </div>
    );
});