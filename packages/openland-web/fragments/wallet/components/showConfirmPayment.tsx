import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { backoff } from 'openland-y-utils/timer';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showAddCard } from './showAddCard';
import { RadioButtonsSelect } from 'openland-web/fragments/account/components/RadioButtonsSelect';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';

const token = 'pk_test_y80EsXGYQdMKMcJ5lifEM4jx';
const defaultError = 'We are unable to authenticate your payment method. Please choose a different payment method and try again.';

const ConfirmPaymentComponent = React.memo((props: { ctx: XModalController, id: string, clientSecret: string }) => {
    let client = useClient();
    let cards = client.useMyCards({ fetchPolicy: 'cache-and-network' }).myCards;
    let [currentCard, setCurrentCard] = React.useState<string | undefined>(undefined);
    let [error, setError] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState(false);
    if (currentCard === undefined) {
        if (cards.length > 0) {
            setCurrentCard(cards[0].pmid);
        }
    } else {
        let found = false;
        for (let c of cards) {
            if (c.pmid === currentCard) {
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
                    // let retry = uuid();
                    // let intent = await backoff(async () =>
                    //     await client.mutateCreateDepositIntent({ amount: amount, cardId: currentCard!, retryKey: retry })
                    // );

                    // Confirming card payment
                    let res = await (stripe as any).confirmCardPayment(props.clientSecret, { payment_method: currentCard! });

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
                        await client.mutatePaymentIntentCommit({ id: props.id })
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
    }, [currentCard]);

    return (
        <XView flexDirection="column">
            <XView paddingHorizontal={8}>
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
                                label: `${getPaymentMethodName(card.brand)}, ${card.last4}`,
                            }))}
                        />
                    )}
                </UListGroup>
                {error && <XView>{error}</XView>}
            </XView>
            <XView marginTop={24} paddingVertical={16} paddingHorizontal={24} backgroundColor="var(--backgroundTertiary)" justifyContent="flex-end" flexDirection="row">
                <UButton text="Cancel" onClick={() => props.ctx.hide()} style="secondary" size="large" />
                <UButton text={`Confirm`} onClick={onSubmit} style="pay" size="large" loading={loading} />
            </XView>
        </XView>
    );
});

export function showConfirmPayment(id: string, clientSecret: string) {
    showModalBox({ title: 'Confirm Payment' }, (ctx) => {
        return (
            <ConfirmPaymentComponent ctx={ctx} id={id} clientSecret={clientSecret} />
        );
    });
} 