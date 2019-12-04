import * as React from 'react';
import { ASText } from 'react-native-async-view/ASText';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { renderPreprocessedText } from './AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';

export interface AsyncServiceMessageProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onOrganizationPress: (id: string) => void;
}

export const AsyncServiceMessage = (props: AsyncServiceMessageProps) => {
    const { message, onUserPress, onGroupPress, onOrganizationPress } = props;
    const theme = useThemeGlobal();
    let parts = renderPreprocessedText(message.textSpans, message, theme, onUserPress, onGroupPress, onOrganizationPress);

    return (
        <ASFlex
            flexDirection="column"
            alignItems="center"
        >
            <ASFlex
                marginTop={10}
                marginBottom={0}
                marginLeft={36}
                marginRight={36}
                flexDirection="column"
                alignItems="center"
            >
                <ASText
                    color={theme.foregroundSecondary}
                    fontSize={13}
                    lineHeight={18}
                    textAlign="center"
                >
                    {parts}
                </ASText>
            </ASFlex >
        </ASFlex >
    );
};
