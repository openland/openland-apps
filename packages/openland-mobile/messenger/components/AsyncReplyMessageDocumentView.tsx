import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { ASDocumentExt } from 'openland-mobile/components/file/ASDocumentExt';

interface AsyncReplyMessageDocumentViewProps {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
}

export const AsyncReplyMessageDocumentView = React.memo((props: AsyncReplyMessageDocumentViewProps) => {
    const { attach } = props;
    return (
        <ASDocumentExt name={attach.fileMetadata.name} isInverted={props.message.isOut} size="medium" />
    );
});