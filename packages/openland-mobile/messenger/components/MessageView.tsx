import * as React from 'react';
import { FullMessage_GeneralMessage } from 'openland-api/Types';
import { View, Text } from 'react-native';

export interface MessageViewProps {
    message: FullMessage_GeneralMessage;
}

export const MessageView = React.memo<MessageViewProps>((props) => {
    return (
        <View>
            <Text>{props.message.message}</Text>
        </View>
    );
});