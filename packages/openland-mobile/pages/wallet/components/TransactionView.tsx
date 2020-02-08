import * as React from 'react';
import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { Money } from 'openland-y-utils/wallet/Money';

interface TransactionViewProps {
    item: WalletTransactionFragment;
}

export const TransactionView = (props: TransactionViewProps) => {
    const { status, operation } = props.item;
    const operationAmount = operation.__typename !== 'WalletTransactionTransferOut' ? operation.amount : undefined;

    return (
        <ZListItem
            text={status}
            subTitle={operationAmount ? <Money amount={operationAmount} /> : undefined}
        />
    );
};