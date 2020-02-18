import * as React from 'react';
import { showBottomSheet, BottomSheetActions } from 'openland-mobile/components/BottomSheet';
import { View, Text, Image } from 'react-native';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { WalletTransactionFragment_operation_WalletTransactionSubscription_payment_card } from 'openland-api/spacex.types';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { extractDateTime } from 'openland-y-utils/wallet/dateTime';

const InfoItem = React.memo<{name: string, value: string, status?: 'success' | 'failure'}>((props) => {
    const theme = useTheme();
    const colorBy = {
        success: theme.accentPositive,
        failure: theme.accentNegative,
    };
    const valueColor = !!props.status ? colorBy[props.status] : theme.foregroundTertiary;
    const iconStyle = {tintColor: valueColor, marginRight: 8, width: 16, height: 16};
    return (
        <View paddingHorizontal={16} paddingVertical={12} flexDirection="row" justifyContent="space-between">
            <Text style={{...TextStyles.Body, color: theme.foregroundPrimary}}>{props.name}</Text>
            <View flexDirection="row" alignItems="center">
                {props.status === 'success' ? (
                        <Image source={require('assets/ic-success-16.png')} style={iconStyle} />
                    ) : null
                }
                <Text style={{...TextStyles.Body, color: valueColor}}>{props.value}</Text>
            </View>
        </View>
    );
});

interface TransactionInfoProps {
    title: string;
    subtitle: string;
    amount: string;
    card: WalletTransactionFragment_operation_WalletTransactionSubscription_payment_card | null;
    date: string;
    avatar?: {
        src: string | null;
        placeholderKey: string;
        placeholderTitle: string;
    };
}

const TransactionInfo = React.memo<TransactionInfoProps & { ctx: BottomSheetActions }>((props) => {
    const theme = useTheme();
    const paymentMethod = props.card
        ? `${getPaymentMethodName(props.card.brand)}, ${props.card.last4}` 
        : undefined;
    const dateTime = extractDateTime(props.date);

    return (
        <View>
            <LinearGradient 
                colors={[theme.gradient0to100Start, theme.gradient0to100End]} 
                paddingTop={16} 
                paddingBottom={32} 
                paddingHorizontal={32} 
                alignItems="center" 
                marginBottom={16}
            >
                {props.avatar ? (
                    <ZAvatar size="xx-large" {...props.avatar} />
                ) : (
                    <Image source={require('assets/ic-top-up-40.png')} style={{width: 96, height: 96}} />
                )}
                <Text style={{...TextStyles.Title2, color: theme.foregroundPrimary, marginTop: 16, marginBottom: 4}}>{props.title}</Text>
                <Text style={{...TextStyles.Body, color: theme.foregroundTertiary}}>{props.subtitle}</Text>
            </LinearGradient>
            <View>
                <InfoItem name="Total amount" value={props.amount} />
                {paymentMethod && <InfoItem name="Payment method" value={paymentMethod} />}
                <InfoItem name="Date and time" value={`${dateTime.date}, ${dateTime.time}`} />
                <InfoItem name="Status" value="Success" status="success" />
            </View>
        </View>
    );
});

export const showTransactionInfo = (props: TransactionInfoProps) => {
    showBottomSheet({ buttonTitle: 'Done', cancelable: true, view: (ctx) => <TransactionInfo {...props} ctx={ctx} /> });
};