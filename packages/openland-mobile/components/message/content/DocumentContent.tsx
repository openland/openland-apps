
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { formatBytes } from 'openland-mobile/utils/formatBytes';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ZDocumentExt } from 'openland-mobile/components/file/ZDocumentExt';
import { isAudio, isVideo } from 'openland-mobile/utils/isVideo';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { formatDuration } from 'openland-mobile/utils/formatDuration';

interface DocumentContentProps {
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    theme: ThemeGlobal;
    maxWidth: number;
    onDocumentPress: (document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => void;
}

export const DocumentContent = React.memo((props: DocumentContentProps) => {
    const { theme, attach, maxWidth, onDocumentPress } = props;
    const isFileVideo = isVideo(attach!!.fileMetadata.name);
    const preview = attach?.filePreview;
    const [path, setPath] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (attach && attach.previewFileId) {
            return DownloadManagerInstance.watch(
                attach.previewFileId,
                null,
                (state) => {
                    if (state.path) {
                        setPath('file://' + state.path);
                    }
                });
        }
        return;
    }, [attach.previewFileId]);
    const src = path || preview;
    const width = attach?.previewFileMetadata?.imageWidth;
    const height = attach?.previewFileMetadata?.imageHeight;
    const duration = attach.videoMetadata?.duration;

    if (isFileVideo && src && height && width) {
        const layout = layoutMedia(width, height, maxWidth, maxWidth);
        return (
            <TouchableOpacity onPress={() => onDocumentPress(attach)} activeOpacity={0.6} style={{ width: layout.width, height: layout.height, marginBottom: 8 }}>
                <>
                    <Image
                        source={{ uri: src }}
                        style={{
                            width: layout.width,
                            height: layout.height,
                            borderRadius: RadiusStyles.Medium,
                        }}
                    />
                    {duration && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 8,
                                left: 8,
                                backgroundColor: theme.overlayMedium,
                                borderRadius: 100,
                                zIndex: 2,
                                paddingVertical: 1,
                                paddingHorizontal: 8,
                            }}
                        >
                            <Text style={{ color: theme.foregroundContrast, ...TextStyles.Caption }}>{formatDuration(duration)}</Text>
                        </View>
                    )}
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                width: 48,
                                height: 48,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: theme.overlayMedium,
                                borderRadius: 24,
                            }}
                        >
                            <Image source={require('assets/ic-play-glyph-24.png')} style={{ width: 24, height: 24, tintColor: theme.foregroundContrast }} />
                        </View>
                    </View>
                </>
            </TouchableOpacity>
        );
    }

    if (isAudio(attach!!.fileMetadata.name)) {
        return (
            <TouchableOpacity onPress={() => onDocumentPress(attach)} activeOpacity={0.6} style={{ marginBottom: 8 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        padding: 12,
                        alignItems: 'center',
                        backgroundColor: theme.incomingBackgroundPrimary,
                        borderRadius: 18,
                    }}
                >
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: theme.accentPrimary,
                            borderRadius: 20,
                            marginRight: 12,
                        }}
                    >
                        <Image source={require('assets/ic-play-glyph-24.png')} style={{ width: 20, height: 20, tintColor: theme.foregroundContrast }} />
                    </View>
                    <Text
                        style={{
                            ...TextStyles.Label2,
                            color: theme.foregroundPrimary,
                            flexShrink: 1
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        allowFontScaling={false}
                    >
                        {attach.fileMetadata.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity onPress={() => onDocumentPress(attach)} activeOpacity={0.6}>
            <View
                style={{
                    height: 72,
                    flexDirection: 'row',
                    marginVertical: 4,
                    padding: 12,
                    borderRadius: RadiusStyles.Medium,
                    backgroundColor: theme.backgroundTertiary
                }}
            >
                <View style={{ marginRight: 12 }}>
                    <ZDocumentExt name={attach.fileMetadata.name} />
                </View>

                <View
                    style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        flexDirection: 'column',
                        alignSelf: 'center'
                    }}
                >
                    <Text
                        style={{
                            ...TextStyles.Label2,
                            color: theme.foregroundPrimary,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        allowFontScaling={false}
                    >
                        {attach.fileMetadata.name}
                    </Text>
                    <Text
                        style={{
                            ...TextStyles.Caption,
                            color: theme.foregroundSecondary,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        allowFontScaling={false}
                    >
                        {formatBytes(attach.fileMetadata.size)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});