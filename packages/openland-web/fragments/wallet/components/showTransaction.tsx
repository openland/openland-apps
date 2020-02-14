import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { WalletTransactionFragment, WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { useClient } from 'openland-api/useClient';
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

const TransactionComponent = React.memo((props: { ctx: XModalController, transaction: WalletTransactionFragment }) => {

    const client = useClient();
    const myAvatar = client.useAccount().me!.photo;

    const photo = props.transaction.operation.__typename === 'WalletTransactionSubscription'
        ?  props.transaction.operation.subscription.product.__typename === 'WalletSubscriptionProductGroup'
            ?  props.transaction.operation.subscription.product.group.photo
            : props.transaction.operation.subscription.product.user.photo
        : myAvatar;

    const type = (() => {
        switch (props.transaction.operation.__typename) {
            case 'WalletTransactionDeposit': return 'Deposit';
            case 'WalletTransactionSubscription': return 'Subscription';
            case 'WalletTransactionTransferIn': return 'Top up';
            case 'WalletTransactionTransferOut': return 'Withdrawal';
            default: return 'Transaction';
        }
    })();

    const interval = props.transaction.operation.__typename === 'WalletTransactionSubscription'
        ?  props.transaction.operation.subscription.interval === WalletSubscriptionInterval.WEEK
            ? 'Weekly'
            : 'Monthly'
        : null;

    const dateTime = extractDateTime(props.transaction.date);

    const amountValue = props.transaction.operation.__typename === 'WalletTransactionTransferOut'
        ? props.transaction.operation.walletAmount + props.transaction.operation.chargeAmount
        : props.transaction.operation.amount;

    const amountSign =
        props.transaction.operation.__typename === 'WalletTransactionDeposit' || 
        props.transaction.operation.__typename === 'WalletTransactionTransferIn' ||
        amountValue === 0
            ? ''
            : '-';

    const amount = amountSign + formatMoney(amountValue);

    const normalizedTransaction = {
        id: props.transaction.id,
        photo,
        title: '',
        type,
        interval,
        dateTime,
        paymentMethod: '',
        amount,
    };

    console.warn(normalizedTransaction);

    return (
        <XView paddingTop={20} paddingBottom={16}>
            <XView flexDirection="column" alignItems="center" justifyContent="center">
                <UAvatar
                    id={normalizedTransaction.id}
                    title={normalizedTransaction.title}
                    photo={normalizedTransaction.photo}
                    size='xx-large'
                />
                <XView marginTop={16}>
                    <h2 className={TextTitle2}>{normalizedTransaction.title}</h2>
                </XView>
                <XView marginTop={8} color="var(--foregroundSecondary)">
                    <span className={TextBody}>{normalizedTransaction.type}</span>
                </XView>
            </XView>
            <XView marginTop={16}>

                <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                    <span className={TextBody}>Date and time</span>
                    <XView color="var(--foregroundSecondary)">
                        <span className={TextBody}>
                            { normalizedTransaction.dateTime }
                        </span>
                    </XView>
                </XView>

                <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                    <span className={TextBody}>Payment method</span>
                    <XView color="var(--foregroundSecondary)">
                        <span className={TextBody}>
                            { normalizedTransaction.paymentMethod }
                        </span>
                    </XView>
                </XView>

                <XView flexDirection="row" justifyContent="space-between" paddingHorizontal={24} paddingVertical={12}>
                    <span className={TextBody}>Total amount</span>
                    <XView color="var(--foregroundSecondary)">
                        <span className={TextBody}>
                            { normalizedTransaction.amount }
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
    console.warn({transaction});
    showModalBox({ title: 'Transaction', useTopCloser: true }, (ctx) => {
        return (
            <TransactionComponent ctx={ctx} transaction={transaction} />
        );
    });
} 