import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { MyStickers_stickers_packs_stickers } from 'openland-api/Types';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { ASImage } from 'react-native-async-view/ASImage';
import { paddedText } from '../AsyncMessageContentView';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { PixelRatio } from 'react-native';

export const STICKER_SIZE = 150;
export const layoutSticker = () => {
    const ratio = PixelRatio.get();

    return {
        width: Math.floor(STICKER_SIZE * ratio),
        height: Math.floor(STICKER_SIZE * ratio)
    };
};

interface StickerContentProps {
    sticker: MyStickers_stickers_packs_stickers;
    message: DataSourceMessageItem;
    padded: boolean;
}

export const StickerContent = React.memo<StickerContentProps>((props) => {
    const { sticker, padded, message } = props;
    const [downloadState, setDownloadState] = React.useState<DownloadState | undefined>(undefined);

    React.useEffect(() => {
        DownloadManagerInstance.watch(sticker.image.uuid, layoutSticker(), setDownloadState);
    }, [sticker]);

    return (
        <ASFlex flexDirection="column">
            <ASImage
                source={{ uri: (downloadState && downloadState.path) ? ('file://' + downloadState.path) : undefined }}
                width={STICKER_SIZE}
                height={STICKER_SIZE}
            />
            {padded && paddedText(message.isOut)}
        </ASFlex>
    );
});