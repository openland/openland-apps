import { WalletTransactionFragment } from 'openland-api/spacex.types';
import * as transaction from 'openland-y-utils/wallet/transaction';

export const useConvertedTransaction = (walletTransaction: WalletTransactionFragment) => {
    let converted = transaction.convertTransaction(walletTransaction);
    let type = '';
    let title = converted.title;
    switch (converted.type) {
        case 'basic':
            type = 'Basic';
            title = 'Transaction';
            break;
        case 'subscription':
            type = 'Subscription';
            break;
        case 'donation':
            type = 'Donation';
            break;
        case 'transfer':
            type = 'Transfer';
            break;
        case 'deposit':
            type = 'Deposit';
            title = 'Top up balance';
            break;
        case 'income':
            type = 'Income';
            break;
        case 'premium-reaction':
            type = 'Premium reaction';
            break;
        case 'payment':
            type = 'Payment';
            break;
        default:
            break;
    }
    return { ...converted, type, title };
};
