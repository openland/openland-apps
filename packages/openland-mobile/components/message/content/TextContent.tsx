import * as React from 'react';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Text, TextStyle, View } from 'react-native';
import { FullMessage_GeneralMessage, FullMessage_GeneralMessage_quotedMessages } from 'openland-api/Types';
import { renderPreprocessedText } from '../renderPreprocessedText';
import { AppTheme } from 'openland-mobile/themes/themes';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { getCodeSlices } from 'openland-y-utils/spans/utils';

const TextWrapper = (props: { isSmall?: boolean; fontSize?: number; color: string; fontStyle?: 'italic' | 'normal'; children?: any }) => (
    <Text
        style={{
            color: props.color,
            fontSize: props.fontSize || (props.isSmall ? 15 : 16),
            fontWeight: TextStyles.weight.regular,
            fontStyle: props.fontStyle,
        } as TextStyle}
        allowFontScaling={false}
    >
        {props.children}
    </Text>
)

interface TextContentProps {
    message: FullMessage_GeneralMessage | FullMessage_GeneralMessage_quotedMessages;

    fontStyle?: 'italic' | 'normal';
    isSmall?: boolean;
    theme: AppTheme;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
}

export const TextContent = (props: TextContentProps) => {
    const { theme, message, onUserPress, onGroupPress } = props;
    const preprocessed = processSpans(message.message || '', message.spans);
    const content = getCodeSlices(preprocessed);

    return (
        <>
            {content.map((c, i) => (
                <>
                    {c.type === 'slice' && (
                        <TextWrapper
                            key={'slice-' + i}
                            color={theme.textColor}
                            fontStyle={props.fontStyle}
                        >
                            {c.spans.length > 0 && renderPreprocessedText(c.spans, onUserPress, onGroupPress, theme)}
                        </TextWrapper>
                    )}
                    {c.type === 'code' && (
                        <View
                            key={'code-' + i}
                            backgroundColor={theme.codeSpan.background}
                            marginHorizontal={-16}
                            paddingHorizontal={16}
                            paddingVertical={6}
                        >
                            <TextWrapper fontSize={14} color={theme.textColor}>
                                {renderPreprocessedText(c.spans, onUserPress, onGroupPress, theme)}
                            </TextWrapper>
                        </View>
                    )}
                </>
            ))}
        </>
    );
}