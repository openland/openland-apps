import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { VoiceChatParticipant, VoiceChatEvents } from 'openland-api/spacex.types';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

type VoiceChat = {
    id: string;
    title: string | null;
    adminsCount: number;
    listenersCount: number;
    speakersCount: number;
    active: boolean;
};

type VoiceChatEntity = {
    chat: VoiceChat;
    speakers?: VoiceChatParticipant[];
    listeners?: VoiceChatParticipant[];
};

const VoiceChatContext = React.createContext<VoiceChatEntity | null>(null);

export const VoiceChatProvider = React.memo((props: { room: VoiceChatEntity; children: any }) => {
    const [voiceChat, setVoiceChat] = React.useState<VoiceChatEntity>({
        chat: props.room.chat,
        speakers: props.room.speakers,
        listeners: props.room.listeners,
    });
    const client = useClient();
    const subscribeRef = React.useRef<any>(null);

    const subscribe = async () => {
        const { state: initialState } = (
            await client.queryVoiceChatEventsState(
                { id: props.room.chat.id },
                { fetchPolicy: 'network-only' },
            )
        ).voiceChatEventsState;

        subscribeRef.current = sequenceWatcher<VoiceChatEvents>(
            initialState,
            (state, handler) =>
                client.subscribeVoiceChatEvents(
                    { id: props.room.chat.id, fromState: state! },
                    handler,
                ),
            ({ voiceChatEvents }) => {
                const { events } = voiceChatEvents;
                setVoiceChat(prev => {
                    let newVoiceChat = prev.chat;
                    let newSpeakers = prev.speakers;
                    let newListeners = prev.listeners;
                    events.map((i) => {
                        if (i.__typename === 'VoiceChatUpdatedEvent') {
                            newVoiceChat = i.chat;
                        }
                        if (i.__typename === 'VoiceChatParticipantUpdatedEvent') {
                            const { participant, chat } = i;
                            newVoiceChat = chat;
                            const hasSpeaker = newSpeakers?.find(j => j.user.id === participant.user.id);
                            const hasListener = newListeners?.find(j => j.user.id === participant.user.id);
                            if (participant.status === 'LEFT' || participant.status === 'KICKED') {
                                newSpeakers?.filter(j => j.user.id !== participant.user.id);
                                newListeners?.filter(j => j.user.id !== participant.user.id);
                            }
                            if (participant.status === 'SPEAKER') {
                                if (!hasSpeaker) {
                                    newSpeakers?.push(participant);
                                }
                                if (!!hasListener) {
                                    newListeners?.filter(j => j.user.id !== participant.user.id);
                                }
                            }
                            if (participant.status === 'LISTENER') {
                                if (!hasListener) {
                                    newListeners?.push(participant);
                                }
                                if (!!hasSpeaker) {
                                    newSpeakers?.filter(j => j.user.id !== participant.user.id);
                                }
                            }
                        }
                    });
                    return {
                        chat: newVoiceChat,
                        speakers: newSpeakers,
                        listeners: newListeners
                    };
                });
                return voiceChatEvents.state;
            },
        );
    };

    React.useEffect(() => {
        (async () => {
            await subscribe();
        })();
        return () => {
            subscribeRef.current?.();
        };
    }, []);

    return (
        <VoiceChatContext.Provider value={voiceChat}>{props.children}</VoiceChatContext.Provider>
    );
});

// export const useVoiceChat = () => {
//     return React.useContext(VoiceChatContext);
// };
