import { AppMediaStreamTrack } from './AppUserMediaApi';
export type IceState = 'new' | 'checking' | 'connected' | 'completed' | 'failed' | 'disconnected' | 'closed';

export interface AppPeerConnection {
    onicecandidate: ((ev: { candidate?: string }) => void) | undefined;
    onnegotiationneeded: (() => void) | undefined;
    oniceconnectionstatechange: ((ev: { target: { iceConnectionState: IceState } }) => void) | undefined;

    addIceCandidate(candidate: string): Promise<void>;

    createOffer(): Promise<string>;
    setLocalDescription(sdp: string): Promise<void>;
    setRemoteDescription(sdp: string): Promise<void>;
    createAnswer(): Promise<string>;

    ontrackadded: ((track: AppMediaStreamTrack) => void) | undefined;
    addTrack(track: AppMediaStreamTrack): void;
    removeTrack(track: AppMediaStreamTrack): void;

    setVolume(volume: number): void;

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