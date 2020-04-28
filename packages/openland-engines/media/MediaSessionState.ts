import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';

export interface MediaSessionReceiver {
    id: string;
    audioTrack: AppMediaStreamTrack | null;
    videoTrack: AppMediaStreamTrack | null;
    screencastTrack: AppMediaStreamTrack | null;
}

export interface MediaSessionSender {
    id: string | null;
    audioEnabled: boolean;
    videoEnabled: boolean;
    screencastEnabled: boolean;

    audioTrack: AppMediaStreamTrack | null;
    videoTrack: AppMediaStreamTrack | null;
    screencastTrack: AppMediaStreamTrack | null;
}

export interface MediaSessionState {
    sender: MediaSessionSender;
    receivers: { [peerId: string]: MediaSessionReceiver | undefined };
}

export type MediaSessionCommand =
    | { command: 'sender', sender: Partial<MediaSessionSender> }
    | { command: 'receiver', receiver: Partial<MediaSessionReceiver> & Pick<MediaSessionReceiver, 'id'> };

export function reduceState(src: MediaSessionState, command: MediaSessionCommand): MediaSessionState {
    if (command.command === 'sender') {
        return {
            ...src,
            sender: {
                ...src.sender,
                ...command.sender
            }
        };
    } else if (command.command === 'receiver') {
        let receiver =
            src.receivers[command.receiver.id] ||
            {
                id: command.receiver.id,
                audioTrack: null,
                videoTrack: null,
                screencastTrack: null
            };
        let receivers = { ...src.receivers };
        receivers[command.receiver.id] = { ...receiver, ...command.receiver };
        return {
            ...src,
            receivers
        };
    }
    throw Error('Unknown command');
}