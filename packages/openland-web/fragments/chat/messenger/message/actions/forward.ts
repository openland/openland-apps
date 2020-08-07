import { XViewRouter } from 'react-mental';
import { MessagesActionsStateEngine } from 'openland-engines/messenger/MessagesActionsState';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import UUID from 'uuid/v4';
import { showChatPicker } from 'openland-web/fragments/chat/showChatPicker';

const doForward = async (from: MessagesActionsStateEngine | DataSourceMessageItem[], engine: MessengerEngine, router: XViewRouter, toId: string, setShowLoader: (val: boolean) => void, hide: () => void) => {
    if (engine.user.id === toId) {
        setShowLoader(true);
        const room = await engine.client.queryRoomChat({ id: toId });
        if (room.room) {
            await engine.client.mutateSendMessage({ 
                repeatKey: UUID(),
                chatId: room.room.id,
                replyMessages: engine.convertForward(from).map(e => e.id!)
            });
        }
        setShowLoader(false);
    } else {
        engine.forward(from, toId);
        router.navigate('/mail/' + toId);
    }
    hide();
};

export const forward = (from: MessagesActionsStateEngine | DataSourceMessageItem[], engine: MessengerEngine, router: XViewRouter) =>
    showChatPicker((toId: string, setShowLoader: (val: boolean) => void, hide: () => void) => {
        doForward(from, engine, router, toId, setShowLoader, hide);
        return true;
    });