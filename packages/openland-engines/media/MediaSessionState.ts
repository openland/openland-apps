import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';

export interface MediaSessionReceiver {
    id: string;
    isLocal?: boolean;
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
    receivers: { [peerId: string]: MediaSessionReceiver | undefined };
    receiversIds: { [peerId: string]: string | undefined };
}

export type MediaSessionCommand =
    | { command: 'sender', sender: Partial<MediaSessionSender> }
    | { command: 'receiver', receiver: Partial<MediaSessionReceiver> & Pick<MediaSessionReceiver, 'id'> }
    | { command: 'localPeerId', peerId: string };

export function reduceState(src: MediaSessionState, command: MediaSessionCommand): MediaSessionState {
    if (command.command === 'sender') {
        let sender = {
            ...src.sender,
            ...command.sender
        };
        let receivers = { ...src.receivers };
        receivers.local = {
            id: 'local',
            isLocal: true,
            audioTrack: sender.audioEnabled ? sender.audioTrack : null,
            videoTrack: sender.videoEnabled ? sender.videoTrack : null,
            screencastTrack: sender.screencastEnabled ? sender.screencastTrack : null
        };

        return {
            ...src,
            sender,
            receivers,
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
        let receiversIds = { ...src.receiversIds };
        receiversIds[command.receiver.id] = command.receiver.id;
        return {
            ...src,
            receivers,
            receiversIds
        };
    } else if (command.command === 'localPeerId') {
        let receiversIds = { ...src.receiversIds };
        receiversIds[command.peerId] = 'local';
        return {
            ...src,
            receiversIds,
        };
    }
    throw Error('Unknown command');
}