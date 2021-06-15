import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { MessageContent } from '../../chat/messenger/message/MessageContent';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { DataSourceWebMessageItem } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { NotificationSender } from './NotificationSender';
import { RoomNano_SharedRoom, CommentSubscriptionType } from 'openland-api/spacex.types';
import { UIconLabeled } from 'openland-web/components/unicorn/UIconLabeled';
import { AlertBlanketBuilder } from 'openland-x/AlertBlanket';
import { useClient } from 'openland-api/useClient';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import ReplyIcon from 'openland-icons/s/ic-reply-24.svg';
import ClearIcon from 'openland-icons/s/ic-delete-24.svg';
import FollowIcon from 'openland-icons/s/ic-follow-24.svg';
import UnfollowIcon from 'openland-icons/s/ic-follow-off-24.svg';
import MoreHIcon from 'openland-icons/s/ic-more-h-24.svg';

const wrapper = css`
    display: flex;
    flex-direction: row;
    margin: 0 -16px;
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
    color: var(--foregroundPrimary);
    margin: 4px 0;
    padding-left: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
  
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 20px;
      border-radius: 2px;
      background-color: var(--foregroundQuaternary);
    }
`;

const toolsWrapperClass = css`
    display: flex;
    flex-direction: row;
    margin-left: -8px;
`;

interface MenuComponentProps {
    ctx: UPopperController;
    subscribed: boolean;
    onFollowToggle?: () => void;
    onClear: () => void;
}

const MenuComponent = React.memo((props: MenuComponentProps) => {
    const { ctx, subscribed, onFollowToggle, onClear } = props;
    const builder = new UPopperMenuBuilder();

    let [subsribed, setSubsribed] = React.useState(subscribed);

    if (onFollowToggle) {
        builder.item({
            title: subsribed ? 'Unfollow thread' : 'Follow thread',
            icon: subsribed ? <UnfollowIcon /> : <FollowIcon />,
            onClick: () => {
                setSubsribed(!subscribed);
                onFollowToggle();
            },
            closeDelay: 400
        });
    }

    builder.item({
        title: 'Clear',
        icon: <ClearIcon />,
        onClick: onClear
    });

    return builder.build(ctx);
});

interface NotificationViewProps {
    notification: DataSourceWebMessageItem;
}

export const NotificationCommentView = React.memo((props: NotificationViewProps) => {
    const client = useClient();
    const { notification } = props;
    const { id, date, sender, text, attachments, textSpans, fallback, senderNameEmojify, peerRootId, room, replyQuoteTextEmojify, notificationType, notificationId, isSubscribedMessageComments, peerRootType } = notification;
    const sharedRoom = room && room.__typename === 'SharedRoom' ? room as RoomNano_SharedRoom : undefined;

    // Sorry universe
    const isSubscribedMessageCommentsRef = React.useRef(!!isSubscribedMessageComments);
    isSubscribedMessageCommentsRef.current = !!isSubscribedMessageComments;

    const handleFollowToggler = React.useCallback(() => {
        if (notificationId && peerRootId) {
            if (!!isSubscribedMessageCommentsRef.current) {
                client.mutateUnSubscribeFromComments({ peerId: peerRootId });
            } else {
                client.mutateSubscribeToComments({ peerId: peerRootId, type: CommentSubscriptionType.ALL });
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

    const [toolsVisible, toolsShow] = usePopper({ hideOnClick: true, hideOnEsc: true, placement: 'bottom-start' }, ctx => <MenuComponent ctx={ctx} onClear={handleClearClick} onFollowToggle={handleFollowToggler} subscribed={!!isSubscribedMessageCommentsRef.current} />);

    const path = `/${peerRootType === 'CommentPeerRootFeedItem' ? 'feed' : 'message'}/${peerRootId}/comment/${id}`;

    return (
        <div className={wrapper}>
            <div className={avatarWrapper}>
                <UAvatar
                    id={sender.id}
                    photo={sender.photo}
                />
            </div>
            <div className={content}>
                <NotificationSender
                    sender={sender}
                    senderNameEmojify={senderNameEmojify}
                    group={sharedRoom}
                    date={date}
                />
                <XView path={path + '?reply=false'} cursor="pointer">
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
                </XView>
                {notificationType === 'new_comment' && (
                    <div className={toolsWrapperClass}>
                        <UIconLabeled path={path} icon={<ReplyIcon />} label="Reply" />
                        <UIconButton size="small" icon={<MoreHIcon />} onClick={toolsShow} active={toolsVisible} />
                    </div>
                )}
            </div>
        </div>
    );
});