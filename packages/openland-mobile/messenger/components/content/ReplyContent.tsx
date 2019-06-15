import * as React from 'react';
import { DataSourceMessageItem, convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Image } from 'react-native';
import { AsyncReplyMessageMediaView } from '../AsyncReplyMessageMediaView';
import { AsyncReplyMessageDocumentView } from '../AsyncReplyMessageDocumentView';
import { renderPreprocessedText, paddedTextOut, paddedText } from '../AsyncMessageContentView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, FullMessage_GeneralMessage_quotedMessages_GeneralMessage } from 'openland-api/Types';
import { AppTheme } from 'openland-mobile/themes/themes';
import { TextContent } from './TextContent';
import { RenderSpans } from './AsyncRenderSpans';
import { bubbleMaxWidth, bubbleMaxWidthIncoming, contentInsetsHorizontal } from '../AsyncBubbleView';

interface ReplyContentProps {
    message: DataSourceMessageItem;
    maxWidth?: number;
    compensateBubble?: boolean;
    onUserPress: (id: string) => void;
    onGroupPress: (id: string) => void;
    onMediaPress: (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent) => void;
    onDocumentPress: (document: DataSourceMessageItem) => void;
    theme: AppTheme;
}
export class ReplyContent extends React.PureComponent<ReplyContentProps> {

    render() {
        let { message, maxWidth, compensateBubble } = this.props;

        let lineBackgroundPatch: any;
        let capInsets = { left: 3, right: 0, top: 1, bottom: 1 };

        if (message.reply) {
            // for left accent line
            let image = require('assets/chat-link-line-my.png');
            lineBackgroundPatch = Image.resolveAssetSource(image);
        }

        return (
            <>
                {message.reply && (
                    message.reply.map((m, i) => {
                        let generalMesage = m.__typename === 'GeneralMessage' ? m as FullMessage_GeneralMessage_quotedMessages_GeneralMessage : undefined;

                        if (generalMesage) {
                            let attachFile = generalMesage.attachments && generalMesage.attachments.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile | undefined;

                            return (
                                <ASFlex key={'reply-' + m.id} flexDirection="column" alignItems="stretch" marginTop={5} marginLeft={1} marginBottom={6} backgroundPatch={{ source: lineBackgroundPatch.uri, scale: lineBackgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={message.isOut ? this.props.theme.linkOutColor : this.props.theme.linkColor}>
                                    <ASText
                                        key={'reply-author-' + m.id}
                                        marginTop={-2}
                                        height={15}
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

                                    {message.replyTextSpans[i].length > 0 && (
                                        <ASFlex key={'reply-spans-' + m.id} flexDirection="column" alignItems="stretch" marginLeft={10}>
                                            <RenderSpans
                                                spans={message.replyTextSpans[i]}
                                                message={message}
                                                padded={compensateBubble ? (!message.text && (i + 1 === message.reply!!.length)) : false}
                                                theme={this.props.theme}
                                                maxWidth={maxWidth ? maxWidth : (message.isOut ? bubbleMaxWidth : bubbleMaxWidthIncoming) - 70}
                                                insetLeft={8}
                                                insetRight={contentInsetsHorizontal}
                                                insetTop={4}

                                                onUserPress={this.props.onUserPress}
                                                onGroupPress={this.props.onGroupPress}
                                            />
                                        </ASFlex>
                                    )}

                                    {attachFile && attachFile.fileMetadata.isImage ? (
                                        <AsyncReplyMessageMediaView
                                            attach={attachFile}
                                            onPress={this.props.onMediaPress}
                                            message={convertMessage(m as any, '', getMessenger().engine)}
                                        />
                                    ) : null}
                                    {attachFile && !attachFile.fileMetadata.isImage ? (
                                        <AsyncReplyMessageDocumentView
                                            maxWidth={message.isOut ? bubbleMaxWidth - 100 : bubbleMaxWidthIncoming - 80}
                                            theme={this.props.theme}
                                            attach={attachFile}
                                            onPress={this.props.onDocumentPress}
                                            parent={message}
                                            message={convertMessage(m as any, '', getMessenger().engine)}
                                        />
                                    ) : null}
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