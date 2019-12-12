import * as React from 'react';
import { css } from 'linaria';
import { SharedItemFile } from './SharedMediaFragment';
import { showImageModal } from '../messenger/message/content/ImageContent';
import { layoutMedia, uploadcareOptions } from 'openland-y-utils/MediaLayout';
import { emoji } from 'openland-y-utils/emoji';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';

const MediaItemClass = css`
display: flex;
width: 25%;    
position: relative;
overflow: hidden;
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
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
`;

const ImgPreviewClass = css`
    position: absolute;
    top: -5px;
    left: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    filter: blur(5px);
`;

const ImgPreviewContainerClass = css`
    position: absolute;
    top: 1px;
    left: 1px;
    bottom: 1px;
    right: 1px;

    overflow: hidden;

    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
`;
export const MediaContent = (props: { item: SharedItemFile }) => {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const placeholderRef = React.useRef<HTMLDivElement>(null);
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

    const onLoad = React.useCallback(() => {
        if (imgRef.current && placeholderRef.current) {
            imgRef.current.style.opacity = "1";
            placeholderRef.current.style.opacity = "0";
        }
    }, []);
    return (
        <div className={MediaItemClass} onClick={onClick}>
            <div className={ImgPreviewContainerClass} ref={placeholderRef}>
                <ImgWithRetry
                    className={ImgPreviewClass}
                    src={props.item.attach.filePreview || undefined}
                />
            </div>

            <ImgWithRetry
                ref={imgRef}
                className={MediaItemContentClass}
                src={`https://ucarecdn.com/${props.item.attach.fileId}/-/format/auto/-/scale_crop/138x138/smart/`}
                onLoad={onLoad}
            />
        </div>
    );
};