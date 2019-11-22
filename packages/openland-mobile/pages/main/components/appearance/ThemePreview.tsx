import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import LinearGradient from 'react-native-linear-gradient';

export const ThemePreview = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    const gradientStart = theme.type === 'Dark' ? 'rgba(36, 38, 41, 0)' : 'rgba(242, 243, 245, 0)';
    const gradientEnd = theme.type === 'Dark' ? 'rgba(36, 38, 41, 0.56)' : 'rgba(242, 243, 245, 0.56)';

    return (
        <LinearGradient colors={[gradientStart, gradientEnd]} paddingTop={8} paddingBottom={24} paddingHorizontal={16}>
            <View marginBottom={8} alignItems="flex-start">
                <View backgroundColor={theme.incomingBackgroundPrimary} paddingVertical={7} paddingLeft={12} paddingRight={70} borderRadius={RadiusStyles.Large}>
                    <Text style={[TextStyles.Densed, { color: theme.incomingForegroundPrimary }]} allowFontScaling={false}>
                        Hello! How are you?
                    </Text>
                    <Text style={[TextStyles.Caption, { color: theme.incomingForegroundSecondary, position: 'absolute', bottom: 4, right: 12 }]}>
                        9:41 AM
                    </Text>
                </View>
            </View>
            <View alignItems="flex-end">
                <View backgroundColor={theme.outgoingBackgroundPrimary} paddingVertical={7} paddingLeft={12} paddingRight={70} borderRadius={RadiusStyles.Large}>
                    <Text style={[TextStyles.Densed, { color: theme.outgoingForegroundPrimary }]} allowFontScaling={false}>
                        I’m fine. Thanks!
                    </Text>
                    <Text style={[TextStyles.Caption, { color: theme.outgoingForegroundSecondary, position: 'absolute', bottom: 4, right: 12 }]}>
                        9:41 AM
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
});