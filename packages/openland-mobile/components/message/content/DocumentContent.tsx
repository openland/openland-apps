
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { formatBytes } from 'openland-mobile/utils/formatBytes';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ZDocumentExt } from 'openland-mobile/components/file/ZDocumentExt';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import MediaMeta from 'react-native-media-meta';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import moment from 'moment';
import { isVideo } from 'openland-mobile/utils/isVideo';

interface DocumentContentProps {
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    theme: ThemeGlobal;
    maxWidth: number;
    onDocumentPress: (document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => void;
}

export const DocumentContent = React.memo((props: DocumentContentProps) => {
    const { theme, attach, maxWidth, onDocumentPress } = props;
    const [preview, setPreview] = React.useState<{ path: string, width: number, height: number, duration: string } | undefined>();
    const [path, setPath] = React.useState<any>();
    const isFileVideo = isVideo(attach!!.fileMetadata.name) && attach?.filePreview;

    React.useEffect(() => {
        if (isFileVideo) {
            return DownloadManagerInstance.watch(
                attach!!.fileId!,
                null,
                (state) => {
                    setPath(state.path);
                });
        }
        return;
    }, []);
    React.useEffect(() => {
        if (isFileVideo && path) {
            (async () => {
                const filePathWithExtension = await DownloadManagerInstance.getFilePathWithRealName(
                    attach.fileId,
                    null,
                    `${attach.fileId}.mp4`,
                );

                if (!filePathWithExtension) {
                    return;
                }
                const meta = await MediaMeta.get(filePathWithExtension);
                setPreview({
                    path: 'data:image/png;base64,' + meta.thumb,
                    ...layoutMedia(meta.width, meta.height, maxWidth, maxWidth),
                    duration: moment(Number.parseFloat(meta.duration)).format('m:ss')
                });
            })();
        }
    }, [path]);

    if (isFileVideo) {
        // if (false) {
        if (!preview) {
            return null;
        }

        return (
            <TouchableOpacity onPress={() => onDocumentPress(attach)} activeOpacity={0.6}>
                <>
                    <Image
                        source={{ uri: preview.path }}
                        style={{
                            width: preview?.width,
                            height: preview?.height,
                            borderRadius: RadiusStyles.Medium,
                        }}
                    />
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
                        <Text style={{ color: theme.foregroundContrast, ...TextStyles.Caption }}>{preview.duration}</Text>
                    </View>
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