import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { AppTheme } from 'openland-mobile/themes/themes';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { bubbleMaxWidth, contentInsetsHorizontal, bubbleMaxWidthIncoming } from '../AsyncBubbleView';
import { getCodeSlices } from 'openland-y-utils/spans/utils';

const TextWrapper = (props: { maxWidth?: number; fontSize?: number; color: string; fontStyle?: 'italic' | 'normal'; children?: any }) => (
    <ASText
        key={'text-' + props.color}
        color={props.color}
        letterSpacing={-0.3}
        fontSize={props.fontSize || 16}
        fontWeight={TextStyles.weight.regular}
        fontStyle={props.fontStyle}
        maxWidth={props.maxWidth}
    >
        {props.children}
    </ASText>
)

interface TextContentProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    padded?: boolean;
    fontStyle?: 'italic' | 'normal';
    theme: AppTheme;
}

export class TextContent extends React.PureComponent<TextContentProps> {
    render() {
        const { message, theme, onUserPress, onGroupPress } = this.props;
        const mainTextColor = message.isOut ? theme.textColorOut : theme.textColor;
        const content = getCodeSlices(message.textSpans, this.props.padded);

        return (
            <>
                {content.map((c, i) => (
                    <>
                        {c.type === 'slice' && (
                            <TextWrapper
                                key={'slice-' + i}
                                color={mainTextColor}
                                fontStyle={this.props.fontStyle}
                            >
                                {c.spans.length > 0 && renderPreprocessedText(c.spans, message, theme, onUserPress, onGroupPress)}
                                {c.padded && (message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited))}
                            </TextWrapper>
                        )}
                        {c.type === 'code' && (
                            <ASFlex
                                key={'code-' + i}
                                marginLeft={-contentInsetsHorizontal}
                                marginRight={-contentInsetsHorizontal}
                                marginTop={i === 0 ? 8 : undefined}
                                backgroundColor={(message.isOut && !message.isService) ? theme.codeSpan.backgroundOut : theme.codeSpan.background}
                            >
                                <ASFlex marginLeft={contentInsetsHorizontal} marginRight={contentInsetsHorizontal} marginTop={5} marginBottom={5}>
                                    <TextWrapper fontSize={14} color={mainTextColor} maxWidth={message.isOut ? bubbleMaxWidth - 40 : bubbleMaxWidthIncoming - 40}>
                                        {renderPreprocessedText(c.spans, message, theme, onUserPress, onGroupPress)}
                                    </TextWrapper>
                                </ASFlex>
                            </ASFlex>
                        )}
                    </>
                ))}
            </>
        )
    }
}