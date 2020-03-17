import { WalletTransactionFragment, WalletSubscriptionInterval, PaymentStatus, WalletTransactionStatus } from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { extractDateTime } from 'openland-y-utils/wallet/dateTime';

export type TransactionConvertedStatus = 'pending' | 'failing' | 'canceled' | 'success';
export interface TransactionConverted {
    id: string;
    avatar?: { id: string, title: string, photo: string | null | undefined };
    group?: { id: string };
    title: string;
    type: string;
    interval?: string;
    dateTime: { date: string, time: string, isToday: boolean };
    paymentMethod?: string;
    amount: string;
    walletAmount?: string;
    chargeAmount?: string;
    status: TransactionConvertedStatus;

    source: WalletTransactionFragment;
}

const getAvatar = (subject: { __typename: 'User', id: string, name: string, photo: string | null } | { __typename: 'SharedRoom', id: string, title: string, photo: string }) => (subject.__typename === 'User' ? {
    id: subject.id, title: subject.name, photo: subject.photo,
} : { id: subject.id, title: subject.title, photo: subject.photo });

const formatTransactionMoney = (amount: number) => formatMoney(amount, true);

export const convertTransaction = (transaction: WalletTransactionFragment) => {
    const { id, operation } = transaction;
    const converted: TransactionConverted = {
        id,
        avatar: undefined,
        title: 'Transaction',
        type: 'Basic',
        interval: undefined,
        dateTime: extractDateTime(transaction.date),
        paymentMethod: undefined,
        amount: formatTransactionMoney(transaction.operation.amount),
        status: 'pending',
        source: transaction
    };

    if (transaction.status === WalletTransactionStatus.SUCCESS) {
        converted.status = 'success';
    } else if (transaction.status === WalletTransactionStatus.CANCELED) {
        converted.status = 'canceled';
    } else if (operation.payment && (operation.payment.status === PaymentStatus.FAILING || operation.payment.status === PaymentStatus.ACTION_REQUIRED)) {
        converted.status = 'failing';
    }

    if (operation.__typename === 'WalletTransactionSubscription') {
        const { interval, product } = operation.subscription;

        converted.interval = interval === WalletSubscriptionInterval.WEEK ? 'Weekly' : 'Monthly';
        converted.type = 'Subscription';

        if (operation.walletAmount !== 0 && operation.chargeAmount !== 0) {
            converted.walletAmount = formatTransactionMoney(-operation.walletAmount);
            converted.chargeAmount = formatTransactionMoney(-operation.chargeAmount);
        }

        if (product.__typename === 'WalletProductGroup') {
            converted.title = product.group.title;
            converted.avatar = getAvatar(product.group);
            converted.group = product.group;
        } else if (product.__typename === 'WalletProductDonation') {
            converted.title = product.user.name;
            converted.avatar = getAvatar(product.user);
        }
    } else if (operation.__typename === 'WalletTransactionTransferIn') {
        const { fromUser } = operation;

        converted.title = fromUser.name;
        converted.type = 'Transfer';
        converted.avatar = getAvatar(fromUser);
    } else if (operation.__typename === 'WalletTransactionTransferOut') {
        const { toUser } = operation;

        converted.title = toUser.name;
        converted.type = 'Transfer';
        converted.avatar = getAvatar(toUser);
        if (operation.walletAmount !== 0 && operation.chargeAmount !== 0) {
            converted.walletAmount = formatTransactionMoney(-operation.walletAmount);
            converted.chargeAmount = formatTransactionMoney(-operation.chargeAmount);
        }
    } else if (operation.__typename === 'WalletTransactionDeposit') {
        converted.title = 'Top up balance';
        converted.type = 'Deposit';
    } else if (operation.__typename === 'WalletTransactionIncome') {
        converted.type = 'Income';

        if (operation.source) {
            const { product } = operation.source;

            if (product.__typename === 'WalletProductGroup') {
                converted.title = product.group.title;
                converted.avatar = getAvatar(product.group);
                converted.group = product.group;
            } else if (product.__typename === 'WalletProductDonation') {
                converted.title = product.user.name;
                converted.avatar = getAvatar(product.user);
            }
        }
    } else if (operation.__typename === 'WalletTransactionPurchase') {
        const { product } = operation.purchase;

        converted.type = 'Payment';

        if (operation.walletAmount !== 0 && operation.chargeAmount !== 0) {
            converted.walletAmount = formatTransactionMoney(-operation.walletAmount);
            converted.chargeAmount = formatTransactionMoney(-operation.chargeAmount);
        }

        if (product.__typename === 'WalletProductGroup') {
            converted.title = product.group.title;
            converted.avatar = getAvatar(product.group);
            converted.group = product.group;
        } else if (product.__typename === 'WalletProductDonation') {
            converted.title = product.user.name;
            converted.avatar = getAvatar(product.user);
        }
    }

    if (operation.payment && operation.payment.card) {
        converted.paymentMethod = getPaymentMethodName(operation.payment.card.brand) + ', ' + operation.payment.card.last4;
    }

    return converted;
};