import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { showAddCard } from './components/showAddCard';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { CardView } from './components/CardView';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { TransactionView } from './components/TransactionView';
import { showAddFunds } from './components/showAddFunds';
import { Money } from 'openland-y-utils/wallet/Money';
import { TextStyles } from 'openland-web/utils/TextStyles';

export const WalletFragment = React.memo(() => {
    const client = useClient();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    const wallet = client.useMyWallet({ fetchPolicy: 'cache-and-network' }).myAccount;
    const transactions = client.useWalletTransactions({ id: wallet.id, first: 20 }).walletTransactions;
    const balance = wallet.balance;

    return (
        <Page track="settings_wallet">
            <UHeader title="Wallet" />
            <XView flexDirection="column" paddingBottom={56}>
                <UListGroup header="Your balance" action={{ title: 'Add funds', onClick: () => showAddFunds() }}>
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
                    <XView paddingTop={8} paddingHorizontal={8} flexDirection="row" flexWrap="wrap">
                        {cards.map(card => (
                            <XView key={card.id} width="50%" paddingHorizontal={8} paddingBottom={16}>
                                <CardView item={card} />
                            </XView>
                        ))}
                    </XView>
                </UListGroup>
                <UListGroup header="Transactions">
                    {transactions.items.map((v) => (
                        <TransactionView key={v.id} item={v} />
                    ))}
                </UListGroup>
            </XView>
        </Page>
    );
});