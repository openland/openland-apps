import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { VoiceChatWatch, VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

interface VoiceChatProvider {
    room: VoiceChatWithSpeakers;
    children: any;
}

const VoiceChatContext = React.createContext<VoiceChatWithSpeakers | null>(null);

export const VoiceChatProvider = React.memo((props: VoiceChatProvider) => {
    const [voiceChat, setVoiceChat] = React.useState<VoiceChatWithSpeakers | null>(props.room);
    const client = useClient();
    const subscribeRef = React.useRef<any>(null);

    const subscribe = () => {
        subscribeRef.current = sequenceWatcher<VoiceChatWatch>(
            null,
            (state, handler) => client.subscribeVoiceChatWatch({ id: props.room.id }, handler),
            ({ voiceChatWatch }) => {
                setVoiceChat(voiceChatWatch);
                return voiceChatWatch.id;
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
