import * as React from 'react';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { useUserBanInfo } from 'openland-y-utils/blacklist/LocalBlackList';
import { SharedRoomPlaceholder } from '../invite/InviteLandingComponent';
import { UHeader } from 'openland-unicorn/UHeader';
import { ChatHeader } from './header/ChatHeader';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { NotFound } from 'openland-unicorn/NotFound';
import { ChatSearch } from './chatSearch/ChatSearch';

interface ChatSearchState {
    enabled: boolean;
    initialQuery?: string;
}

interface СhatSearchContextProps {
    chatSearchState: ChatSearchState;
    setChatSearchState: (chatSearchState: ChatSearchState) => void;
}

export const ChatSearchContext = React.createContext<СhatSearchContextProps | null>(null);

export const MessengerFragment = React.memo<{ id: string }>((props) => {
    // Load chat info
    const client = useClient();
    const [chatSearchState, setChatSearchState] = React.useState<ChatSearchState>({ enabled: false });
    let chat = client.useRoomChat({ id: props.id }).room;

    if (!chat) {
        return <NotFound />;
    }
    const privateRoom = chat.__typename === 'PrivateRoom' && chat;
    const banInfo = privateRoom
        ? useUserBanInfo(
              privateRoom.user.id,
              privateRoom.user.isBanned,
              privateRoom.user.isMeBanned,
          )
        : undefined;

    const onChatLostAccess = React.useCallback(async () => {
        await client.refetchRoomChat({ id: props.id });
    }, []);

    // Pin message
    const pinMessage =
        chat.pinnedMessage && chat.pinnedMessage.__typename === 'GeneralMessage'
            ? chat.pinnedMessage
            : null;

    // Check group state
    const header = React.useMemo(() => {
        return (
            <ChatSearchContext.Provider value={{ chatSearchState, setChatSearchState }}>
                {chatSearchState.enabled ? <ChatSearch chatId={chat!.id} /> : <ChatHeader chat={chat!} />}
            </ChatSearchContext.Provider>);
    }, [chat, chatSearchState]);

    if (
        chat.__typename === 'SharedRoom' &&
        chat.kind !== 'INTERNAL' &&
        chat.membership !== 'MEMBER'
    ) {
        if (chat.kind === 'PUBLIC' || chat.isPremium) {
            return <SharedRoomPlaceholder room={chat} />;
        } else {
            return null;
        }
    }

    return (
        <ChatSearchContext.Provider value={{ chatSearchState, setChatSearchState }}>
            <UHeader
                titleView={header}
                documentTitle={chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title}
                appearance="wide"
                forceShowBack={!chatSearchState.enabled}
            />
            <Deferred>
                <XView
                    flexGrow={1}
                    flexShrink={1}
                    flexBasis={0}
                    minWidth={0}
                    minHeight={0}
                    alignSelf="stretch"
                    alignItems="stretch"
                >
                    <XView flexGrow={1} flexBasis={0} minHeight={0} flexShrink={1}>
                        <MessengerRootComponent
                            onChatLostAccess={onChatLostAccess}
                            pinMessage={pinMessage}
                            conversationId={chat.id}
                            conversationType={
                                chat.__typename === 'SharedRoom' ? chat.kind : 'PRIVATE'
                            }
                            room={chat}
                            banInfo={banInfo}
                        />
                    </XView>
                </XView>
            </Deferred>
        </ChatSearchContext.Provider>
    );
});
