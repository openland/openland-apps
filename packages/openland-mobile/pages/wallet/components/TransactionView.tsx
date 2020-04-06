import * as React from 'react';
import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { showPayComplete } from 'openland-mobile/pages/main/modals/PayComplete';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { showTransactionInfo } from 'openland-mobile/pages/main/modals/TransactionInfo';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { convertTransaction } from 'openland-y-utils/wallet/transaction';

interface TransactionViewProps {
    item: WalletTransactionFragment;
}

export const TransactionView = (props: TransactionViewProps) => {
    const theme = React.useContext(ThemeContext);
    const router = React.useContext(SRouterContext);

    const { avatar, title, type, dateTime, status, amount, source, group } = convertTransaction(props.item);
    const payment = source.operation.payment;
    const actionRequired = status === 'failing';
    const color = (actionRequired || status === 'canceled') ? theme.accentNegative : (source.operation.amount > 0 ? theme.accentPositive : theme.foregroundPrimary);
    const subtitleTime = dateTime.isToday ? dateTime.time : dateTime.date;
    const groupTitle = group ? `, ${group.title}` : '';
    const subtitleStatus = status !== 'success' ? `, ${status}` : '';
    const subtitle = `${type}${groupTitle}\n${subtitleTime}${subtitleStatus}`;

    const complete = React.useCallback(() => {
        if (actionRequired && payment && payment.intent && router) {
            showPayComplete(payment.intent.id, payment.intent.clientSecret, router);
        }
    }, [actionRequired]);

    const handlePress = React.useCallback(() => {
        showTransactionInfo({ item: props.item, router });
    }, [props.item]);

    return (
        <>
            <ZListItemBase height={76} separator={false} onPress={handlePress}>
                <View flexDirection="row" paddingVertical={6} paddingHorizontal={16} flexGrow={1} width="100%">
                    <View paddingTop={2} paddingRight={16}>
                        {avatar && <ZAvatar size="medium" {...avatar} />}
                        {!avatar && <Image source={require('assets/ic-top-up-40.png')} />}
                    </View>
                    <View flexGrow={1} flexShrink={1}>
                        <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} numberOfLines={2} ellipsizeMode="tail" allowFontScaling={false}>{subtitle}</Text>
                    </View>
                    <View flexShrink={0} paddingLeft={16}>
                        <Text style={{ ...TextStyles.Label1, color }} allowFontScaling={false}>
                            {amount}
                        </Text>
                    </View>
                </View>
            </ZListItemBase>
            {actionRequired && (
                <TouchableWithoutFeedback onPress={complete}>
                    <View marginLeft={72} marginRight={16} paddingVertical={8} alignItems="flex-start" justifyContent="flex-start" position="relative">
                        <View position="absolute" top={2} left={16} width={12} height={6}>
                            <Image source={require('assets/wallet/ic-tail-12.png')} style={{ width: 12, height: 6 }} />
                        </View>
                        <View paddingHorizontal={16} paddingVertical={12} borderRadius={RadiusStyles.Medium} width={287} maxWidth="100%" backgroundColor={theme.accentNegative}>
                            <Text style={{ ...TextStyles.Subhead, color: theme.foregroundContrast }} allowFontScaling={false}>Transaction failed</Text>
                            <View flexDirection="row" alignItems="center">
                                <Text style={{ ...TextStyles.Label2, color: theme.foregroundContrast, }} allowFontScaling={false}>
                                    Update payment method
                                </Text>
                                <Image source={require('assets/ic-chevron-16.png')} style={{ tintColor: theme.foregroundContrast, }} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </>
    );
};