import * as React from 'react';
import { View, Image } from 'react-native';
import { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export const showNoiseWarning = async (title: string, message: string) => {
    return new Promise((resolve, reject) => {
        const builder = new AlertBlanketBuilder();

        builder.title(title);
        builder.message(message);

        builder.view(
            <ThemeContext.Consumer>
                {(theme) => (
                    <View style={{ marginBottom: 16, marginHorizontal: -24, overflow: 'hidden' }}>
                        <Image
                            source={
                                theme.type === 'Light'
                                    ? require('assets/art-noise.png')
                                    : require('assets/art-noise-dark.png')
                            }
                            style={{
                                width: 340,
                                height: 200,
                                alignSelf: 'center',
                                resizeMode: 'contain',
                            }}
                        />
                    </View>
                )}
            </ThemeContext.Consumer>,
        );

        builder.button('Cancel', 'cancel', reject);
        builder.button('Continue', 'destructive', resolve);
        builder.onCancel(reject);
        builder.show();
    });
};
