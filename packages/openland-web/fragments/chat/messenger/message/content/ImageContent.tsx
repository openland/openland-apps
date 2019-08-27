import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { showModalBox } from 'openland-x/showModalBox';
import { css, cx } from 'linaria';

const modalImgContainer = css`
    position: relative;
    background-color: #000;
    flex-shrink: 0;
    flex-grow: 1;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 0;
`;

const modalPreviewImgStyle = css`
    position: absolute;
    object-fit: contain;
    left: 0;
    top: 0;
    z-index: 0;
    max-width: 70vw;
    max-height: 90vh;
`;

const modalImgStyle = css`
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    object-fit: contain;
    max-width: 70vw;
    max-height: 90vh;
    z-index: 1;
`;

const modalImgAppearStyle = css`
    opacity: 1;
`;

interface ModalProps {
    src: string;
    srcSet: string;
    width: number;
    height: number;
    preview: string;
}

const ModalContent = React.memo((props: ModalProps) => {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const renderTime = new Date().getTime();

    const onLoad = React.useCallback(() => {
        let delta = new Date().getTime() - renderTime;
        if (imgRef.current) {
            if (delta < 50) {
                // show image instantly if loaded fast enough
                imgRef.current.className = cx(modalImgStyle, modalImgAppearStyle);
            } else {
                // animate loaded via transition
                imgRef.current.style.opacity = '1';
            }
        }
    }, []);

    return (
        <div className={modalImgContainer}>
            <img
                className={modalPreviewImgStyle}
                src={props.preview}
                style={{
                    width: props.width,
                    height: props.height,
                }}
            />
            <img
                ref={imgRef}
                onLoad={onLoad}
                src={props.src}
                srcSet={props.srcSet}
                className={modalImgStyle}
                style={{
                    width: props.width,
                    height: props.height,
                }}
            />
        </div>
    );
});

const showImageModal = (props: ModalProps) => {
    showModalBox({ flowing: true }, () => <ModalContent {...props} />);
};

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    min-width: 72px;
    max-width: 680px;
    max-height: 600px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #f0f2f5;
    z-index: 0;
    cursor: pointer;

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
    max-width: 100%;
    max-height: 100%;
    z-index: 0;
`;

const imgAppearClass = css`
    opacity: 0;
    background-color: var(--backgroundPrimary);
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

const GifContent = React.memo(
    (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile }) => {
        const gifRef = React.useRef<HTMLVideoElement>(null);
        const renderTime = new Date().getTime();
        const onLoad = React.useCallback(() => {
            let delta = new Date().getTime() - renderTime;
            if (gifRef.current) {
                if (delta < 50) {
                    // show image instantly if loaded fast enough
                    gifRef.current.className = cx(imgAppearInstantClass, imgMediaClass);
                } else {
                    // animate loaded via transition
                    gifRef.current.style.opacity = '1';
                }
            }
        }, []);

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

        return (
            <div className={imgContainer} style={{ width: layoutWidth, height: layoutHeight }}>
                <img
                    className={cx(imgPreviewClass)}
                    width={layoutWidth}
                    height={layoutHeight}
                    src={props.file.filePreview || undefined}
                    style={{ top: imgPositionTop, left: imgPositionLeft }}
                />
                <video
                    ref={gifRef}
                    onLoadStart={onLoad}
                    width={layoutWidth}
                    height={layoutHeight}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    className={cx(imgAppearClass, imgMediaClass)}
                >
                    <source
                        src={
                            'https://ucarecdn.com/' +
                            props.file.fileId +
                            '/gif2video/-/format/webm/image.gif'
                        }
                        type="video/webm"
                    />
                    <source
                        src={
                            'https://ucarecdn.com/' +
                            props.file.fileId +
                            '/gif2video/-/format/mp4/image.gif'
                        }
                        type="video/mp4"
                    />
                </video>
            </div>
        );
    },
);

export const ImageContent = React.memo(
    (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile }) => {
        if (props.file.fileMetadata.imageFormat === 'GIF') {
            return <GifContent file={props.file} />;
        }

        const imgRef = React.useRef<HTMLImageElement>(null);
        const renderTime = new Date().getTime();

        const onLoad = React.useCallback(() => {
            let delta = new Date().getTime() - renderTime;
            if (imgRef.current) {
                if (delta < 50) {
                    // show image instantly if loaded fast enough
                    imgRef.current.className = cx(imgAppearInstantClass, imgMediaClass);
                } else {
                    // animate loaded via transition
                    imgRef.current.style.opacity = '1';
                }
            }
        }, []);

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
        const opsRetina = `scale_crop/${layoutWidth * 2}x${layoutHeight * 2}/center/ 2x`;

        const layoutModal = layoutMedia(
            props.file.fileMetadata.imageWidth || 0,
            props.file.fileMetadata.imageHeight || 0,
            (window.innerWidth / 100) * 80,
            (window.innerHeight / 100) * 80,
            32,
            32,
        );

        const opsModal = `scale_crop/${layoutModal.width}x${layoutModal.height}/`;
        const opsRetinaModal = `scale_crop/${layoutModal.width * 2}x${layoutModal.height *
            2}/center/ 2x`;

        return (
            <div
                className={imgContainer}
                style={{ width: layoutWidth, height: layoutHeight }}
                onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    showImageModal({
                        src: url + opsModal,
                        srcSet: url + opsRetinaModal,
                        width: layoutModal.width,
                        height: layoutModal.height,
                        preview: props.file.filePreview || '',
                    });
                }}
            >
                <img
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
