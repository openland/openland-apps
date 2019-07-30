import * as React from 'react';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { FullMessage, Message_message_GeneralMessage } from 'openland-api/Types';
import { MessageContent } from 'openland-web/fragments/chat/messenger/message/MessageContent';
import { convertDsMessage, DataSourceWebMessageItem } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { Span } from 'openland-y-utils/spans/Span';
import { SenderView } from '../../../components/SenderView';
import { emoji } from 'openland-y-utils/emoji';

export const MessageView = React.memo((props: { message: Message_message_GeneralMessage }) => {
    const { message } = props;
    const messenger = React.useContext(MessengerContext);
    const [reply, setReply] = React.useState<DataSourceWebMessageItem[]>([]);
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);
    const [senderNameEmojify, setSenderNameEmojify] = React.useState<string | JSX.Element>(message.sender.name);

    React.useEffect(() => {
        setReply(message.quotedMessages.map((r) => convertDsMessage(convertMessage(r as FullMessage, '', messenger))));
    }, [message.quotedMessages]);

    React.useEffect(() => {
        setTextSpans(processSpans(message.message || '', message.spans));
    }, [message.message, message.spans]);

    React.useEffect(() => {
        setSenderNameEmojify(emoji(message.sender.name));
    }, [message.sender.name]);

    return (
        <div>
            <SenderView
                sender={message.sender}
                date={message.date}
                senderNameEmojify={senderNameEmojify}
            />
            <MessageContent
                id={message.id}
                text={message.message}
                textSpans={textSpans}
                edited={message.edited}
                reply={reply}
                attachments={message.attachments}
                fallback={message.fallback}
            />
        </div>
    );
});