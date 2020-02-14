import * as React from 'react';
import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { showConfirmPayment } from './showConfirmPayment';
import { showTransaction, normalizeTransaction } from './showTransaction';
import { XView } from 'react-mental';

interface TransactionViewProps {
    item: WalletTransactionFragment;
}

export const TransactionView = React.memo((props: TransactionViewProps) => {
    const normalized = normalizeTransaction(props.item);
    const operation = props.item.operation;
    const payment = operation.payment;

    return (
        <UListItem
            avatar={{ id: normalized.id, title: normalized.title, photo: normalized.photo }}
            title={normalized.title}
            description={normalized.type + (operation.__typename === 'WalletTransactionSubscription' ? (', ' + normalized.interval) : '')}
            useRadius={true}
            rightElement={
                <>
                    <XView>{normalized.amount}</XView>
                </>
            }
            onClick={() => {
                if (payment && payment.intent && (payment.status === 'FAILING' || payment.status === 'ACTION_REQUIRED')) {
                    showConfirmPayment(payment.intent.id, payment.intent.clientSecret);
                } else {
                    showTransaction(props.item);
                }
            }}
        />
    );
});