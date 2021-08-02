import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { MediaSessionTrackAnalyzerManager } from 'openland-engines/media/MediaSessionTrackAnalyzer';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { TextBody, TextStyles, TextTitle1 } from 'openland-web/utils/TextStyles';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import IcSpeakerSmall from 'openland-icons/s/ic-speaker-16.svg';
import IcListenerSmall from 'openland-icons/s/ic-listener-16.svg';

const headerTitleStyle = css`
    color: var(--foregroundPrimary);
    max-height: 64px;
    overflow: hidden;
    display: -webkit-box;
    margin-bottom: 8px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
`;

const speakerIconClass = css`
    margin-left: 4px;
    margin-right: 12px;
`;

const listenerIconClass = css`
    margin-left: 6px;
`;

const speakerName = css`
    display: flex;
    flex-shrink: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 20px;
    color: var(--foregroundSecondary);
    margin-right: 8px;
`;

const equalizer = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 14px;
    height: 14px;
    flex-shrink: 0;

    & .speaker-bar {
        display: flex;
        flex-shrink: 0;
        width: 1px;
        background-color: var(--tintBlue);
        margin: 0 1px;

        &.out {
            height: 4px;
            animation: equalizeOut linear 0.8s infinite;
        }

        &.middle {
            height: 8px;
            animation: equalizeMiddle linear 0.8s infinite;
        }

        &.center {
            height: 12px;
            animation: equalizeCenter linear 0.8s infinite;
        }
    }

    @keyframes equalizeCenter {
        0% {
            height: 12px;
        }
        20% {
            height: 8px;
        }
        40% {
            height: 6px;
        }
        60% {
            height: 2px;
        }
        80% {
            height: 6px;
        }
        100% {
            height: 12px;
        }
    }
    @keyframes equalizeMiddle {
        0% {
            height: 8px;
        }
        30% {
            height: 4px;
        }
        50% {
            height: 2px;
        }
        70% {
            height: 4px;
        }
        100% {
            height: 8px;
        }
    }
    @keyframes equalizeOut {
        0% {
            height: 4px;
        }
        50% {
            height: 1px;
        }
        100% {
            height: 4px;
        }
    }
`;

const Equalizer = React.memo(() => {
    return (
        <div className={equalizer}>
            <div className="speaker-bar out" />
            <div className="speaker-bar middle" />
            <div className="speaker-bar center" />
            <div className="speaker-bar middle" />
            <div className="speaker-bar out" />
        </div>
    );
});

interface RoomHeaderProps {
    speakersCount: number;
    listenersCount: number;
    title?: string | null;
    analyzer: MediaSessionTrackAnalyzerManager;
    peers: Conference_conference_peers[];
}

export const RoomHeader = (props: RoomHeaderProps) => {
    const { speakersCount, listenersCount, analyzer, peers, title } = props;
    const currentlySpeaking = analyzer.useSpeakingPeer();
    let currentPeer = currentlySpeaking.speaking
        ? peers.find((x) => x.id === currentlySpeaking.id)
        : undefined;

    return (
        <XView paddingTop={12} paddingBottom={14} paddingRight={12} width="100%">
            {title && <div className={cx(TextTitle1, headerTitleStyle)}>{title}</div>}
            <XView
                flexDirection="row"
                alignItems="center"
                color="var(--foregroundSecondary)"
                justifyContent="space-between"
            >
                <XView
                    flexDirection="row"
                    alignItems="center"
                    color="var(--foregroundSecondary)"
                    alignSelf="flex-start"
                    marginRight={8}
                >
                    <XView {...TextStyles.Subhead}>{speakersCount}</XView>
                    <UIcon
                        icon={<IcSpeakerSmall />}
                        className={speakerIconClass}
                        color="var(--foregroundTertiary)"
                    />
                    {listenersCount > 0 && (
                        <>
                            <XView {...TextStyles.Subhead}>{listenersCount}</XView>
                            <UIcon
                                icon={<IcListenerSmall />}
                                className={listenerIconClass}
                                color="var(--foregroundTertiary)"
                            />
                        </>
                    )}
                </XView>
                {speakersCount > 9 && !!currentPeer && !currentPeer.mediaState.audioPaused && (
                    <XView flexDirection="row" alignItems="center" flexShrink={1}>
                        <div className={cx(speakerName, TextBody)}>{currentPeer.user.name}</div>
                        <Equalizer />
                    </XView>
                )}
            </XView>
        </XView>
    );
};
