import * as React from 'react';
import { CallsEngine, CallState } from 'openland-engines/CallsEngine';
import { XView } from 'react-mental';
import { Conference_conference_peers, MediaStreamVideoSource } from 'openland-api/spacex.types';
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
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';

const animatedAvatarStyle = css`
    position: absolute;
    z-index: 3;
`;

const peerInfo = css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    z-index: 3;
    display: flex;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.32) 100%);
`;

const peerInfoCompact = css`
    padding: 0 16px 16px;
`;

const peerName = cx(
    TextLabel1,
    css`
        color: var(--foregroundContrast);
        margin-right: 8px;
    `
);

const peerIcon = css`
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
    filter: blur(24px);
    transform: scale(1.1);
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

export interface VideoPeerProps {
    mediaSession: MediaSessionManager;
    peer: Conference_conference_peers;
    calls: CallsEngine;
    callState: CallState;
    // for settings view
    compact?: boolean;
}

export const VideoPeer = React.memo((props: VideoPeerProps) => {
    let [mainStream, setMainStream] = React.useState<AppMediaStream>();
    // @ts-ignore
    let [miniStream, setMiniStream] = React.useState<AppMediaStream>();
    let [talking, setTalking] = React.useState(false);
    const [localPeer, setLocalPeer] = React.useState(props.mediaSession.getPeerId());
    const isLocal = props.peer.id === props.mediaSession.getPeerId();
    const [audioPaused, setAudioPaused] = React.useState<boolean | null>(false);
    const [videoPaused, setVideoPaused] = React.useState<boolean | null>(true);
    React.useEffect(() => {
        // mediaSession initiating without peerId. Like waaat
        let d0 = props.calls.listenState(() => setLocalPeer(props.mediaSession.getPeerId()));
        let d1: () => void;
        let d3: (() => void) | undefined;
        if (isLocal) {
            d1 = props.mediaSession.outVideoVM.listen(streams => {
                let cam = streams.find(s => s?.source === 'camera');
                let screen = streams.find(s => s?.source === 'screen_share');
                setMainStream(screen ? screen : cam);
                setVideoPaused(!!cam?.blinded);
                setMiniStream(screen ? cam : undefined);
            });
        } else {
            d1 = props.mediaSession.peerVideoVM.listen(props.peer.id, streams => {
                let cam = [...streams.values()].find(s => s.source === 'camera');
                let screen = [...streams.values()].find(s => s.source === 'screen_share');
                setMainStream(screen ? screen : cam);
                setMiniStream(screen ? cam : undefined);
            });
            d3 = props.mediaSession.peerStreamMediaStateVM.listen(props.peer.id, s => {
                let camState = [...s.values()].find(c => c.videoSource === MediaStreamVideoSource.camera);
                if (camState) {
                    setAudioPaused(camState.audioPaused);
                    setVideoPaused(camState.videoPaused);
                }
            });
        }
        let d2 = props.mediaSession.analizer.subscribePeer(props.peer.id, v => {
            setTalking(v);
        });
        return () => {
            d0();
            d1();
            d2();
            if (d3) {
                d3();
            }
        };
    }, [localPeer]);

    const icon = props.callState.status !== 'connected' ? <SvgLoader size="small" contrast={true} />
        : talking ? <SpeakerIcon />
            : (isLocal ? props.callState.mute : audioPaused) ? <MutedIcon />
                : null;

    const bgSrc = props.peer.user.photo ? props.peer.user.photo : undefined;
    const bgColor = !props.peer.user.photo ? getPlaceholderColorById(props.peer.user.id) : undefined;

    let mainStreamWeb = (!videoPaused || mainStream?.source === 'screen_share') && (mainStream as AppUserMediaStreamWeb | undefined)?._stream;
    // @ts-ignore
    let miniStreamWeb = (miniStream as AppUserMediaStreamWeb | undefined)?._stream;
    const onClick = React.useCallback(() => mainStreamWeb ? showVideoModal(mainStreamWeb) : undefined, [mainStreamWeb]);

    return (
        <XView
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
            overflow="hidden"
            borderRadius={props.compact ? 8 : undefined}
            position="relative"

        >
            {mainStreamWeb && <VideoComponent stream={mainStreamWeb} cover={true} compact={props.compact} onClick={onClick} mirror={isLocal && (mainStream?.source === 'camera')} borderRadius={props.compact ? 8 : undefined} />}
            {!mainStreamWeb && (
                <>
                    <div className={bgAvatar}>
                        {bgSrc ? (
                            <ImgWithRetry src={bgSrc} className={bgAvatarImg} />
                        ) : (
                                <div className={bgAvatarGradient} style={{ background: bgColor }} />
                            )}

                        <div className={bgAvatarOverlay} />
                    </div>
                    <div key={'animating_wrapper'} className={cx(animatedAvatarStyle)}>
                        <UAvatar
                            size={props.compact ? 'large' : 'xx-large'}
                            id={props.peer.user.id}
                            title={props.peer.user.name}
                            photo={props.peer.user.photo}
                        />
                    </div>
                </>
            )}
            <div className={cx(peerInfo, props.compact && peerInfoCompact)}>
                {!props.compact && <div className={peerName}>{props.peer.user.name}</div>}
                {icon && (
                    <div className={peerIcon}>
                        {icon}
                    </div>
                )}
            </div>
            {props.compact && (
                <XView
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    borderWidth={1}
                    borderColor="var(--borderLight)"
                    borderRadius={8}
                    zIndex={2}
                />
            )}
        </XView>
    );
});
