import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { showFileModal } from 'openland-mobile/components/file/showFileModal';
import { formatBytes } from 'openland-y-utils/formatBytes';
import { ASDocumentExt } from 'openland-mobile/components/file/ASDocumentExt';
import { SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { DataSourceSharedDocumentItem } from 'openland-engines/messenger/SharedMediaEngine';

interface AsyncSharedDocumentProps {
    item: DataSourceSharedDocumentItem;
}

export const AsyncSharedDocument = React.memo(({ item }: AsyncSharedDocumentProps) => {
    const theme = useThemeGlobal();
    const { message } = item;
    const senderName = message.sender.name;
    const attachment = message.attachments[0] as SharedMedia_sharedMedia_edges_node_message_GeneralMessage_attachments_MessageAttachmentFile;

    const onPress = React.useCallback(() => {
        showFileModal({ uuid: attachment.fileId, name: attachment.fileMetadata.name, size: attachment.fileMetadata.size });
    }, [attachment]);

    return (
        <ASFlex
            marginRight={16}
            marginLeft={16}
            flexGrow={1}
            flexDirection="row"
            onPress={onPress}
            highlightColor={theme.backgroundTertiary}
            alignItems="center"
        >
            <ASDocumentExt name={attachment.fileMetadata.name} size="medium" />
            <ASFlex
                marginLeft={16}
                marginTop={6}
                marginBottom={6}
                flexGrow={1}
                flexShrink={1}
                flexBasis={0}
                flexDirection="column"
            >
                <ASText
                    {...TextStylesAsync.Label1}
                    color={theme.foregroundPrimary}
                    flexShrink={1}
                    numberOfLines={1}
                >
                    {attachment.fileMetadata.name}
                </ASText>
                <ASText
                    {...TextStylesAsync.Subhead}
                    color={theme.foregroundTertiary}
                    flexShrink={1}
                    numberOfLines={1}
                >
                    {`${formatBytes(attachment.fileMetadata.size)}  ·  ${senderName}`}
                </ASText>
            </ASFlex>
        </ASFlex>
    );
});