import * as React from 'react';
import UUID from 'uuid/v4';
import { XViewRouterContext } from 'react-mental';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { showChatPicker } from 'openland-web/fragments/chat/showChatPicker';
import { useMessagesActionsForward } from 'openland-y-utils/MessagesActionsState';
import { useToast } from 'openland-web/components/unicorn/UToast';

export const useForward = (selectedFrom: string, sourceUserId: string | undefined, hideSource?: boolean) => {
    const toastHandlers = useToast();
    const engine = React.useContext(MessengerContext);
    const router = React.useContext(XViewRouterContext)!;

    const { prepareForward, forward } = useMessagesActionsForward({ sourceId: selectedFrom, userId: sourceUserId });

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
                toastHandlers.show({
                    type: 'success',
                    text: 'Added to saved messages'
                });
            } else {
                forward({ targetId: toId, messages });
                router.navigate('/mail/' + toId);
            }
            hide();
        })();
        return true;
    }, hideSource ? [selectedFrom] : undefined);
};
