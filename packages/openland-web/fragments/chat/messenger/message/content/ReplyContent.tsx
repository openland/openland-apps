import * as React from 'react';
import { css } from 'linaria';
import { MessageContent } from '../MessageContent';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { MessageSenderContent } from '../MessageComponent';

const replyMessageGroupClass = css`
    display: flex;
    flex-direction: column;
    padding-left: 14px;
    position: relative;
    margin-top: 4px;
    margin-bottom: 4px;

    &::before {
        content: '';
        position: absolute;
        height: calc(100% - 6px);
        width: 2px;
        left: 0;
        top: 6px;
        background-color: #c4c7cc;
        border-radius: 2px;
    }
`;

export const ReplyMessagesGroup = (props: { quotedMessages: DataSourceWebMessageItem[] }) => {
    let firstMessage = props.quotedMessages[0];
    return (
        <div className={replyMessageGroupClass}>
            <MessageSenderContent
                sender={firstMessage.sender}
                senderNameEmojify={firstMessage.senderNameEmojify}
                date={firstMessage.date}
            />
            {props.quotedMessages.map(q => (
                <MessageContent
                    key={q.id}
                    id={q.id}
                    text={q.text}
                    textSpans={q.textSpans}
                    edited={q.isEdited}
                    reply={q.replyWeb}
                    attachments={q.attachments}
                    fallback={q.fallback}
                />
            ))}
        </div>
    );
};

export const ReplyContent = (props: { quotedMessages: DataSourceWebMessageItem[] }) => {
    let content = props.quotedMessages
        .reduce(
            (res, message, i, source) => {
                // group messages by sender
                let prev = source[i - 1];
                let group: DataSourceWebMessageItem[];
                if (message.sender.id === (prev && prev.sender.id)) {
                    group = res[res.length - 1];
                } else {
                    group = [];
                    res.push(group);
                }
                group.push(message);
                return res;
            },
            [] as DataSourceWebMessageItem[][],
        )
        .map((group, i) => {
            return <ReplyMessagesGroup key={i} {...props} quotedMessages={group} />;
        });
    return <>{content}</>;
};
