import * as React from 'react';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Text, TextStyle } from 'react-native';
import { isEmoji } from 'openland-y-utils/isEmoji';
import { FullMessage_GeneralMessage, FullMessage_GeneralMessage_quotedMessages } from 'openland-api/Types';
import { renderPreprocessedText } from '../renderPreprocessedText';
import { AppTheme } from 'openland-mobile/themes/themes';
import { processSpans } from 'openland-y-utils/spans/processSpans';

interface TextContentProps {
    message: FullMessage_GeneralMessage | FullMessage_GeneralMessage_quotedMessages;

    fontStyle?: 'italic' | 'normal';
    isSmall?: boolean;
    theme: AppTheme;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
}

export const TextContent = (props: TextContentProps) => {
    let { theme, message } = props;

    let preprocessed = processSpans(message.message || '', message.spans);
    let parts = renderPreprocessedText(preprocessed, props.onUserPress, props.onGroupPress, theme);

    if (message.message) {
        return (
            <Text
                style={{
                    color: theme.textColor,
                    fontSize: (props.isSmall ? 15 : 16),
                    fontWeight: TextStyles.weight.regular,
                    fontStyle: props.fontStyle,
                } as TextStyle}
                allowFontScaling={false}
            >
                {parts}
            </Text>
        );
    }

    return null;
}