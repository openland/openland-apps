import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { showAddCard } from './components/showAddCard';
import { Money } from 'openland-web/components/Money';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { BallanceView } from './components/BalanceView';
import { CardView } from './components/CardView';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';

export const WalletFragment = React.memo(() => {
    const client = useClient();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' });
    const wallet = client.useMyWallet({ fetchPolicy: 'cache-and-network' });
    const transactions = client.useWalletTransactions({ id: wallet.myAccount.id, first: 20 });

    return (
        <Page track="settings_wallet">
            <UHeader title="Wallet" />
            <XView flexDirection="column">
                <XView paddingTop={20} paddingBottom={24} paddingHorizontal={16}>
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
                    <XView padding={8} flexDirection="row" flexWrap="wrap">
                        {cards.myCards.map((v) => (
                            <XView key={v.id} width="50%" paddingHorizontal={8} paddingBottom={16}>
                                <CardView card={v} />
                            </XView>
                        ))}
                    </XView>
                </UListGroup>
                <UListGroup header="Billing history">
                    {transactions.walletTransactions.items.map((v) => (
                        <XView key={v.id}>{v.readableState}: <Money amount={v.amount} /></XView>
                    ))}
                </UListGroup>
            </XView>
        </Page>
    );
});