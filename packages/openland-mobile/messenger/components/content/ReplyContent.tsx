import * as React from 'react';
import { DataSourceMessageItem, convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Image } from 'react-native';
import { preprocessText, Span } from 'openland-mobile/utils/TextProcessor';
import { AsyncReplyMessageMediaView } from '../AsyncReplyMessageMediaView';
import { AsyncReplyMessageDocumentView } from '../AsyncReplyMessageDocumentView';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage, FullMessage_GeneralMessage_quotedMessages, FullMessage_GeneralMessage_quotedMessages_GeneralMessage } from 'openland-api/Types';
import { AppTheme } from 'openland-mobile/themes/themes';

interface ReplyContentProps {
    message: DataSourceMessageItem;
    onUserPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    theme: AppTheme;
}
export class ReplyContent extends React.PureComponent<ReplyContentProps> {

    render() {
        let { message } = this.props;
        let mainTextColor = message.isOut ? this.props.theme.textColorOut : this.props.theme.textColor;

        let lineBAckgroundPatch: any;
        let capInsets = { left: 3, right: 0, top: 1, bottom: 1 };

        if (message.reply) {
            // for left accent line
            let image = require('assets/chat-link-line-my.png');
            lineBAckgroundPatch = Image.resolveAssetSource(image);
        }

        return (
            <>
                {message.reply && (
                    message.reply.map((m, i) => {
                        let generalMesage = m.__typename === 'GeneralMessage' ? m as FullMessage_GeneralMessage_quotedMessages_GeneralMessage : undefined;

                        if (generalMesage) {
                            let attachFile = generalMesage.attachments && generalMesage.attachments.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;

                            return (
                                <ASFlex key={'repl-' + m.id} flexDirection="column" marginTop={5} marginLeft={1} marginBottom={6} backgroundPatch={{ source: lineBAckgroundPatch.uri, scale: lineBAckgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={message.isOut ? this.props.theme.linkOutColor : this.props.theme.linkColor}>
                                    <ASText
                                        key={'asd' + m.id}
                                        marginTop={-2}
                                        height={15}
                                        textAlign="center"
                                        lineHeight={15}
                                        marginLeft={10}
                                        color={message.isOut ? this.props.theme.linkOutColor : this.props.theme.linkColor}
                                        letterSpacing={-0.3}
                                        fontSize={13}
                                        onPress={() => this.props.onUserPress(generalMesage!.sender.id!)}
                                        fontWeight={TextStyles.weight.medium}
                                        marginBottom={2}
                                    >
                                        {generalMesage!.sender.name || ''}
                                    </ASText>

                                    {!!generalMesage!.message && <ASText
                                        marginLeft={10}
                                        color={mainTextColor}
                                        lineHeight={20}
                                        fontSize={16}
                                        fontWeight={TextStyles.weight.regular}
                                    >
                                        {preprocessText(generalMesage!.message!, generalMesage.spans).map((p: Span, j: number) => renderPreprocessedText(p, j, message, this.props.theme, this.props.onUserPress))}
                                        {(!message.text && (i + 1 === message.reply!!.length)) ? (message.isOut ? paddedTextOut(message.isEdited) : paddedText(message.isEdited)) : undefined}
                                    </ASText>}
                                    {attachFile && attachFile.fileMetadata.isImage ? <AsyncReplyMessageMediaView attach={attachFile} onPress={this.props.onMediaPress} message={convertMessage(m as any, '', getMessenger().engine)} /> : null}
                                    {attachFile && !attachFile.fileMetadata.isImage ? <AsyncReplyMessageDocumentView attach={attachFile} onPress={this.props.onDocumentPress} parent={message} message={convertMessage(m as any, '', getMessenger().engine)} /> : null}
                                </ASFlex>
                            )
                        } else {
                            return null;
                        }
                    })
                )}
            </>
        )
    }
}