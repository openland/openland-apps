import * as React from 'react';
import { View, Text, TextStyle, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Message_message } from 'openland-api/Types';

interface ForwardReplyViewProps {
    action?: 'forward' | 'reply';

    messages: Message_message[];

    onClearPress: () => void;
}

let formatMessage = (message: Message_message): string => {
    return message.message || message.fallback;
}

export const ForwardReplyView = (props: ForwardReplyViewProps) => {
    const { messages, onClearPress, action } = props;

    return (
        <View marginLeft={Platform.OS === 'android' ? 12 : 48} paddingLeft={8} marginRight={Platform.OS === 'android' ? 12 : 52} borderLeftColor="#0084fe" borderLeftWidth={2} marginTop={10} marginBottom={4} flexDirection="row">
            <View flexGrow={1}>
                <Text style={{ color: '#0084fe', fontSize: 14, lineHeight: 20, marginBottom: 1, fontWeight: TextStyles.weight.medium } as TextStyle} numberOfLines={1} allowFontScaling={false}>{messages.length === 1 ? messages[0].sender.name : action === 'reply' ? 'Reply messages' : 'Forward messages'}</Text>
                <Text style={{ color: '#99a2b0', fontSize: 14 }} numberOfLines={1} allowFontScaling={false}>{messages.length > 1 ? (messages.length + ' messages') : formatMessage(messages[0])}</Text>
            </View>
            <TouchableWithoutFeedback onPress={onClearPress}>
                <View marginLeft={11} width={18} height={38} alignItems="center" justifyContent="center">
                    <Image source={require('assets/ic-cancel-gray-18.png')} style={{ tintColor: '#b9c1cd', width: 18, height: 18 }} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}