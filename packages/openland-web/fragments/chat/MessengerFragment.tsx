import * as React from 'react';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { XView } from 'react-mental';
import { TalkBarComponent } from 'openland-web/modules/conference/TalkBarComponent';
import { useClient } from 'openland-web/utils/useClient';
import { SharedRoomPlaceholder } from '../invite/InviteLandingComponent';
import { UHeader } from 'openland-unicorn/UHeader';
import { ChatHeader } from './header/ChatHeader';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { NotFound } from 'openland-unicorn/NotFound';

export const MessengerFragment = React.memo<{ id: string }>(props => {
    // Load chat info
    const client = useClient();
    let chat = client.useRoomChat({ id: props.id }).room;

    if (!chat) {
        return <NotFound />;
    }

    const onChatLostAccess = React.useCallback(
        () => {
            client.refetchRoomWithoutMembers({ id: props.id });
        },
        [client],
    );

    // Pin message
    let pinMessage =
        chat.pinnedMessage && chat.pinnedMessage.__typename === 'GeneralMessage'
            ? chat.pinnedMessage
            : null;

    // Check group state
    const header = React.useMemo(
        () => {
            return <ChatHeader chat={chat!} />;
        },
        [chat],
    );

    if (
        chat.__typename === 'SharedRoom' &&
        chat.kind !== 'INTERNAL' &&
        chat.membership !== 'MEMBER'
    ) {
        if (chat.kind === 'PUBLIC') {
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
                    <TalkBarComponent chat={chat} />
                    <XView flexGrow={1} flexBasis={0} minHeight={0} flexShrink={1}>
                        <MessengerRootComponent
                            onChatLostAccess={onChatLostAccess}
                            pinMessage={pinMessage}
                            conversationId={chat.id}
                            conversationType={
                                chat.__typename === 'SharedRoom' ? chat.kind : 'PRIVATE'
                            }
                            room={chat}
                        />
                    </XView>
                </XView>
            </Deferred>
        </>
    );
});
