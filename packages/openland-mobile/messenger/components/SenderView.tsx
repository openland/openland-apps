import * as React from 'react';
import { FullMessage_GeneralMessage, FullMessage_GeneralMessage_sender } from 'openland-api/Types';
import { View, Text, TouchableWithoutFeedback, TextStyle } from 'react-native';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';

export interface SenderViewProps {
    sender: FullMessage_GeneralMessage_sender;
    date: any;
}

export const SenderView = React.memo<SenderViewProps>((props) => {
    const router = getMessenger().history.navigationManager;
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
                    <View flexDirection="column">
                        <Text style={{ fontSize: 15, fontWeight: TextStyles.weight.medium, color: '#000' } as TextStyle}>{sender.name}
                            {sender.primaryOrganization &&
                                <Text style={{ fontSize: 13, fontWeight: TextStyles.weight.medium, color: '#99a2b0'} as TextStyle}>
                                    {' ' + sender.primaryOrganization.name}
                                </Text>}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 5, color: '#99a2b0' }}>{formatDate(parseInt(date, 10))}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
    );
});