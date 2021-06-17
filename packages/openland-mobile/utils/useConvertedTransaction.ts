import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { useText } from 'openland-mobile/text/useText';
import * as transaction from 'openland-y-utils/wallet/transaction';

export const useConvertedTransaction = (walletTransaction: WalletTransactionFragment) => {
    let { t } = useText();
    let converted = transaction.convertTransaction(walletTransaction);
    let type = '';
    let title = converted.title;
    switch (converted.type) {
        case 'basic':
            type = t('walletBasic', 'Basic');
            title = t('walletTransaction', 'Transaction');
            break;
        case 'subscription':
            type = t('walletSubscription', 'Subscription');
            break;
        case 'donation':
            type = t('walletDonation', 'Donation');
            break;
        case 'transfer':
            type = t('walletTransfer', 'Transfer');
            break;
        case 'deposit':
            type = t('walletDeposit', 'Deposit');
            title = t('walletTopUpBalance', 'Top up balance');
            break;
        case 'income':
            type = t('walletIncome', 'Income');
            break;
        case 'premium-reaction':
            type = t('walletPremiumReaction', 'Premium reaction');
            break;
        case 'payment':
            type = t('walletPayment', 'Payment');
            break;
        default:
            break;
    }
    return { ...converted, type, title };
};
