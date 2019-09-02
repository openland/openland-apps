import * as React from 'react';
import { FeedDataSourceItem } from 'openland-engines/feed/FeedEngine';
import { MessageContent } from 'openland-web/fragments/chat/messenger/message/MessageContent';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { processSpans, createSimpleSpan } from 'openland-y-utils/spans/processSpans';
import { SpanType } from 'openland-y-utils/spans/Span';
import { MessageTextComponent } from 'openland-web/fragments/chat/messenger/message/content/MessageTextComponent';
import { MessageSenderContent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { css } from 'linaria';

const wrapper = css`
    background-color: var(--backgroundTertiary);
    margin-bottom: 8px;
    padding: 4px 0;
`;

interface FeedItemViewProps {
    item: FeedDataSourceItem;
}

export const FeedItemView = React.memo<FeedItemViewProps>(props => {
    const messenger = React.useContext(MessengerContext);
    const { id, content } = props.item;

    let res: JSX.Element | null = null;

    if (content && content.__typename === 'FeedPost' && content.message) {
        const { message } = content;

        res = (
            <>
                <MessageSenderContent sender={message.sender} date={parseInt(message.date, 10)} />
                <MessageContent
                    id={id}
                    text={message.message}
                    textSpans={processSpans(message.message || '', [])}
                    fallback={message.fallback}
                    isOut={messenger.user.id === message.sender.id}
                    attachments={[]}
                />
            </>
        );
    } else {
        res = <MessageTextComponent spans={createSimpleSpan('Unsupported content', SpanType.italic)} />;
    }

    return (
        <div className={wrapper}>
            {res}
        </div>
    );
});
