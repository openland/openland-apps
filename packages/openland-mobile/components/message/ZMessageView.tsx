import * as React from 'react';
import { FullMessage_GeneralMessage, FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { View } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { extractContent } from './extractContent';
import { ReactionsView } from './content/ReactionsView';

export interface ZMessageViewProps {
    message: FullMessage_GeneralMessage;

    small?: boolean;
    showReactions?: boolean;
    maxWidth?: number;
}

export const ZMessageView = React.memo<ZMessageViewProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const router = getMessenger().history.navigationManager;

    const { message, small, showReactions, maxWidth } = props;

    const handleUserPress = React.useCallback((id: string) => {
        router.push('ProfileUser', { id });
    }, []);

    const handleDocumentPress = React.useCallback((document: FullMessage_GeneralMessage_attachments_MessageAttachmentFile) => {
        router.push('FilePreview', { config: { uuid: document.fileId, name: document.fileMetadata.name, size: document.fileMetadata.size } });
    }, []);

    const content = extractContent({
        message,
        onUserPress: handleUserPress,
        onDocumentPress: handleDocumentPress,
        theme
    }, small, maxWidth);

    const reactions = showReactions ? <ReactionsView reactions={message.reactions} theme={theme} /> : undefined;

    return (
        <View>
            {content}
            {reactions}
        </View>
    );
});