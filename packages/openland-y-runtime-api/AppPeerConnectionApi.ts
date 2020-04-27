import { AppMediaStreamTrack } from './AppMediaStream';

export interface AppSessionDescription {
    type: 'offer' | 'answer';
    sdp: string;
}

export interface AppRtpReceiver {
    readonly track: AppMediaStreamTrack;
}

export interface AppRtpSender {
    replaceTrack(track: AppMediaStreamTrack): void;
}

export interface AppRtpTransceiver {
    readonly id: string;
    readonly sender: AppRtpSender;
    readonly receiver: AppRtpReceiver;
    readonly mid: string | null;
    direction: 'inactive' | 'recvonly' | 'sendonly' | 'sendrecv' | 'stopped';
    readonly currentDirection: 'inactive' | 'recvonly' | 'sendonly' | 'sendrecv' | 'stopped' | null;
    stop(): void;
}

export interface AppPeerTransceiverParams {
    direction?: 'inactive' | 'recvonly' | 'sendonly' | 'sendrecv';
}

export interface AppPeerConnection {

    // Negotiation
    createOffer(): Promise<AppSessionDescription>;
    createAnswer(): Promise<AppSessionDescription>;
    addIceCandidate(candidate: string): Promise<void>;
    setLocalDescription(sdp: AppSessionDescription): Promise<void>;
    setRemoteDescription(sdp: AppSessionDescription): Promise<void>;
    onicecandidate: ((ev: { candidate?: string }) => void) | undefined;

    // Transceivers
    addTranseiver(kind: 'audio' | 'video', params?: AppPeerTransceiverParams): Promise<AppRtpTransceiver>;
    addTranseiver(track: AppMediaStreamTrack, params?: AppPeerTransceiverParams): Promise<AppRtpTransceiver>;
    getTranseivers(): AppRtpTransceiver[];

    close(): void;
}

export interface AppPeerConnectionConfiguration {
    iceServers?: AppIceServer[];
    iceTransportPolicy?: 'relay' | 'all';
}

export interface AppIceServer {
    urls: string[];
    credential?: string | null;
    username?: string | null;
}

export interface AppPeerConnectionApi {
    createConnection(configuration: AppPeerConnectionConfiguration): AppPeerConnection;
}