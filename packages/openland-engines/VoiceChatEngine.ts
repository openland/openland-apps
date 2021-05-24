import * as React from 'react';
import { OpenlandClient } from 'openland-api/spacex';
import { MessengerEngine } from './MessengerEngine';
import { VoiceChatEntity, VoiceChatEvents, VoiceChatListener, VoiceChatParticipantStatus, VoiceChatSpeaker } from 'openland-api/spacex.types';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

export type VoiceChatT = VoiceChatEntity & {
    speakers?: VoiceChatSpeaker[];
    listeners?: VoiceChatListener[];
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

    private listenersMeta: ListenersMeta = { cursor: null, haveMore: null, loading: false };

    constructor(messenger: MessengerEngine) {
        this.messenger = messenger;
        this.client = messenger.client;
    }

    join = async (chatId: string, audioEnabled: boolean = false) => {
        this.isJoining = true;
        const mediaSession = this.messenger.calls.currentMediaSession;
        if (this.voiceChat && this.voiceChat.id !== chatId) {
            await this.leaveVoiceChat();
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

    leave = ({ closedByAdmin }: { closedByAdmin?: boolean } = {}) => {
        if (!this.voiceChat) {
            return;
        }

        this.notifyLeaveListeners({ roomId: this.voiceChat.id, parentRoomId: this.voiceChat.parentRoom?.id, closedByAdmin });
        this.leaveVoiceChat();
    }

    leaveVoiceChat = async () => {
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
                let newVoiceChat = { ...this.voiceChat };
                let newSpeakers = newVoiceChat.speakers || [];
                let newListeners = newVoiceChat.listeners || [];

                let isLeft = false;
                let isKicked = false;
                for (const i of events) {
                    isLeft = isLeft || this.voiceChat?.me?.status !== VoiceChatParticipantStatus.LEFT
                        && i.chat.me?.status === VoiceChatParticipantStatus.LEFT;
                    isKicked = isKicked || this.voiceChat?.me?.status !== VoiceChatParticipantStatus.KICKED
                        && i.chat.me?.status === VoiceChatParticipantStatus.KICKED;

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
                }

                let hasPrevAdmins = (this.voiceChat.speakers || []).some(x => x.status === VoiceChatParticipantStatus.ADMIN);
                let hasAdmins = newSpeakers.some(x => x.status === VoiceChatParticipantStatus.ADMIN);
                let isPrevAdmin = this.voiceChat.me?.status === VoiceChatParticipantStatus.ADMIN;
                let closedByAdmin = hasPrevAdmins && !hasAdmins && !isPrevAdmin;
                if (closedByAdmin || isLeft || isKicked) {
                    this.leave({ closedByAdmin });
                    return voiceChatEvents.state;
                }

                this.setVoiceChat({
                    ...newVoiceChat,
                    speakers: newSpeakers,
                    listeners: newListeners,
                });

                let prevStatus = this.voiceChat.me?.status;
                let status = newVoiceChat.me?.status;
                if (prevStatus !== status) {
                    this.handleStatusChange(status, prevStatus);
                }
                return voiceChatEvents.state;
            },
        );
    }

    private chatListeners: ((voiceChat: VoiceChatT | null) => void)[] = [];

    useVoiceChat = () => {
        let [res, setRes] = React.useState(this.voiceChat);
        React.useEffect(() => {
            this.chatListeners.push(setRes);
            if (res !== this.voiceChat) {
                setRes(this.voiceChat);
            }
            return () => {
                let ind = this.chatListeners.indexOf(setRes);
                if (ind >= 0) {
                    this.chatListeners.splice(ind, 1);
                }
            };
        }, []);
        return res;
    }

    private listenersMetaListeners: ((meta: ListenersMeta) => void)[] = [];

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
        for (let l of [...this.chatListeners]) {
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

    private statusChangeListeners: ((status?: VoiceChatParticipantStatus, prevStatus?: VoiceChatParticipantStatus) => void)[] = [];

    onStatusChange = (listener: (status?: VoiceChatParticipantStatus, prevStatus?: VoiceChatParticipantStatus) => void) => {
        this.statusChangeListeners.push(listener);

        return () => {
            let ind = this.statusChangeListeners.indexOf(listener);
            if (ind >= 0) {
                this.statusChangeListeners.splice(ind, 1);
            }
        };
    }

    private notifyStatusChangeListeners = (status?: VoiceChatParticipantStatus, prevStatus?: VoiceChatParticipantStatus) => {
        for (let l of [...this.statusChangeListeners]) {
            l(status, prevStatus);
        }
    }

    private leaveListeners: ((opts: {
        roomId: string,
        parentRoomId?: string,
        closedByAdmin?: boolean,
    }) => void)[] = [];

    private handleStatusChange = (status?: VoiceChatParticipantStatus, prevStatus?: VoiceChatParticipantStatus) => {
        if (prevStatus === VoiceChatParticipantStatus.LISTENER && status === VoiceChatParticipantStatus.SPEAKER) {
            this.messenger.calls.currentMediaSession?.setAudioEnabled(false);
        }
        if (prevStatus === VoiceChatParticipantStatus.SPEAKER && status === VoiceChatParticipantStatus.LISTENER) {
            this.messenger.calls.currentMediaSession?.setAudioEnabled(false);
        }

        this.notifyStatusChangeListeners(status, prevStatus);
    }

    onLeave = (listener: (opts: {
        roomId: string,
        parentRoomId?: string,
        closedByAdmin?: boolean,
    }) => void) => {
        this.leaveListeners.push(listener);

        return () => {
            let ind = this.leaveListeners.indexOf(listener);
            if (ind >= 0) {
                this.leaveListeners.splice(ind, 1);
            }
        };
    }

    private notifyLeaveListeners = (opts: {
        roomId: string,
        parentRoomId?: string,
        closedByAdmin?: boolean,
    }) => {
        for (let l of [...this.leaveListeners]) {
            l(opts);
        }
    }
}
