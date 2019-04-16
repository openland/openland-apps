import * as React from 'react';
import { FullMessage_GeneralMessage_sender } from 'openland-api/Types';
import { View, Text, TouchableWithoutFeedback, TextStyle, Platform } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface SenderViewProps {
    sender: FullMessage_GeneralMessage_sender;
    date: any;
}

export const SenderView = React.memo<SenderViewProps>((props) => {
    const router = getMessenger().history.navigationManager;
    const theme = React.useContext(ThemeContext);
    const { sender, date } = props;

    return (
        <TouchableWithoutFeedback onPress={() => router.push('ProfileUser', { id: sender.id })}>
            <View alignItems="stretch" marginTop={15} marginBottom={15} flexDirection="row">
                <View marginRight={15}>
                    <ZAvatar
                        size={40}
                        src={sender.photo}
                        placeholderKey={sender.id}
                        placeholderTitle={sender.name}
                    />
                </View>
                <View flexDirection="column" flexGrow={1} flexShrink={1}>
                    <Text style={{ fontSize: 15, fontWeight: TextStyles.weight.medium, color: theme.textColor } as TextStyle} allowFontScaling={false} numberOfLines={1}>{sender.name}
                        {sender.primaryOrganization &&
                            <Text style={{ fontSize: 13, fontWeight: TextStyles.weight.medium, color: '#99a2b0'} as TextStyle} allowFontScaling={false}>
                                {' ' + sender.primaryOrganization.name}
                            </Text>}
                    </Text>
                    <Text style={{ fontSize: 14, marginTop: Platform.OS === 'android' ? 2 : 5, color: '#99a2b0' }} allowFontScaling={false}>{formatDate(parseInt(date, 10))}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});