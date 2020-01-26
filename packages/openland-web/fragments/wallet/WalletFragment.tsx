import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { showAddCard } from './components/showAddCard';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { CardView } from './components/CardView';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
// import { TransactionView } from './components/TransactionView';
import { showAddFunds } from './components/showAddFunds';
import { Money } from 'openland-y-utils/wallet/Money';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { css } from 'linaria';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
// import AlertBlanket from 'openland-x/AlertBlanket';
// import uuid from 'uuid';
// import { showConfirmPayment } from './components/showConfirmPayment';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { showConfirmPayment } from './components/showConfirmPayment';

const cardContainer = css`
    width: 50%;
    padding: 0 8px 16px;

    @media (max-width: 560px) {
        width: 100%;
    }
`;

export const WalletFragment = React.memo(() => {
    const client = useClient();
    const messenger = React.useContext(MessengerContext);
    const wallet = messenger.wallet.state.useState();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    // const wallet = client.useMyWallet({ fetchPolicy: 'cache-and-network' }).myWallet;
    // const pendingTransactions = client.usePendingTransactions({ fetchPolicy: 'cache-and-network' }).transactionsPending;
    // React.useEffect(() => {
    //     console.log('Wallet start from: ' + wallet.state);
    //     let sequence = new SequenceModernWatcher('wallet', client.subscribeWalletUpdates({ state: wallet.state }), client.client, async (src) => {
    //         console.log(src);
    //     }, undefined, undefined, wallet.state);
    //     return () => {
    //         sequence.destroy();
    //     };
    // }, []);
    // const transactions = client.useWalletTransactions({ id: wallet.id, first: 20 }).walletTransactions;
    // const subscriptions = client.useMySubscriptions({ fetchPolicy: 'cache-and-network' });
    // const pending = client.useMyPendingPayments({ fetchPolicy: 'cache-and-network' });
    // const balance = wallet.balance;
    // const createDonation = React.useCallback(() => {
    //     AlertBlanket.builder()
    //         .title('Add donation?')
    //         .message('5$ monthly donation will be added to your account')
    //         .action('Donate', async () => {
    //             await client.mutateCreateDonateSubscription({ amount: 500, retryKey: uuid() });
    //             await client.refetchMySubscriptions();
    //         }, 'danger').show();
    // }, []);

    return (
        <Page track="settings_wallet">
            <UHeader title="Wallet" />
            <XView flexDirection="column" paddingBottom={56}>
                <UListGroup header="Your balance" action={{ title: 'Add funds', onClick: () => showAddFunds() }}>
                    <XView
                        {...TextStyles.Title1}
                        color={wallet.balance === 0 ? 'var(--foregroundTertiary)' : 'var(--accentPrimary)'}
                        paddingHorizontal={16}
                        paddingBottom={16}
                    >
                        <Money amount={wallet.balance} />
                    </XView>
                </UListGroup>
                <UListGroup
                    header="Payments methods"
                    action={cards.length > 0 ? { title: 'Add card', onClick: () => showAddCard() } : undefined}
                >
                    {cards.length === 0 && (
                        <UAddItem
                            title="Add card"
                            onClick={() => showAddCard()}
                        />
                    )}
                    <XView paddingTop={8} paddingHorizontal={8} flexDirection="row" flexWrap="wrap">
                        {cards.map(card => (
                            <div className={cardContainer} key={card.id}>
                                <CardView item={card} />
                            </div>
                        ))}
                    </XView>
                </UListGroup>
                <UListGroup header="Pending Transactions">
                    {wallet.pendingTransactions.map((v) => (
                        <UListItem
                            key={v.id}
                            title={v.status + ': ' + v.operation.payment!.status}
                            subtitle={<Money amount={v.operation.amount} />}
                            onClick={() => {
                                if (v.operation.payment!.status === 'ACTION_REQUIRED') {
                                    showConfirmPayment(v.operation.payment!.intent!.id, v.operation.payment!.intent!.clientSecret);
                                }
                            }}
                        />
                    ))}
                </UListGroup>
                <UListGroup header="Latest Transactions">
                    {wallet.historyTransactions.map((v) => (
                        <UListItem
                            key={v.id}
                            title={v.status}
                            subtitle={<Money amount={v.operation.amount} />}
                        />
                    ))}
                </UListGroup>
            </XView>
        </Page>
    );
});