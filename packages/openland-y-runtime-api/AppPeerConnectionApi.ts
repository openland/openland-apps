import { AppMediaStreamTrack } from './AppUserMediaApi';

export interface AppPeerConnection {
    createOffer(): Promise<string>;
    createAnswer(): Promise<string>;
    addIceCandidate(candidate: string): Promise<void>;
    setLocalDescription(sdp: string): Promise<void>;
    setRemoteDescription(sdp: string): Promise<void>;
    onicecandidate: ((ev: { candidate?: string }) => void) | undefined;

    ontrackadded: ((track: AppMediaStreamTrack) => void) | undefined;
    addTrack(track: AppMediaStreamTrack): void;
    removeTrack(track: AppMediaStreamTrack): void;

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