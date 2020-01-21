import * as React from 'react';
import { WalletTransactions_walletTransactions_items } from 'openland-api/Types';
import { ZListItem } from 'openland-mobile/components/ZListItem';

interface TransactionViewProps {
    item: WalletTransactions_walletTransactions_items;
}

export const TransactionView = (props: TransactionViewProps) => {
    const { amount, state } = props.item;

    return (
        <ZListItem
            title="Community creators"
            text="Jan 14, 2020"
            description={`${state}, ${amount}`}
            leftAvatar={{ photo: undefined, key: '1', title: 'Community creators' }}
        />
    );
};