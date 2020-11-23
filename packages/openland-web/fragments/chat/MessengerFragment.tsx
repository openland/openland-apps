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
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { ChatSearchContext } from 'openland-web/pages/root/AppContainer';

export const MessengerFragment = React.memo<{ id: string }>((props) => {
    // Load chat info
    const client = useClient();
    const { chatSearchState } = React.useContext(ChatSearchContext)!;

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
    const header = React.useMemo(
        () => chatSearchState.enabled ? <ChatSearch chatId={chat!.id} /> : <ChatHeader chat={chat!} />,
        [chat, chatSearchState.enabled],
    );

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
        <>
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
        </>
    );
});
