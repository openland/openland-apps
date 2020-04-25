import * as React from 'react';
import YouTube from "react-youtube";
import uuid from 'uuid';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { css } from 'linaria';

interface YtbInstance {
    getCurrentTime(): number;
    getDuration(): number;
    seekTo(time: number, allowSeekAhead?: boolean): void;
    playVideo(): void;
    pauseVideo(): void;
}

const YtbContainerStyle = css`
    width: 100%;
    height: 100%;
`;

export const YoutubeParty = React.memo((props: { link: string, mediaSession: MediaSessionManager, controls?: boolean }) => {
    let id: string | undefined;
    let url = new URL(props.link);
    if (props.link.includes('youtu.be')) {
        id = url.pathname.split('/')[0];
    } else {
        id = url.searchParams.get('v') || undefined;
    }

    const [ready, setReady] = React.useState(false);

    const targetRef = React.useRef<YtbInstance>();
    const onReady = React.useCallback((ev: { target: YtbInstance }) => {
        targetRef.current = ev.target;
        setReady(true);
    }, []);

    const stateSeqRef = React.useRef(0);
    const messageSeqRef = React.useRef(0);
    const palyingState = React.useRef<boolean>();
    const seqPalyingState = React.useRef(false);
    const obay = React.useRef(true);
    const ignorePlay = React.useRef(false);
    const onPlay = React.useCallback(() => {
        if (ignorePlay.current) {
            targetRef.current?.pauseVideo();
        } else if (!palyingState.current) {
            palyingState.current = true;
            if ((seqPalyingState.current !== palyingState.current) && !obay.current) {
                seqPalyingState.current = palyingState.current;
                stateSeqRef.current++;
            }
        }
        ignorePlay.current = false;
    }, []);
    const onPause = React.useCallback(() => {
        if (palyingState.current) {
            palyingState.current = false;
            if ((seqPalyingState.current !== palyingState.current) && !obay.current) {
                seqPalyingState.current = palyingState.current;
                stateSeqRef.current++;
            }
        }
    }, []);
    React.useEffect(() => {
        if (!ready) {
            return;
        }
        let session = uuid();
        stateSeqRef.current = 0;
        messageSeqRef.current = 0;
        let lastTime = 0;
        let interval = setInterval(() => {
            let time = targetRef.current?.getCurrentTime() || 0;
            let jump = Math.abs(time - lastTime) > 2;
            lastTime = time;
            if (!obay.current) {
                if (jump) {
                    stateSeqRef.current++;
                }
                props.mediaSession.sendDcMessage({ id, time, seq: messageSeqRef.current++, stateSeq: stateSeqRef.current, palyingState: seqPalyingState.current, session, channel: 'ytb' });
            }
        }, 200);

        let obayTimer = window.setTimeout(() => obay.current = false, 500);

        let doObay = () => {
            obay.current = true;
            window.clearTimeout(obayTimer);
            obayTimer = window.setTimeout(() => obay.current = false, 500);
        };

        let peerSeq: { [peerId: string]: number | undefined } = {};
        let d = props.mediaSession.dcVM.listen(container => {
            let message: { channel: string, id: string, session: string, seq: number, stateSeq: number, time: number, palyingState: boolean } | undefined;
            try {
                message = container.dataParsed || (typeof container.data === 'string' ? JSON.parse(container.data) : undefined);
            } catch (e) {
                console.error('effects cant parse message', container);
            }
            if (!message) {
                console.error("can't parse message", container);
                return;
            }
            if ((message.channel !== 'ytb') || (message.id !== id)) {
                return;
            }
            if ((peerSeq[container.peerId + message.session] || -1) >= message.seq) {
                return;
            }

            if (message.stateSeq < stateSeqRef.current) {
                return;
            } else if (message.stateSeq > stateSeqRef.current) {
                doObay();
                // sync state
                if (palyingState.current !== message.palyingState) {
                    console.log('[YTB]', 'sync state', message);
                    if (message.palyingState) {
                        targetRef.current?.playVideo();
                    } else {
                        targetRef.current?.pauseVideo();
                    }
                }
                // sync time
                console.log('[YTB]', 'sync time', message);
                targetRef.current?.seekTo(message.time, true);

                // prevent fresh session to play paused video (seek from initial state will start playing)
                if (messageSeqRef.current === 0) {
                    ignorePlay.current = !message.palyingState;
                }

                seqPalyingState.current = message.palyingState;
                stateSeqRef.current = message.stateSeq;
            }

            peerSeq[container.peerId] = message.seq;
        });

        return () => {
            clearInterval(interval);
            d();
        };
    }, [id, ready]);

    return <YouTube
        containerClassName={YtbContainerStyle}
        onReady={onReady}
        videoId={id}
        opts={{
            width: '100%',
            height: '100%',
            playerVars: { controls: props.controls !== false ? 1 : 0, disablekb: props.controls === false ? 1 : 0 }
        }}
        onPlay={onPlay}
        onPause={onPause}
    />;
});