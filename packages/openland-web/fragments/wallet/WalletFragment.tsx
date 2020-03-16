import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView, XViewRouterContext } from 'react-mental';
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
import { UButton } from 'openland-web/components/unicorn/UButton';
import { css, cx } from 'linaria';
import { showWithdrawFunds } from './components/WithdrawFunds';

const balanceWrapper = css`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin: 16px 16px 0;
    height: 80px;
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(242, 243, 245, 0.56) 0%, #F2F3F5 100%);
`;

export const WalletFragment = React.memo(() => {
    const client = useClient();
    const router = React.useContext(XViewRouterContext)!;
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
            <UHeader title="Wallet" maxWidth={550} />
            <div className={cx('x', balanceWrapper)}>
                <XView flexDirection="column">
                    <XView
                        {...TextStyles.Title2}
                        color={balance === 0 ? 'var(--foregroundTertiary)' : 'var(--foregroundPrimary)'}
                    >
                        <Money amount={balance} />
                    </XView>
                    <XView {...TextStyles.Subhead} color="var(--foregroundSecondary)">Your balance</XView>
                </XView>
            
                <XView flexDirection="row">
                    <UButton text="Withdraw" style="secondary" marginRight={8} onClick={() => showWithdrawFunds(router)} />
                    <UButton text="Add funds" onClick={showAddFunds} />
                </XView>
            </div>
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