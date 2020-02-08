import * as React from 'react';
import { OpenlandClient } from 'openland-api/spacex';
import { reliableWatcher } from 'openland-api/reliableWatcher';
import { ChatOnlinesCountWatch } from 'openland-api/spacex.types';

export const getChatOnlinesCount = (chatId: string, client: OpenlandClient, callback: (count: number) => void) => {
    React.useEffect(() => {
        return reliableWatcher<ChatOnlinesCountWatch>((handler) => client.subscribeChatOnlinesCountWatch({ chatId: chatId }, handler), (src) => {
            callback(src.chatOnlinesCount.onlineMembers);
        });
    }, [chatId]);
};