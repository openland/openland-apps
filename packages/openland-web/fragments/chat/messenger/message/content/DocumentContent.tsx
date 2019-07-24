import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';

export const DocumentContent = (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile }) => {
    return (
        <a href={`https://ucarecdn.com/${props.file.fileId}/`} title="doc" />
    );
};