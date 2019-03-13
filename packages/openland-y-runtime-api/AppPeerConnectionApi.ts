import { AppMediaStream } from './AppUserMediaApi';

export interface AppPeerConnection {
    onicecandidate: ((ev: { candidate?: string }) => void) | undefined;
    addIceCandidate(candidate: string): Promise<void>;
    
    createOffer(): Promise<string>;
    setLocalDescription(sdp: string): Promise<void>;
    setRemoteDescription(sdp: string): Promise<void>;
    createAnswer(): Promise<string>;

    addStream(stream: AppMediaStream): void;
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
    createConnection(configuration: AppPeerConnectionConfiguration): AppPeerConnection
}