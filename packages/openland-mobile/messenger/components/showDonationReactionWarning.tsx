import * as React from 'react';
import { View, Image } from 'react-native';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';

export const showDonationReactionWarning = async () => {
    return new Promise((resolve, reject) => {
        const builder = new AlertBlanketBuilder();

        builder.title('Premium reaction');
        builder.message(`Express your support with a donation to the author`);

        builder.view(
            <View marginBottom={24} paddingTop={8}>
                <Image
                    source={require('assets/ic-donations-96.png')}
                    style={{
                        width: 160,
                        height: 96,
                        alignSelf: 'center',
                        resizeMode: 'contain'
                    }}
                />
            </View>
        );

        builder.button('Cancel', 'cancel', reject);
        builder.button('Donate $1', 'pay', resolve);
        builder.onCancel(reject);
        builder.show();
    });
};