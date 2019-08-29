import * as React from 'react';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { MAvatar } from 'openland-web/fragments/chat/messenger/message/MAvatar';
import { css } from 'linaria';
import { DataSourceWebMessageItem } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { NotificationSender } from './NotificationSender';
import { RoomNano_SharedRoom, CommentSubscriptionType } from 'openland-api/Types';
import { UIconLabeled } from 'openland-web/components/unicorn/UIconLabeled';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useClient } from 'openland-web/utils/useClient';
import ReplyIcon from 'openland-icons/s/ic-reply-24.svg';
import ClearIcon from 'openland-icons/s/ic-delete-24.svg';
import FollowIcon from 'openland-icons/s/ic-follow-24.svg';
import UnfollowIcon from 'openland-icons/s/ic-follow-off-24.svg';

const wrapper = css`
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    padding: 4px 0;
`;

const avatarWrapper = css`
    padding-top: 4px;
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
    border-left: 2px solid var(--foregroundQuaternary);
    margin: 4px 0;
    padding-left: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
    const client = useClient();
    const { notification } = props;
    const { id, date, sender, text, attachments, textSpans, fallback, senderNameEmojify, peerRootId, room, replyQuoteTextEmojify, notificationType, notificationId, isSubscribedMessageComments } = notification;
    const sharedRoom = room && room.__typename === 'SharedRoom' ? room as RoomNano_SharedRoom : undefined;

    const handleFollowToggler = React.useCallback(() => {
        if (notificationId && peerRootId) {
            if (isSubscribedMessageComments) {
                client.mutateUnSubscribeMessageComments({ messageId: peerRootId });
            } else {
                client.mutateSubscribeMessageComments({ messageId: peerRootId, type: CommentSubscriptionType.ALL });
            }
        }
    }, [notificationId, peerRootId, isSubscribedMessageComments]);

    const handleClearClick = React.useCallback(() => {
        if (notificationId) {
            const builder = new AlertBlanketBuilder();

            builder.title('Clear notification');
            builder.message('Clear this notification? This cannot be undone.');
            builder.action('Clear', async () => {
                await client.mutateDeleteNotification({ notificationId });
            }, 'danger');
            builder.show();
        }
    }, [notificationId]);

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
                        <UIconLabeled
                            onClick={handleFollowToggler}
                            icon={isSubscribedMessageComments ? <UnfollowIcon /> : <FollowIcon />}
                            label={isSubscribedMessageComments ? 'Unfollow thread' : 'Follow thread'}
                        />
                        <UIconLabeled onClick={handleClearClick} icon={<ClearIcon />} label="Clear" />
                    </div>
                )}
            </div>
        </div>
    );
});