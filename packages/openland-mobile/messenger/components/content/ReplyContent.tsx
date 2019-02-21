import * as React from 'react';
import { DataSourceMessageItem, convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Image } from 'react-native';
import { preprocessText } from 'openland-mobile/utils/TextProcessor';
import { AsyncReplyMessageMediaView } from '../AsyncReplyMessageMediaView';
import { AsyncReplyMessageDocumentView } from '../AsyncReplyMessageDocumentView';
import { renderPrprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { getMessenger } from 'openland-mobile/utils/messenger';

interface ReplyContentProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onMediaPress: (media: DataSourceMessageItem, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
}
export class ReplyContent extends React.PureComponent<ReplyContentProps> {

    render() {
        let mainTextColor = this.props.message.isOut ? DefaultConversationTheme.textColorOut : DefaultConversationTheme.textColorIn;

        let lineBAckgroundPatch: any;
        let capInsets = { left: 3, right: 0, top: 1, bottom: 1 };

        if (this.props.message.urlAugmentation || this.props.message.reply) {
            // for left accent line
            let image = require('assets/chat-link-line-my.png');
            lineBAckgroundPatch = Image.resolveAssetSource(image);
        }

        return (
            <>
                {/* forward/reply */}
                {this.props.message.reply && (

                    this.props.message.reply.map((m, i) => (
                        <ASFlex key={'repl-' + m.id} flexDirection="column" marginTop={5} marginLeft={1} marginBottom={6} backgroundPatch={{ source: lineBAckgroundPatch.uri, scale: lineBAckgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={this.props.message.isOut ? DefaultConversationTheme.linkColorOut : DefaultConversationTheme.linkColorIn}>

                            <ASText
                                key={'asd' + m.id}
                                marginTop={-2}
                                height={15}
                                textAlign="center"
                                lineHeight={15}
                                marginLeft={10}
                                color={this.props.message.isOut ? DefaultConversationTheme.senderNameColorOut : DefaultConversationTheme.senderNameColor}
                                letterSpacing={-0.3}
                                fontSize={12}
                                onPress={() => this.props.onUserPress(m.sender.id)}
                                fontWeight={TextStyles.weight.medium}
                            >
                                {m.sender.name || ''}
                            </ASText>

                            {!!m.message && <ASText
                                marginLeft={10}
                                color={mainTextColor}
                                lineHeight={20}
                                fontSize={14}
                                fontWeight={TextStyles.weight.regular}
                            >
                                {preprocessText(m.message, this.props.message.mentions).map((p, j) => renderPrprocessedText(p, j, this.props.message, this.props.onUserPress))}
                                {(!this.props.message.text && (i + 1 === this.props.message.reply!!.length)) ? (this.props.message.isOut ? paddedTextOut : paddedText) : undefined}
                            </ASText>}
                            {m.fileMetadata && m.fileMetadata.isImage ? <AsyncReplyMessageMediaView onPress={this.props.onMediaPress} message={convertMessage(m as any, getMessenger().engine)} /> : null}
                            {m.fileMetadata && !m.fileMetadata.isImage ? <AsyncReplyMessageDocumentView onPress={this.props.onDocumentPress} parent={this.props.message} message={convertMessage(m as any, getMessenger().engine)} /> : null}

                        </ASFlex>
                    ))

                )}
            </>
        )
    }
}