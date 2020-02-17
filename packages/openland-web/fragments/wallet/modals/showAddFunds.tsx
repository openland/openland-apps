import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { USelect } from 'openland-web/components/unicorn/USelect';
import { useClient } from 'openland-api/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import uuid from 'uuid';
import { backoff } from 'openland-y-utils/timer';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showAddCard } from './showAddCard';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { BrandLogo } from '../components/BrandLogo';
import { URadioDot } from 'openland-web/components/unicorn/URadioItem';

const token = 'pk_test_y80EsXGYQdMKMcJ5lifEM4jx';
const defaultError = 'We are unable to authenticate your payment method. Please choose a different payment method and try again.';

const AddFundsComponent = React.memo((props: { ctx: XModalController }) => {
    let client = useClient();
    let cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    let [amount, setAmount] = React.useState<1000 | 2000 | 5000>(1000);
    let [currentCard, setCurrentCard] = React.useState<string | undefined>(undefined);
    let [error, setError] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState(false);
    if (currentCard === undefined) {
        if (cards.length > 0) {
            setCurrentCard(cards[0].id);
        }
    } else {
        let found = false;
        for (let c of cards) {
            if (c.id === currentCard) {
                found = true;
            }
        }
        if (!found) {
            setCurrentCard(undefined);
        }
    }
    const onSubmit = React.useCallback(() => {
        if (currentCard) {
            (async () => {
                setLoading(true);

                try {
                    const stripe = Stripe(token);

                    // Create deposit intent
                    let retry = uuid();
                    let intent = await backoff(async () =>
                        await client.mutateCreateDepositIntent({ amount: amount, cardId: currentCard!, retryKey: retry })
                    );

                    // Confirming card payment
                    let res = await (stripe as any).confirmCardPayment(intent.cardDepositIntent.clientSecret);

                    // Error during confirmation
                    if (res.error) {
                        setError(res.error.message);
                        setLoading(false);
                        return;
                    }

                    // Unknown state/error
                    if (!res.paymentIntent || res.paymentIntent.status !== 'succeeded') {
                        setError(defaultError);
                        setLoading(false);
                        return;
                    }

                    // Report commit to backend
                    await backoff(async () =>
                        await client.mutatePaymentIntentCommit({ id: intent.cardDepositIntent.id })
                    );

                    // Exit
                    props.ctx.hide();
                } catch (e) {

                    // Unknown exception
                    console.warn(e);
                    setError(defaultError);
                    setLoading(false);
                    return;
                }
            })();
        }
    }, [currentCard, amount]);

    return (
        <XView flexDirection="column">
            <XView paddingHorizontal={8}>
                <XView paddingHorizontal={16} paddingTop={12}>
                    <USelect
                        placeholder="Amount"
                        value={amount}
                        searchable={false}
                        options={[
                            { value: 1000, label: '$10' },
                            { value: 2000, label: '$20' },
                            { value: 5000, label: '$50' }
                        ]}
                        onChange={(v) => setAmount((v as any).value)}
                    />
                </XView>
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
                    {cards.map(card => (
                        <UListItem
                            leftElement={<BrandLogo brand={card.brand} border={true} />}
                            title={`${getPaymentMethodName(card.brand)}, ${card.last4}`}
                            description={`Valid to ${card.expMonth}/${card.expYear.toString().slice(-2)}`}
                            useRadius={true}
                            onClick={() => { setCurrentCard(card.id); }}
                            rightElement={<XView marginRight={8}><URadioDot checked={currentCard === card.id} /></XView>}
                        />
                    ))}
                </UListGroup>
                {error && (<XView marginTop={8} marginHorizontal={16} color="var(--accentNegative)" {...TextStyles.Caption}>{error}</XView>)}
            </XView>
            <XView marginTop={24} paddingVertical={16} paddingHorizontal={24} backgroundColor="var(--backgroundTertiary)" justifyContent="flex-end" flexDirection="row">
                <UButton text="Cancel" onClick={() => props.ctx.hide()} style="secondary" size="large" />
                <UButton disable={cards.length === 0} text={`Deposit ${formatMoney(amount)}`} onClick={onSubmit} style="pay" size="large" loading={loading} />
            </XView>
        </XView>
    );
});

export function showAddFunds() {
    showModalBox({ title: 'Add funds' }, (ctx) => {
        return (
            <AddFundsComponent ctx={ctx} />
        );
    });
}