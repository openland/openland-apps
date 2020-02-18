import * as React from 'react';
import { WalletTransactionFragment, PaymentStatus, WalletSubscriptionInterval, WalletTransactionFragment_operation_WalletTransactionDeposit, WalletTransactionFragment_operation_WalletTransactionSubscription, WalletTransactionFragment_operation_WalletTransactionTransferOut, WalletTransactionFragment_operation_WalletTransactionTransferIn } from 'openland-api/spacex.types';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { showPayComplete } from 'openland-mobile/pages/main/modals/PayComplete';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { showTransactionInfo } from 'openland-mobile/pages/main/modals/TransactionInfo';
import { SRouterContext } from 'react-native-s/SRouterContext';

interface TransactionViewProps {
    item: WalletTransactionFragment;
}

interface OperationViewProps {
    title: string;
    subtitle: string;
    amount: string;
    sign: '−' | '+' | '';
    avatar?: {
        src: string | null;
        placeholderKey: string;
        placeholderTitle: string;
    };
}

const getDepositProps = (operation: WalletTransactionFragment_operation_WalletTransactionDeposit): OperationViewProps => {
    return {
        title: 'Top up balance',
        subtitle: 'Deposit',
        amount: formatMoney(operation.amount),
        sign: '+',
    };
};

const getSubscriptionProps = (operation: WalletTransactionFragment_operation_WalletTransactionSubscription): OperationViewProps => {
    const {product, interval} = operation.subscription;
    let intervalStr = interval === WalletSubscriptionInterval.WEEK ? 'weekly' : 'monthly';
    let subtitle = `Subscription, ${intervalStr}`;
    let amount = formatMoney(operation.subscription.amount);
    return product.__typename === 'WalletProductGroup' ? {
        avatar: {
            src: product.group.photo,
            placeholderKey: product.group.id,
            placeholderTitle: product.group.title,
        },
        title: product.group.title,
        subtitle,
        amount,
        sign: '−',
    } : {
        avatar: {
            src: product.user.photo,
            placeholderKey: product.user.id,
            placeholderTitle: product.user.name,
        },
        title: product.user.name,
        subtitle,
        amount,
        sign: '−',
    };
};

const getTransferOutProps = (operation: WalletTransactionFragment_operation_WalletTransactionTransferOut): OperationViewProps => {
    return {
        avatar: {
            src: operation.toUser.photo,
            placeholderKey: operation.toUser.id,
            placeholderTitle: operation.toUser.name,
        },
        title: operation.toUser.name,
        subtitle: 'Transfer',
        amount: formatMoney(operation.chargeAmount),
        sign: '−',
    };
};

const getTransferInProps = (operation: WalletTransactionFragment_operation_WalletTransactionTransferIn): OperationViewProps => {
    return {
        avatar: {
            src: operation.fromUser.photo,
            placeholderKey: operation.fromUser.id,
            placeholderTitle: operation.fromUser.name,
        },
        title: operation.fromUser.name,
        subtitle: 'Transfer',
        amount: formatMoney(operation.amount),
        sign: '+'
    };
};

export const TransactionView = (props: TransactionViewProps) => {
    const theme = useTheme();
    const router = React.useContext(SRouterContext);
    const { operation, date } = props.item;
    const { payment } = operation;

    const actionRequired = payment && (payment.status === PaymentStatus.ACTION_REQUIRED || payment.status === PaymentStatus.FAILING) && payment.intent;
    const complete = React.useCallback(() => {
        if (actionRequired && payment && payment.intent && router) {
            showPayComplete(payment.intent.id, payment.intent.clientSecret, router);
        }
    }, [actionRequired]);
    // const cancel = React.useCallback(async () => {
    //     if (actionRequired && !loading && payment && payment.intent) {
    //         setLoading(true);
    //         await backoff(() => {
    //             return client.mutatePaymentIntentCancel({ id: payment.intent!.id });
    //         });
    //         setLoading(false);
    //     }
    // }, [actionRequired]);

    let operationProps: OperationViewProps = {
        title: '',
        subtitle: '',
        amount: '',
        sign: '',
    };

    if (operation.__typename === 'WalletTransactionDeposit') {
        operationProps = getDepositProps(operation);
    } else if (operation.__typename === 'WalletTransactionSubscription') {
        operationProps = getSubscriptionProps(operation);
    } else if (operation.__typename === 'WalletTransactionTransferOut') {
        operationProps = getTransferOutProps(operation);
    } else if (operation.__typename === 'WalletTransactionTransferIn') {
        operationProps = getTransferInProps(operation);
    }

    let {title, subtitle, amount, sign, avatar} = operationProps;

    let textBy = {
        [PaymentStatus.PENDING]: 'pending',
        [PaymentStatus.FAILING]: 'failing',
        [PaymentStatus.ACTION_REQUIRED]: 'failing',
        [PaymentStatus.CANCELED]: 'canceled',
    };
    let statusText = payment && textBy[payment.status] ? `, ${textBy[payment.status]}` : '';
    let fullSubtitle = `${subtitle}\n${formatDate(parseInt(date, 10))}${statusText}`;
    
    let amountColor: string = theme.foregroundPrimary;
    if (payment && [PaymentStatus.ACTION_REQUIRED, PaymentStatus.FAILING, PaymentStatus.CANCELED].includes(payment.status)) {
        amountColor = theme.accentNegative;
    } else if (['WalletTransactionTransferIn', 'WalletTransactionDeposit'].includes(operation.__typename)) {
        amountColor = theme.accentPositive;
    }

    const handlePress = React.useCallback(() => {
        if (actionRequired) {
            complete();
        } else {
            showTransactionInfo({
                title,
                subtitle,
                amount,
                card: payment && payment.card,
                date,
                avatar,
            });
        }
    }, []);

    return (
        <>
            <ZListItemBase height={76} separator={false} onPress={handlePress}>
                <View flexDirection="row" paddingVertical={6} paddingHorizontal={16} flexGrow={1} width="100%">
                    <View paddingTop={2} paddingRight={16}>
                        {!avatar
                            ? (
                                <Image source={require('assets/ic-top-up-40.png')} />
                            ) : (
                                <ZAvatar
                                    size="medium"
                                    {...avatar}
                                />
                            )
                        }
                    </View>
                    <View flexGrow={1} flexShrink={1}>
                        <Text style={{...TextStyles.Label1, color: theme.foregroundPrimary}} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                        <Text style={{...TextStyles.Subhead, color: theme.foregroundTertiary}} numberOfLines={2} ellipsizeMode="tail" allowFontScaling={false}>{fullSubtitle}</Text>
                    </View>
                    <View flexShrink={0} paddingLeft={16}>
                        <Text 
                            style={{
                                ...TextStyles.Label1, 
                                color: amountColor
                            }}
                        >
                            {sign} {amount}
                        </Text>
                    </View>
                </View>
            </ZListItemBase>
            {actionRequired && (
                <TouchableWithoutFeedback onPress={complete}>
                    <View marginLeft={72} marginRight={16} paddingVertical={8} alignItems="flex-start" justifyContent="flex-start" position="relative">
                        <View position="absolute" top={2} left={16} width={12} height={6}>
                            <Image source={require('assets/wallet/ic-tail-12.png')} style={{width: 12, height: 6}} />
                        </View>
                        <View paddingHorizontal={16} paddingVertical={12} borderRadius={RadiusStyles.Medium} width={287} maxWidth="100%" backgroundColor={theme.accentNegative}>
                            <Text style={{...TextStyles.Subhead, color: theme.foregroundContrast}}>Couldn’t complete transaction</Text>
                            <View marginTop={4} flexDirection="row" alignItems="center">
                                <Text style={{...TextStyles.Label2, color: theme.foregroundContrast, }}>
                                    Complete
                                </Text>
                                <Image source={require('assets/ic-chevron-16.png')} style={{tintColor: theme.foregroundContrast, }} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </>
    );
};