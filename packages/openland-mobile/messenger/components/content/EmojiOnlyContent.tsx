import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { MetaInfoIndicator } from './MetaInfoIndicator';
import { Platform } from 'react-native';

interface EmojiOnlyContentProps {
    theme: ThemeGlobal;
    message: DataSourceMessageItem;
    content: any[];
}

// Sorry universe
const baselineCompensation = Platform.OS === 'ios' ? 4 : 0;

export const EmojiOnlyContent = React.memo<EmojiOnlyContentProps>((props) => {
    const { theme, message, content } = props;
    const { isOut } = message;

    return (
        <ASFlex backgroundColor={theme.backgroundPrimary}>
            <ASFlex flexDirection="row" alignItems="stretch">
                {isOut && <MetaInfoIndicator type="emoji" message={message} theme={theme} />}
                <ASFlex marginBottom={-baselineCompensation} marginTop={baselineCompensation}>
                    {content}
                </ASFlex>
                {!isOut && <MetaInfoIndicator type="emoji" message={message} theme={theme} />}
            </ASFlex>
        </ASFlex>
    );
});