import { ComponentType } from 'react';
import { ChatMessagesActions } from 'openland-y-utils/MessagesActionsState';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';

export type MessagesActionsStateProviderType = ComponentType<{ children: any }>;

export type useChatMessagesActionsType = ({ conversationId, userId }: {
    conversationId: string | undefined;
    userId: string | undefined;
}) => ChatMessagesActions;

export type useMessagesActionsForwardType = ({ sourceId }: {
    sourceId: string;
}) => {
    forward: ({ targetId, messages }: {
        targetId: string;
        messages?: DataSourceMessageItem[] | undefined;
    }) => void;
    prepareForward: ({ targetId, messages }: {
        targetId: string;
        messages?: DataSourceMessageItem[] | undefined;
    }) => DataSourceMessageItem[];
};
