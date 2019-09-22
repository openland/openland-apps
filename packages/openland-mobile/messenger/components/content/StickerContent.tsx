import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { MyStickers_stickers_packs_stickers } from 'openland-api/Types';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { ASImage } from 'react-native-async-view/ASImage';

interface StickerContentProps {
    sticker: MyStickers_stickers_packs_stickers;
}

export const StickerContent = React.memo<StickerContentProps>((props) => {
    const { sticker } = props;
    const [downloadState, setDownloadState] = React.useState<DownloadState | undefined>(undefined);

    React.useEffect(() => {
        DownloadManagerInstance.watch(sticker.image.uuid, { width: 200, height: 200 }, setDownloadState);
    }, [sticker]);

    return (
        <ASFlex>
            <ASImage
                source={{ uri: (downloadState && downloadState.path) ? ('file://' + downloadState.path) : undefined }}
                width={100}
                height={100}
            />
        </ASFlex>
    );
});