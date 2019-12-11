import * as React from 'react';
import { DataSourceSharedLinkItem } from 'openland-engines/messenger/SharedMediaEngine';
import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { Linking, Image } from 'react-native';
import { ASAvatar } from 'openland-mobile/messenger/components/ASAvatar';
import { ASImage } from 'react-native-async-view/ASImage';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';

const isAvatar = (url: string | null) => {
    return url && url.startsWith('ph://');
};

interface AsyncSharedLinkProps {
    item: DataSourceSharedLinkItem;
}

export const AsyncSharedLink = React.memo(({ item }: AsyncSharedLinkProps) => {
    const { message } = item;
    const senderName = message.sender.name;
    const attachment = message.attachments[0] as SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageRichAttachment;
    const theme = useThemeGlobal();

    const onPress = React.useCallback(() => {
        Linking.openURL(attachment.titleLink!!);
    }, []);

    const url = attachment.image && attachment.image.url || attachment.imageFallback && attachment.imageFallback.photo || attachment.imagePreview;
    let image = null;
    if (isAvatar(url)) {
        image = <ASAvatar src={url} placeholderTitle={attachment.title} size="large" theme={theme} borderRadius={8} />;
    } else if (url) {
        image = (
            <ASImage
                source={{ uri: url }}
                width={56}
                height={56}
                borderRadius={8}
            />
        );
    } else {
        image = (
            <ASImage
                source={require('assets/ic-link-glyph-24.png')}
                width={24}
                height={24}
                tintColor={theme.foregroundTertiary}
            />
        );
    }
    const resolved = Image.resolveAssetSource(require('assets/bg-shared-link-border.png'));
    const capInsets = { top: 12, right: 12, bottom: 12, left: 12 };

    return (
        <ASFlex onPress={onPress} flexGrow={1}>
            <ASFlex flexDirection="row" flexGrow={1} marginLeft={16} marginRight={16} marginTop={8} marginBottom={8}>
                <ASFlex marginTop={4}>
                    <ASFlex
                        borderRadius={8}
                        width={57}
                        height={57}
                        backgroundColor={url ? undefined : theme.backgroundTertiaryTrans}
                        alignItems="center"
                        justifyContent="center"
                        backgroundPatch={{
                            source: resolved.uri,
                            scale: resolved.scale,
                            ...capInsets
                        }}
                        backgroundPatchTintColor={theme.borderLight}
                    >
                        {image}
                    </ASFlex>
                </ASFlex>
                <ASFlex flexDirection="column" flexGrow={1} flexBasis={0} flexShrink={1} marginLeft={16}>
                    {!!attachment.title && (
                        <ASText
                            {...TextStylesAsync.Label1}
                            color={theme.foregroundPrimary}
                            marginBottom={4}
                            numberOfLines={3}
                            flexShrink={1}
                        >
                            {attachment.title}
                        </ASText>
                    )}
                    {!!attachment.text && (
                        <ASText
                            {...TextStylesAsync.Subhead}
                            color={theme.foregroundPrimary}
                            marginBottom={4}
                            numberOfLines={4}
                        >
                            {attachment.text}
                        </ASText>
                    )}
                    <ASText
                        {...TextStylesAsync.Subhead}
                        color={theme.accentPrimary}
                        marginBottom={4}
                        numberOfLines={3}
                    >
                        {attachment.titleLink}
                    </ASText>
                    <ASText
                        {...TextStylesAsync.Subhead}
                        color={theme.foregroundTertiary}
                        numberOfLines={1}
                    >
                        {senderName}
                    </ASText>
                </ASFlex>
            </ASFlex>
        </ASFlex >
    );
});