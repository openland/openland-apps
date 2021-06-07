import * as React from 'react';
import { css } from 'linaria';
import {
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
    MessageSender,
} from 'openland-api/spacex.types';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { showImageModal } from './ImageModal';
import { MediaLoader } from './MediaLoader';

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    min-width: 72px;
    max-width: 100%;
    border-radius: 8px;
    background-color: var(--backgroundTertiary);
    z-index: 0;
    cursor: pointer;
    overflow: hidden;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid var(--borderLight);
        border-radius: 8px;
    }
`;

const previewContainer = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    z-index: 1;
`;

const imgPreviewClass = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    filter: blur(5px);
    background: transparent;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const imgAppearClass = css`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    background: transparent;
    object-fit: contain;
    cursor: pointer;
`;

const imgSpacer = css`
    &:before {
        content: '';
        display: block;
        padding-top: var(--ratio);
        width: 100%;
    }
`;

interface GifContentProps {
    file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
}

const GifContent = React.memo((props: GifContentProps) => {
    const gifRef = React.useRef<HTMLVideoElement>(null);
    const prevRef = React.useRef<HTMLDivElement>(null);
    const [isLoad, setIsLoad] = React.useState(false);

    const onLoad = React.useCallback(() => {
        let timer: any;
        if (prevRef.current && gifRef.current) {
            prevRef.current.style.opacity = '0';
            gifRef.current.style.opacity = '1';
        }
        timer = setTimeout(() => {
            setIsLoad(true);
        }, 200);
        return () => clearTimeout(timer);
    }, [isLoad, prevRef]);

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

    const webm = 'https://ucarecdn.com/' + props.file.fileId + '/gif2video/-/format/webm/image.gif';
    const mp4 = 'https://ucarecdn.com/' + props.file.fileId + '/gif2video/-/format/mp4/image.gif';
    const srcWebm = webm;
    const srcMp4 = mp4;

    return (
        <div className={imgContainer} style={{ width: layoutWidth }}>
            <div
                className={imgSpacer}
                style={
                    {
                        width: layoutWidth,
                        '--ratio': (layoutHeight / layoutWidth) * 100 + '%',
                    } as React.CSSProperties
                }
            />
            {!isLoad && (
                <div className={previewContainer} ref={prevRef}>
                    <img
                        className={imgPreviewClass}
                        width={layoutWidth}
                        height={layoutHeight}
                        src={props.file.filePreview || undefined}
                        style={{ top: imgPositionTop, left: imgPositionLeft }}
                    />
                    <MediaLoader cancelable={false} />
                </div>
            )}
            <video
                ref={gifRef}
                key={`${srcWebm}${srcMp4}`}
                onLoadedData={onLoad}
                width={layoutWidth}
                height={layoutHeight}
                autoPlay={true}
                loop={true}
                muted={true}
                className={imgAppearClass}
            >
                <source src={srcWebm} type="video/webm" />
                <source src={srcMp4} type="video/mp4" />
            </video>
        </div>
    );
});

interface ImageContentProps {
    file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    sender?: MessageSender;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    chatId?: string;
    mId?: string;
    progress?: number;
}

export const ImageContent = React.memo((props: ImageContentProps) => {
    if (props.file.fileMetadata.imageFormat === 'GIF') {
        return <GifContent file={props.file} />;
    }

    const [isLoad, setIsLoad] = React.useState(!!props.progress || true);

    const imgRef = React.useRef<HTMLImageElement>(null);
    const prevRef = React.useRef<HTMLDivElement>(null);

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

    const url = `https://ucarecdn.com/${props.file.fileId}/-/format/auto/-/`;
    const ops = `scale_crop/${layoutWidth * 2}x${layoutHeight * 2}/`;
    const opsRetina = `scale_crop/${layoutWidth * 4}x${layoutHeight * 4}/center/ 2x`;

    const src = props.file.fileId ? url + ops : undefined;
    const srcSet = props.file.fileId ? url + opsRetina : undefined;
    const previewSrc = props.file.filePreview;

    React.useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setIsLoad(false);
            imgRef.current.style.opacity = '1';
        }
    }, [isLoad, imgRef]);

    const onLoad = React.useCallback(() => {
        let timer: any;
        if (prevRef.current && imgRef.current) {
            prevRef.current.style.opacity = '0';
            imgRef.current.style.opacity = '1';
            timer = setTimeout(() => {
                setIsLoad(false);
            }, 200);
        }
        return () => clearTimeout(timer);
    }, [isLoad, prevRef, imgRef]);

    return (
        <div
            className={imgContainer}
            style={{ width: layoutWidth }}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (isLoad) {
                    return;
                }
                showImageModal({
                    file: props.file,
                    sender: props.sender,
                    senderNameEmojify: props.senderNameEmojify,
                    date: props.date,
                    chatId: props.chatId,
                    mId: props.mId,
                });
            }}
        >
            <div
                className={imgSpacer}
                style={
                    {
                        width: layoutWidth,
                        '--ratio': (layoutHeight / layoutWidth) * 100 + '%',
                    } as React.CSSProperties
                }
            />
            {isLoad && (
                <div className={previewContainer} ref={prevRef}>
                    <ImgWithRetry
                        className={imgPreviewClass}
                        width={layoutWidth}
                        height={layoutHeight}
                        src={previewSrc || undefined}
                    />
                    <MediaLoader cancelable={false} />
                </div>
            )}
            <ImgWithRetry
                ref={imgRef}
                key={src}
                onLoad={!!props.progress ? undefined : onLoad}
                className={imgAppearClass}
                width={layoutWidth}
                height={layoutHeight}
                src={src}
                srcSet={srcSet}
            />
        </div>
    );
});
