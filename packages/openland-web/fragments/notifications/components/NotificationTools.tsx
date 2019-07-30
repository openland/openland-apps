import * as React from 'react';
import { URelativeDate } from 'openland-web/components/unicorn/URelativeDate';
import { css, cx } from 'linaria';
import { TextCaption } from 'openland-web/utils/TextStyles';
import { ULink } from 'openland-web/components/unicorn/ULink';

const wrapperClass = css`
    display: flex;
    flex-direction: row;
    margin-top: 8px;
`;

const dateClass = css`
    color: #676D7A; // ThemeDefault.foregroundSecondary
`;

const replyClass = css`
    cursor: pointer;
    margin-left: 8px;
    color: #0C7FF2; // ThemeDefault.accentPrimary

    &:hover {
        text-decoration: none;
    }
`;

interface NotificationToolsProps {
    date: number;
    messageId?: string;
}

export const NotificationTools = React.memo((props: NotificationToolsProps) => {
    const { date, messageId } = props;

    return (
        <div className={wrapperClass}>
            <URelativeDate date={date} className={cx(TextCaption, dateClass)} />
            <ULink path={`/message/${messageId}`} className={cx(TextCaption, replyClass)}>
                Reply
            </ULink>
        </div>
    );
});