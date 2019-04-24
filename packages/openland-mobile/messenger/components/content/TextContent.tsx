import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Platform } from 'react-native';
import { preprocessText } from 'openland-mobile/utils/TextProcessor';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { isEmoji } from 'openland-y-utils/isEmoji';
import { AppTheme } from 'openland-mobile/themes/themes';
interface TextContentProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    padded?: boolean;
    fontStyle?: 'italic' | 'normal';
    theme: AppTheme;
}
export class TextContent extends React.PureComponent<TextContentProps> {
    render() {
        let mainTextColor = this.props.message.isOut ? this.props.theme.textColorOut : this.props.theme.textColor;

        let singleEmoji = false;
        let textSticker = false;
        if (this.props.message.text) {
            singleEmoji = isEmoji(this.props.message.text);
            textSticker = (this.props.message.text.length <= 302 && this.props.message.text.startsWith(':') && this.props.message.text.endsWith(':'));
        }
        let big = singleEmoji || textSticker;

        let message = this.props.message;
        if (textSticker) {
            message = { ...message, text: message.text!.slice(1, message.text!.length - 1) };
        }
        let preprocessed = preprocessText(message.text || '', message.spans);

        let parts = preprocessed.map((p, i) => renderPreprocessedText(p, i, message, this.props.theme, this.props.onUserPress));
        if (message.title) {
            parts.unshift(<ASText key={'br-title'} >{'\n'}</ASText>);
            parts.unshift(<ASText key={'text-title'} fontWeight={Platform.select({ ios: '600', android: '500' })}>{message.title}</ASText>);
        }

        return (
            <>
                {!!message.text && <ASText
                    key={'text-' + mainTextColor}
                    color={mainTextColor}
                    lineHeight={big ? undefined : 20}
                    letterSpacing={-0.3}
                    fontSize={big ? 52 : 16}
                    fontWeight={TextStyles.weight.regular}
                    fontStyle={this.props.fontStyle}
                >
                    {parts}
                    {this.props.padded !== false ? (message.isOut ? paddedTextOut : paddedText) : undefined}
                </ASText>}
            </>
        )
    }
}