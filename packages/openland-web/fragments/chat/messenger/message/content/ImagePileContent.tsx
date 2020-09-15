import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, MessageSender } from 'openland-api/spacex.types';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { cx, css } from 'linaria';
import { showImageModal } from './ImageContent';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { MediaLoader } from './MediaLoader';

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 72px;
    min-width: 72px;
    border-radius: 8px;
    height: 100%;
    width: 100%;
    background-color: #f0f2f5;
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

const halfImgContainer = css`
    height: calc(50% - 4px);

    &:not(:last-child) {
        margin-bottom: 8px;
    }
`;

const imgPreviewClass = css`
    z-index: 0;
    filter: blur(5px);
    background: transparent;
    object-fit: cover;
    height: 100%;
    width: 100%;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
`;

const imgAppearClass = css`
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    background: transparent;
    object-fit: cover;
    cursor: pointer;
    height: 100%;
    width: 100%;
`;

const GifContent = React.memo(
    (props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile, isHalf?: boolean }) => {
        const gifRef = React.useRef<HTMLVideoElement>(null);
        const [isLoad, setIsLoad] = React.useState(false);
        const onLoad = React.useCallback(() => {
            if (gifRef.current) {
                gifRef.current.style.opacity = '1';
                setIsLoad(true);
            }
        }, []);

        const webm =
            'https://ucarecdn.com/' + props.file.fileId + '/gif2video/-/format/webm/image.gif';
        const mp4 =
            'https://ucarecdn.com/' + props.file.fileId + '/gif2video/-/format/mp4/image.gif';
        const [srcWebm, setSrcWebm] = React.useState<string | undefined>(webm);
        const [srcMp4, setSrcMp4] = React.useState<string | undefined>(mp4);

        const onContinue = React.useCallback(() => {
            setSrcWebm(webm);
            setSrcMp4(mp4);
        }, [webm, mp4]);
        const onStop = React.useCallback(() => {
            setSrcWebm(undefined);
            setSrcMp4(undefined);
        }, [webm, mp4]);

        return (
            <div className={cx(imgContainer, props.isHalf && halfImgContainer)}>
                {!isLoad && (
                    <>
                        <img
                            className={imgPreviewClass}
                            src={props.file.filePreview || undefined}
                        />
                        <MediaLoader onContinue={onContinue} onStop={onStop} />
                    </>
                )}
                <video
                    key={`${srcWebm}${srcMp4}`}
                    ref={gifRef}
                    onLoadedData={onLoad}
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
    },
);

interface ImagePileContentProps {
    file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    sender?: MessageSender;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    chatId?: string;
    mId?: string;
    isPending?: boolean;
    progress?: number;
    isHalf?: boolean;
}

export const ImagePileContent = React.memo((props: ImagePileContentProps) => {
    if (props.file.fileMetadata.imageFormat === 'GIF') {
        return <GifContent file={props.file} isHalf={props.isHalf} />;
    }

    const [isLoad, setIsLoad] = React.useState(false);

    const imgRef = React.useRef<HTMLImageElement>(null);

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
    const ops = `scale_crop/${layoutWidth}x${layoutHeight}/`;
    const opsRetina = `scale_crop/${layoutWidth * 2}x${layoutHeight * 2}/center/ 2x`;

    const [src, setSrc] = React.useState<string | undefined>(
        props.file.fileId ? url + ops : undefined,
    );
    const [srcSet, setSrcSet] = React.useState<string | undefined>(
        props.file.fileId ? url + opsRetina : undefined,
    );
    const [previewSrc] = React.useState(props.file.filePreview);

    React.useEffect(() => {
        if (!props.isPending) {
            setSrc(url + ops);
            setSrcSet(url + opsRetina);
        }
    }, [props.file.fileId, props.file.id]);

    const onContinue = React.useCallback(() => {
        setSrc(url + ops);
        setSrcSet(url + opsRetina);
    }, [props.file.fileId]);
    const onStop = React.useCallback(() => {
        setSrc(undefined);
        setSrcSet(undefined);
    }, [props.file.fileId]);

    const onLoad = React.useCallback(() => {
        if (imgRef.current) {
            imgRef.current.style.opacity = '1';
            setIsLoad(true);
        }
    }, []);

    const isUpload = !!props.progress && props.progress >= 0 && props.progress < 1;

    let uploadProgress = 90;
    if (isUpload) {
        uploadProgress = Math.round(props.progress! * 100);
    }

    return (
        <div
            className={cx(imgContainer, props.isHalf && halfImgContainer)}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (isUpload) {
                    return;
                }
                showImageModal({
                    fileId: props.file.fileId,
                    imageWidth: props.file.fileMetadata.imageWidth || 0,
                    imageHeight: props.file.fileMetadata.imageHeight || 0,
                    preview: props.file.filePreview,
                    sender: props.sender,
                    senderNameEmojify: props.senderNameEmojify,
                    date: props.date,
                    chatId: props.chatId,
                    mId: props.mId,
                });
            }}
        >
            {(!isLoad || isUpload) && (
                <>
                    <ImgWithRetry
                        className={imgPreviewClass}
                        width={layoutWidth}
                        height={layoutHeight}
                        src={previewSrc || undefined}
                    />
                    <MediaLoader
                        onContinue={onContinue}
                        onStop={onStop}
                        progress={uploadProgress}
                    />
                </>
            )}
            <ImgWithRetry
                ref={imgRef}
                key={src}
                onLoad={onLoad}
                className={imgAppearClass}
                src={src}
                srcSet={srcSet}
            />
        </div>
    );
});
