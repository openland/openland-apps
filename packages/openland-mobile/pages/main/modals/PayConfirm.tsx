import * as React from 'react';
import { WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { showBottomSheet, BottomSheetActions } from 'openland-mobile/components/BottomSheet';
import { useClient } from 'openland-api/useClient';
import { View, Text } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SRouter } from 'react-native-s/SRouter';
import { AddCardItem } from 'openland-mobile/pages/wallet/components/AddCardItem';

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
                    <Text style={{...TextStyles.Title2, color: theme.foregroundPrimary, marginBottom: 8}}>Payment method</Text>
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
    showBottomSheet({ title: 'Payment', cancelable: false, view: (ctx) => <ConfirmPaymentComponent {...props} ctx={ctx} /> });
};