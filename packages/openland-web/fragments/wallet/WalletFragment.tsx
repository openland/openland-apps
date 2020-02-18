import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { showAddCard } from './modals/showAddCard';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { CardView } from './components/CardView';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { TransactionView } from './components/TransactionView';
import { showAddFunds } from './modals/showAddFunds';
import { Money } from 'openland-y-utils/wallet/Money';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';

export const WalletFragment = React.memo(() => {
    const client = useClient();
    const messenger = React.useContext(MessengerContext);
    const walletEngine = messenger.wallet;
    const walletState = walletEngine.state.useState();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    const balance = walletState.balance;
    const transactions = [...walletState.pendingTransactions, ...walletState.historyTransactions];

    return (
        <UFlatList
            track="settings_wallet"
            loadMore={walletEngine.loadMoreTransactions}
            items={transactions}
            loading={walletState.historyLoading}
            title="Wallet"
            renderItem={transaction => <TransactionView key={transaction.id} item={transaction} />}
        >
            <UHeader title="Wallet" />
            <UListGroup header="Your balance" action={{ title: 'Top up', onClick: () => showAddFunds() }}>
                <XView
                    {...TextStyles.Title1}
                    color={balance === 0 ? 'var(--foregroundTertiary)' : 'var(--accentPrimary)'}
                    paddingHorizontal={16}
                    paddingBottom={16}
                >
                    <Money amount={balance} />
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
                {cards.map(card => <CardView item={card} key={card.id} />)}
            </UListGroup>
            {transactions.length > 0 && <UListHeader text="Transactions" />}
        </UFlatList>
    );
});