import * as React from 'react';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import {
    FullMessage,
    Message_message_GeneralMessage,
    Message_message_GeneralMessage_source_MessageSourceChat_chat_PrivateRoom,
    Message_message_GeneralMessage_source_MessageSourceChat_chat_SharedRoom,
    Message_message_StickerMessage,
    Message_message_StickerMessage_source_MessageSourceChat_chat_PrivateRoom,
    Message_message_StickerMessage_source_MessageSourceChat_chat_SharedRoom,
} from 'openland-api/spacex.types';
import { MessageContent } from 'openland-web/fragments/chat/messenger/message/MessageContent';
import {
    convertDsMessage,
    DataSourceWebMessageItem,
} from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { Span } from 'openland-y-utils/spans/Span';
import { MessageReactions } from 'openland-web/fragments/chat/messenger/message/reactions/MessageReactions';
import { MessageSenderContent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { css, cx } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { defaultHover } from 'openland-web/utils/Styles';
import { TextBody, TextLabel1 } from 'openland-web/utils/TextStyles';

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

const messageSourceClass = css`
    color: var(--foregroundSecondary);
    margin-top: 4px;
`;

const messageSourceEntityClass = css`
    color: var(--foregroundSecondary);

    &:hover {
        color: var(--foregroundSecondary);
        text-decoration: none;
    }
`;

const getChatLink = (
    chat:
        | Message_message_GeneralMessage_source_MessageSourceChat_chat_PrivateRoom
        | Message_message_GeneralMessage_source_MessageSourceChat_chat_SharedRoom
        | Message_message_StickerMessage_source_MessageSourceChat_chat_PrivateRoom
        | Message_message_StickerMessage_source_MessageSourceChat_chat_SharedRoom,
) => {
    if (chat.__typename === 'SharedRoom') {
        return (
            <>
                From{' '}
                <ULink
                    path={`/mail/${chat.id}`}
                    className={cx(TextLabel1, messageSourceEntityClass, defaultHover)}
                >
                    {chat.title}
                </ULink>
            </>
        );
    } else {
        return (
            <>
                From chat with{' '}
                <ULink
                    path={`/mail/${chat.id}`}
                    className={cx(TextLabel1, messageSourceEntityClass, defaultHover)}
                >
                    {chat.user.name}
                </ULink>
            </>
        );
    }
};

interface MessageViewProps {
    message: Message_message_GeneralMessage | Message_message_StickerMessage;
}

export const MessageView = React.memo((props: MessageViewProps) => {
    const { message } = props;
    const messenger = React.useContext(MessengerContext);
    const { sender } = message;
    const [reply, setReply] = React.useState<DataSourceWebMessageItem[]>([]);
    const [textSpans, setTextSpans] = React.useState<Span[]>([]);
    const router = React.useContext(XViewRouterContext)!;
    const isChannel = message.source?.__typename === 'MessageSourceChat' && message.source.chat.__typename === 'SharedRoom' && message.source.chat.isChannel;

    React.useEffect(() => {
        setReply(
            message.quotedMessages.map((r) =>
                convertDsMessage(convertMessage(r as FullMessage, '', messenger)),
            ),
        );
    }, [message.quotedMessages]);

    React.useEffect(() => {
        setTextSpans(processSpans(message.message || '', message.spans));
    }, [message.message, message.spans]);

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
                    date={parseInt(message.date, 10)}
                    dateFormat="date-time"
                />
                <MessageContent
                    id={message.id}
                    text={message.message}
                    textSpans={textSpans}
                    edited={message.__typename === 'GeneralMessage' ? message.edited : false}
                    reply={reply}
                    attachments={
                        message.__typename === 'GeneralMessage' ? message.attachments : undefined
                    }
                    fallback={message.fallback}
                    sticker={message.__typename === 'StickerMessage' ? message.sticker : undefined}
                    isOut={sender.id === messenger.user.id}
                    chatId={
                        message.source && message.source.__typename === 'MessageSourceChat'
                            ? message.source.chat.id
                            : undefined
                    }
                />
                {message.source && message.source.__typename === 'MessageSourceChat' && (
                    <div className={cx(TextBody, messageSourceClass)}>
                        {getChatLink(message.source.chat)}
                    </div>
                )}
                <div className={buttonsClass}>
                    <MessageReactions
                        message={{
                            ...message,
                        }}
                        isChannel={isChannel}
                    />
                </div>
            </div>
        </div>
    );
});
