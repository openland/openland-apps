import * as React from 'react';
import { FullMessage } from 'openland-api/spacex.types';
import { formatMessage } from 'openland-engines/messenger/formatMessage';
import { InputTopView } from './InputTopView';

interface ForwardReplyViewProps {
    messages: FullMessage[];

    action?: 'forward' | 'reply';
    onClearPress: () => void;
}

export const ForwardReplyView = (props: ForwardReplyViewProps) => {
    const { messages, onClearPress, action } = props;

    const title = (messages.length === 1) ? (messages[0].sender.name) : ((action === 'reply') ? 'Reply messages' : 'Forward messages');
    const text = (messages.length === 1) ? (formatMessage(messages[0])) : (messages.length + ' messages');

    return <InputTopView title={title} text={text} icon={require('assets/ic-reply-24.png')} onClearPress={onClearPress} />;
};