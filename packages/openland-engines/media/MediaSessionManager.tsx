import { OpenlandClient } from 'openland-api/OpenlandClient';
import { backoff, delay } from 'openland-y-utils/timer';
import { MediaStreamManager } from './MediaStreamManager';
import { AppUserMedia } from 'openland-y-runtime/AppUserMedia';
import { AppMediaStream } from 'openland-y-runtime-api/AppUserMediaApi';
import { ConferenceMediaWatchSubscription } from 'openland-api';
import { ConferenceMediaWatch_media_streams } from 'openland-api/Types';

export class MediaSessionManager {
    readonly conversationId: string;
    private readonly client: OpenlandClient;
    private readonly onReady: () => void;
    private mediaStream!: AppMediaStream;
    private streamConfigs!: ConferenceMediaWatch_media_streams[];
    private iceServers!: any[];
    private conferenceId!: string;
    private peerId!: string;
    private destroyed = false;
    private streams = new Map<string, MediaStreamManager>();
    private mute: boolean;

    constructor(client: OpenlandClient, conversationId: string, mute: boolean, onReady: () => void) {
        this.client = client;
        this.conversationId = conversationId;
        this.mute = mute;
        this.onReady = onReady;
        this.doInit();
    }

    setMute = (mute: boolean) => {
        this.mute = mute;
        if (this.mediaStream) {
            this.mediaStream.muted = mute;
        }
    }

    destroy = () => {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;

        console.log('[WEBRTC] Destroying conference');

        // Destroy streams
        for (let s of this.streams.keys()) {
            this.streams.get(s)!.destroy();
        }

        // Destroy out media
        if (this.mediaStream) {
            this.mediaStream.close();
        }

        // Notify about leave
        if (this.conferenceId && this.peerId) {
            backoff(async () => {
                await this.client.mutateConferenceLeave({
                    id: this.conferenceId,
                    peerId: this.peerId
                });
            });
        }
    }

    private doInit = () => {
        console.log('[WEBRTC] Starting conference');
        (async () => {
            // Resolve conference
            let conferenceId = (await backoff(async () => {
                if (this.destroyed) {
                    return null;
                }
                return (await this.client.queryConference({ id: this.conversationId })).conference.id;
            }))!;
            if (!conferenceId) {
                return;
            }

            console.log('[WEBRTC] Resolved conference');

            // Joining
            let joinConference = (await backoff(async () => {
                if (this.destroyed) {
                    return null;
                }
                return (await this.client.mutateConferenceJoin({ id: conferenceId })).conferenceJoin;
            }))!;
            if (!joinConference) {
                return;
            }

            if (this.destroyed) {
                // Leave from already destroyed session
                backoff(async () => {
                    await this.client.mutateConferenceLeave({
                        id: conferenceId,
                        peerId: joinConference.peerId
                    });
                });
                return null;
            }
            console.log('[WEBRTC] Joined conference');
            this.iceServers = joinConference.conference.iceServers;
            this.conferenceId = conferenceId;
            this.peerId = joinConference.peerId;
            this.onReady();
            this.doStart();
            return;
        })();
    }

    private doStart = () => {

        // Start keep alive
        this.doKeepAlive();

        // Request media
        AppUserMedia.getUserAudio()
            .then((str) => {
                if (this.destroyed) {
                    str.close();
                } else {
                    this.mediaStream = str;
                    this.mediaStream.muted = this.mute;
                    this.handleState();
                }
            })
            .catch((e) => {
                // Just ignore...
            });

        // Load media streams
        let subscription = this.client.subscribeConferenceMediaWatch({ peerId: this.peerId, id: this.conferenceId });

        (async () => {
            while (!this.destroyed) {
                try {
                    let state = (await subscription.get()).media;
                    let streams = state.streams;
                    this.streamConfigs = streams;
                    this.handleState();
                } catch (e) {
                    console.warn(e);
                }
            }
        })();
    }

    private handleState = () => {
        if (!this.mediaStream || !this.streamConfigs || this.destroyed) {
            return;
        }
        console.log('[WEBRTC] Apply: ', this.streamConfigs);

        // Detect deletions
        for (let s of this.streams.keys()) {
            if (!this.streamConfigs.find((v) => v.id === s)) {
                console.log('[WEBRTC] Destroy stream ' + s);
                this.streams.get(s)!.destroy();
                this.streams.delete(s);
            }
        }

        for (let s of this.streamConfigs) {
            let ex = this.streams.get(s.id);
            if (ex) {
                ex.onStateChanged(s);
            } else {
                console.log('[WEBRTC] Create stream ' + s.id);
                let ms = new MediaStreamManager(this.client, s.id, this.peerId, this.iceServers, this.mediaStream, s);
                this.streams.set(s.id, ms);
            }
        }
    }

    private doKeepAlive = () => {
        let confId = this.conferenceId;
        let peerId = this.peerId;
        backoff(async () => {
            while (!this.destroyed) {
                await this.client.mutateConferenceKeepAlive({
                    id: confId,
                    peerId,
                })
                console.log('[WEBRTC] Keep Alive sent');
                await delay(2000);
            }
            await await this.client.mutateConferenceLeave({
                id: confId,
                peerId: peerId
            });
        });
    }
}