import React from 'react';
import { View, Image } from 'react-native';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';

export const showMembersWarning = async () => {
    return new Promise((resolve, reject) => {
        const builder = new AlertBlanketBuilder();

        builder.title('Do you know people you are adding?');
        builder.message(`Please, only add people whom you know will be interested in your group`);

        builder.view(
            <View style={{ marginBottom: 24, paddingTop: 8 }}>
                <Image
                    source={require('assets/art-crowd.png')}
                    style={{
                        width: 279,
                        height: 134,
                        alignSelf: 'center',
                        resizeMode: 'contain'
                    }}
                />
            </View>
        );

        builder.button('Cancel', 'cancel', reject);
        builder.button('Сontinue', 'default', resolve);
        builder.show();
    });
};