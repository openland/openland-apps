import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { ActiveVoiceChatsEvents, VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

const VoiceChatsFeedContext = React.createContext<{
    chats: VoiceChatWithSpeakers[];
    cursor: string | null;
}>({ chats: [], cursor: null });

export const VoiceChatsFeedProvider = React.memo((props: { children: any }) => {
    const [voiceChatsFeed, setVoiceChatsFeed] = React.useState<VoiceChatWithSpeakers[]>([]);
    const [voiceChatsFeedCursor, setVoiceChatsFeedCursor] = React.useState<string | null>(null);
    const client = useClient();
    const subscribeRef = React.useRef<any>(null);

    const subscribe = async () => {
        const { activeVoiceChats } = await client.queryActiveVoiceChats(
            { first: 12 },
            { fetchPolicy: 'network-only' },
        );
        setVoiceChatsFeed(activeVoiceChats.items);
        setVoiceChatsFeedCursor(activeVoiceChats.cursor);

        subscribeRef.current = sequenceWatcher<ActiveVoiceChatsEvents>(
            null,
            (state, handler) => client.subscribeActiveVoiceChatsEvents(handler),
            ({ activeVoiceChatsEvents }) => {
                setVoiceChatsFeed((prev) => {
                    let chats = prev;
                    activeVoiceChatsEvents.map((i) => {
                        const hasChat = !!chats.find((j) => j.id === i.chat.id);
                        if (!hasChat && i.chat.active) {
                            chats.push(i.chat);
                        }
                        if (hasChat && !i.chat.active) {
                            chats = chats.filter((j) => j.id !== i.chat.id);
                        }
                    });
                    return Array.from(chats);
                });
                return null;
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
        <VoiceChatsFeedContext.Provider
            value={{ chats: voiceChatsFeed, cursor: voiceChatsFeedCursor }}
        >
            {props.children}
        </VoiceChatsFeedContext.Provider>
    );
});

export const useVoiceChatsFeed = () => {
    return React.useContext(VoiceChatsFeedContext);
};
