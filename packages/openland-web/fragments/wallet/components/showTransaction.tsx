import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { WalletTransactionFragment, WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextTitle2, TextBody } from 'openland-web/utils/TextStyles';
import Success from 'openland-icons/s/ic-success-16.svg';

const extractDateTime = (unixTime: string): string => {
    const date = new Date(parseInt(unixTime, 10));
    const utc = date.toUTCString();
    const segments = utc.split(' ');
    const time = segments[4].split(':').slice(0, 2).join(':');

    return `${segments[2]} ${segments[1]}, ${time}`;
};

export const normalizeTransaction = (transaction: WalletTransactionFragment) => {
    const { id, operation, date } = transaction;

    const photo = operation.__typename === 'WalletTransactionSubscription'
        ? operation.subscription.product.__typename === 'WalletSubscriptionProductGroup'
            ? operation.subscription.product.group.photo
            : operation.subscription.product.user.photo
        : '';

    const title = (() => {
        switch (operation.__typename) {
            case 'WalletTransactionDeposit': return 'Top up';

            case 'WalletTransactionSubscription':
                return operation.subscription.product.__typename === 'WalletSubscriptionProductGroup'
                    ? operation.subscription.product.group.title
                    : operation.subscription.product.user.name;

            case 'WalletTransactionTransferIn': return 'Incoming transfer';

            case 'WalletTransactionTransferOut': return 'Outgoing transfer';

            default: return 'Deposit';
        }
    })();

    const type = operation.__typename === 'WalletTransactionSubscription'
        ? 'Subscription'
        : 'Deposit';

    const interval = operation.__typename === 'WalletTransactionSubscription'
        ? operation.subscription.interval === WalletSubscriptionInterval.WEEK
            ? 'weekly'
            : 'monthly'
        : null;

    const dateTime = extractDateTime(date);

    const paymentMethod = operation.payment && operation.payment.card
        ? getPaymentMethodName(operation.payment.card.brand) + ', ' + operation.payment.card.last4
        : null;

    const amountValue = operation.__typename === 'WalletTransactionTransferOut'
        ? operation.walletAmount + operation.chargeAmount
        : operation.amount;

    const amountSign =
        operation.__typename === 'WalletTransactionDeposit' ||
            operation.__typename === 'WalletTransactionTransferIn' ||
            amountValue === 0
            ? ''
            : '-';

    const amount = amountSign + formatMoney(amountValue);

    return {
        id,
        photo,
        title,
        type,
        interval,
        dateTime,
        paymentMethod,
        amount,
    };
};

const TransactionComponent = React.memo((props: { ctx: XModalController, transaction: WalletTransactionFragment }) => {
    const normalized = normalizeTransaction(props.transaction);

    return (
        <XView paddingTop={20} paddingBottom={16}>
            <XView flexDirection="column" alignItems="center" justifyContent="center">
                <UAvatar
                    id={normalized.id}
                    title={normalized.title}
                    photo={normalized.photo}
                    size='xx-large'
                />
                <XView marginTop={16}>
                    <h2 className={TextTitle2}>{normalized.title}</h2>
                </XView>
                <XView marginTop={8} color="var(--foregroundSecondary)">

                    {props.transaction.operation.__typename === 'WalletTransactionSubscription' && (
                        <span className={TextBody}>{normalized.type}, {normalized.interval}</span>
                    )}

                    {props.transaction.operation.__typename !== 'WalletTransactionSubscription' && (
                        <span className={TextBody}>{normalized.type}</span>
                    )}
                </XView>
            </XView>
            <XView marginTop={16}>

                <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                    <span className={TextBody}>Date and time</span>
                    <XView color="var(--foregroundSecondary)">
                        <span className={TextBody}>
                            {normalized.dateTime}
                        </span>
                    </XView>
                </XView>

                {normalized.paymentMethod && (
                    <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                        <span className={TextBody}>Payment method</span>
                        <XView color="var(--foregroundSecondary)">
                            <span className={TextBody}>
                                {normalized.paymentMethod}
                            </span>
                        </XView>
                    </XView>
                )}

                <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                    <span className={TextBody}>Total amount</span>
                    <XView color="var(--foregroundSecondary)">
                        <span className={TextBody}>
                            {normalized.amount}
                        </span>
                    </XView>
                </XView>

                <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                    <span className={TextBody}>Status</span>
                    <XView color="var(--accentPositive)" alignItems="center" flexDirection="row">
                        <XView marginRight={8}>
                            <Success />
                        </XView>
                        <span className={TextBody}>
                            Success
                        </span>
                    </XView>
                </XView>

            </XView>
        </XView>
    );
});

export function showTransaction(transaction: WalletTransactionFragment) {
    showModalBox({ title: 'Transaction', useTopCloser: true }, (ctx) => {
        return (
            <TransactionComponent ctx={ctx} transaction={transaction} />
        );
    });
} 