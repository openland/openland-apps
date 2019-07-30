import * as React from 'react';
import { css, cx } from 'linaria';
import { TextCaption, TextLabel1 } from 'openland-web/utils/TextStyles';
import { FullMessage_GeneralMessage_sender, RoomNano_SharedRoom } from 'openland-api/Types';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import GroupReplyIcon from 'openland-icons/ic-reply-comments.svg';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: -3px;
    margin-bottom: -1px;
`;

const nameClass = css`
    margin-right: 12px;
`;

const nameLinkClass = css`
    color: #171B1F; // ThemeDefault.foregroundPrimary

    &:hover {
        text-decoration: none;
        color: #1885F2; // ThemeDefault.accentPrimary
    }
`;

const groupWrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const iconWrapper = css`
    margin-right: 8px;
`;

interface NotificationSenderProps {
    sender: FullMessage_GeneralMessage_sender;
    senderNameEmojify?: string | JSX.Element;
    group?: RoomNano_SharedRoom;
}

export const NotificationSender = React.memo((props: NotificationSenderProps) => {
    const { sender, senderNameEmojify, group } = props;

    return (
        <div className={wrapperClass}>
            <div className={cx(TextLabel1, nameClass)}>
                <ULink path={`/${sender.shortname || sender.id}`} className={nameLinkClass}>
                    {senderNameEmojify || sender.name}
                </ULink>
            </div>

            {group && (
                <>
                    <div className={iconWrapper}>
                        <GroupReplyIcon />
                    </div>

                    <ULink path={`/mail/${group.id}`} className={cx(TextCaption, groupWrapper, nameLinkClass)}>
                        <UAvatar
                            id={group.id}
                            photo={group.photo}
                            title={group.title}
                            size="x-small"
                            marginRight={6}
                        />
                        {group.title}
                    </ULink>
                </>
            )}
        </div>
    );
});