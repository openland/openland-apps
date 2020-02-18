import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { WalletTransactionFragment, WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextTitle2, TextBody } from 'openland-web/utils/TextStyles';
import SuccessIcon from 'openland-icons/s/ic-success-16.svg';
import { DepositAvatar } from '../components/DepositAvatar';
import { extractDateTime } from 'openland-y-utils/wallet/dateTime';

export const normalizeTransaction = (transaction: WalletTransactionFragment) => {
    const { id, operation, date } = transaction;
    let title = `Transaction ${id}`;
    let type = '';
    let avatar: { id: string, title: string, photo: string | null | undefined } | undefined;

    if (operation.__typename === 'WalletTransactionSubscription') {
        if (operation.subscription.product.__typename === 'WalletProductGroup') {
            title = operation.subscription.product.group.title;
            type = 'Subscription';
            avatar = {
                id: operation.subscription.product.group.id,
                title: operation.subscription.product.group.title,
                photo: operation.subscription.product.group.photo,
            };
        } else if (operation.subscription.product.__typename === 'WalletProductDonation') {
            title = operation.subscription.product.user.name;
            type = 'Subscription';
            avatar = {
                id: operation.subscription.product.user.id,
                title: operation.subscription.product.user.name,
                photo: operation.subscription.product.user.photo,
            };
        }
    } else if (operation.__typename === 'WalletTransactionTransferIn') {
        title = operation.fromUser.name;
        type = 'Transfer';
        avatar = {
            id: operation.fromUser.id,
            title: operation.fromUser.name,
            photo: operation.fromUser.photo,
        };
    } else if (operation.__typename === 'WalletTransactionTransferOut') {
        title = operation.toUser.name;
        type = 'Transfer';
        avatar = {
            id: operation.toUser.id,
            title: operation.toUser.name,
            photo: operation.toUser.photo,
        };
    } else if (operation.__typename === 'WalletTransactionDeposit') {
        title = 'Top up balance';
        type = 'Deposit';
    }

    const interval = operation.__typename === 'WalletTransactionSubscription'
        ? operation.subscription.interval === WalletSubscriptionInterval.WEEK
            ? 'Weekly'
            : 'Monthly'
        : null;

    const dateTime = extractDateTime(date);

    const paymentMethod = operation.payment && operation.payment.card
        ? getPaymentMethodName(operation.payment.card.brand) + ', ' + operation.payment.card.last4
        : null;

    const amountValue = operation.__typename === 'WalletTransactionTransferOut'
        ? operation.walletAmount + operation.chargeAmount
        : operation.amount;

    const amountSign =
        amountValue > 0 ? (
            operation.__typename === 'WalletTransactionDeposit' || operation.__typename === 'WalletTransactionTransferIn' ? '+' : '-'
        ) : '';

    const amount = amountSign + ' ' + formatMoney(amountValue);

    return {
        id,
        avatar,
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
                {normalized.avatar && <UAvatar {...normalized.avatar} size='xx-large' />}
                {!normalized.avatar && <DepositAvatar size="xx-large" />}
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
                            {normalized.dateTime.date}, {normalized.dateTime.time}
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
                            <SuccessIcon />
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