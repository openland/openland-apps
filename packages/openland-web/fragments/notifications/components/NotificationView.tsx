import * as React from 'react';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { MAvatar } from 'openland-web/fragments/chat/messenger/message/MAvatar';
import { css } from 'linaria';
import { DataSourceWebMessageItem } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { NotificationSender } from './NotificationSender';
import { RoomNano_SharedRoom } from 'openland-api/Types';
import { UIconLabeled } from 'openland-web/components/unicorn/UIconLabeled';
import ReplyIcon from 'openland-icons/s/ic-reply-24.svg';

const wrapper = css`
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
`;

const avatarWrapper = css`
    flex-shrink: 0;
`;

const content = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    padding-left: 16px;
    flex-direction: column;
`;

const replyWrapper = css`
    border-left: 2px solid #C4C7CC; // ThemeDefault.foregroundQuaternary
    margin: 4px 0;
    padding-left: 12px;
`;

const toolsWrapperClass = css`
    display: flex;
    flex-direction: row;
    margin-left: -8px;
`;

interface NotificationViewProps {
    notification: DataSourceWebMessageItem;
}

export const NotificationView = React.memo((props: NotificationViewProps) => {
    const { notification } = props;
    const { id, date, sender, text, attachments, textSpans, fallback, senderNameEmojify, peerRootId, room, replyQuoteTextEmojify, notificationType } = notification;
    const sharedRoom = room && room.__typename === 'SharedRoom' ? room as RoomNano_SharedRoom : undefined;

    return (
        <div className={wrapper}>
            <div className={avatarWrapper}>
                <MAvatar
                    senderId={sender.id}
                    senderName={sender.name}
                    senderNameEmojify={senderNameEmojify}
                    senderPhoto={sender.photo}
                />
            </div>
            <div className={content}>
                <NotificationSender
                    sender={sender}
                    senderNameEmojify={senderNameEmojify}
                    group={sharedRoom}
                    date={date}
                />
                {!!replyQuoteTextEmojify && (
                    <div className={replyWrapper}>
                        {replyQuoteTextEmojify}
                    </div>
                )}
                <MessageContent
                    id={id}
                    text={text}
                    textSpans={textSpans}
                    attachments={attachments}
                    fallback={fallback}
                />
                {notificationType === 'new_comment' && (
                    <div className={toolsWrapperClass}>
                        <UIconLabeled path={`/message/${peerRootId}`} icon={<ReplyIcon />} label="Reply" />
                    </div>
                )}
            </div>
        </div>
    );
});