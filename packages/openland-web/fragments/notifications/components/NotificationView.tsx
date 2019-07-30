import * as React from 'react';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { MAvatar } from 'openland-web/fragments/chat/messenger/message/MAvatar';
import { css } from 'linaria';
import { DataSourceWebMessageItem } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { NotificationTools } from './NotificationTools';
import { NotificationSender } from './NotificationSender';
import { RoomNano_SharedRoom } from 'openland-api/Types';

const wrapper = css`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
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
    border-left: 2px solid #1885F2;
    margin: 4px 0 6px;
`;

const replyInnerWrapper = css`
    padding-left: 12px;
    opacity: 0.6;
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
                />
                {!!replyQuoteTextEmojify && (
                    <div className={replyWrapper}>
                        <div className={replyInnerWrapper}>
                            {replyQuoteTextEmojify}
                        </div>
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
                    <NotificationTools
                        messageId={peerRootId}
                        date={date}
                    />
                )}
            </div>
        </div>
    );
});