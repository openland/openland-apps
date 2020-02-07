import * as React from 'react';
import { Platform, PixelRatio } from 'react-native';
import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage, SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { showPictureModal } from 'openland-mobile/components/modal/ZPictureModal';
import { formatDateTime } from 'openland-y-utils/formatTime';
import { RNAsyncConfigManager } from 'react-native-async-view/platform/ASConfigManager';
import { showFileModal } from 'openland-mobile/components/file/showFileModal';
import { ASImage } from 'react-native-async-view/ASImage';
import { DataSourceSharedMediaRow } from 'openland-engines/messenger/SharedMediaEngine';
import { ASFlex } from 'react-native-async-view/ASFlex';

interface AsyncMediaItemProps {
    index: number;
    message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage;
    imageSize: number;
    chatId: string;
    attachment: SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile;
    onLongPress: (options: { filePath?: string, chatId: string, message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage }) => void;
}

const AsyncFileItem = React.memo(({ message, attachment, index, imageSize, chatId, onLongPress }: AsyncMediaItemProps) => {
    const { sender, date } = message;
    const { isImage } = attachment.fileMetadata;
    const senderName = sender.name;
    const [previewPath, setPreviewPath] = React.useState<string>();
    const fsPathRef = React.useRef<string>();
    const fullScreenSize = layoutMedia(attachment.fileMetadata.imageWidth!!, attachment.fileMetadata.imageHeight!!, 1024, 1024);
    const theme = useThemeGlobal();

    React.useEffect(() => {
        const d = DownloadManagerInstance.watch(attachment.fileId, fullScreenSize, state => {

            if (state.path) {
                fsPathRef.current = Platform.select({ios: state.path, android: 'file://' + state.path});
            }
        });
        const srcImgSize = Math.round(imageSize * PixelRatio.get());
        const d1 = DownloadManagerInstance.watch(attachment.fileId, { width: srcImgSize, height: srcImgSize }, state => {
            if (state.path) {
                setPreviewPath(state.path);
            }
        });

        return () => {
            d();
            d1();
        };
    }, []);

    const onPress = React.useCallback((event: ASPressEvent) => {
        if (isImage && fsPathRef.current) {
            const imageWidth = attachment.fileMetadata.imageWidth || event.w;
            const imageHeight = attachment.fileMetadata.imageHeight || event.h;
            let width, height, ratio, y = event.y, x = event.x;
            if (imageWidth > imageHeight) {
                ratio = imageHeight / imageWidth;
                width = event.w;
                height = ratio * width;
                y = event.y;
            } else {
                ratio = imageWidth / imageHeight;
                height = event.h;
                width = ratio * height;
                x = event.x;
            }
            showPictureModal({
                crossFade: true,
                title: senderName,
                subtitle: date ? formatDateTime(parseInt(date, 10) / 1000) : undefined,
                url: fsPathRef.current,
                width: imageWidth,
                height: imageHeight,
                isGif: attachment.fileMetadata.imageFormat === 'GIF',
                animate: {
                    x,
                    y,
                    width: imageSize,
                    height: imageSize,
                },
                ...Platform.OS === 'ios' ? {
                    onBegin: () => {
                        RNAsyncConfigManager.setSuspended(event.instanceKey!!, true);
                    },
                    onEnd: () => {
                        RNAsyncConfigManager.setSuspended(event.instanceKey!!, false);
                    }
                } : {}
            });
        } else {
            showFileModal({
                uuid: attachment.fileId,
                name: attachment.fileMetadata.name,
                size: attachment.fileMetadata.size
            });
        }

    }, []);

    const handleLongPress = React.useCallback(() => {
        onLongPress({ filePath: Platform.select({ios: previewPath, android: 'file://' + previewPath }), message, chatId });
    }, [previewPath]);

    const url = 'file://' + previewPath || attachment.filePreview || undefined;

    return (
        <ASFlex
            onPress={onPress}
            onLongPress={handleLongPress}
            marginRight={(index + 1) % 3 ? 2 : 0}
            backgroundColor={theme.backgroundTertiary}
        >
            <ASImage
                key={url}
                width={imageSize}
                height={imageSize}
                source={{ uri: url }}
                isGif={attachment.fileMetadata.imageFormat === 'GIF'}
            />
            {!isImage && (
                <ASFlex
                    overlay={true}
                    flexGrow={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <ASFlex
                        width={48}
                        height={48}
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={theme.overlayMedium}
                        borderRadius={24}
                    >
                        <ASImage width={24} height={24} source={require('assets/ic-play-glyph-24.png')} tintColor={theme.foregroundContrast} />
                    </ASFlex>
                </ASFlex>
            )}
        </ASFlex>
    );
});

interface AsyncSharedMediaRowProps {
    item: DataSourceSharedMediaRow;
    wrapperWidth: number;
    chatId: string;
    onLongPress: (options: { filePath?: string, chatId: string, message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage }) => void;
}

export const AsyncSharedMediaRow = ({ item, wrapperWidth, onLongPress, chatId }: AsyncSharedMediaRowProps) => {
    const imageSize = Math.round((wrapperWidth - 4) / 3);

    return (
        <ASFlex flexDirection="row" marginBottom={2}>
            {item.entries.map((entry, index) => {
                if (entry.attachment.__typename === 'MessageAttachmentFile') {
                    return <AsyncFileItem attachment={entry.attachment} key={entry.message.id} chatId={chatId} message={entry.message} index={index} imageSize={imageSize} onLongPress={onLongPress} />;
                }
                return null;
            })}
        </ASFlex>

    );
};