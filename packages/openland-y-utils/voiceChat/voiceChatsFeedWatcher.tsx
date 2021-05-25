import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { ActiveVoiceChatsEvents, VoiceChatShort } from 'openland-api/spacex.types';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

const VoiceChatsFeedContext = React.createContext<{
    chats: VoiceChatShort[];
    modalOpen: boolean;
    setModalOpen: (flag: boolean) => void;
}>({ chats: [], modalOpen: false, setModalOpen: () => {/**/ } });

export const VoiceChatsFeedProvider = React.memo((props: { children: any }) => {
    const [voiceChatsFeed, setVoiceChatsFeed] = React.useState<VoiceChatShort[]>([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const client = useClient();
    const subscribeRef = React.useRef<any>(null);

    const subscribe = async () => {
        subscribeRef.current = sequenceWatcher<ActiveVoiceChatsEvents>(
            null,
            (state, handler) => {
                (async () => {
                    const { activeVoiceChats } = await client.queryActiveVoiceChats(
                        { first: 50 },
                        { fetchPolicy: 'network-only' },
                    );
                    setVoiceChatsFeed(activeVoiceChats.items);
                })();
                return client.subscribeActiveVoiceChatsEvents(handler);
            },
            ({ activeVoiceChatsEvents }) => {
                setVoiceChatsFeed((prev) => {
                    let chats = prev;
                    activeVoiceChatsEvents.map((i) => {
                        const hasChat = !!chats.find((j) => j.id === i.chat.id);
                        if (!hasChat && i.chat.active) {
                            chats.unshift(i.chat);
                        }
                        if (hasChat && !i.chat.active) {
                            chats = chats.filter((j) => j.id !== i.chat.id);
                        }
                        if (hasChat && i.chat.active) {
                            chats = chats.map((j) => j.id === i.chat.id ? i.chat : j);
                        }
                    });
                    return Array.from(chats);
                });
                return null;
            },
        );
    };

    React.useEffect(() => {
        subscribe();
        return () => {
            subscribeRef.current?.();
        };
    }, []);

    return (
        <VoiceChatsFeedContext.Provider
            value={{ chats: voiceChatsFeed, modalOpen, setModalOpen }}
        >
            {props.children}
        </VoiceChatsFeedContext.Provider>
    );
});

export const useVoiceChatsFeed = () => {
    return React.useContext(VoiceChatsFeedContext);
};
