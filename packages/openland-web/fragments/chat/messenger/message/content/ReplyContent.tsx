import * as React from 'react';
import { css, cx } from 'linaria';
import { MessageContent } from '../MessageContent';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { MessageSenderContent } from '../MessageComponent';
import { TextBody } from 'openland-web/utils/TextStyles';

const replyMessageGroupClass = css`
    display: flex;
    flex-direction: column;
    padding-left: 14px;
    position: relative;
    margin-bottom: 4px;

    &:last-child {
        margin-bottom: 0;
    }

    &::before {
        content: '';
        position: absolute;
        width: 2px;
        left: 0;
        top: 4px;
        bottom: 4px;
        background-color: #c4c7cc;
        border-radius: 2px;
    }
`;

const replyItemClass = css`
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const forwardCaptionClass = css`
    color: var(--foregroundSecondary);
`;

export const ReplyMessagesGroup = (props: { quotedMessages: DataSourceWebMessageItem[], isForward?: boolean }) => {
    let firstMessage = props.quotedMessages[0];
    return (
        <div className={replyMessageGroupClass}>
            <MessageSenderContent
                sender={firstMessage.sender}
                senderNameEmojify={firstMessage.senderNameEmojify}
                date={firstMessage.date}
            />
            <div>
                {props.quotedMessages.map(q => (
                    <div className={replyItemClass} key={q.id}>
                        <MessageContent
                            id={q.id}
                            text={q.text}
                            textSpans={q.textSpans}
                            edited={q.isEdited}
                            reply={q.replyWeb}
                            attachments={q.attachments}
                            fallback={q.fallback}
                            isOut={q.isOut}
                            sticker={q.sticker}
                            isReply={true}
                            isForward={props.isForward}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const ForwardCaption = (props: {isForward?: boolean, messagesCount: number }) => {
    return props.isForward ? (
        <span className={cx(TextBody, forwardCaptionClass)}>
            {props.messagesCount} forwarded {props.messagesCount === 1 ? 'message' : 'messages'}
        </span>
    ) : null;
};

export const ReplyContent = (props: { quotedMessages: DataSourceWebMessageItem[], isForward: boolean }) => {
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
    return (
        <>
            <ForwardCaption isForward={props.isForward} messagesCount={props.quotedMessages.length} />
            {content}
        </>
    );
};
