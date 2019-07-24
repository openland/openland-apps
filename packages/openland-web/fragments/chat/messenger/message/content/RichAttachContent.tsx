import * as React from 'react';
import { css } from 'linaria';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { layoutMedia } from 'openland-web/utils/MediaLayout';

const richAttachWrapper = css`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    
`;

export const RichAttachContent = (props: {
    attach: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
}) => {
    console.log(props);
    let img = undefined;
    if (props.attach.image && props.attach.image.metadata) {
        let layout = layoutMedia(
            props.attach.image.metadata.imageWidth || 0,
            props.attach.image.metadata.imageHeight || 0,
            680,
            360,
            24,
            24,
        );
        img = (
            <div style={{ width: layout.width, height: layout.height, position: 'relative' }}>
                <img width={layout.width} height={layout.height} src={props.attach.image.url} />
            </div>
        );
    }
    return (
        <div>
            <span>{props.attach.title}</span>
            <span>{props.attach.subTitle}</span>
            {img}
        </div>
    );
};
