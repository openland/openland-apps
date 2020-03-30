import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASText, ASTextProps } from 'react-native-async-view/ASText';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { renderPreprocessedText, paddedText } from '../AsyncMessageContentView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { getSpansSlices } from 'openland-y-utils/spans/utils';
import { Span } from 'openland-y-utils/spans/Span';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { Platform } from 'react-native';

interface TextWrapperProps extends ASTextProps {
    color: string;
    numberOfLines?: number;
    children?: any;
}

export const TextWrapper = (props: TextWrapperProps) => {
    const { children, numberOfLines, ...other } = props;

    return (
        <ASText
            key={'text-' + props.color}
            {...other}
            fontWeight={FontStyles.Weight.Regular}
            numberOfLines={numberOfLines}
        >
            {children}
        </ASText>
    );
};

interface RenderSpansProps {
    spans: Span[];
    message: DataSourceMessageItem;
    padded?: boolean;
    fontStyle?: 'italic' | 'normal';
    theme: ThemeGlobal;
    maxWidth: number;
    width?: number;
    insetLeft: number;
    insetRight: number;
    insetVertical: number;
    textAlign?: 'left' | 'right' | 'center';
    numberOfLines?: number;
    emojiOnly?: boolean;
    hasPurchase?: boolean;

    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onOrganizationPress: (id: string) => void;
}

const fontSize = {
    'emoji': 48,
    'loud': 20,
    'slice': 17,
    'code_block': 14
};

const lineHeight = {
    'emoji': Platform.OS === 'ios' ? 56 : 64,
    'loud': 26,
    'slice': 22,
    'code_block': undefined
};

const letterSpacing = {
    'emoji': 4,
    'loud': 0.38,
    'slice': -0.41,
    'code_block': undefined
};

export class RenderSpans extends React.PureComponent<RenderSpansProps> {
    render() {
        const { emojiOnly, hasPurchase, textAlign, spans, message, padded, fontStyle, theme, maxWidth, width, insetLeft, insetRight, insetVertical, numberOfLines, onUserPress, onGroupPress, onOrganizationPress } = this.props;

        let bubbleForegroundPrimary = message.isOut ? theme.outgoingForegroundPrimary : theme.incomingForegroundPrimary;
        const bubbleBackgroundSecondary = message.isOut ? theme.outgoingBackgroundSecondary : theme.incomingBackgroundSecondary;

        if (hasPurchase) {
            bubbleForegroundPrimary = theme.payForegroundPrimary;
        }

        const color = emojiOnly ? theme.foregroundPrimary : bubbleForegroundPrimary;
        const content = getSpansSlices(spans, padded);

        return (
            <ASFlex flexDirection="column" alignItems="stretch">
                {content.map((c, i) => {
                    if (c.type === 'slice' || c.type === 'loud' || c.type === 'emoji' || c.type === 'padded') {
                        return (
                            <ASFlex>
                                <TextWrapper
                                    key={c.type + '-' + i}
                                    color={color}
                                    fontStyle={fontStyle}
                                    fontSize={fontSize[c.type]}
                                    lineHeight={lineHeight[c.type]}
                                    letterSpacing={letterSpacing[c.type]}
                                    marginTop={(c.type === 'loud' && i !== 0) ? insetVertical : undefined}
                                    marginBottom={(c.type !== 'emoji' && i !== content.length - 1) ? insetVertical : undefined}
                                    textAlign={textAlign}
                                    maxWidth={!width ? maxWidth : undefined}
                                    width={width}
                                    numberOfLines={numberOfLines}
                                >
                                    {c.spans.length > 0 && renderPreprocessedText(c.spans, message, theme, onUserPress, onGroupPress, onOrganizationPress)}
                                    {c.padded && paddedText(message.isEdited)}
                                </TextWrapper>
                            </ASFlex>
                        );
                    }

                    return (
                        <ASFlex
                            key={c.type + '-' + i}
                            marginLeft={-insetLeft}
                            marginRight={-insetRight}
                            marginTop={i === 0 ? insetVertical + ((message.isOut || message.attachTop) ? 2 : 0) : undefined}
                            marginBottom={(!(content[i + 1] && content[i + 1].type === 'padded')) ? insetVertical : undefined}
                            backgroundColor={bubbleBackgroundSecondary}
                        >
                            <ASFlex marginLeft={insetLeft} marginRight={insetRight} marginTop={5} marginBottom={5}>
                                <TextWrapper
                                    fontSize={fontSize[c.type]}
                                    lineHeight={lineHeight[c.type]}
                                    letterSpacing={letterSpacing[c.type]}
                                    numberOfLines={numberOfLines}
                                    color={color}
                                    maxWidth={!width ? maxWidth : undefined}
                                    width={width}
                                >
                                    {renderPreprocessedText(c.spans, message, theme, onUserPress, onGroupPress, onOrganizationPress)}
                                </TextWrapper>
                            </ASFlex>
                        </ASFlex>
                    );
                })}
            </ASFlex>
        );
    }
}