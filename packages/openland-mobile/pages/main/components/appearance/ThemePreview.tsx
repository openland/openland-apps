import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import { useText } from 'openland-mobile/text/useText';
import DateTimeFormatter from 'openland-y-runtime/DateTimeFormatter';

export const ThemePreview = React.memo(() => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const time = DateTimeFormatter.formatTime(Date.now());

    return (
        <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]} style={{ paddingTop: 8, paddingBottom: 25, paddingHorizontal: 16 }}>
            <View style={{ marginBottom: 8, alignItems: 'flex-start' }}>
                <View style={{ backgroundColor: theme.incomingBackgroundPrimary, paddingVertical: 7, paddingLeft: 12, paddingRight: 70, borderRadius: RadiusStyles.Large }}>
                    <Text style={[TextStyles.Densed, { color: theme.incomingForegroundPrimary }]} allowFontScaling={false} >
                        {t('themePreviewQuestion', 'Hello! How are you?')}
                    </Text>
                    <Text style={[TextStyles.Caption, { color: theme.incomingForegroundSecondary, position: 'absolute', bottom: 4, right: 12 }]} allowFontScaling={false}>
                        {time}
                    </Text>
                </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <View style={{ backgroundColor: theme.outgoingBackgroundPrimary, paddingVertical: 7, paddingLeft: 12, paddingRight: 70, borderRadius: RadiusStyles.Large }}>
                    <Text style={[TextStyles.Densed, { color: theme.outgoingForegroundPrimary }]} allowFontScaling={false}>
                        {t('themePreviewAnswer', 'I’m fine. Thanks!')}
                    </Text>
                    <Text style={[TextStyles.Caption, { color: theme.outgoingForegroundSecondary, position: 'absolute', bottom: 4, right: 12 }]} allowFontScaling={false}>
                        {time}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
});