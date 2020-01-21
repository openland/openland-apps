import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { Money } from 'openland-y-utils/wallet/Money';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';

interface BalanceViewProps {
    amount: number;
}

export const BalanceView = (props: BalanceViewProps) => {
    const { amount } = props;

    const theme = React.useContext(ThemeContext);
    const gradientStart = theme.type === 'Dark' ? 'rgba(36, 38, 41, 0)' : 'rgba(242, 243, 245, 0)';
    const gradientEnd = theme.type === 'Dark' ? 'rgba(36, 38, 41, 0.56)' : 'rgba(242, 243, 245, 0.56)';

    return (
        <LinearGradient colors={[gradientStart, gradientEnd]} paddingTop={16} paddingBottom={24} paddingHorizontal={16}>
            <Text style={{ ...TextStyles.Large, textAlign: 'center', color: theme.foregroundPrimary, marginBottom: 8 }} allowFontScaling={false}>
                <Money amount={amount} />
            </Text>
            <Text style={{ ...TextStyles.Body, textAlign: 'center', color: theme.foregroundSecondary }} allowFontScaling={false}>
                Your balance
            </Text>
            <View marginTop={24}>
                <ZRoundedButton size="large" title="Add funds" />
            </View>
        </LinearGradient>
    );
};