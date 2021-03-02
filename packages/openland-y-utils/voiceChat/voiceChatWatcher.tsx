import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { VoiceChatEntity, VoiceChatParticipant, VoiceChatEvents } from 'openland-api/spacex.types';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

export type VoiceChatT = VoiceChatEntity & {
    speakers?: VoiceChatParticipant[];
    listeners?: VoiceChatParticipant[];
    raisedHands?: VoiceChatParticipant[];
};

const VoiceChatContext = React.createContext<VoiceChatT | null>(null);

export const VoiceChatProvider = React.memo((props: { room: VoiceChatT; children: any }) => {
    const [voiceChat, setVoiceChat] = React.useState<VoiceChatT>({
        ...props.room,
        speakers: props.room.speakers,
        listeners: props.room.listeners,
        raisedHands: props.room.raisedHands,
    });
    const client = useClient();
    const subscribeRef = React.useRef<any>(null);

    const subscribe = async () => {
        const { state: initialState } = (
            await client.queryVoiceChatEventsState(
                { id: props.room.id },
                { fetchPolicy: 'network-only' },
            )
        ).voiceChatEventsState;

        subscribeRef.current = sequenceWatcher<VoiceChatEvents>(
            initialState,
            (state, handler) =>
                client.subscribeVoiceChatEvents(
                    { id: props.room.id, fromState: state! },
                    handler,
                ),
            ({ voiceChatEvents }) => {
                const { events } = voiceChatEvents;
                setVoiceChat(prev => {
                    let newVoiceChat = prev;
                    let newSpeakers = prev.speakers || [];
                    let newListeners = prev.listeners || [];
                    let newRaisedHands = prev.raisedHands || [];
                    events.map((i) => {
                        if (i.__typename === 'VoiceChatUpdatedEvent') {
                            newVoiceChat = i.chat;
                        }
                        if (i.__typename === 'VoiceChatParticipantUpdatedEvent') {
                            const { participant, chat } = i;
                            newVoiceChat = chat;
                            const hasSpeaker = newSpeakers.find(j => j.user.id === participant.user.id);
                            const hasListener = newListeners.find(j => j.user.id === participant.user.id);
                            const hasRaisedHand = newRaisedHands.find(j => j.user.id === participant.user.id && j.handRaised );
                            if (participant.status === 'LEFT' || participant.status === 'KICKED') {
                                newSpeakers = newSpeakers.filter(j => j.user.id !== participant.user.id);
                                newListeners = newListeners.filter(j => j.user.id !== participant.user.id);
                                newRaisedHands = newRaisedHands.filter(j => j.user.id !== participant.user.id);
                            }
                            if (participant.status === 'ADMIN') {
                                if (!hasSpeaker) {
                                    newSpeakers.push(participant);
                                }
                                if (!!hasListener) {
                                    newListeners = newListeners.filter(j => j.user.id !== participant.user.id);
                                }
                            }
                            if (participant.status === 'SPEAKER') {
                                if (!hasSpeaker) {
                                    newSpeakers.push(participant);
                                }
                                if (!!hasListener) {
                                    newListeners = newListeners.filter(j => j.user.id !== participant.user.id);
                                }
                                if (hasRaisedHand) {
                                    newRaisedHands = newRaisedHands.filter(j => j.user.id !== participant.user.id);
                                }
                            }
                            if (participant.status === 'LISTENER') {
                                if (!hasListener) {
                                    newListeners.push(participant);
                                }
                                if (!!hasSpeaker) {
                                    newSpeakers = newSpeakers.filter(j => j.user.id !== participant.user.id);
                                }
                                if (!hasRaisedHand && participant.handRaised) {
                                    newRaisedHands.push(participant);
                                }
                                if (hasRaisedHand && !participant.handRaised) {
                                    newRaisedHands = newRaisedHands.filter(j => j.user.id !== participant.user.id);
                                }
                            }
                        }
                    });
                    return {
                        ...newVoiceChat,
                        speakers: newSpeakers,
                        listeners: newListeners,
                        raisedHands: newRaisedHands,
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

export const useVoiceChat = () => {
    return React.useContext(VoiceChatContext);
};
