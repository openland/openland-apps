import * as React from 'react';
import { View, Image } from 'react-native';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { SRouter } from 'react-native-s/SRouter';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { t } from 'openland-mobile/text/useText';

export const showWithdrawFunds = async (router: SRouter) => {
    const builder = new AlertBlanketBuilder();

    builder.title(t('withdrawFunds', 'Withdraw funds'));
    builder.message(t('withdrawFundsDescription', 'To request funds withdrawal ($50 minimum) message Openland support for instructions'));

    builder.view(
        <ThemeContext.Consumer>
            {(theme) => (
                <View style={{ marginBottom: 16, overflow: 'hidden' }}>
                    <Image
                        source={
                            theme.type === 'Light'
                                ? require('assets/art-balance.png')
                                : require('assets/art-balance-dark.png')
                        }
                        style={{
                            width: 255,
                            height: 150,
                            alignSelf: 'center',
                            resizeMode: 'contain',
                        }}
                    />
                </View>
            )}
        </ThemeContext.Consumer>,
    );

    builder.button(t('cancel', 'Cancel'), 'cancel');
    builder.button(t('continue', 'Continue'), 'default', () => router.push('Conversation', { id: 'LOaDEWDj9zsVv999DDpJiEj05K' }));
    builder.show();
};
