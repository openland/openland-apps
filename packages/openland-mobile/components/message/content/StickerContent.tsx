import * as React from 'react';
import { MyStickers_stickers_packs_stickers } from 'openland-api/Types';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { View, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

interface StickerContentProps {
    sticker: MyStickers_stickers_packs_stickers;
}

export const StickerContent = React.memo<StickerContentProps>((props) => {
    const { sticker } = props;
    const [downloadState, setDownloadState] = React.useState<DownloadState | undefined>(undefined);

    React.useEffect(() => {
        DownloadManagerInstance.watch(sticker.image.uuid, { width: 256, height: 256 }, setDownloadState);
    }, [sticker]);

    return (
        <View width={128} height={128}>
            {downloadState && !!downloadState.path && downloadState.path.length > 0 && (
                <FastImage
                    style={{ width: 128, height: 128, }}
                    source={{ uri: (Platform.OS === 'android' ? 'file://' : '') + downloadState.path, priority: 'normal', ...{ disableAnimations: true } as any }}
                />
            )}
        </View>
    );
});