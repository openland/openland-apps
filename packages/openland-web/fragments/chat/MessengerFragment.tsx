import * as React from 'react';
import { MessengerRootComponent } from './components/MessengerRootComponent';
import { MessagesStateContext } from './messenger/MessagesStateContext';
import { XView } from 'react-mental';
import { TalkBarComponent } from 'openland-web/modules/conference/TalkBarComponent';
import { ForwardPlaceholder } from './ForwardPlaceholder';
import { useClient } from 'openland-web/utils/useClient';
import { SharedRoomPlaceholder } from '../invite/InviteLandingComponent';

export const MessengerFragment = React.memo<{ id: string }>(props => {

    // Load chat info
    const client = useClient();
    let chat = client.useRoomChat({ id: props.id }).room!;
    const onChatLostAccess = React.useCallback(() => {
        client.refetchRoom({ id: props.id });
    }, [client]);

    // Messaging state
    const state = React.useContext(MessagesStateContext);

    // Pin message
    let pinMessage = chat.pinnedMessage &&
        chat.pinnedMessage.__typename === 'GeneralMessage'
        ? chat.pinnedMessage
        : null;

    // Check group state
    if (chat.__typename === 'SharedRoom' && chat.kind !== 'INTERNAL' && chat.membership !== 'MEMBER') {
        if (chat.kind === 'PUBLIC') {
            return <SharedRoomPlaceholder room={chat} />;
        } else {
            throw Error('Access denied');
        }
    }

    return (
        <XView
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            minWidth={0}
            minHeight={0}
            alignSelf="stretch"
            alignItems="stretch"
        >
            {state.useForwardPlaceholder && <ForwardPlaceholder state={state} />}
            <TalkBarComponent chat={chat} />
            <XView
                flexGrow={1}
                flexBasis={0}
                minHeight={0}
                flexShrink={1}
            >
                <MessengerRootComponent
                    onChatLostAccess={onChatLostAccess}
                    pinMessage={pinMessage}
                    conversationId={chat.id}
                    conversationType={chat.__typename === 'SharedRoom' ? chat.kind : 'PRIVATE'}
                    room={chat}
                />
            </XView>
        </XView>
    );
});
