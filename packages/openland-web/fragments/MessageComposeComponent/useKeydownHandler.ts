import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { isServerMessage } from 'openland-engines/messenger/types';
import { UserShort } from 'openland-api/Types';

export function useKeydownHandler({
    forwardMessagesId,
    setEditMessage,
    inputValue,
    quoteMessagesId,
    hasFocus,
    conversation,
    user,
}: {
    forwardMessagesId: Set<string>;
    setEditMessage: (id: string | null, message: string | null) => void;
    inputValue: string;
    quoteMessagesId: string[];
    hasFocus: () => boolean;
    conversation?: ConversationEngine;
    user: UserShort | null;
}) {
    const keydownHandler = (e: any) => {
        if (forwardMessagesId && forwardMessagesId.size > 0) {
            return;
        }

        if (
            inputValue.length === 0 &&
            conversation &&
            ((e.code === 'ArrowUp' && !e.altKey && hasFocus()) ||
                (e.code === 'KeyE' && e.ctrlKey)) &&
            !quoteMessagesId
        ) {
            let messages = conversation
                .getState()
                .messages.filter(
                    (m: any) => isServerMessage(m) && m.message && user && m.sender.id === user.id,
                );
            let messageData = messages[messages.length - 1];
            if (messageData && isServerMessage(messageData)) {
                e.preventDefault();
                setEditMessage(messageData.id, messageData.message);
            }
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', keydownHandler);

        return function cleanup() {
            window.removeEventListener('keydown', keydownHandler);
        };
    });
}
