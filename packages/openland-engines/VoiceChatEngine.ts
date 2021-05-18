import * as React from 'react';
import { OpenlandClient } from 'openland-api/spacex';
import { MessengerEngine } from './MessengerEngine';
import { VoiceChatEntity, VoiceChatEvents, VoiceChatListener, VoiceChatSpeaker } from 'openland-api/spacex.types';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

export type VoiceChatT = VoiceChatEntity & {
    speakers?: VoiceChatSpeaker[];
    listeners?: VoiceChatListener[];
    raisedHands?: VoiceChatListener[];
};
type ListenersMeta = {
    cursor: string | null,
    haveMore: boolean | null,
    loading: boolean,
};

export class VoiceChatEngine {
    readonly messenger: MessengerEngine;
    readonly client: OpenlandClient;

    voiceChat: VoiceChatT | null = null;
    isJoining = false;

    private chatSubscription: (() => void) | null = null;

    private listeners: ((voiceChat: VoiceChatT | null) => void)[] = [];

    private listenersMeta: ListenersMeta = { cursor: null, haveMore: null, loading: false };
    private listenersMetaListeners: ((meta: ListenersMeta) => void)[] = [];

    constructor(messenger: MessengerEngine) {
        this.messenger = messenger;
        this.client = messenger.client;
    }

    join = async (chatId: string, audioEnabled: boolean = false) => {
        this.isJoining = true;
        const mediaSession = this.messenger.calls.currentMediaSession;
        if (this.voiceChat && this.voiceChat.id !== chatId) {
            await this.leave();
        }
        try {
            if (!mediaSession || (mediaSession && !this.voiceChat) || (chatId !== this.voiceChat?.id)) {
                await this.client.mutateVoiceChatJoin({ id: chatId });
                this.messenger.calls.joinCall(chatId, audioEnabled);
            }
        } catch (e) {
            this.isJoining = false;
            throw e;
        }

        this.subscribeToChat(chatId);
    }

    leave = async () => {
        if (!this.voiceChat) {
            return;
        }
        let id = this.voiceChat.id;
        // Props clearing needs to be before api calls
        this.voiceChat = null;
        this.listenersMeta = { cursor: null, haveMore: null, loading: false };
        this.isJoining = false;

        this.messenger.calls.leaveCall();
        if (this.chatSubscription) {
            this.chatSubscription();
        }
        await this.client.mutateVoiceChatLeave({ id });
    }

    loadMoreListeners = async () => {
        const { loading, haveMore, cursor } = this.listenersMeta;
        if (loading || !haveMore || !this.voiceChat) {
            return;
        }
        this.setListenersMeta({
            ...this.listenersMeta,
            loading: true,
        });
        let data = (await this.client.queryVoiceChatListeners({
            id: this.voiceChat.id,
            after: cursor,
            first: 12
        }, { fetchPolicy: 'network-only' })).voiceChatListeners;

        let prevChat = this.voiceChat!;
        let prevListeners = prevChat.listeners || [];
        let prevSpeakers = prevChat.speakers || [];
        let newListeners = data.items.filter(x => (
            !prevListeners.some(y => y.id === x.id)
            && !prevSpeakers.some(y => y.id === x.id)
        ));
        this.setListenersMeta({
            cursor: data.cursor,
            haveMore: data.haveMore,
            loading: false,
        });
        this.setVoiceChat({
            ...prevChat,
            listeners: prevListeners.concat(newListeners)
        });
    }

    private subscribeToChat = async (chatId: string) => {
        const {
            voiceChatEventsState: { state: initialState },
            voiceChat: initialVoiceChat,
            voiceChatListeners: initialListeners
        } = await this.client.queryVoiceChatPrefetch(
            { id: chatId },
            { fetchPolicy: 'network-only' },
        );
        this.isJoining = false;
        this.setListenersMeta({
            cursor: initialListeners.cursor,
            haveMore: initialListeners.haveMore,
            loading: false,
        });

        this.setVoiceChat({
            ...initialVoiceChat,
            listeners: initialListeners.items,
        });

        this.chatSubscription = sequenceWatcher<VoiceChatEvents>(
            initialState,
            (state, handler) =>
                this.client.subscribeVoiceChatEvents(
                    { id: chatId, fromState: state! },
                    handler,
                ),
            ({ voiceChatEvents }) => {
                if (!this.voiceChat) {
                    return voiceChatEvents.state;
                }
                const { events } = voiceChatEvents;
                let newVoiceChat = this.voiceChat;
                let newSpeakers = newVoiceChat.speakers || [];
                let newListeners = newVoiceChat.listeners || [];
                events.forEach((i) => {
                    if (i.__typename === 'VoiceChatUpdatedEvent') {
                        newVoiceChat = i.chat;
                    }
                    if (i.__typename === 'VoiceChatParticipantUpdatedEvent') {
                        const { participant, chat } = i;
                        newVoiceChat = { ...newVoiceChat, ...chat };

                        const hasSpeaker = newSpeakers.find(j => j.user.id === participant.user.id);
                        const hasListener = newListeners.find(j => j.user.id === participant.user.id);

                        if (participant.status === 'LEFT' || participant.status === 'KICKED') {
                            newSpeakers = newSpeakers.filter(j => j.user.id !== participant.user.id);
                            newListeners = newListeners.filter(j => j.user.id !== participant.user.id);
                        }
                        if (participant.status === 'ADMIN') {
                            if (!hasSpeaker) {
                                newSpeakers.push(participant);
                            } else {
                                newSpeakers = newSpeakers.map((j) => j.id === participant.id ? participant : j);
                            }
                            if (!!hasListener) {
                                newListeners = newListeners.filter(j => j.user.id !== participant.user.id);
                            }
                        }
                        if (participant.status === 'SPEAKER') {
                            if (!hasSpeaker) {
                                newSpeakers.push(participant);
                            } else {
                                newSpeakers = newSpeakers.map((j) => j.id === participant.id ? participant : j);
                            }
                            if (!!hasListener) {
                                newListeners = newListeners.filter(j => j.user.id !== participant.user.id);
                            }
                        }
                        if (participant.status === 'LISTENER') {
                            if (!hasListener) {
                                newListeners.push(participant);
                            }
                            if (!!hasSpeaker) {
                                newSpeakers = newSpeakers.filter(j => j.user.id !== participant.user.id);
                            }
                        }
                    }
                });
                this.setVoiceChat({
                    ...newVoiceChat,
                    speakers: newSpeakers,
                    listeners: newListeners,
                });
                return voiceChatEvents.state;
            },
        );
    }

    useVoiceChat = () => {
        let [res, setRes] = React.useState(this.voiceChat);
        React.useEffect(() => {
            this.listeners.push(setRes);
            if (res !== this.voiceChat) {
                setRes(this.voiceChat);
            }
            return () => {
                let ind = this.listeners.indexOf(setRes);
                if (ind >= 0) {
                    this.listeners.splice(ind, 1);
                }
            };
        }, []);
        return res;
    }

    useListenersMeta = () => {
        let [res, setRes] = React.useState(this.listenersMeta);
        React.useEffect(() => {
            this.listenersMetaListeners.push(setRes);
            if (res !== this.listenersMeta) {
                setRes(this.listenersMeta);
            }
            return () => {
                let ind = this.listenersMetaListeners.indexOf(setRes);
                if (ind >= 0) {
                    this.listenersMetaListeners.splice(ind, 1);
                }
            };
        }, []);
        return res;
    }

    private setVoiceChat = (chat: VoiceChatT) => {
        this.voiceChat = { ...chat };
        this.notifyVoiceChat();
    }

    private notifyVoiceChat = () => {
        let vc = this.voiceChat;
        for (let l of [...this.listeners]) {
            l(vc);
        }
    }

    private setListenersMeta = (meta: ListenersMeta) => {
        this.listenersMeta = meta;
        this.notifyListenersMeta();
    }

    private notifyListenersMeta = () => {
        let m = this.listenersMeta;
        for (let l of [...this.listenersMetaListeners]) {
            l(m);
        }
    }
}
