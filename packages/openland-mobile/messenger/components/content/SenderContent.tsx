import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASText } from 'react-native-async-view/ASText';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';

// TODO: uncomment pro
import { PremiumBadgeAsync } from 'openland-mobile/components/PremiumBadge';

interface SenderContentProps {
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    hasPurchase: boolean;
    onUserPress: (id: string) => void;
}

export const SenderContent = React.memo((props: SenderContentProps) => {
    const { theme, message, hasPurchase, onUserPress } = props;
    const color = hasPurchase ? theme.payForegroundPrimary : theme.foregroundPrimary;

    return (
        <ASFlex
            onPress={() => onUserPress(message.sender.id)}
            key={'name-' + theme.accentPrimary}
            alignItems="center"
        >
            <ASText {...TextStylesAsync.Label2} color={color} numberOfLines={1} flexShrink={1}>
                {message.overrideName || message.sender.name}
            </ASText>
            {!!message.sender.systemBadge && (
                <ASFlex marginLeft={8} marginTop={3}>
                    <PremiumBadgeAsync theme={theme}/>
                </ASFlex>
            )}
        </ASFlex>
    );
});
