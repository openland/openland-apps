import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { MyStickers_stickers_packs_stickers } from 'openland-api/Types';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { ASImage } from 'react-native-async-view/ASImage';
import { paddedText } from '../AsyncMessageContentView';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';

interface StickerContentProps {
    sticker: MyStickers_stickers_packs_stickers;
    message: DataSourceMessageItem;
    padded: boolean;
}

export const StickerContent = React.memo<StickerContentProps>((props) => {
    const { sticker, padded, message } = props;
    const [downloadState, setDownloadState] = React.useState<DownloadState | undefined>(undefined);

    React.useEffect(() => {
        DownloadManagerInstance.watch(sticker.image.uuid, { width: 200, height: 200 }, setDownloadState);
    }, [sticker]);

    return (
        <ASFlex flexDirection="column">
            <ASImage
                source={{ uri: (downloadState && downloadState.path) ? ('file://' + downloadState.path) : undefined }}
                width={100}
                height={100}
            />
            {padded && paddedText(message.isOut)}
        </ASFlex>
    );
});