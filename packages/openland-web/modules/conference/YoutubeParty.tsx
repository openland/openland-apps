import * as React from 'react';
import YouTube from "react-youtube";
import uuid from 'uuid';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { css } from 'linaria';

interface YtbInstance {
    getCurrentTime(): number;
    getDuration(): number;
    seekTo(time: number): void;
    playVideo(): void;
    pauseVideo(): void;
}

const YtbContainerStyle = css`
    width: 100%;
    height: 100%;
`;
export const YoutubeParty = React.memo((props: { link: string, mediaSession: MediaSessionManager }) => {
    let id: string | undefined;
    let url = new URL(props.link);
    if (props.link.includes('youtu.be')) {
        id = url.pathname.split('/')[0];
    } else {
        id = url.searchParams.get('v') || undefined;
    }
    console.warn('[YTB]', id);

    const targetRef = React.useRef<YtbInstance>();
    const onReady = React.useCallback((ev: { target: YtbInstance }) => {
        targetRef.current = ev.target;
    }, []);

    const stateSeqRef = React.useRef(0);
    const messageSeqRef = React.useRef(0);
    const palyingState = React.useRef(false);
    const seqPalyingState = React.useRef(false);
    const obay = React.useRef(true);
    const initial = React.useRef(true);
    const onPlay = React.useCallback(() => {
        if (!palyingState.current) {
            palyingState.current = true;
            if ((seqPalyingState.current !== palyingState.current) && !obay.current) {
                seqPalyingState.current = palyingState.current;
                stateSeqRef.current++;
            }
        }
        initial.current = false;
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
        let session = uuid();
        initial.current = true;
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
                obay.current = true;
                window.clearTimeout(obayTimer);
                obayTimer = window.setTimeout(() => obay.current = false, 500);
                // sync time
                console.log('[YTB]', 'sync time', message);
                targetRef.current?.seekTo(message.time);
                // sync state
                if (palyingState.current !== message.palyingState) {
                    console.log('[YTB]', 'sync state', message);
                    if (message.palyingState) {
                        targetRef.current?.playVideo();
                    } else {
                        targetRef.current?.pauseVideo();
                    }
                }
                seqPalyingState.current = message.palyingState;
                stateSeqRef.current = message.stateSeq;
            } else if ((message.time - (targetRef.current?.getCurrentTime() || 0) > 1) || initial.current) {
                targetRef.current?.seekTo(message.time);
            }

            peerSeq[container.peerId] = message.seq;
        });

        return () => {
            clearInterval(interval);
            d();
        };
    }, [id]);

    return <YouTube
        containerClassName={YtbContainerStyle}
        onReady={onReady}
        videoId={id}
        opts={{
            width: '100%',
            height: '100%',
        }}
        onPlay={onPlay}
        onPause={onPause}
    />;
});