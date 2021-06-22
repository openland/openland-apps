import * as React from 'react';
import { View, Image } from 'react-native';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { t } from 'openland-mobile/text/useText';

export const showDonationReactionWarning = async () => {
    return new Promise((resolve, reject) => {
        const builder = new AlertBlanketBuilder();

        builder.title(t('warningPremiumReaction', 'Premium reaction'));
        // android doesn't support line separator
        builder.message(t('warningPremiumReactionDescription', `Express your support with a\u00a0donation\u00a0to\u00a0the\u00a0author`));

        builder.view(
            <View style={{ marginBottom: 24, paddingTop: 8 }}>
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

        builder.button(t('cancel', 'Cancel'), 'cancel', reject);
        builder.button(t('premiumReactionDonate', 'Donate $1'), 'pay', () => resolve(undefined));
        builder.onCancel(reject);
        builder.show();
    });
};