import * as React from 'react';
import { View, Image } from 'react-native';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { SRouter } from 'react-native-s/SRouter';

export const showWithdrawFunds = async (router: SRouter) => {
    const builder = new AlertBlanketBuilder();

    builder.title('Withdraw funds');
    builder.message('To request funds withdrawal ($50 minimum) message Openland support for instructions');

    builder.view(
        <View marginBottom={16} overflow="hidden">
            <Image
                source={require('assets/art-balance.png')}
                style={{
                    width: 255,
                    height: 150,
                    alignSelf: 'center',
                    resizeMode: 'contain'
                }}
            />
        </View>
    );

    builder.button('Cancel', 'cancel');
    builder.button('Continue', 'default', () => router.push('Conversation', {id: 'LOaDEWDj9zsVv999DDpJiEj05K'}));
    builder.show();
};
