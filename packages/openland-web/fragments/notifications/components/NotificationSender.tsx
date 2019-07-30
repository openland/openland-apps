import * as React from 'react';
import { css, cx } from 'linaria';
import { TextCaption, TextLabel1 } from 'openland-web/utils/TextStyles';
import { FullMessage_GeneralMessage_sender, RoomNano_SharedRoom } from 'openland-api/Types';
import { ULink } from 'openland-web/components/unicorn/ULink';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    align-items: baseline;
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

const groupLinkClass = css`
    color: #676D7A; // ThemeDefault.foregroundSecondary

    &:hover {
        text-decoration: none;
        color: #1885F2; // ThemeDefault.accentPrimary
    }
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
                <div className={TextCaption}>
                    <ULink path={`/mail/${group.id}`} className={groupLinkClass}>
                        {group.title}
                    </ULink>
                </div>
            )}
        </div>
    );
});