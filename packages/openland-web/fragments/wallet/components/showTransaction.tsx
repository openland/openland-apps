import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { WalletTransactionFragment } from 'openland-api/spacex.types';

const TransactionComponent = React.memo((props: { ctx: XModalController, transaction: WalletTransactionFragment }) => {
    return (
        <XView />
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