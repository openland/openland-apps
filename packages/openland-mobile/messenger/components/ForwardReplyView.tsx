import * as React from 'react';
import { Image, View } from 'react-native';
import { FullMessage } from 'openland-api/spacex.types';
import { formatMessage } from 'openland-engines/messenger/formatMessage';
import { InputTopView } from './InputTopView';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { DownloadState } from 'openland-mobile/files/DownloadManagerInterface';
import { ZDocumentExt } from 'openland-mobile/components/file/ZDocumentExt';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { PreviewWrapper } from 'openland-mobile/components/message/content/PreviewWrapper';

interface ForwardReplyViewProps {
    messages: FullMessage[];

    action?: 'forward' | 'reply';
    onClearPress: () => void;
}

export const ForwardReplyView = (props: ForwardReplyViewProps) => {
    const { messages, onClearPress, action } = props;
    const theme = useTheme();
    const [imageState, setImageState] = React.useState<DownloadState>();
    let title;
    let text;
    let textColor = theme.foregroundPrimary;
    let leftElement;
    let image: {
        id: string,
        width: number | undefined,
        height: number | undefined,
        isGif: boolean,
    } | undefined;
    if (messages.length !== 1) {
        text = messages.length + ' messages';
        if (action === 'reply') {
            title = 'Reply messages';
        } else {
            title = 'Forward messages';
        }
        textColor = theme.foregroundSecondary;
    } else {
        let message = messages[0];
        title = message.sender.name;
        text = formatMessage(messages[0]);

        let attach = message.__typename === 'GeneralMessage' ? message.attachments[0] : undefined;
        if (attach?.__typename === 'MessageAttachmentFile') {
            textColor = theme.foregroundSecondary;
            if (attach.fileMetadata.isImage) {
                image = {
                    id: attach.fileId,
                    width: attach.fileMetadata.imageWidth || undefined,
                    height: attach.fileMetadata.imageHeight || undefined,
                    isGif: attach.fileMetadata.mimeType === 'gif',
                };
            } else {
                leftElement = <ZDocumentExt name={attach.fileMetadata.name} />;
                text = attach.fileMetadata.name;
            }
        } else if (attach?.__typename === 'MessageRichAttachment') {
            if (attach.image) {
                image = {
                    id: attach.image.url,
                    width: attach.image.metadata?.imageWidth || undefined,
                    height: attach.image.metadata?.imageHeight || undefined,
                    isGif: attach.image.metadata?.mimeType === 'gif',
                };
            } else {
                leftElement = (
                    <View
                        width={40}
                        height={40}
                        borderRadius={8}
                        backgroundColor={theme.backgroundTertiaryTrans}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Image
                            source={require('assets/ic-link-glyph-24.png')}
                            style={{ width: 24, height: 24, tintColor: theme.foregroundTertiary }}
                        />
                    </View>
                );
            }
        }

        if (image) {
            leftElement = imageState?.path ? (
                <PreviewWrapper
                    path={imageState?.path}
                    width={image.width}
                    height={image.height}
                    isGif={image.isGif}
                    senderName={message.sender.name}
                    date={message.date}
                    radius={8}
                >
                    <Image
                        source={{ uri: imageState.path }}
                        style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: theme.backgroundTertiaryTrans }}
                    />
                </PreviewWrapper>
            ) : (
                    <View style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: theme.backgroundTertiaryTrans }} />
                );
        }
    }

    React.useEffect(() => {
        if (image) {
            let optimalSize = layoutMedia(image.width || 0, image.height || 0, 40, 40);
            return DownloadManagerInstance.watch(image.id, image.isGif ? optimalSize : null, (state) => {
                setImageState(state);
            });
        }
        return;
    }, [image]);

    return (
        <InputTopView
            title={title}
            text={text}
            textColor={textColor}
            leftElement={<View marginRight={8}>{leftElement}</View>}
            icon={require('assets/ic-reply-24.png')}
            onClearPress={onClearPress}
        />
    );
};
