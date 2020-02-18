import { WalletTransactionFragment, WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { extractDateTime } from 'openland-y-utils/wallet/dateTime';

export interface TransactionConverted {
    id: string;
    avatar?: { id: string, title: string, photo: string | null | undefined };
    title: string;
    type: string;
    interval?: string;
    dateTime: { date: string, time: string, isToday: boolean };
    paymentMethod?: string;
    amount: string;

    source: WalletTransactionFragment;
}

export const convertTransaction = (transaction: WalletTransactionFragment) => {
    const { id, operation } = transaction;
    const converted: TransactionConverted = {
        id,
        avatar: undefined,
        title: 'Transaction',
        type: 'Unsupported',
        interval: undefined,
        dateTime: extractDateTime(transaction.date),
        paymentMethod: undefined,
        amount: formatMoney(transaction.operation.amount, false, true),
        source: transaction
    };

    if (operation.__typename === 'WalletTransactionSubscription') {
        const { interval, product } = operation.subscription;

        converted.interval = interval === WalletSubscriptionInterval.WEEK ? 'Weekly' : 'Monthly';
        converted.type = 'Subscription';

        if (product.__typename === 'WalletProductGroup') {
            converted.title = product.group.title;
            converted.avatar = {
                id: product.group.id,
                title: product.group.title,
                photo: product.group.photo,
            };
        } else if (product.__typename === 'WalletProductDonation') {
            converted.title = product.user.name;
            converted.avatar = {
                id: product.user.id,
                title: product.user.name,
                photo: product.user.photo,
            };
        }
    } else if (operation.__typename === 'WalletTransactionTransferIn') {
        const { fromUser } = operation;

        converted.title = fromUser.name;
        converted.type = 'Transfer';
        converted.avatar = {
            id: fromUser.id,
            title: fromUser.name,
            photo: fromUser.photo,
        };
    } else if (operation.__typename === 'WalletTransactionTransferOut') {
        const { toUser } = operation;

        converted.title = toUser.name;
        converted.type = 'Transfer';
        converted.avatar = {
            id: toUser.id,
            title: toUser.name,
            photo: toUser.photo,
        };
    } else if (operation.__typename === 'WalletTransactionDeposit') {
        converted.title = 'Top up balance';
        converted.type = 'Deposit';
    } else if (operation.__typename === 'WalletTransactionIncome') {
        converted.title = 'Income title';
        converted.type = 'Income type';
    } else if (operation.__typename === 'WalletTransactionPurchase') {
        const { product } = operation.purchase;

        converted.type = 'Purchase';

        if (product.__typename === 'WalletProductGroup') {
            converted.title = product.group.title;
            converted.avatar = {
                id: product.group.id,
                title: product.group.title,
                photo: product.group.photo,
            };
        } else if (product.__typename === 'WalletProductDonation') {
            converted.title = product.user.name;
            converted.avatar = {
                id: product.user.id,
                title: product.user.name,
                photo: product.user.photo,
            };
        }
    }

    if (operation.payment && operation.payment.card) {
        converted.paymentMethod = getPaymentMethodName(operation.payment.card.brand) + ', ' + operation.payment.card.last4;
    }

    return converted;
};