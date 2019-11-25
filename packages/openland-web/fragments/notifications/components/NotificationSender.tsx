import * as React from 'react';
import { css, cx } from 'linaria';
import { TextCaption, TextLabel1 } from 'openland-web/utils/TextStyles';
import { FullMessage_GeneralMessage_sender, RoomNano_SharedRoom } from 'openland-api/Types';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { formatTime } from 'openland-y-utils/formatTime';
import GroupReplyIcon from 'openland-icons/s/ic-chevron-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-top: -3px;
    margin-bottom: -1px;
`;

export const linkClass = css`
    color: var(--foregroundPrimary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    &:hover {
        text-decoration: none;
        color: var(--accentPrimary);
    }
`;

const dateWrapper = css`
    margin-left: 8px;
    color: var(--foregroundSecondary);
    flex-shrink: 0;
`;

const iconWrapper = css`
    margin: 0 4px;
    width: 16px;
    height: 16px;
    transform: translateY(3px);
`;

interface NotificationSenderProps {
    sender: FullMessage_GeneralMessage_sender;
    senderNameEmojify?: string | JSX.Element;
    group?: RoomNano_SharedRoom;
    date: number;
}

export const NotificationSender = React.memo((props: NotificationSenderProps) => {
    const { sender, senderNameEmojify, group, date } = props;

    return (
        <div className={wrapperClass}>
            <div className={cx(TextLabel1)}>
                <ULink path={`/${sender.shortname || sender.id}`} className={linkClass}>
                    {senderNameEmojify || sender.name}
                </ULink>
            </div>

            {group && (
                <>
                    <div className={iconWrapper}>
                        <UIcon icon={<GroupReplyIcon />} color="var(--foregroundTertiary)" />
                    </div>

                    <ULink path={`/mail/${group.id}`} className={cx(TextLabel1, linkClass)}>
                        {group.title}
                    </ULink>
                </>
            )}

            <div className={cx(TextCaption, dateWrapper)}>
                {formatTime(date)}
            </div>
        </div>
    );
});