import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { showAddCard } from './components/showAddCard';
import { showAddFunds } from './components/showAddFunds';
import { Money } from 'openland-web/components/Money';

export const WalletFragment = React.memo(() => {
    let client = useClient();
    let cards = client.useMyCards({ fetchPolicy: 'cache-and-network' });
    let wallet = client.useMyWallet({ fetchPolicy: 'cache-and-network' });
    let transactions = client.useWalletTransactions({ id: wallet.myAccount.id, first: 20 });
    return (
        <Page track="settings_finance">
            <UHeader title="Finance" />
            <XView flexDirection="column">
                <XView>
                    <Money amount={wallet.myAccount.balance} />
                </XView>
                <XView>
                    {transactions.walletTransactions.items.map((v) => (
                        <XView key={v.id}>{v.readableState}: <Money amount={v.amount} /></XView>
                    ))}
                </XView>
                <XView
                    paddingHorizontal={16}
                    paddingVertical={16}
                >
                    <UButton text="Add Card" onClick={() => showAddCard()} />
                    <UButton text="Add Funds" onClick={() => showAddFunds()} />
                </XView>
                {cards.myCards.map((v) => (
                    <XView key={v.id}>**** **** **** {v.last4} | {v.expMonth}/{v.expYear}</XView>
                ))}
            </XView>
        </Page>
    );
});