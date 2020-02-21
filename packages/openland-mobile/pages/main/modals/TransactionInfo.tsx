import * as React from 'react';
import { showBottomSheet, BottomSheetActions } from 'openland-mobile/components/BottomSheet';
import { View, Text, Image } from 'react-native';
import { useTheme, ThemeContext } from 'openland-mobile/themes/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { convertTransaction, TransactionConvertedStatus } from 'openland-y-utils/wallet/transaction';

const InfoItem = React.memo<{ name: string, secondary?: boolean, value?: string, status?: TransactionConvertedStatus }>((props) => {
    const theme = useTheme();
    const colorBy = {
        success: theme.accentPositive,
        failing: theme.accentNegative,
        pending: theme.foregroundTertiary,
    };
    const valueColor = !!props.status ? colorBy[props.status] : theme.foregroundTertiary;
    const iconStyle = { tintColor: valueColor, marginRight: 8, width: 16, height: 16 };
    const value = !!props.status ? props.status.charAt(0).toUpperCase() + props.status.slice(1) : props.value;
    return (
        <View paddingLeft={props.secondary ? 32 : 16} paddingRight={16} paddingVertical={12} flexDirection="row" justifyContent="space-between">
            <Text style={{ ...TextStyles.Body, color: props.secondary ? theme.foregroundTertiary : theme.foregroundPrimary }}>{props.name}</Text>
            <View flexDirection="row" alignItems="center">
                {props.status === 'success' ? (
                    <Image source={require('assets/ic-success-16.png')} style={iconStyle} />
                ) : props.status === 'failing' ? (
                    <Image source={require('assets/ic-failure-stroke-16.png')} style={iconStyle} />
                ) : props.status === 'pending' ? (
                    <Image source={require('assets/ic-pending-16.png')} style={iconStyle} />
                ) : null
                }
                <Text style={{ ...TextStyles.Body, color: valueColor }}>{value}</Text>
            </View>
        </View>
    );
});

interface TransactionInfoProps {
    item: WalletTransactionFragment;
}

const TransactionInfo = React.memo<TransactionInfoProps & { ctx: BottomSheetActions }>((props) => {
    const theme = React.useContext(ThemeContext);
    const { avatar, title, type, dateTime, amount, walletAmount, chargeAmount, paymentMethod, interval, status } = convertTransaction(props.item);
    const hasSplittedAmount = !!walletAmount && !!chargeAmount;

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
                {avatar && <ZAvatar size="xx-large" {...avatar} />}
                {!avatar && <Image source={require('assets/ic-top-up-40.png')} style={{ width: 96, height: 96 }} />}

                <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginTop: 16, marginBottom: 4 }} allowFontScaling={false}>{title}</Text>
                <Text style={{ ...TextStyles.Body, color: theme.foregroundTertiary }} allowFontScaling={false}>
                    {type}{!!interval && `, ${interval}`}
                </Text>
            </LinearGradient>
            <View>
                <InfoItem name="Total amount" value={amount} />
                {hasSplittedAmount && (
                    <>
                        <InfoItem name="Your balance" value={walletAmount} secondary={true} />
                        <InfoItem name={paymentMethod!} value={chargeAmount} secondary={true} />
                    </>
                )}
                {paymentMethod && !hasSplittedAmount && <InfoItem name="Payment method" value={paymentMethod} />}
                <InfoItem name="Date and time" value={`${dateTime.date}, ${dateTime.time}`} />
                <InfoItem name="Status" status={status} />
            </View>
        </View>
    );
});

export const showTransactionInfo = (props: TransactionInfoProps) => {
    showBottomSheet({ buttonTitle: 'Done', cancelable: true, view: (ctx) => <TransactionInfo {...props} ctx={ctx} /> });
};