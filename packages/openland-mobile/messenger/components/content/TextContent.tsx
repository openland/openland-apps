import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Platform } from 'react-native';
import { preprocessText } from 'openland-mobile/utils/TextProcessor';
import { renderPrprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { isEmoji } from 'openland-y-utils/isEmoji';
import { FullMessage_GeneralMessage_attachments_MessageRichAttachment } from 'openland-api/Types';
interface TextContentProps {
    message: DataSourceMessageItem;
    attach?: FullMessage_GeneralMessage_attachments_MessageRichAttachment;
    onUserPress: (id: string) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    padded?: boolean;
    fontStyle?: 'italic' | 'normal';
}
export class TextContent extends React.PureComponent<TextContentProps> {
    render() {
        let mainTextColor = this.props.message.isOut ? DefaultConversationTheme.textColorOut : DefaultConversationTheme.textColorIn;

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

        let parts = preprocessed.map((p, i) => renderPrprocessedText(p, i, message, this.props.onUserPress));
        if (message.title) {
            parts.unshift(<ASText key={'br-title'} >{'\n'}</ASText>);
            parts.unshift(<ASText key={'text-title'} fontWeight={Platform.select({ ios: '600', android: '500' })}>{message.title}</ASText>);
        }

        return (
            <>
                {!!message.text && <ASText
                    key={'text-' + DefaultConversationTheme.senderNameColor}
                    color={mainTextColor}
                    lineHeight={big ? undefined : 20}
                    letterSpacing={-0.3}
                    fontSize={big ? 52 : 16}
                    fontWeight={TextStyles.weight.regular}
                    fontStyle={this.props.fontStyle}
                >
                    {parts}
                    {this.props.padded !== false && !this.props.attach ? (message.isOut ? paddedTextOut : paddedText) : undefined}
                </ASText>}
            </>
        )
    }
}