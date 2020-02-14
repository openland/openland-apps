import * as React from 'react';
import { showBottomSheet, BottomSheetActions } from 'openland-mobile/components/BottomSheet';
import { useClient } from 'openland-api/useClient';
import { View, NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SRouter } from 'react-native-s/SRouter';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { CardView } from 'openland-mobile/pages/wallet/components/CardView';
import { backoff } from 'openland-y-utils/timer';

const StripeModule = NativeModules.RNStripe as { confirmPayment(paymentId: string, clientSecret: string, paymentMethod: string): void };
const StripeModuleEmitter = new NativeEventEmitter(NativeModules.RNStripe);

const awaitForCompletePayment = async (id: string) => {
    let resResolver: (res: {
        status: 'success' | 'failed',
        id: string,
        message?: string
    }) => void;
    let resPromise = new Promise<{
        status: 'success' | 'failed',
        id: string,
        message?: string
    }>(resolver => resResolver = resolver);

    if (Platform.OS === 'android') {
        let subs = DeviceEventEmitter.addListener('openland_stripe_confirm_payment', (args: {
            status: 'success' | 'failed',
            id?: string,
            message?: string
        }) => {
            if (args.id === id) {
                resResolver({ status: args.status, message: args.message, id: args.id });
            }
        });
        try {
            return await resPromise;
        } finally {
            subs.remove();
        }
    } else {
        let subs = StripeModuleEmitter.addListener('confirm_payment', (args: {
            status: 'success' | 'failed',
            id?: string,
            message?: string
        }) => {
            if (args.id === id) {
                resResolver({ status: args.status, message: args.message, id: args.id });
            }
        });
        try {
            return await resPromise;
        } finally {
            subs.remove();
        }
    }
};

const CompletePaymentComponent = React.memo((props: { id: string, clientSecret: string, router: SRouter, ctx: BottomSheetActions }) => {
    const client = useClient();
    // const theme = useTheme();
    const [selected, setSelected] = React.useState<string>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const onSubmit = React.useCallback(async () => {
        if (!selected) {
            return;
        }
        setLoading(true);
        let res = awaitForCompletePayment(props.id);
        StripeModule.confirmPayment(props.id, props.clientSecret, selected);
        let message = (await res).message;
        // Report commit to backend
        await backoff(async () =>
            await client.mutatePaymentIntentCommit({ id: props.id })
        );

        setLoading(false);

        if (message) {
            AlertBlanket.alert(message);
        }
        props.ctx.hide();
    }, [selected]);

    const cards = client.useMyCards().myCards;

    React.useEffect(() => {
        let defaultCard = cards.find(c => c.isDefault);
        setSelected(defaultCard && defaultCard.pmid);
    }, [cards]);

    return (
        <View flexDirection="column" paddingHorizontal={24}>
            {cards.map(card => <CardView key={card.id} item={card} selected={selected === card.pmid} onPress={() => setSelected(card.pmid)} />)}
            <ZListItem
                leftIcon={require('assets/ic-add-glyph-24.png')}
                text="Add card"
                onPress={() => props.router.push('AddCard')}
            />
            <View marginTop={8}>
                <ZButton enabled={!!selected} title="Complete" action={onSubmit} style="primary" size="large" loading={loading} />
            </View>

        </View >
    );
});

export const showPayComplete = (id: string, clientSecret: string, router: SRouter) => {
    showBottomSheet({ title: 'Complete payment', cancelable: false, view: (ctx) => <CompletePaymentComponent id={id} clientSecret={clientSecret} ctx={ctx} router={router} /> });
};