import * as React from 'react';
import { View, Text, TextStyle, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { MessageComments_messageComments_comments_comment, Message_message } from 'openland-api/Types';

interface ReplyViewProps {
    action?: 'forward' | 'reply';
    comment: Message_message[];
    onClearPress: () => void;
}

let formatComment = (comment: Message_message): string => {
    let res = comment.fallback;

    if (comment.message) {
        res = comment.message;
    } else {
        if (comment.__typename === 'GeneralMessage') {
            if (comment.quotedMessages.length) {
                res = 'Forward'
            }

            if (comment.attachments && comment.attachments.length === 1) {
                let attachment = comment.attachments[0];
                res = attachment.fallback;
                if (attachment.__typename === 'MessageAttachmentFile') {
                    if (attachment.fileMetadata.isImage) {
                        if (attachment.fileMetadata.imageFormat === 'GIF') {
                            res = 'GIF';
                        } else {
                            res = 'Photo';
                        }
                    } else {
                        res = 'Document';
                    }
                }
            }
        } else if (comment.__typename === 'ServiceMessage') {
            res = comment.message || comment.fallback;
        }
    }

    return res;
}

export const ReplyView = (props: ReplyViewProps) => {
    const { comment, onClearPress, action } = props;

    return (
        <View marginLeft={Platform.OS === 'android' ? 12 : 15} paddingLeft={8} marginRight={Platform.OS === 'android' ? 12 : 52} borderLeftColor="#0084fe" borderLeftWidth={2} marginTop={10} marginBottom={4} flexDirection="row">
            <View flexGrow={1}>
                <Text style={{ color: '#0084fe', fontSize: 14, lineHeight: 20, marginBottom: 1, fontWeight: TextStyles.weight.medium } as TextStyle} numberOfLines={1} allowFontScaling={false}>{comment.length === 1 ? comment[0].sender.name : action === 'reply' ? 'Reply messages' : 'Forward messages'}</Text>
                <Text style={{ color: '#99a2b0', fontSize: 14 }} numberOfLines={1} allowFontScaling={false}>{comment.length > 1 ? (comment.length + ' messages') : formatComment(comment[0])}</Text>
            </View>
            <TouchableWithoutFeedback onPress={onClearPress}>
                <View marginLeft={11} width={18} height={38} alignItems="center" justifyContent="center">
                    <Image source={require('assets/ic-cancel-gray-18.png')} style={{ tintColor: '#b9c1cd', width: 18, height: 18 }} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}