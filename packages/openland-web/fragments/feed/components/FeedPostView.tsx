import * as React from 'react';
import { DataSourceFeedPostItem } from 'openland-engines/feed/FeedEngine';
import { MessageContent } from 'openland-web/fragments/chat/messenger/message/MessageContent';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { MessageSenderContent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { css } from 'linaria';

const wrapper = css`
    background-color: var(--backgroundTertiary);
    margin-bottom: 8px;
    padding: 4px 0;
`;

interface FeedPostViewProps {
    item: DataSourceFeedPostItem;
}

export const FeedPostView = React.memo<FeedPostViewProps>(props => {
    const messenger = React.useContext(MessengerContext);
    const { id, text, textSpans, fallback, attachments, date, sender } = props.item;

    return (
        <div className={wrapper}>
            <MessageSenderContent sender={sender} date={date} />
            <MessageContent
                id={id}
                text={text}
                textSpans={textSpans}
                fallback={fallback}
                isOut={messenger.user.id === sender.id}
                attachments={attachments}
            />
        </div>
    );
});
