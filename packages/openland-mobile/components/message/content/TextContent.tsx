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
    inReply?: boolean;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
}

export const TextContent = (props: TextContentProps) => {
    const { theme, message, inReply, isSmall, fontStyle, onUserPress, onGroupPress } = props;
    const preprocessed = processSpans(message.message || '', message.spans);
    const content = getCodeSlices(preprocessed);

    const codeMarginLeft = isSmall ? 0 : (inReply ? 8 : 16);
    const codeMarginRight = isSmall ? 0 : (inReply ? 8 : 16);
    const codePaddingLeft = isSmall ? 10 : -codeMarginLeft;
    const codePaddingRight = isSmall ? 10 : -codeMarginRight;

    return (
        <>
            {content.map((c, i) => (
                <>
                    {c.type === 'slice' && (
                        <TextWrapper
                            key={'slice-' + i}
                            color={theme.textColor}
                            fontStyle={fontStyle}
                            isSmall={isSmall}
                        >
                            {c.spans.length > 0 && renderPreprocessedText(c.spans, onUserPress, onGroupPress, theme)}
                        </TextWrapper>
                    )}
                    {c.type === 'code' && (
                        <View
                            key={'code-' + i}
                            backgroundColor={theme.codeSpan.background}
                            marginTop={i === 0 && inReply ? 4 : undefined}
                            marginLeft={codeMarginLeft}
                            marginRight={codeMarginRight}
                            paddingLeft={codePaddingLeft}
                            paddingRight={codePaddingRight}
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