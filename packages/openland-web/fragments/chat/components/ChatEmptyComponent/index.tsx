import React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { PublicPlaceholder } from './public';
import { PrivatePlaceholder } from './private';

interface ChatEmptyComponentProps {
    conversation: ConversationEngine;
}

export const ChatEmptyComponent = (props: ChatEmptyComponentProps) =>
    props.conversation.isPrivate ? <PrivatePlaceholder conversation={props.conversation} /> : <PublicPlaceholder />;
