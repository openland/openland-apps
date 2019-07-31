import * as React from 'react';
import { TextLabel1, TextBody } from 'openland-web/utils/TextStyles';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { css, cx } from 'linaria';
import { emoji } from 'openland-y-utils/emoji';

const singleLine = css`
    white-space: pre-wrap;
    word-wrap: break-word;
    height: 24px;
    overflow: hidden;
`;

export const MessageCompactComponent = React.memo((props: { message: DataSourceMessageItem }) => {
    return (
        <>
            <span className={cx(TextLabel1, singleLine)}>{emoji(props.message.senderName)}</span>
            <span className={cx(TextBody, singleLine)}>{emoji(props.message.fallback)}</span>
        </>
    );
});
