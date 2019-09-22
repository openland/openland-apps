
import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { formatBytes } from 'openland-mobile/utils/formatBytes';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ZDocumentExt } from 'openland-mobile/components/file/ZDocumentExt';

interface DocumentContentProps {
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    theme: ThemeGlobal;
    onDocumentPress: (document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => void;
}

export const DocumentContent = React.memo((props: DocumentContentProps) => {
    const { theme, attach, onDocumentPress } = props;

    return (
        <TouchableOpacity onPress={() => onDocumentPress(attach)} activeOpacity={0.6}>
            <View
                height={72}
                flexDirection="row"
                marginVertical={4}
                padding={12}
                borderRadius={RadiusStyles.Medium}
                backgroundColor={theme.backgroundTertiary}
            >
                <View marginRight={12}>
                    <ZDocumentExt name={attach.fileMetadata.name} />
                </View>

                <View
                    flexGrow={1}
                    flexShrink={1}
                    flexDirection="column"
                    alignSelf="center"
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