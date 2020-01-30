import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showAddCard } from './showAddCard';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { Alert } from 'react-native';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { WalletSubscriptionInterval } from 'openland-api/Types';

type paymentType = 'payment' | WalletSubscriptionInterval;

const ConfirmPaymentComponent = React.memo((props: { ctx: XModalController, amount: number, description: string, onConfirm: () => void, type: paymentType }) => {
    let client = useClient();
    let cards: { id: string, brand: string, last4?: string }[] = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    let [cancelable, setCancelable] = React.useState<boolean>(true);
    let [loading, setLoading] = React.useState<boolean>(false);
    const onSubmit = React.useCallback(async () => {
        try {
            setLoading(true);
            props.ctx.setOnEscPressed(() => false);
            setCancelable(false);
            await props.onConfirm();
            props.ctx.hide();
        } catch (e) {
            // TODO: handle errors gracefully
            setLoading(false);
            Alert.alert(e.message);
        } finally {
            setCancelable(true);
            props.ctx.setOnEscPressed(props.ctx.hide);
        }
    }, []);

    return (
        <XView flexDirection="column">
            <XView paddingHorizontal={8}>
                <XView {...TextStyles.Body} color="var(--foregroundSecondary)" marginLeft={16}>{props.description}</XView>
                <UListGroup
                    header="Payment method"
                    action={cards.length > 0 ? { title: 'Add card', onClick: () => showAddCard() } : undefined}
                >
                    {cards.length === 0 && (
                        <UAddItem
                            title="Add card"
                            onClick={() => showAddCard()}
                        />
                    )}
                </UListGroup>
            </XView>
            <XView marginTop={24} paddingVertical={16} paddingHorizontal={24} backgroundColor="var(--backgroundTertiary)" justifyContent="flex-end" flexDirection="row">
                <UButton text="Cancel" disable={!cancelable} onClick={() => props.ctx.hide()} style="secondary" size="large" />
                <UButton disable={cards.length === 0} text={`Pay ${formatMoney(props.amount)} ${props.type === 'payment' ? '' : props.type === WalletSubscriptionInterval.MONTH ? ' / mo.' : ' / w.'}`} action={onSubmit} style="pay" size="large" loading={loading} />
            </XView>
        </XView>
    );
});

export function showPayConfirm(amount: number, type: paymentType, description: string, action: () => void) {
    showModalBox({ title: type === 'payment' ? 'Payment' : 'Subscription' }, (ctx) => {
        return (
            <ConfirmPaymentComponent ctx={ctx} amount={amount} description={description} onConfirm={action} type={type} />
        );
    });
}