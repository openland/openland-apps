import { MyWallet_transactionsPending, WalletUpdates } from 'openland-api/spacex.types';
import { backoff } from 'openland-y-utils/timer';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { WalletUpdates_event_WalletUpdateBatch_updates } from 'openland-api/spacex.types';
import { StateStore } from 'openland-engines/utils/StateStore';
import { sequenceWatcher } from 'openland-api/sequenceWatcher';

export interface WalletState {
    balance: number;
    pendingTransactions: MyWallet_transactionsPending[];

    historyTransactions: MyWallet_transactionsPending[];
    historyTransactionsCursor: string | null;
}

export class WalletEngine {
    readonly messenger: MessengerEngine;
    readonly state: StateStore<WalletState> = new StateStore();

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

        sequenceWatcher<WalletUpdates>(wallet.myWallet.state, (state, handler) => this.messenger.client.subscribeWalletUpdates({ state: state! }, handler), (update) => {
            if (update.event.__typename === 'WalletUpdateBatch') {
                for (let u of update.event.updates) {
                    this.handleUpdate(u);
                }
            } else if (update.event.__typename === 'WalletUpdateSingle') {
                this.handleUpdate(update.event.update);
            }
            return update.event.state;
        });
    }

    private handleUpdate = (event: WalletUpdates_event_WalletUpdateBatch_updates) => {
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
                if (src.operation.__typename !== 'WalletTransactionTransferIn' && src.operation.payment && src.operation.payment.id === e.payment.id) {
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