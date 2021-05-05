import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { DataSourceMessageItem, PendingAttachProps } from 'openland-engines/messenger/ConversationEngine';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import * as React from 'react';
import { ASFlex, ASFlexProps } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';

export const AudioContent = React.memo((props: {
    message: DataSourceMessageItem;
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile & PendingAttachProps;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    onLongPress: (event: ASPressEvent) => void;
    theme: ThemeGlobal;
    maxWidth: number;
} & ASFlexProps) => {
    const {
        attach,
        message,
        theme,
        maxWidth,
        onDocumentPress,
        onLongPress,
        ...other
    } = props;
    const { isOut } = message;
    return (
        <ASFlex
            {...other}
            maxWidth={maxWidth}
            marginBottom={8}
            onPress={() => onDocumentPress(message)}
            onLongPress={onLongPress}
        >
            <ASFlex
                flexDirection="row"
                alignItems="center"
            >
                <ASFlex
                    width={40}
                    height={40}
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor={isOut ? theme.tintInverted : theme.accentPrimary}
                    borderRadius={20}
                    marginRight={12}
                    marginTop={6}
                >
                    <ASImage
                        source={require('assets/ic-play-glyph-24.png')}
                        width={20}
                        height={20}
                        tintColor={theme.foregroundContrast}
                    />
                </ASFlex>
                <ASText
                    {...TextStylesAsync.Label2}
                    color={isOut ? theme.foregroundContrast : theme.foregroundPrimary}
                    flexShrink={1}
                    numberOfLines={1}
                    marginRight={12}
                    maxWidth={maxWidth - 72}
                >
                    {attach.fileMetadata.name}
                </ASText>
            </ASFlex>
        </ASFlex >
    );
});
