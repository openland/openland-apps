import { MyWallet_transactionsPending } from './../../openland-api/Types';
import { backoff } from 'openland-y-utils/timer';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { SequenceModernWatcher } from 'openland-engines/core/SequenceModernWatcher';
import { WalletUpdates_event_WalletUpdateBatch_updates } from 'openland-api/Types';
import { StateStore } from 'openland-engines/utils/StateStore';

export interface WalletState {
    balance: number;
    pendingTransactions: MyWallet_transactionsPending[];

    historyTransactions: MyWallet_transactionsPending[];
    historyTransactionsCursor: string | null;
}

export class WalletEngine {
    readonly messenger: MessengerEngine;
    readonly state: StateStore<WalletState> = new StateStore();
    private sequence: SequenceModernWatcher<any, any> | null = null;

    constructor(messenger: MessengerEngine) {
        this.messenger = messenger;
        this.start();
    }

    private async start() {
        let wallet = await backoff(() => this.messenger.client.queryMyWallet({ fetchPolicy: 'network-only' }));
        this.state.setState({
            balance: wallet.myWallet.balance,
            pendingTransactions: wallet.transactionsPending,
            historyTransactions: wallet.transactionsHistory.items,
            historyTransactionsCursor: wallet.transactionsHistory.cursor
        });

        this.sequence = new SequenceModernWatcher('wallet', this.messenger.client.subscribeWalletUpdates({ state: wallet.myWallet.state }), this.messenger.client.client, async (src) => {
            let update = src as WalletUpdates_event_WalletUpdateBatch_updates;
            await this.handleUpdate(update);
        }, undefined, undefined, wallet.myWallet.state);
    }

    private handleUpdate = async (event: WalletUpdates_event_WalletUpdateBatch_updates) => {
        console.log(event);
        if (event.__typename === 'WalletUpdateBalance') {
            // Update State
            this.state.setState({
                ...this.state.get(),
                balance: event.amount
            });
        } else if (event.__typename === 'WalletUpdateTransactionPending') {
            this.state.setState({
                ...this.state.get(),
                pendingTransactions: [event.transaction, ...this.state.get().pendingTransactions],
                historyTransactions: this.state.get().historyTransactions.filter((v) => v.id !== event.transaction.id)
            });
        } else if (event.__typename === 'WalletUpdateTransactionSuccess') {
            this.state.setState({
                ...this.state.get(),
                pendingTransactions: this.state.get().pendingTransactions.filter((v) => v.id !== event.transaction.id),
                historyTransactions: [event.transaction, ...this.state.get().historyTransactions],
            });
        } else if (event.__typename === 'WalletUpdateTransactionCanceled') {
            this.state.setState({
                ...this.state.get(),
                pendingTransactions: this.state.get().pendingTransactions.filter((v) => v.id !== event.transaction.id),
                historyTransactions: [event.transaction, ...this.state.get().historyTransactions]
            });
        } else if (event.__typename === 'WalletUpdatePaymentStatus') {
            let e = event;
            function updatePayment(src: MyWallet_transactionsPending): MyWallet_transactionsPending {
                if (src.operation.payment && src.operation.payment.id === e.payment.id) {
                    return { ...src, operation: { ...src.operation, payment: e.payment } };
                } else {
                    return src;
                }
            }
            this.state.setState({
                ...this.state.get(),
                pendingTransactions: this.state.get().pendingTransactions.map(updatePayment),
                historyTransactions: this.state.get().historyTransactions.map(updatePayment)
            });
        }
    }
}