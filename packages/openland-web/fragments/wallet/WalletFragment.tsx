import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { showAddCard } from './components/showAddCard';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { BallanceView } from './components/BalanceView';
import { CardView } from './components/CardView';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { TransactionView } from './components/TransactionView';

export const WalletFragment = React.memo(() => {
    const client = useClient();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' });
    const wallet = client.useMyWallet({ fetchPolicy: 'cache-and-network' });
    const transactions = client.useWalletTransactions({ id: wallet.myAccount.id, first: 20 });

    return (
        <Page track="settings_wallet">
            <UHeader title="Wallet" />
            <XView flexDirection="column">
                <XView paddingTop={20} paddingBottom={12} paddingHorizontal={16}>
                    <BallanceView value={wallet.myAccount.balance} />
                </XView>
                <UListGroup
                    header="Payments methods"
                    action={cards.myCards.length > 0 ? { title: 'Add card', onClick: () => showAddCard() } : undefined}
                >
                    {cards.myCards.length === 0 && (
                        <UAddItem
                            title="Add card"
                            onClick={() => showAddCard()}
                            style="secondary"
                        />
                    )}
                    <XView paddingTop={8} paddingHorizontal={8} paddingBottom={4} flexDirection="row" flexWrap="wrap">
                        {cards.myCards.map((v) => (
                            <XView key={v.id} width="50%" paddingHorizontal={8} paddingBottom={16}>
                                <CardView item={v} />
                            </XView>
                        ))}
                    </XView>
                </UListGroup>
                <UListGroup header="Transactions">
                    {transactions.walletTransactions.items.map((v) => (
                        <TransactionView key={v.id} item={v} />
                    ))}
                </UListGroup>
            </XView>
        </Page>
    );
});