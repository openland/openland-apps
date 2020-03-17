import * as React from 'react';
import { css } from 'linaria';
import { emoji } from 'openland-y-utils/emoji';
import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage } from 'openland-api/spacex.types';
import { showImageModal } from 'openland-web/fragments/chat/messenger/message/content/ImageContent';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { SharedItemFile } from './SharedMediaFragment';

type generalM = SharedMedia_sharedMedia_edges_node_message_GeneralMessage;

const MediaItemClass = css`
    display: flex;
    width: 25%;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    @media (max-width: 750px) {
        width: calc(100% / 3);
    }
    &:before {
        content: '';
        display: block;
        padding-top: 100%;
    }
    &:after {
        content: '';
        position: absolute;
        opacity: 0;
        top: 1px;
        left: 1px;
        bottom: 1px;
        right: 1px;
        background: var(--overlayLight);
    }
    &:hover:after {
        opacity: 1;
    }
`;
const MediaItemContentClass = css`
    position: absolute;
    top: 1px;
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
export const MediaContent = React.memo((props: { item: SharedItemFile; chatId: string }) => {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const placeholderRef = React.useRef<HTMLDivElement>(null);
    const onClick = React.useCallback(() => {
        showImageModal({
            chatId: props.chatId,
            mId: (props.item.message as generalM).id,
            fileId: props.item.attach.fileId,
            imageWidth: props.item.attach.fileMetadata.imageWidth || 0,
            imageHeight: props.item.attach.fileMetadata.imageHeight || 0,
            preview: props.item.attach.filePreview,
            senderNameEmojify: emoji(props.item.sender.name),
            date: parseInt(props.item.dateRaw, 10),
        });
    }, []);

    const onLoad = React.useCallback(() => {
        if (imgRef.current && placeholderRef.current) {
            imgRef.current.style.opacity = '1';
            placeholderRef.current.style.opacity = '0';
            placeholderRef.current.style.visibility = 'hidden';
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
                src={`https://ucarecdn.com/${
                    props.item.attach.fileId
                }/-/format/auto/-/scale_crop/138x138/smart/`}
                onLoad={onLoad}
            />
        </div>
    );
});
