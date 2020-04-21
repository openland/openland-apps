import { AppMediaStream } from './AppUserMediaApi';
export type IceState = 'new' | 'checking' | 'connected' | 'completed' | 'failed' | 'disconnected' | 'closed';

export interface AppPeerConnection {
    onicecandidate: ((ev: { candidate?: string }) => void) | undefined;
    onnegotiationneeded: (() => void) | undefined;
    oniceconnectionstatechange: ((ev: { target: { iceConnectionState: IceState } }) => void) | undefined;
    onStreamAdded: ((stream: AppMediaStream) => void) | undefined;

    addIceCandidate(candidate: string): Promise<void>;

    createOffer(): Promise<string>;
    setLocalDescription(sdp: string): Promise<void>;
    setRemoteDescription(sdp: string): Promise<void>;
    createAnswer(): Promise<string>;

    addStream(stream: AppMediaStream): void;
    removeStream(stream: AppMediaStream): void;

    updateDataChannels(configs: { id: number, label: string, ordered: boolean }[]): void;
    sendDataChannelMessage(dataChannelId: number, message: string): void;
    onDataChannelMessage: ((dataChannelId: number, message: any) => void) | undefined;
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