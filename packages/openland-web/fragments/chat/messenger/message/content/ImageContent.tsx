import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { showModalBox } from 'openland-x/showModalBox';
import { css, cx } from 'linaria';

const modalImgContainer = css`
    background-color: #000;
    flex-shrink: 0;
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 100%;
`;

const modalImgStyle = css`
    flex-shrink: 0;
    object-fit: contain;
    width: 100%;
    max-height: 80vh;
`;

const showImageModal = (src: string, srcSet: string) => {
    showModalBox({ width: 680 }, () => (
        <div className={modalImgContainer}>
            <img src={src} srcSet={srcSet} className={modalImgStyle} />
        </div>
    ));
};

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    min-width: 72px;
    max-width: 680px;
    max-height: 500px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #f0f2f5;
    z-index: 0;

    @media (max-width: 1300px) {
        max-width: 100%;
        height: auto !important;
    }
`;

const imgMediaClass = css`
    @media (max-width: 1300px) {
        position: static !important;
        object-fit: contain;
        display: block;
        max-width: 100%;
        max-height: 100%;
        height: auto;
    }
    will-change: opacity;
`;

const imgPreviewClass = css`
    position: absolute;
    border-radius: 8px;
`;

const imgAppearClass = css`
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    border-radius: 8px;
`;

const imgAppearInstantClass = css`
    opacity: 1;
    border-radius: 8px;
    position: absolute;
    cursor: pointer;
`;

export const ImageContent = React.memo(
    (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile }) => {
        const placeholderRef = React.useRef<HTMLImageElement>(null);
        const imgRef = React.useRef<HTMLImageElement>(null);
        const renderTime = new Date().getTime();

        const onLoad = React.useCallback(
            () => {
                let delta = new Date().getTime() - renderTime;
                if (imgRef.current) {
                    if (delta < 50) {
                        // show image instantly if loaded fast enough
                        imgRef.current.className = cx(imgAppearInstantClass, imgMediaClass);
                    } else {
                        // animate loaded via transition
                        imgRef.current.style.opacity = '1';
                    }
                    // setTimeout(() => {
                    //     if (placeholderRef.current) {
                    //         placeholderRef.current.style.display = 'none';
                    //     }
                    // }, 300);
                }
            },
            []
        );

        const layout = layoutMedia(
            props.file.fileMetadata.imageWidth || 0,
            props.file.fileMetadata.imageHeight || 0,
            680,
            360,
            32,
            32,
        );

        const layoutWidth = layout.width;
        const layoutHeight = layout.height;

        const imgPositionLeft = layoutWidth < 72 ? `calc(50% - ${layoutWidth / 2}px)` : '0';
        const imgPositionTop = layoutHeight < 72 ? `calc(50% - ${layoutHeight / 2}px)` : '0';

        const url = `https://ucarecdn.com/${props.file.fileId}/-/format/auto/-/`;
        const ops = `scale_crop/${layoutWidth}x${layoutHeight}/`;
        let opsRetina = `scale_crop/${layoutWidth * 2}x${layoutHeight * 2}/center/ 2x`;

        return (
            <div
                className={imgContainer}
                style={{ width: layoutWidth, height: layoutHeight }}
                onClick={(ev: React.MouseEvent) => {
                    ev.stopPropagation();
                    showImageModal(url + ops, url + opsRetina);
                }}
            >
                <img
                    ref={placeholderRef}
                    className={cx(imgPreviewClass)}
                    width={layoutWidth}
                    height={layoutHeight}
                    src={props.file.filePreview || undefined}
                    style={{ top: imgPositionTop, left: imgPositionLeft }}
                />
                <img
                    ref={imgRef}
                    onLoad={onLoad}
                    className={cx(imgAppearClass, imgMediaClass)}
                    width={layoutWidth}
                    height={layoutHeight}
                    src={url + ops}
                    srcSet={url + opsRetina}
                    style={{ top: imgPositionTop, left: imgPositionLeft }}
                />
            </div>
        );
    },
);
