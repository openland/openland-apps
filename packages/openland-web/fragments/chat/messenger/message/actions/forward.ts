import * as React from 'react';
import { XViewRouterContext } from 'react-mental';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import UUID from 'uuid/v4';
import { showChatPicker } from 'openland-web/fragments/chat/showChatPicker';
import { useMessagesActionsForward } from 'openland-y-runtime/MessagesActionsState';

export const useForward = (selectedFrom: string) => {
    const engine = React.useContext(MessengerContext);
    const router = React.useContext(XViewRouterContext)!;

    const { prepareForward, forward } = useMessagesActionsForward({ sourceId: selectedFrom });

    return (messages?: DataSourceMessageItem[]) => showChatPicker((toId: string, setShowLoader: (val: boolean) => void, hide: () => void) => {
        (async () => {
            if (engine.user.id === toId) {
                setShowLoader(true);
                const room = await engine.client.queryRoomChat({ id: toId });
                if (room.room) {
                    let forwardIds = prepareForward({ targetId: toId, messages }).map(e => e.id!);
                    await engine.client.mutateSendMessage({
                        repeatKey: UUID(),
                        chatId: room.room.id,
                        replyMessages: forwardIds,
                    });
                }
                setShowLoader(false);
            } else {
                forward({ targetId: toId, messages });
                router.navigate('/mail/' + toId);
            }
            hide();
        })();
        return true;
    });
};
