import * as React from 'react';
import { css } from 'linaria';
import { ChatUpdateFragment_ChatMessageReceived_message_StickerMessage_sticker } from 'openland-api/Types';

const imgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 8px;
`;

interface ImageContentProps {
    sticker: ChatUpdateFragment_ChatMessageReceived_message_StickerMessage_sticker;
}

export const StickerContent = React.memo((props: ImageContentProps) => {
    const url = `https://ucarecdn.com/${props.sticker.image.uuid}/-/format/auto/-/`;
    const ops = `scale_crop/${100}x${100}/`;
    const opsRetina = `scale_crop/${100 * 2}x${100 * 2}/center/ 2x`;

    return (
        <div className={imgContainer}>
            <img width={100} height={100} src={url + ops} srcSet={url + opsRetina} />
        </div>
    );
});
