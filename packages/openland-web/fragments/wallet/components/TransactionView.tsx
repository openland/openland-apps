import * as React from 'react';
import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { Money } from 'openland-y-utils/wallet/Money';
import { showConfirmPayment } from './showConfirmPayment';
import { showTransaction } from './showTransaction';

interface TransactionViewProps {
    item: WalletTransactionFragment;
}

export const TransactionView = React.memo((props: TransactionViewProps) => {
    const { status, operation } = props.item;
    const operationPayment = operation.__typename !== 'WalletTransactionTransferIn' ? operation.payment : undefined;
    const operationAmount = operation.__typename !== 'WalletTransactionTransferOut' ? operation.amount : undefined;

    const title = operation.__typename === 'WalletTransactionDeposit' ? 'Top up balance' : status + ': ' + (operationPayment && operationPayment.status);

    return (
        <UListItem
            title={title}
            subtitle={operationAmount ? <Money amount={operationAmount} /> : undefined}
            useRadius={true}
            onClick={() => {
                if (operationPayment && operationPayment.intent && (operationPayment.status === 'FAILING' || operationPayment.status === 'ACTION_REQUIRED')) {
                    showConfirmPayment(operationPayment.intent.id, operationPayment.intent.clientSecret);
                } else {
                    showTransaction(props.item);
                }
            }}
        />
    );
});