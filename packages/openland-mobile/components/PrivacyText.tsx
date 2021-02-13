import * as React from 'react';
import { Linking, Text, View } from 'react-native';

import { ThemeContext } from '../themes/ThemeContext';
import { TextStyles } from '../styles/AppStyles';

export const PrivacyText = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    return (
        <View
            style={{
                padding: 16,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                maxWidth: 310
            }}
        >
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Caption,
                    textAlign: 'center',
                    color: theme.foregroundTertiary,
                }}
            >
                By creating an account you are accepting our{' '}
                <Text
                    style={{ ...TextStyles.Label3 }}
                    onPress={() => Linking.openURL('https://openland.com/terms')}
                >
                    Terms of service
                </Text>{' '}
                and{' '}
                <Text
                    style={{ ...TextStyles.Label3 }}
                    onPress={() => Linking.openURL('https://openland.com/privacy')}
                >
                    Privacy policy
                </Text>
            </Text>
        </View>
    );
});
