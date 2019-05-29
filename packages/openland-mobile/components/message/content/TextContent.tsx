import * as React from 'react';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Text, TextStyle, View, TextProps } from 'react-native';
import { FullMessage_GeneralMessage, FullMessage_GeneralMessage_quotedMessages } from 'openland-api/Types';
import { renderPreprocessedText } from '../renderPreprocessedText';
import { AppTheme } from 'openland-mobile/themes/themes';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { getSpansSlices } from 'openland-y-utils/spans/utils';

interface TextWrapperProps extends TextProps {
    color: string;
    children?: any;
}

const TextWrapper = (props: TextWrapperProps) => (
    <Text
        style={[
            props.style,
            {
                color: props.color,
                fontWeight: TextStyles.weight.regular,
            } as TextStyle
        ]}
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
    const content = getSpansSlices(preprocessed);

    const codeMarginLeft = isSmall ? 0 : (inReply ? 8 : 16);
    const codeMarginRight = isSmall ? 0 : (inReply ? 8 : 16);
    const codePaddingLeft = isSmall ? 10 : -codeMarginLeft;
    const codePaddingRight = isSmall ? 10 : -codeMarginRight;

    const fontSize = {
        'emoji': isSmall ? 26 : 30,
        'loud': isSmall ? 16 : 20,
        'slice': isSmall ? 15 : 16,
        'code_block': 14,
    }

    const lineHeight = {
        'emoji': isSmall ? 30 : 34,
        'loud': isSmall ? 20 : 24,
        'slice': undefined,
        'code_block': undefined,
    }

    return (
        <>
            {content.map((c, i) => (
                <>
                    {(c.type === 'slice' || c.type === 'loud' || c.type === 'emoji') && (
                        <TextWrapper
                            key={c.type + '-' + i}
                            color={theme.textColor}
                            style={{
                                fontStyle: fontStyle,
                                marginTop: (c.type === 'loud' && i !== 0) ? (isSmall ? 5 : 8) : undefined,
                                marginBottom: (c.type === 'loud' && i !== content.length - 1) ? (isSmall ? 5 : 8) : undefined,
                                fontSize: fontSize[c.type],
                                lineHeight: lineHeight[c.type]
                            }}
                        >
                            {c.spans.length > 0 && renderPreprocessedText(c.spans, onUserPress, onGroupPress, theme)}
                        </TextWrapper>
                    )}
                    {c.type === 'code_block' && (
                        <View
                            key={c.type + '-' + i}
                            backgroundColor={theme.codeSpan.background}
                            marginTop={i === 0 && inReply ? 4 : undefined}
                            marginLeft={codeMarginLeft}
                            marginRight={codeMarginRight}
                            paddingLeft={codePaddingLeft}
                            paddingRight={codePaddingRight}
                            paddingVertical={6}
                        >
                            <TextWrapper
                                style={{
                                    fontSize: fontSize[c.type],
                                    lineHeight: lineHeight[c.type]
                                }}
                                color={theme.textColor}
                            >
                                {renderPreprocessedText(c.spans, onUserPress, onGroupPress, theme)}
                            </TextWrapper>
                        </View>
                    )}
                </>
            ))}
        </>
    );
}