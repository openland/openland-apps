import * as React from 'react';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASText } from 'react-native-async-view/ASText';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Platform } from 'react-native';
import { preprocessText } from 'openland-mobile/utils/TextProcessor';
import { renderPrprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { Alert } from 'openland-mobile/components/AlertBlanket';
interface TextContentProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    padded?: boolean;
}
export class TextContent extends React.PureComponent<TextContentProps> {
    render() {
        let mainTextColor = this.props.message.isOut ? DefaultConversationTheme.textColorOut : DefaultConversationTheme.textColorIn;

        let big = false;
        if (this.props.message.text) {
            big = this.props.message.text.length <= 3 && this.props.message.text.search(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g) !== -1;
            big = big || (this.props.message.text.length <= 302 && this.props.message.text.startsWith(':') && this.props.message.text.endsWith(':'));
        }

        let message = this.props.message;
        if (big) {
            message = { ...message, text: message.text!.slice(1, message.text!.length - 1) };
        }
        let preprocessed = preprocessText(message.text || '', message.mentions);

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
                >
                    {parts}
                    {this.props.padded !== false && !message.urlAugmentation ? (message.isOut ? paddedTextOut : paddedText) : undefined}
                </ASText>}
            </>
        )
    }
}