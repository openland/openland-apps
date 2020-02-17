import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { useClient } from 'openland-api/useClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { BalanceView } from './components/BalanceView';
import { CardView } from './components/CardView';
import { TransactionView } from './components/TransactionView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { AddCardItem } from './components/AddCardItem';

const WalletComponent = React.memo<PageProps>((props) => {
    const client = useClient();
    const messenger = getMessenger();
    const wallet = messenger.engine.wallet.state.useState();
    const cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    const balance = wallet.balance;

    const handleAddCard = React.useCallback(() => {
        props.router.push('AddCard');
    }, []);

    return (
        <>
            <SHeader title="Wallet" />
            <SScrollView>
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
                <ZListGroup header="Transactions">
                    {wallet.pendingTransactions.map((v) => <TransactionView key={v.id} item={v} router={props.router} />)}
                    {wallet.historyTransactions.map((v) => <TransactionView key={v.id} item={v} router={props.router} />)}
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const Wallet = withApp(WalletComponent);