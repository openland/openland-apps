import * as React from 'react';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { forever } from 'openland-engines/utils/forever';

export const getChatOnlinesCount = (chatId: string, client: OpenlandClient, callback: (count: number) => void) => {
    React.useEffect(
        () => {
            let sub = client.subscribeChatOnlinesCountWatch({ chatId: chatId });
    
            forever(async () => {
                callback((await sub.get()).chatOnlinesCount.onlineMembers);
            });
    
            return () => {
                sub.destroy();
            };
        },
        [chatId],
    );
};