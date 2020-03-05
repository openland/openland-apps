import * as React from 'react';
import { WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { showBottomSheet, BottomSheetActions } from 'openland-mobile/components/BottomSheet';
import { useClient } from 'openland-api/useClient';
import { View, Text, Image } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import AlertBlanket, { AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SRouter } from 'react-native-s/SRouter';
import { AddCardItem } from 'openland-mobile/pages/wallet/components/AddCardItem';
import { getMessenger } from 'openland-mobile/utils/messenger';

const ConfirmPaymentComponent = React.memo((props: PaymentProps & { ctx: BottomSheetActions }) => {
    const client = useClient();
    const theme = useTheme();
    const cards = client.useMyCards().myCards;
    const [loading, setLoading] = React.useState<boolean>(false);
    const onSubmit = React.useCallback(async () => {
        try {
            setLoading(true);
            await props.action();
            props.ctx.hide();
        } catch (e) {
            // TODO: handle errors gracefully
            setLoading(false);
            AlertBlanket.alert(e.message);
        }
    }, []);

    return (
        <View flexDirection="column" paddingHorizontal={16}>
            <Text style={{...TextStyles.Title2, color: theme.foregroundPrimary, marginTop: 7, marginBottom: 27, textAlign: 'center', paddingHorizontal: 16}}>Payment</Text>
            {props.productTitle && <View flexDirection="row" alignItems="center">
                <View flexDirection="column" flexGrow={1}>
                    <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginBottom: 4 }}>{props.productTitle}</Text>
                    {props.productDescription && <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>{props.productDescription}</Text>}
                </View>
                {props.productPicture}
            </View>}
            {props.productView}
            <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginBottom: 4, marginTop: 24 }}>{`${formatMoney(props.amount)} ${props.type === 'payment' ? '' : props.interval === WalletSubscriptionInterval.MONTH ? ' / mo.' : props.interval === WalletSubscriptionInterval.WEEK ? ' / w.' : ' / /?'}`}</Text>
            {props.productDescription && <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>Amount</Text>}

            {(cards.length === 0) && (
                <View marginTop={24}>
                    <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, marginBottom: 8 }}>Payment method</Text>
                    <View marginHorizontal={-16}>
                        <AddCardItem
                            onPress={() => {
                                props.ctx.hide();
                                props.router.push('AddCard');
                            }}
                        />
                    </View>
                </View>
            )}
            <View marginTop={cards.length === 0 ? 16 : 32}>
                <ZButton enabled={cards.length !== 0} title="Confirm" action={onSubmit} style="primary" size="large" loading={loading} />
            </View>
        </View >
    );
});

type PaymentProps = {
    router: SRouter;
    amount: number;
    productTitle?: string;
    productDescription?: string;
    productPicture?: JSX.Element;
    productView?: JSX.Element;
    action: () => void
} & ({ type: 'payment' } | { type: 'subscription', interval: WalletSubscriptionInterval });

export const showPayConfirm = (props: PaymentProps) => {
    const locked = getMessenger().engine.wallet.state.get().isLocked;
    if (!locked) {
        showBottomSheet({ cancelable: false, view: (ctx) => <ConfirmPaymentComponent {...props} ctx={ctx} /> });
    } else {
        const builder = new AlertBlanketBuilder();

        builder.title('Update payment method');
        builder.message('Update payment method to complete previously failed transactions and enable new purchases');

        builder.view(
            <View marginBottom={16} marginHorizontal={-24} overflow="hidden">
                <Image
                    source={require('assets/art-transactions-failing.png')}
                    style={{
                        width: 340,
                        height: 200,
                        alignSelf: 'center',
                        resizeMode: 'contain'
                    }}
                />
            </View>
        );

        builder.button('Cancel', 'cancel');
        builder.button('Continue', 'default', () => props.router.push('Wallet'));
        builder.show();
    }
};