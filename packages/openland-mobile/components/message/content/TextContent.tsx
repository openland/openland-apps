import * as React from 'react';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { Text, TextStyle, View, TextProps } from 'react-native';
import { FullMessage_GeneralMessage_quotedMessages, FullMessage } from 'openland-api/Types';
import { renderPreprocessedText } from '../renderPreprocessedText';
import { processSpans } from 'openland-y-utils/spans/processSpans';
import { getSpansSlices } from 'openland-y-utils/spans/utils';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

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
                fontWeight: FontStyles.Weight.Regular,
            } as TextStyle
        ]}
        allowFontScaling={false}
    >
        {props.children}
    </Text>
);

interface TextContentProps {
    message: FullMessage | FullMessage_GeneralMessage_quotedMessages;

    fontStyle?: 'italic' | 'normal';
    wrapped?: boolean;
    theme: ThemeGlobal;
    inReply?: boolean;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
}

export const TextContent = (props: TextContentProps) => {
    const { theme, message, inReply, wrapped, fontStyle, onUserPress, onGroupPress } = props;
    const preprocessed = processSpans(message.message || '', message.spans);
    const content = getSpansSlices(preprocessed);

    const codeMarginLeft = wrapped ? 0 : -(inReply ? 8 : 16);
    const codeMarginRight = wrapped ? 0 : -(inReply ? 8 : 16);
    const codePaddingLeft = wrapped ? 10 : -codeMarginLeft;
    const codePaddingRight = wrapped ? 10 : -codeMarginRight;

    const fontSize = {
        'emoji': wrapped ? 26 : 30,
        'loud': wrapped ? 16 : 20,
        'slice': 17,
        'code_block': 14,
    };

    const lineHeight = {
        'emoji': wrapped ? 30 : 34,
        'loud': wrapped ? 20 : 24,
        'slice': 24,
        'code_block': undefined,
    };

    return (
        <>
            {content.map((c, i) => (
                <>
                    {(c.type === 'slice' || c.type === 'loud' || c.type === 'emoji' || c.type === 'padded') && (
                        <TextWrapper
                            key={c.type + '-' + i}
                            color={theme.foregroundPrimary}
                            style={{
                                fontStyle: fontStyle,
                                marginTop: (c.type === 'loud' && i !== 0) ? (wrapped ? 5 : 8) : undefined,
                                marginBottom: (c.type !== 'emoji' && i !== content.length - 1) ? (wrapped ? 5 : 8) : undefined,
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
                            backgroundColor={theme.bubble(false).backgroundSecondary}
                            marginTop={i === 0 && inReply ? 4 : undefined}
                            marginLeft={codeMarginLeft}
                            marginRight={codeMarginRight}
                            marginBottom={(!(content[i + 1] && content[i + 1].type === 'padded')) ? 8 : undefined}
                            paddingLeft={codePaddingLeft}
                            paddingRight={codePaddingRight}
                            paddingVertical={6}
                        >
                            <TextWrapper
                                style={{
                                    fontSize: fontSize[c.type],
                                    lineHeight: lineHeight[c.type]
                                }}
                                color={theme.bubble(false).foregroundPrimary}
                            >
                                {renderPreprocessedText(c.spans, onUserPress, onGroupPress, theme)}
                            </TextWrapper>
                        </View>
                    )}
                </>
            ))}
        </>
    );
};