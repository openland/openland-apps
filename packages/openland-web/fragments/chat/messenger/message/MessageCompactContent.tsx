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
    // let imageAttachWithPreview = (props.message.attachments || []).filter(a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage && a.filePreview)[0];
    return (
        <>
            {/* {imageAttachWithPreview && <img style={{ objectFit: 'contain' }} width={20} height={20} src={imageAttachWithPreview.__typename === 'MessageAttachmentFile' && imageAttachWithPreview.filePreview || undefined} />} */}
            <span className={cx(TextLabel1, singleLine)}>{props.message.senderName}</span>
            <span className={cx(TextBody, singleLine)}>{emoji(props.message.fallback)}</span>
        </>
    );
});
