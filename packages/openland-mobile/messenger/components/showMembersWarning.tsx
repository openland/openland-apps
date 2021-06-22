import React from 'react';
import { View, Image } from 'react-native';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { t } from 'openland-mobile/text/useText';

export const showMembersWarning = async () => {
    return new Promise((resolve, reject) => {
        const builder = new AlertBlanketBuilder();

        builder.title(t('warningAddMembers', 'Do you know people you are adding?'));
        builder.message(t('warningAddMembersDescription', `Please, only add people whom you know will be interested in your group`));

        builder.view(
            <ThemeContext.Consumer>
                {(theme) => (
                    <View style={{ marginBottom: 24, paddingTop: 8 }}>
                        <Image
                            source={
                                theme.type === 'Light'
                                    ? require('assets/art-crowd.png')
                                    : require('assets/art-crowd-dark.png')
                            }
                            style={{
                                width: 279,
                                height: 134,
                                alignSelf: 'center',
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                )}
            </ThemeContext.Consumer>,
        );

        builder.button(t('cancel', 'Cancel'), 'cancel', reject);
        builder.button(t('continue', 'Сontinue'), 'default', () => resolve(undefined));
        builder.show();
    });
};