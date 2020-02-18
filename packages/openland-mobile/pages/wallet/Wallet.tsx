import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { useClient } from 'openland-api/useClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { BalanceView } from './components/BalanceView';
import { CardView } from './components/CardView';
import { TransactionView } from './components/TransactionView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { AddCardItem } from './components/AddCardItem';
import { SFlatList } from 'react-native-s/SFlatList';
import { ZListHeader } from 'openland-mobile/components/ZListHeader';

const WalletComponent = React.memo<PageProps>((props) => {
    const client = useClient();
    const walletEngine = getMessenger().engine.wallet;
    const walletState = walletEngine.state.useState();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    const balance = walletState.balance;
    const transactions = [...walletState.pendingTransactions, ...walletState.historyTransactions];

    const handleAddCard = React.useCallback(() => {
        props.router.push('AddCard');
    }, []);

    const content = (
        <>
            <BalanceView amount={balance} />
            <ZListGroup
                header="Payment methods"
                actionRight={cards.length > 0 ? { title: 'Add card', onPress: handleAddCard } : undefined}
            >
                {cards.length === 0 && (
                    <AddCardItem onPress={handleAddCard} />
                )}
                {cards.map(card => <CardView key={card.id} item={card} />)}
            </ZListGroup>
            {transactions.length > 0 && <ZListHeader text="Transactions" />}
        </>
    );

    return (
        <>
            <SHeader title="Wallet" />
            <SFlatList
                data={transactions}
                renderItem={({ item }) => <TransactionView item={item} />}
                keyExtractor={(item, index) => index + '-' + item.id}
                ListHeaderComponent={content}
                onEndReached={walletEngine.loadMoreTransactions}
                refreshing={walletState.historyLoading}
            />
        </>
    );
});

export const Wallet = withApp(WalletComponent);