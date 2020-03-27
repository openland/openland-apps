import * as React from 'react';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { useClient } from 'openland-api/useClient';
import { View, Text, NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter } from 'react-native';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SRouter } from 'react-native-s/SRouter';
import { CardView } from 'openland-mobile/pages/wallet/components/CardView';
import { backoff } from 'openland-y-utils/timer';
import { AddCardItem } from 'openland-mobile/pages/wallet/components/AddCardItem';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ModalProps } from 'react-native-fast-modal';

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

const CompletePaymentComponent = React.memo((props: { id: string, clientSecret: string, router: SRouter, ctx: ModalProps }) => {
    const client = useClient();
    const theme = useTheme();
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

    const handleAdd = React.useCallback(() => {
        props.router.push('AddCard');
        props.ctx.hide();
    }, [props.router, props.ctx]);

    return (
        <View flexDirection="column">
            <Text style={{...TextStyles.Title2, color: theme.foregroundPrimary, marginTop: 7, marginBottom: 11, textAlign: 'center', paddingHorizontal: 32}}>Update payment method</Text>
            <Text style={{...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center', paddingHorizontal: 32, marginBottom: 16}}>
                Choose correct payment method or add a new one to complete transaction
            </Text>
            {cards.map(card => <CardView key={card.id} item={card} selected={selected === card.pmid} onPress={() => setSelected(card.pmid)} />)}
            <AddCardItem onPress={handleAdd} />
            <View marginVertical={16} paddingHorizontal={16}>
                <ZButton enabled={!!selected} title="Complete" action={onSubmit} style="primary" size="large" loading={loading} />
            </View>
        </View>
    );
});

export const showPayComplete = (id: string, clientSecret: string, router: SRouter) => {
    showBottomSheet({ cancelable: false, view: (ctx) => <CompletePaymentComponent id={id} clientSecret={clientSecret} ctx={ctx} router={router} /> });
};