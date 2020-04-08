import * as React from 'react';
import { CallsEngine, CallState } from 'openland-engines/CallsEngine';
import { XView } from 'react-mental';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaStreamWeb } from 'openland-y-runtime-web/AppUserMedia';
import { VideoComponent, showVideoModal } from './ScreenShareModal';
import { css, cx } from 'linaria';
import { UAvatar, getPlaceholderColorById } from 'openland-web/components/unicorn/UAvatar';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import SpeakerIcon from 'openland-icons/s/ic-speaking-bold-16.svg';
import MutedIcon from 'openland-icons/s/ic-muted-bold-16.svg';
import { SvgLoader } from 'openland-x/XLoader';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';

const animatedAvatarStyle = css`
    position: absolute;
    z-index: 3;
`;

const compactAvatarStyle = css`
    top: 16px;
    left: 16px;
`;

const peerInfo = css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    z-index: 3;
    display: flex;
`;

const peerName = cx(
    TextLabel1,
    css`
        color: var(--foregroundContrast);
    `
);

const peerIcon = css`
    margin-left: 8px;
    display: flex;
    align-items: center;
    svg path {
        fill: var(--foregroundContrast);
    }
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

interface VideoPeerProps {
    mediaSession: MediaSessionManager; 
    peer: Conference_conference_peers;
    calls: CallsEngine;
    callState: CallState;
}

export const VideoPeer = React.memo((props: VideoPeerProps) => {
    let [stream, setStream] = React.useState<MediaStream>();
    let [talking, setTalking] = React.useState(false);
    const isLocal = props.peer.id === props.mediaSession.getPeerId();
    React.useEffect(() => {
        let d1: () => void;
        if (isLocal) {
            d1 = props.mediaSession.listenOutVideo(s => {
                setStream((s as AppUserMediaStreamWeb)?._stream);
            });
        } else {
            d1 = props.mediaSession.listenPeerVideo(props.peer.id, s => {
                setStream((s as AppUserMediaStreamWeb)?._stream);
            });
        }
        let d2 = props.mediaSession.analizer.subscribePeer(props.peer.id, v => {
            setTalking(v);
        });
        return () => {
            d1();
            d2();
        };
    }, []);

    const icon = props.callState.status !== 'connected' ? <SvgLoader size="small" contrast={true} />
        : talking ? <SpeakerIcon />
        : props.callState.mute && isLocal ? <MutedIcon />
        : null;

    const bgSrc = props.peer.user.photo ? props.peer.user.photo : undefined;
    const bgColor = !props.peer.user.photo ? getPlaceholderColorById(props.peer.user.id) : undefined;

    const onClick = React.useCallback(() => stream ? showVideoModal(stream) : undefined, [stream]);

    return (
        <XView backgroundColor="gray" alignItems="center" justifyContent="center" flexGrow={1}>
            <div className={bgAvatar}>
                {bgSrc ? (
                    <ImgWithRetry src={bgSrc} className={bgAvatarImg} />
                ) : (
                    <div className={bgAvatarImg} style={{background: bgColor}} />
                )}
                
                <div className={bgAvatarOverlay} />
            </div>
            {stream && <VideoComponent stream={stream} cover={true} onClick={onClick} mirror={isLocal} />}
            <div key={'animtateing_wrapper'} className={cx(animatedAvatarStyle, stream && compactAvatarStyle)}>
                <UAvatar
                    size={stream ? 'large' : 'xx-large'}
                    id={props.peer.user.id}
                    title={props.peer.user.name}
                    photo={props.peer.user.photo}
                />
            </div>
            <div className={peerInfo}>
                <div className={peerName}>{props.peer.user.name}</div>
                <div className={peerIcon}>
                    {icon}
                </div>
            </div>
        </XView>
    );
});