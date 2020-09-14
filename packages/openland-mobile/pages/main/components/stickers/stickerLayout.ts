import * as React from 'react';

export interface StickerLayout {
    stickerSize: number;
    stickersPerRow: number;
}

const getStickerLayout = (w: number): StickerLayout => {
    let stickersPerRow = 7;

    if (w < 360) {
        stickersPerRow = 4;
    } else if (w < 480) {
        stickersPerRow = 5;
    } else if (w < 640) {
        stickersPerRow = 6;
    }

    return { stickersPerRow, stickerSize: Math.round((w - (stickersPerRow + 1) * 16) / stickersPerRow) };
};

export const useStickerLayout = (): [StickerLayout, (w: number) => void] => {
    const [stickerLayout, setStickerLayout] = React.useState<StickerLayout>({ stickerSize: 0, stickersPerRow: 0 });

    const handleWidthChange = React.useCallback((w: number) => setStickerLayout(getStickerLayout(w)), []);

    return [stickerLayout, handleWidthChange];
};