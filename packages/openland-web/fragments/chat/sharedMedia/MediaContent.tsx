import * as React from 'react';
import { css } from 'linaria';
import { SharedItemFile } from './SharedMediaFragment';
import { showImageModal } from '../messenger/message/content/ImageContent';
import { layoutMedia, uploadcareOptions } from 'openland-y-utils/MediaLayout';
import { emoji } from 'openland-y-utils/emoji';

const MediaItemClass = css`
display: flex;
width: 25%;    
position: relative;
@media (max-width: 750px) {
    width: calc(100% / 3);    
}

&:before {
    content: '';
    display: block;
    padding-top: 100%;
}
`;
const MediaItemContentClass = css`
position: absolute;
top:1px;
left: 1px;

display: block;
width: calc(100% - 2px);
`;
export const MediaContent = (props: { item: SharedItemFile }) => {

    const onClick = React.useCallback(() => {

        const layoutModal = layoutMedia(
            props.item.attach.fileMetadata.imageWidth || 0,
            props.item.attach.fileMetadata.imageHeight || 0,
            window.innerWidth,
            window.innerHeight,
            32,
            32,
        );

        const url = `https://ucarecdn.com/${props.item.attach.fileId}/-/format/auto/-/`;
        let modalOps = uploadcareOptions(layoutModal);

        showImageModal({
            fileId: props.item.attach.fileId,
            src: url + modalOps[0],
            srcSet: url + modalOps[1],
            width: layoutModal.width,
            height: layoutModal.height,
            preview: props.item.attach.filePreview,
            senderNameEmojify: emoji(props.item.sender.name),
            date: parseInt(props.item.dateRaw, 10),
        });
    }, []);
    return (
        <div className={MediaItemClass} onClick={onClick}>
            <img src={`https://ucarecdn.com/${props.item.attach.fileId}/-/format/auto/-/scale_crop/138x138/smart/`} className={MediaItemContentClass} />
        </div>
    );
};