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

const scrollContainer = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    flex-wrap: wrap;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
`;

const sticker = css`
    width: 106px;
    height: 106px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 8px;
`;

export const StickerComponent = React.memo(() => {
    const client = useClient();
    const stickers = client.useMyStickers().stickers;
    const total: MyStickers_stickers_packs_stickers[] = [];
    stickers.packs.map(i => total.push(...i.stickers));

    if (!total.length) {
        return <div>no stickers</div>;
    }

    const rowCount = Math.floor(total.length / 3);

    return (
        <div className={container}>
            <FixedSizeGrid
                rowHeight={106}
                rowCount={rowCount}
                columnWidth={106}
                columnCount={3}
                width={384 /* Bigger width to hide scrollbar */}
                height={384}
            >
                {({ columnIndex, rowIndex, style }) => {
                    const isLastRow = rowIndex === rowCount - 1;
                    if (isLastRow) {
                        return null;
                    }
                    const item = total[rowIndex * 3 + columnIndex];
                    const url = `https://ucarecdn.com/${item.image.uuid}/-/format/auto/-/`;
                    const ops = `scale_crop/${100}x${100}/`;
                    const opsRetina = `scale_crop/${100 * 2}x${100 * 2}/center/ 2x`;
                    return (
                        <div style={style}>
                            <div className={sticker} key={item.id}>
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
