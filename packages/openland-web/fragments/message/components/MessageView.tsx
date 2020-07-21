import * as React from 'react';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { FullMessage, Message_message_GeneralMessage, Message_message_StickerMessage } from 'openland-api/spacex.types';
import { MessageContent } from 'openland-web/fragments/chat/messenger/message/MessageContent';
import { convertDsMessage, DataSourceWebMessageItem } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { Span } from 'openland-y-utils/spans/Span';
import { emoji } from 'openland-y-utils/emoji';
import { MessageReactions } from 'openland-web/fragments/chat/messenger/message/reactions/MessageReactions';
import { MessageSenderContent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { css } from 'linaria';
import { reduceUserReactions } from 'openland-engines/reactions/reduceReactions';
import { getReactionFullCounter } from 'openland-engines/reactions/getReactionsLabel';
import { XViewRouterContext } from 'react-mental';

const avatarWrapper = css`
    flex-shrink: 0;
    padding-top: 4px;
`;

const content = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: 16px;
    flex-direction: column;
`;

const wrapper = css`
    display: flex;
    flex-direction: row;
    padding: 4px 0;
`;

const buttonsClass = css`
    margin-top: 8px;
    display: flex;
    flex-direction: row;
`;

interface MessageViewProps {
    message: Message_message_GeneralMessage | Message_message_StickerMessage;
}

export const MessageView = React.memo((props: MessageViewProps) => {
    const { message } = props;
    const messenger = React.useContext(MessengerContext);
    const { sender } = message;
    const [reply, setReply] = React.useState<DataSourceWebMessageItem[]>([]);
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);
    const [senderNameEmojify, setSenderNameEmojify] = React.useState<string | JSX.Element>(sender.name);
    const [reactionFullCounter, setReactionFullCounter] = React.useState<string>('');
    const router = React.useContext(XViewRouterContext)!;

    React.useEffect(() => {
        setReply(message.quotedMessages.map((r) => convertDsMessage(convertMessage(r as FullMessage, '', messenger))));
    }, [message.quotedMessages]);

    React.useEffect(() => {
        setTextSpans(processSpans(message.message || '', message.spans));
    }, [message.message, message.spans]);

    React.useEffect(() => {
        setSenderNameEmojify(emoji(sender.name));
    }, [sender.name]);

    React.useEffect(() => {
        setReactionFullCounter(getReactionFullCounter(message.reactionCounters));
    }, [message.reactionCounters]);

    return (
        <div className={wrapper}>
            <div className={avatarWrapper}>
                <UAvatar
                    id={sender.id}
                    title={sender.name}
                    photo={sender.photo}
                    onClick={() => {
                        if (router) {
                            router.navigate(`/${sender.id}`);
                        }
                    }}
                />
            </div>
            <div className={content}>
                <MessageSenderContent
                    sender={sender}
                    senderNameEmojify={senderNameEmojify}
                    date={parseInt(message.date, 10)}
                    dateFormat="date-time"
                />
                <MessageContent
                    id={message.id}
                    text={message.message}
                    textSpans={textSpans}
                    edited={message.__typename === 'GeneralMessage' ? message.edited : false}
                    reply={reply}
                    attachments={message.__typename === 'GeneralMessage' ? message.attachments : undefined}
                    fallback={message.fallback}
                    sticker={message.__typename === 'StickerMessage' ? message.sticker : undefined}
                    isOut={sender.id === messenger.user.id}
                />
                <div className={buttonsClass}>
                    <MessageReactions
                        message={{
                            ...message,
                            reactionFullCounter
                        }}
                    />
                </div>
            </div>
        </div>
    );
});