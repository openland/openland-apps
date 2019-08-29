import * as React from 'react';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { FullMessage, Message_message_GeneralMessage } from 'openland-api/Types';
import { MessageContent } from 'openland-web/fragments/chat/messenger/message/MessageContent';
import { convertDsMessage, DataSourceWebMessageItem, emojifyReactions } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { Span } from 'openland-y-utils/spans/Span';
import { emoji } from 'openland-y-utils/emoji';
import { MessageReactions } from 'openland-web/fragments/chat/messenger/message/reactions/MessageReactions';
import { MessageSenderContent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { css } from 'linaria';
import { showAvatarModal } from 'openland-web/components/showAvatarModal';
import { ReactionReducedEmojify } from 'openland-engines/reactions/types';
import { reduceReactions } from 'openland-engines/reactions/reduceReactions';
import { getReactionsLabel } from 'openland-engines/reactions/getReactionsLabel';

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

export const MessageView = React.memo((props: { message: Message_message_GeneralMessage }) => {
    const { message } = props;
    const messenger = React.useContext(MessengerContext);
    const { sender } = message;
    const [reply, setReply] = React.useState<DataSourceWebMessageItem[]>([]);
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);
    const [senderNameEmojify, setSenderNameEmojify] = React.useState<string | JSX.Element>(sender.name);
    const [reactionsReduced, setReactionsReduced] = React.useState<ReactionReducedEmojify[]>([]);
    const [reactionsLabel, setReactionsLabel] = React.useState<string | JSX.Element>('');

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
        setReactionsReduced(emojifyReactions(reduceReactions(message.reactions, messenger.user.id)));
        setReactionsLabel(emoji(getReactionsLabel(message.reactions, messenger.user.id)));
    }, [message.reactions]);

    return (
        <div className={wrapper}>
            <div className={avatarWrapper}>
                <UAvatar
                    id={sender.id}
                    title={sender.name}
                    photo={sender.photo}
                    onClick={sender.photo && !sender.photo.startsWith('ph://') ? () => showAvatarModal(sender.photo!) : undefined}
                />
            </div>
            <div className={content}>
                <MessageSenderContent
                    sender={sender}
                    senderNameEmojify={senderNameEmojify}
                    date={parseInt(message.date, 10)}
                />
                <MessageContent
                    id={message.id}
                    text={message.message}
                    textSpans={textSpans}
                    edited={message.edited}
                    reply={reply}
                    attachments={message.attachments}
                    fallback={message.fallback}
                    isOut={sender.id === messenger.user.id}
                />
                <div className={buttonsClass}>
                    <MessageReactions
                        messageId={message.id}
                        reactions={message.reactions}
                        reactionsReduced={reactionsReduced}
                        reactionsLabel={reactionsLabel}
                    />
                </div>
            </div>
        </div>
    );
});