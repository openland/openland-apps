import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { css } from 'linaria';

const imgContainer = css`
    min-height: 72px;
    min-width: 72px;
    overflow: hidden;
    border-radius: 8px;
    background-color: #f0f2f5;
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
`;

export const ImageContent = React.memo(
    (props: {
        file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
        message: DataSourceWebMessageItem;
    }) => {
        const placeholderRef = React.useRef<HTMLImageElement>(null);
        const imgRef = React.useRef<HTMLImageElement>(null);
        const renderTime = new Date().getTime();

        const onLoad = React.useCallback(
            () => {
                let delta = new Date().getTime() - renderTime;
                if (imgRef.current) {
                    if (delta < 50) {
                        // show image instantly if loaded fast enough
                        imgRef.current.className = imgAppearInstantClass;
                    } else {
                        // animate loaded via transition
                        imgRef.current.style.opacity = '1';
                    }
                    if (placeholderRef.current) {
                        setTimeout(() => (placeholderRef.current!.style.display = 'none'), 300);
                    }
                }
            },
            [placeholderRef.current, imgRef.current],
        );

        let layout = layoutMedia(
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
            <div className={imgContainer} style={{ width: layoutWidth, height: layoutHeight, position: 'relative' }}>
                <img
                    ref={placeholderRef}
                    className={imgPreviewClass}
                    width={layoutWidth}
                    height={layoutHeight}
                    src={props.file.filePreview || undefined}
                    style={{ top: imgPositionTop, left: imgPositionLeft }}
                />
                <img
                    ref={imgRef}
                    onLoad={onLoad}
                    className={imgAppearClass}
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
