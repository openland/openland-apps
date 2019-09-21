import * as React from 'react';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { FixedSizeGrid } from 'react-window';
import { MyStickers_stickers_packs_stickers } from 'openland-api/Types';

const container = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
`;

const sticker = css`
    cursor: pointer;
    width: 106px;
    height: 106px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 8px;
    border-radius: 8px;
    &:hover {
        background-color: #f2f3f5;
    }
`;

export const StickerComponent = React.memo<{
    onStickerSend?: (sticker: MyStickers_stickers_packs_stickers) => void;
}>(props => {
    const client = useClient();
    const stickers = client.useMyStickers().stickers;
    const total: MyStickers_stickers_packs_stickers[] = [];
    stickers.packs.map(i => total.push(...i.stickers));

    if (!total.length) {
        return <div>no stickers</div>;
    }

    const rowCount = Math.ceil(total.length / 3);

    const sendSticker = (item: MyStickers_stickers_packs_stickers) => {
        if (props.onStickerSend) {
            props.onStickerSend(item);
        }
    };

    return (
        <div className={container}>
            <FixedSizeGrid
                rowHeight={106}
                rowCount={rowCount}
                columnWidth={106}
                columnCount={3}
                width={384 /* Bigger width to hide scrollbar */}
                height={432}
            >
                {({ columnIndex, rowIndex, style }) => {
                    const item = total[rowIndex * 3 + columnIndex];
                    if (!item) {
                        return null;
                    }
                    const url = `https://ucarecdn.com/${item.image.uuid}/-/format/auto/-/`;
                    const ops = `scale_crop/${100}x${100}/`;
                    const opsRetina = `scale_crop/${100 * 2}x${100 * 2}/center/ 2x`;
                    return (
                        <div style={style}>
                            <div className={sticker} onClick={() => sendSticker(item)}>
                                <img
                                    width={90}
                                    height={90}
                                    src={url + ops}
                                    srcSet={url + opsRetina}
                                />
                            </div>
                        </div>
                    );
                }}
            </FixedSizeGrid>
        </div>
    );
});
