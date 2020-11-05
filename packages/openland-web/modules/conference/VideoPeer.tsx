import * as React from 'react';
// import { CallsEngine } from 'openland-engines/CallsEngine';
import { XView } from 'react-mental';
import { Conference_conference_peers } from 'openland-api/spacex.types';
// import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { AppUserMediaTrackWeb } from 'openland-y-runtime-web/AppUserMedia';
import { VideoComponent, VideoModal } from './ScreenShareModal';
import { css, cx } from 'linaria';
import { UAvatar, getPlaceholderColorById } from 'openland-web/components/unicorn/UAvatar';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import SpeakerIcon from 'openland-icons/s/ic-speaking-bold-16.svg';
import MutedIcon from 'openland-icons/s/ic-muted-bold-16.svg';
import { SvgLoader } from 'openland-x/XLoader';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { MediaSessionTrackAnalyzerManager } from 'openland-engines/media/MediaSessionTrackAnalyzer';

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
`;

const peerInfoGradient = css`
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
    transform: scale(1.4);
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

const MiniVideo = css`
    box-shadow: var(--boxShadowPopper);
    border-radius: 8px;
`;

export interface PeerMedia {
    videoTrack: AppMediaStreamTrack | null;
    audioTrack: AppMediaStreamTrack | null;
    screencastTrack: AppMediaStreamTrack | null;
}
export interface VideoPeerProps extends PeerMedia {
    peer: Conference_conference_peers;
    analyzer: MediaSessionTrackAnalyzerManager;
    isLocal?: boolean;
    // for settings view
    compact?: boolean;
}

export const VideoPeer = React.memo((props: VideoPeerProps) => {

    const bgSrc = props.peer.user.photo ? props.peer.user.photo + '-/scale_crop/120x120/-/progressive/yes/' : undefined;
    const bgColor = !props.peer.user.photo ? getPlaceholderColorById(props.peer.user.id) : undefined;

    let videoTrack = !props.peer.mediaState.videoPaused && props.videoTrack;
    let screenTrack = props.peer.mediaState.screencastEnabled && props.screencastTrack;
    let mainTrack = screenTrack || videoTrack;
    let miniTrack = screenTrack ? videoTrack : null;

    const talking = props.analyzer.usePeer(props.peer.id);
    let icon: JSX.Element | undefined;
    if (!props.audioTrack && !props.isLocal) {
        icon = <SvgLoader size="small" contrast={true} />;
    } else if (props.peer.mediaState.audioPaused) {
        icon = <MutedIcon />;
    } else if (talking) {
        icon = <SpeakerIcon />;
    }

    const [modalOpen, setModalOpen] = React.useState(false);
    const onClick = React.useCallback(() => setModalOpen(true), []);
    const closeModal = React.useCallback(() => setModalOpen(false), []);

    return (
        <XView
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
            overflow="hidden"
            borderRadius={props.compact ? 8 : undefined}
            position="relative"

        >
            {mainTrack && (
                <VideoComponent
                    track={(mainTrack as AppUserMediaTrackWeb).track}
                    cover={!props.screencastTrack}
                    compact={props.compact}
                    onClick={onClick}
                    mirror={props.isLocal && !props.screencastTrack}
                    borderRadius={props.compact ? 8 : undefined}
                    backgroundColor="var(--overlayHeavy)"
                />
            )}
            {modalOpen && mainTrack && (
                <VideoModal
                    track={(mainTrack as AppUserMediaTrackWeb).track}
                    mirror={props.isLocal && !props.screencastTrack}
                    cover={!props.screencastTrack}
                    close={closeModal}
                />
            )}
            {miniTrack &&

                <XView
                    width={72}
                    height={48}
                    borderRadius={8}
                    position="absolute"
                    bottom={12}
                    right={12}
                >
                    <VideoComponent
                        track={(miniTrack as AppUserMediaTrackWeb).track}
                        cover={true}
                        mirror={props.isLocal}
                        videoClass={MiniVideo}
                        backgroundColor="var(--overlayHeavy)"
                    />
                </XView>
            }
            {!mainTrack && (
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
            <div className={cx(peerInfo, props.compact && peerInfoCompact, mainTrack && peerInfoGradient)}>
                {!props.compact && <div className={peerName}>{props.peer.user.firstName}</div>}
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
