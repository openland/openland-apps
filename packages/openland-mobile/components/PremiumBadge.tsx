import * as React from 'react';
import { Text, View } from 'react-native';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { RadiusStyles, TextStylesAsync, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export const PremiumBadge = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    return (
        <View paddingTop={1.5} paddingBottom={2.5} paddingHorizontal={4} backgroundColor={theme.accentPay} borderRadius={RadiusStyles.XSmall}>
            <Text style={[TextStyles.Detail, { color: theme.foregroundContrast }]} allowFontScaling={false}>
                PRO
            </Text>
        </View>
    );
});

export const PremiumBadgeAsync = React.memo((props: { theme: ThemeGlobal }) => (
    <ASFlex backgroundColor={props.theme.accentPay} borderRadius={RadiusStyles.XSmall}>
        <ASFlex marginTop={1.5} marginBottom={2.5} marginLeft={4} marginRight={4}>
            <ASText {...TextStylesAsync.Detail} color={props.theme.foregroundContrast}>
                PRO
            </ASText>
        </ASFlex>
    </ASFlex>
));
