import * as React from 'react';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { css } from 'linaria';
import { DataSourceWebMessageItem } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const nameClass = css`
    margin-right: 12px;
`;

const organizationClass = css`
    margin-right: 12px;
`;

const dateClass = css`
    
`;

interface CommentSenderProps {
    comment: DataSourceWebMessageItem;
}

export const CommentSender = React.memo((props: CommentSenderProps) => {
    const { comment } = props;
    const { sender, date, senderNameEmojify } = comment;

    return (
        <div className={wrapperClass}>
            <div className={nameClass}>
                <ULink path={`/${sender.shortname || sender.id}`}>{senderNameEmojify || sender.name}</ULink>
            </div>
            <div className={organizationClass}>
                {sender.primaryOrganization && <ULink path={`/${sender.primaryOrganization.shortname || sender.primaryOrganization.id}`}>{sender.primaryOrganization.name}</ULink>}
            </div>
            <div className={dateClass}>
                {date}
            </div>
        </div>
    );
});