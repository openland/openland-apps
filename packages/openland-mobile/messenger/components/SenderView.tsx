import * as React from 'react';
import { FullMessage_GeneralMessage_sender } from 'openland-api/spacex.types';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface SenderViewProps {
    sender: FullMessage_GeneralMessage_sender;
    date: any;
    edited: boolean;
}

export const SenderView = React.memo<SenderViewProps>((props) => {
    const router = getMessenger().history.navigationManager;
    const theme = React.useContext(ThemeContext);
    const { sender, date, edited } = props;

    return (
        <TouchableWithoutFeedback onPress={() => router.push('ProfileUser', { id: sender.id })}>
            <View style={{ alignItems: 'stretch', marginTop: 15, marginBottom: 8, flexDirection: 'row' }}>
                <View style={{ marginRight: 12 }}>
                    <ZAvatar
                        size="medium"
                        photo={sender.photo}
                        id={sender.id}
                        title={sender.name}
                    />
                </View>
                <View style={{ flexDirection: 'column', flexGrow: 1, flexShrink: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: FontStyles.Weight.Medium, color: theme.foregroundPrimary }} allowFontScaling={false} numberOfLines={1}>{sender.name}
                        {sender.primaryOrganization &&
                            <Text style={{ fontSize: 13, fontWeight: FontStyles.Weight.Medium, color: '#99a2b0' }} allowFontScaling={false}>
                                {' ' + sender.primaryOrganization.name}
                            </Text>}
                    </Text>
                    <Text style={{ fontSize: 14, marginTop: Platform.OS === 'android' ? 2 : 5, color: '#99a2b0' }} allowFontScaling={false}>{formatDate(parseInt(date, 10))}{edited ? ' • Edited' : ''}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});