import * as React from 'react';
import { View, Text, TextStyle, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { Message_message } from 'openland-api/Types';
import { formatMessage } from 'openland-engines/messenger/DialogListEngine';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface ForwardReplyViewProps {
    action?: 'forward' | 'reply';

    messages: Message_message[];

    onClearPress: () => void;
}

export const ForwardReplyView = (props: ForwardReplyViewProps) => {
    const { messages, onClearPress, action } = props;
    const theme = React.useContext(ThemeContext);

    const title = (messages.length === 1) ? (messages[0].sender.name) : ((action === 'reply') ? 'Reply messages' : 'Forward messages');
    const text = (messages.length === 1) ? (formatMessage(messages[0])) : (messages.length + ' messages');

    return (
        <View marginLeft={Platform.OS === 'android' ? 12 : 48} paddingLeft={8} marginRight={Platform.OS === 'android' ? 12 : 52} borderLeftColor={theme.linkColor} borderLeftWidth={2} marginTop={10} marginBottom={4} flexDirection="row">
            <View flexGrow={1} flexShrink={1}>
                <Text style={{ color: theme.linkColor, fontSize: 14, lineHeight: 20, marginBottom: 1, fontWeight: TextStyles.weight.medium } as TextStyle} numberOfLines={1} allowFontScaling={false}>{title}</Text>
                <Text style={{ color: theme.textLabelColor, fontSize: 14 }} numberOfLines={1} allowFontScaling={false}>{text}</Text>
            </View>
            <TouchableWithoutFeedback onPress={onClearPress}>
                <View marginLeft={11} width={18} height={38} alignItems="center" justifyContent="center">
                    <Image source={require('assets/ic-cancel-gray-18.png')} style={{ tintColor: '#b9c1cd', width: 18, height: 18 }} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}