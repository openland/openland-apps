import * as React from 'react';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Text, TextStyle } from 'react-native';
import { preprocessText } from 'openland-mobile/utils/TextProcessor';
import { isEmoji } from 'openland-y-utils/isEmoji';
import { FullMessage_GeneralMessage, FullMessage_GeneralMessage_quotedMessages } from 'openland-api/Types';
import { renderPreprocessedText } from '../renderPreprocessedText';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { AppTheme } from 'openland-mobile/themes/themes';

interface TextContentProps {
    message: FullMessage_GeneralMessage | FullMessage_GeneralMessage_quotedMessages;

    fontStyle?: 'italic' | 'normal';
    isSmall?: boolean;
    theme: AppTheme;

    onUserPress: (id: string) => void;
}

export const TextContent = (props: TextContentProps) => {
    let { theme, message } = props;
    let text = message.message;

    let singleEmoji = false;
    let textSticker = false;

    if (text) {
        singleEmoji = isEmoji(text);
        textSticker = (text.length <= 302 && text.startsWith(':') && text.endsWith(':'));
    }
    let big = singleEmoji || textSticker;

    if (textSticker) {
        message = { ...message, message: text!.slice(1, text!.length - 1) };
    }

    let preprocessed = preprocessText(message.message || '', message.spans);
    let parts = preprocessed.map((p, i) => renderPreprocessedText(p, i, props.onUserPress, theme));

    if (message.message) {
        return (
            <Text
                style={{
                    color: theme.textColor,
                    lineHeight: big ? 28 : (props.isSmall ? 20 : 22),
                    fontSize: big ? 26 : (props.isSmall ? 15 : 16),
                    fontWeight: big ? TextStyles.weight.medium : TextStyles.weight.regular,
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