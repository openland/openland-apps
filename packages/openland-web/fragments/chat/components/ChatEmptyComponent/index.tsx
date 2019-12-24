import React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import PublicPlaceholder from './public';
import PrivatePlaceholder from './private';

interface EmptyBlockProps {
    conversation: ConversationEngine;
}

export default (props: EmptyBlockProps) =>
    props.conversation.isPrivate ? <PrivatePlaceholder conversation={props.conversation} /> : <PublicPlaceholder />;
