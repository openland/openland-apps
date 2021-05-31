import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import * as React from 'react';
import { View } from 'react-native';
import { AddCardItem } from 'openland-mobile/pages/wallet/components/AddCardItem';
import { CardView } from 'openland-mobile/pages/wallet/components/CardView';
import { useClient } from 'openland-api/useClient';
import { SRouter } from 'react-native-s/SRouter';
import { ZButton } from 'openland-mobile/components/ZButton';
import Toast from 'openland-mobile/components/Toast';
import { showAddCard } from '../wallet/AddCard';

type ChoosePaymentMethodProps = {
    router: SRouter;
};

const ChoosePaymentMethod = React.memo((props: ChoosePaymentMethodProps & { hide: () => void }) => {
    const client = useClient();
    // const theme = useTheme();
    const [selectedId, setSelectedId] = React.useState<string>();
    const cards = client.useMyCards().myCards;

    const handleAdd = React.useCallback(() => {
        showAddCard({ router: props.router });
        // props.hide();
    }, []);

    const onConfirm = React.useCallback(async () => {
        if (!selectedId) {
            return;
        }
        const loader = Toast.loader();
        loader.show();

        try {
            await client.mutateMakeCardDefault({ id: selectedId });
            await client.refetchMyCards();
            loader.hide();
            props.hide();
        } catch (e) {
            console.warn(e);
            loader.hide();
        }
    }, [selectedId]);

    React.useEffect(() => {
        let defaultCard = cards.find(c => c.isDefault);
        setSelectedId(defaultCard && defaultCard.id);
    }, [cards]);

    return (
        <View>
            {cards.map(card => <CardView key={card.id} item={card} selected={selectedId === card.id} onPress={() => setSelectedId(card.id)} />)}
            <AddCardItem onPress={handleAdd} />
            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <ZButton size="large" title="Confirm" action={onConfirm} />
            </View>
        </View>
    );
});

export const showChoosePaymentMethod = (props: ChoosePaymentMethodProps) => {
    showBottomSheet({
        title: 'Payment method',
        cancelable: true,
        view: (ctx) => <ChoosePaymentMethod {...props} hide={ctx.hide} />,
    });
};
