import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { css } from 'linaria';

let imgPreviewClass = css`
    position: absolute;
    top: 0;
    left: 0;
`;

let imgAppearClass = css`
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0.0, 0.2, 1);

    position: absolute;
    top: 0;
    left: 0;
`;

let imgAppearInstantClass = css`
    opacity: 1;

    position: absolute;
    top: 0;
    left: 0;
`;

export const ImageContent = React.memo((props: { file: FullMessage_GeneralMessage_attachments_MessageAttachmentFile, message: DataSourceWebMessageItem }) => {
    let placeholderRef = React.useRef<HTMLImageElement>(null);
    let imgRef = React.useRef<HTMLImageElement>(null);
    let renderTime = new Date().getTime();
    let onLoad = React.useCallback(() => {
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
                setTimeout(() => placeholderRef.current!.style.display = 'none', 300);
            }
        }
    }, [placeholderRef.current, imgRef.current]);
    let layout = layoutMedia(props.file.fileMetadata.imageWidth || 0, props.file.fileMetadata.imageHeight || 0, 680, 360, 24, 24);
    let url = `https://ucarecdn.com/${props.file.fileId}/`;
    let ops = `-/format/auto/-/scale_crop/${layout.width}x${layout.height}/`;
    let opsRetina =
        `-/format/auto/-/scale_crop/${layout.width}x${layout.height}/center/ 2x`;
    return (
        <div style={{ width: layout.width, height: layout.height, position: 'relative' }}>
            <img ref={placeholderRef} className={imgPreviewClass} width={layout.width} height={layout.height} src={props.file.filePreview || undefined} />
            <img ref={imgRef} onLoad={onLoad} className={imgAppearClass} width={layout.width} height={layout.height} src={url + ops} srcSet={url + opsRetina} />
        </div>
    );
});