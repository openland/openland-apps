import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { MetaInfoIndicator } from './MetaInfoIndicator';

interface EmojiOnlyContentProps {
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    content: any[];
}

export const EmojiOnlyContent = React.memo<EmojiOnlyContentProps>((props) => {
    const { theme, message, content } = props;
    const { isOut } = message;

    return (
        <ASFlex backgroundColor={theme.backgroundPrimary}>
            <ASFlex flexDirection="row" alignItems="stretch">
                {isOut && <MetaInfoIndicator type="emoji" message={message} theme={theme} />}
                {content}
                {!isOut && <MetaInfoIndicator type="emoji" message={message} theme={theme} />}
            </ASFlex>
        </ASFlex>
    );
});