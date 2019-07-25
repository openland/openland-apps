import * as React from 'react';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { css } from 'linaria';
import { MessageComments_messageComments_comments_comment } from 'openland-api/Types';

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
    comment: MessageComments_messageComments_comments_comment;
}

export const CommentSender = React.memo((props: CommentSenderProps) => {
    const { comment } = props;
    const { sender, date } = comment;

    return (
        <div className={wrapperClass}>
            <div className={nameClass}>
                <ULink path={`/${sender.shortname || sender.id}`}>{sender.name}</ULink>
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