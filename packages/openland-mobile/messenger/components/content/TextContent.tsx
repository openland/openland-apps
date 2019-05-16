import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { AppTheme } from 'openland-mobile/themes/themes';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { bubbleMaxWidth, contentInsetsHorizontal, contentInsetsTop, bubbleMaxWidthIncoming } from '../AsyncBubbleView';

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

        let content: JSX.Element[] = [];
        let spans = message.textSpans;
        let firstIterationCompleted = false;

        while (spans.findIndex((v) => v.type === 'code_block') >= 0) {
            let index = spans.findIndex((v) => v.type === 'code_block');
            let isFirstInAllSpans = (message.isOut && !firstIterationCompleted && index === 0);

            // before current code-block
            if (index > 0) {
                let sliceEnd = index;

                if (spans[index - 1].type === 'new_line' || (spans[index - 1].type === 'text' && spans[index - 1].length === 0)) {
                    sliceEnd = index - 1;
                }

                content.push(
                    <TextWrapper
                        key={'text-before-' + index}
                        color={mainTextColor}
                        fontStyle={this.props.fontStyle}
                    >
                        {renderPreprocessedText(spans.slice(0, sliceEnd), message, theme, onUserPress, onGroupPress)}
                    </TextWrapper>
                );
            }

            // current code-block
            content.push(
                <ASFlex
                    key={'code-' + index}
                    borderRadius={isFirstInAllSpans ? 19 : undefined}
                    marginLeft={-contentInsetsHorizontal}
                    marginRight={-contentInsetsHorizontal}
                    marginTop={isFirstInAllSpans ? -contentInsetsTop : 2}
                    marginBottom={isFirstInAllSpans ? undefined : 2}
                    backgroundColor={(message.isOut && !message.isService) ? theme.codeSpan.backgroundOut : theme.codeSpan.background}
                >
                    <ASFlex marginLeft={contentInsetsHorizontal} marginRight={contentInsetsHorizontal} marginTop={isFirstInAllSpans ? 10 : 5} marginBottom={isFirstInAllSpans ? 10 : 5}>
                        <TextWrapper fontSize={14} color={mainTextColor} maxWidth={message.isOut ? bubbleMaxWidth - 40 : bubbleMaxWidthIncoming - 40}>
                            {renderPreprocessedText([spans[index]], message, theme, onUserPress, onGroupPress)}
                        </TextWrapper>
                    </ASFlex>
                </ASFlex>
            );

            spans = spans.slice(index + 1);
            firstIterationCompleted = true;
        }

        // after all code-blocks
        if (spans.length > 0) {
            content.push(
                <TextWrapper
                    key="text-after"
                    color={mainTextColor}
                    fontStyle={this.props.fontStyle}
                >
                    {renderPreprocessedText(spans, message, theme, onUserPress, onGroupPress)}
                    {this.props.padded !== false ? (message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited)) : undefined}
                </TextWrapper>
            );
        } else {
            content.push(
                <TextWrapper
                    key="padded-text"
                    color={mainTextColor}
                    fontStyle={this.props.fontStyle}
                >
                    {this.props.padded !== false ? (message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited)) : undefined}
                </TextWrapper>
            );
        }

        return (
            <>
                {content}
            </>
        )
    }
}