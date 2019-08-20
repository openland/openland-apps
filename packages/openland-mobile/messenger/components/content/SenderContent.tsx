import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASImage } from 'react-native-async-view/ASImage';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';

interface SenderContentProps {
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
}

export const SenderContent = React.memo((props: SenderContentProps) => {
    const { theme, message, onUserPress } = props;

    return (
        <ASFlex
            marginBottom={2}
            onPress={() => onUserPress(message.senderId)}
            key={'name-' + theme.accentPrimary}
            alignItems="center"
        >
            {!!message.senderBadge && (
                <ASImage marginRight={3} source={require('assets/ic-featured-12.png')} width={12} height={12} tintColor={theme.foregroundPrimary} />
            )}
            <ASText
                {...TextStylesAsync.Label2}
                color={theme.foregroundPrimary}
            >
                {message.senderName}
            </ASText>
        </ASFlex>
    );
});