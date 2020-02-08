import * as React from 'react';
import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { Money } from 'openland-y-utils/wallet/Money';
import { useClient } from 'openland-api/useClient';
import { showConfirmPayment } from './showConfirmPayment';

interface PendingTransactionViewProps {
    item: WalletTransactionFragment;
}

export const PendingTransactionView = React.memo((props: PendingTransactionViewProps) => {
    const { status, operation } = props.item;
    const client = useClient();
    const operationPayment = operation.__typename !== 'WalletTransactionTransferIn' ? operation.payment : undefined;
    const operationAmount = operation.__typename !== 'WalletTransactionTransferOut' ? operation.amount : undefined;

    return (
        <UListItem
            title={status + ': ' + (operationPayment && operationPayment.status)}
            subtitle={operationAmount ? <Money amount={operationAmount} /> : undefined}
            onClick={() => {
                if (operationPayment && operationPayment.status === 'FAILING') {
                    client.mutatePaymentIntentCancel({ id: operationPayment.id });
                }
                if (operationPayment && operationPayment.intent && operationPayment.status === 'ACTION_REQUIRED') {
                    showConfirmPayment(operationPayment.intent.id, operationPayment.intent.clientSecret);
                }
            }}
        />
    );
});