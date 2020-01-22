import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { useClient } from 'openland-mobile/utils/useClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { BalanceView } from './components/BalanceView';
import { CardView } from './components/CardView';
import { TransactionView } from './components/TransactionView';

const WalletComponent = React.memo<PageProps>((props) => {
    const client = useClient();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    const wallet = client.useMyWallet({ fetchPolicy: 'cache-and-network' }).myAccount;
    const transactions = client.useWalletTransactions({ id: wallet.id, first: 20 }).walletTransactions;
    const balance = wallet.balance;

    return (
        <>
            <SHeader title="Wallet" />
            <SScrollView>
                <BalanceView amount={balance} />
                <ZListGroup header="Payment methods" actionRight={{ title: 'Add card', onPress: () => { props.router.present('AddCard'); } }}>
                    {cards.map(card => <CardView key={card.id} item={card} />)}
                </ZListGroup>
                <ZListGroup header="Transactions">
                    {transactions.items.map(transaction => <TransactionView key={transaction.id} item={transaction} />)}
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const Wallet = withApp(WalletComponent, { navigationAppearance: 'small' });