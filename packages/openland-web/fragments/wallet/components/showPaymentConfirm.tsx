import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showAddCard } from './showAddCard';
import { RadioButtonsSelect } from 'openland-web/fragments/account/components/RadioButtonsSelect';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { Alert } from 'react-native';
import { TextStyles } from 'openland-web/utils/TextStyles';

type paymentType = 'payment' | 'subscription_month' | 'subscription_year';

const AddFundsComponent = React.memo((props: { ctx: XModalController, amount: number, description: string, onConfirm: (paymentId: string) => void, type: paymentType }) => {
    let client = useClient();
    let cards: { id: string, brand: string, last4?: string }[] = [...client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards.filter(c => c.isDefault)];
    let wallet = client.useMyWallet({ fetchPolicy: 'cache-and-network' });
    let [currentCard, setCurrentCard] = React.useState<string | 'openland' | undefined>(undefined);
    let [cancelable, setCancelable] = React.useState<boolean>(true);
    let [loading, setLoading] = React.useState<boolean>(false);
    if (currentCard === undefined) {
        if (cards.length > 0) {
            if (wallet.myAccount.balance >= props.amount) {
                setCurrentCard('openland');
            } else {
                setCurrentCard(cards[0].id);
            }
        }
    }
    if ((wallet.myAccount.balance >= props.amount) || currentCard === 'openland') {
        cards.unshift({ id: 'openland', brand: 'openland' });
    }
    const onSubmit = React.useCallback(async () => {
        if (currentCard) {
            try {
                setLoading(true);
                props.ctx.setOnEscPressed(() => false);
                setCancelable(false);
                await props.onConfirm(currentCard);
                props.ctx.hide();
            } catch (e) {
                // TODO: handle errors gracefully
                setLoading(false);
                Alert.alert(e.message);
            } finally {
                setCancelable(true);
                props.ctx.setOnEscPressed(props.ctx.hide);
            }
        }
    }, [currentCard]);

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
                    {cards.length > 0 && (
                        <RadioButtonsSelect
                            value={currentCard}
                            onChange={setCurrentCard}
                            selectOptions={cards.map(card => ({
                                value: card.id,
                                label: `${getPaymentMethodName(card.brand)}${card.last4 ? `, ${card.last4}` : ''}`,
                            }))}
                        />
                    )}
                </UListGroup>
            </XView>
            <XView marginTop={24} paddingVertical={16} paddingHorizontal={24} backgroundColor="var(--backgroundTertiary)" justifyContent="flex-end" flexDirection="row">
                <UButton text="Cancel" disable={!cancelable} onClick={() => props.ctx.hide()} style="secondary" size="large" />
                <UButton disable={cards.length === 0} text={`Pay ${formatMoney(props.amount)} ${props.type === 'payment' ? '' : props.type === 'subscription_month' ? ' / mo.' : ' / yr.'}`} action={onSubmit} style="pay" size="large" loading={loading} />
            </XView>
        </XView>
    );
});

export function showPayConfirm(amount: number, type: paymentType, description: string, action: (paymentId: string) => void) {
    showModalBox({ title: 'Payment' }, (ctx) => {
        return (
            <AddFundsComponent ctx={ctx} amount={amount} description={description} onConfirm={action} type={type} />
        );
    });
}