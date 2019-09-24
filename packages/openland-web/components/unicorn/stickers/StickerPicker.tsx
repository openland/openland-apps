import * as React from 'react';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { FixedSizeGrid } from 'react-window';
import { StickerFragment } from 'openland-api/Types';

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
    onStickerSent?: (sticker: StickerFragment) => void;
}>(props => {
    const client = useClient();
    const stickers = client.useMyStickers({ fetchPolicy: 'cache-and-network' }).stickers;
    const total: StickerFragment[] = [];
    stickers.packs.map(i => total.push(...i.stickers));

    if (!total.length) {
        return <div>no stickers</div>;
    }

    const rowCount = Math.ceil(total.length / 3);

    const sendSticker = (item: StickerFragment) => {
        if (props.onStickerSent) {
            props.onStickerSent(item);
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
                    const ops = `preview/${100}x${100}/`;
                    const opsRetina = `preview/${100 * 2}x${100 * 2}/ 2x`;
                    return (
                        <div style={style}>
                            <div className={sticker} onClick={() => sendSticker(item)}>
                                <img
                                    width={90}
                                    height={90}
                                    src={url + ops}
                                    srcSet={url + opsRetina}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    );
                }}
            </FixedSizeGrid>
        </div>
    );
});
