import * as React from 'react';
import { MyStickers_stickers_packs_stickers } from 'openland-api/spacex.types';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { View, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { STICKER_SIZE, layoutSticker } from 'openland-mobile/messenger/components/content/StickerContent';

interface StickerContentProps {
    sticker: MyStickers_stickers_packs_stickers;
    width?: number;
    height?: number;
}

export const StickerContent = React.memo<StickerContentProps>((props) => {
    const { sticker, width = STICKER_SIZE, height = STICKER_SIZE } = props;
    const [downloadState, setDownloadState] = React.useState<DownloadState | undefined>(undefined);

    React.useEffect(() => {
        DownloadManagerInstance.watch(sticker.image.uuid, layoutSticker(), setDownloadState);
    }, [sticker]);

    return (
        <View style={{ width, height }}>
            {downloadState && !!downloadState.path && downloadState.path.length > 0 && (
                <FastImage
                    style={{ width: width, height: height, }}
                    source={{ uri: (Platform.OS === 'android' ? 'file://' : '') + downloadState.path, priority: 'normal', ...{ disableAnimations: true } as any }}
                />
            )}
        </View>
    );
});