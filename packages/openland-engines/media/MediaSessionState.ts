import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppUserMediaApi';

export interface MediaSessionReceiver {
    id: string;
    audioTrack: AppMediaStreamTrack | null;
    videoTrack: AppMediaStreamTrack | null;
    screencastTrack: AppMediaStreamTrack | null;
}

export interface MediaSessionSender {
    audioEnabled: boolean;
    videoEnabled: boolean;
    screencastEnabled: boolean;

    audioTrack: AppMediaStreamTrack | null;
    videoTrack: AppMediaStreamTrack | null;
    screencastTrack: AppMediaStreamTrack | null;
}

export interface MediaSessionState {
    sender: MediaSessionSender;
    receivers: MediaSessionReceiver[];
}

export type MediaSessionCommand =
    | { command: 'sender', sender: Partial<MediaSessionSender> }
    | { command: 'receiver', receiver: Partial<MediaSessionReceiver> };

export function reduceState(src: MediaSessionState, command: MediaSessionCommand): MediaSessionState {
    if (command.command === 'sender') {
        return {
            ...src,
            sender: {
                ...src.sender,
                ...command.sender
            }
        };
    } else if (command.receiver === 'receiver') {
        // TODO: Implement
    }
    throw Error('Unknown command');
}