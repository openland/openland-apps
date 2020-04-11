import * as React from 'react';
import { useJsDrag } from './CallFloating';
import { css } from 'linaria';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { VideoComponent } from './ScreenShareModal';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';

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
    let selfRef = React.useRef<HTMLDivElement>(null);
    useJsDrag(selfRef, selfRef, props.mediaSession.volumeSpace.onSelfMoved, props.mediaSession.volumeSpace.getSelfCoords(), undefined, undefined, undefined, undefined, [props.peers]);
    React.useEffect(() => {
        if (containerRef.current) {
            let centerx = (3000 - containerRef.current.clientWidth) / 2;
            let centery = (3000 - containerRef.current.clientHeight) / 2;
            console.warn(containerRef.current.clientWidth, containerRef.current.clientHeight);
            console.warn(centerx, centery);
            containerRef.current.scrollBy(centerx, centery);
        }

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
            // for (let [peerId, coords] of Object.entries(peers)) {

            // }
        });
    }, []);
    return (
        <div className={VolumeSpaceContainerStyle} ref={containerRef}>
            <div className={VolumeSpaceInnerContainerStyle} ref={innerContainerRef}>
                {props.peers.map(p =>
                    <div className={VolumeSpaceItemStyle} key={p.id} id={p.id} ref={p.id === props.mediaSession.getPeerId() ? selfRef : undefined}>
                        <VolumeSpaceAvatar {...p} mediaSession={props.mediaSession} />
                    </div>
                )}
                {/* <div style={{ width: 20, height: 20, backgroundColor: 'red', position: 'absolute', left: 1490, top: 1490 }} /> */}
            </div>
        </div>
    );
});