import * as React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { Money } from 'openland-y-utils/wallet/Money';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { showWithdrawFunds } from './showWithdrawFunds';
import { ZIconAction } from 'openland-mobile/components/ZIconAction';

interface BalanceViewProps {
    amount: number;
}

export const BalanceView = (props: BalanceViewProps) => {
    const { amount } = props;
    const theme = React.useContext(ThemeContext);
    const router = React.useContext(SRouterContext)!;

    return (
        <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]} paddingTop={16} paddingBottom={32} paddingHorizontal={16} flexDirection="row">
            <View flexGrow={1} alignItems="flex-start">
                <Text style={{ ...TextStyles.Title1, textAlign: 'center', color: theme.foregroundPrimary, }} allowFontScaling={false}>
                    <Money amount={amount} />
                </Text>
                <Text style={{ ...TextStyles.Body, textAlign: 'center', color: theme.foregroundSecondary, marginTop: 4 }} allowFontScaling={false}>
                    Your balance
                </Text>
            </View>
            <View flexGrow={1} alignItems="flex-end" paddingTop={10}>
                <ZIconAction source={require('assets/ic-arrow-down-glyph-24.png')} onPress={() => showWithdrawFunds(router)} />
            </View>
        </LinearGradient>
    );
};