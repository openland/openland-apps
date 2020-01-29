import * as React from 'react';
import { WalletTransactionFragment } from 'openland-api/Types';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { Money } from 'openland-y-utils/wallet/Money';

interface TransactionViewProps {
    item: WalletTransactionFragment;
}

export const TransactionView = React.memo((props: TransactionViewProps) => {
    const { status, operation } = props.item;
    const operationAmount = operation.__typename !== 'WalletTransactionTransferOut' ? operation.amount : undefined;

    return (
        <UListItem
            title={status}
            subtitle={operationAmount ? <Money amount={operationAmount} /> : undefined}
        />
    );
});